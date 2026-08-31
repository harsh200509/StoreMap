import React, { useState } from 'react';
import { Search, MapPin, Tag } from 'lucide-react';
import { useMapStore } from '../../../stores/mapStore';
import { useShoppingListStore } from '../../../stores/shoppingListStore';
import { useProductStore } from '../../../stores/productStore';
import { Product } from '../../../types';

export function ProductSearch() {
  const { searchQuery, setSearchQuery, setSelectedProduct, setActiveTab } = useMapStore();
  const { items, addItem } = useShoppingListStore();
  const { products } = useProductStore();
  const [isFocused, setIsFocused] = useState(false);

  const results = searchQuery.trim() === '' 
    ? [] 
    : products.filter(p => 
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
        p.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.brand.toLowerCase().includes(searchQuery.toLowerCase())
      ).slice(0, 5); // Limit to 5 results for clean dropdown

  const handleSelectProduct = (product: Product) => {
    setSelectedProduct(product);
    setSearchQuery('');
    setIsFocused(false);
    setActiveTab('map');
  };

  return (
    <div className="relative w-full">
      <div className={`relative flex items-center w-full h-11 rounded-full border-2 transition-colors bg-gray-50 ${isFocused ? 'border-purple-500 bg-white shadow-sm' : 'border-gray-200'}`}>
        <div className="pl-4 pr-2 flex items-center justify-center text-gray-400">
          <Search className="w-5 h-5" />
        </div>
        <input
          type="text"
          className="flex-1 h-full bg-transparent border-none outline-none text-sm text-gray-900 placeholder:text-gray-500"
          placeholder="Search products, brands, or categories..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setTimeout(() => setIsFocused(false), 200)}
        />
      </div>

      {/* Search Results Dropdown */}
      {isFocused && searchQuery.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden z-50">
          {results.length > 0 ? (
            <div className="py-2">
              {results.map((product) => (
                <div 
                  key={product.id}
                  onClick={() => handleSelectProduct(product)}
                  className="px-4 py-3 hover:bg-purple-50 cursor-pointer flex items-center justify-between group transition-colors"
                >
                  <div className="flex flex-col">
                    <span className="text-sm font-semibold text-gray-900 group-hover:text-purple-700">{product.name}</span>
                    <span className="text-xs text-gray-500 flex items-center gap-1 mt-0.5">
                      <Tag className="w-3 h-3" /> {product.brand} • {product.category}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-xs font-medium text-gray-500 bg-gray-100 px-2 py-1 rounded">
                    <MapPin className="w-3 h-3" />
                    {product.location.aisle}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="px-4 py-6 text-center text-sm text-gray-500">
              No products found for "{searchQuery}"
            </div>
          )}
        </div>
      )}
    </div>
  );
}
