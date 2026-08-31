import React, { useState, useEffect } from 'react';
import { Input } from '../../../components/ui/input';
import { Card } from '../../../components/ui/card';
import { products } from '../../../data/products';
import { useMapStore } from '../../../stores/mapStore';
import { useShoppingListStore } from '../../../stores/shoppingListStore';
import { Search, MapPin, Plus } from 'lucide-react';
import { Badge } from '../../../components/ui/badge';
import { Product } from '../../../types';

export function ProductSearch() {
  const { searchQuery, setSearchQuery, setSelectedProduct } = useMapStore();
  const { addItem, items } = useShoppingListStore();
  const [results, setResults] = useState<Product[]>([]);
  const [isFocused, setIsFocused] = useState(false);

  useEffect(() => {
    if (!searchQuery.trim()) {
      setResults([]);
      return;
    }
    
    const lowerQuery = searchQuery.toLowerCase();
    const filtered = products.filter(p => 
      p.name.toLowerCase().includes(lowerQuery) || 
      p.brand.toLowerCase().includes(lowerQuery) ||
      p.category.toLowerCase().includes(lowerQuery)
    ).slice(0, 5); // Limit to 5 results for clean UI
    
    setResults(filtered);
  }, [searchQuery]);

  const handleSelectProduct = (product: Product) => {
    setSelectedProduct(product);
    setSearchQuery('');
    setResults([]);
  };

  const handleAddToList = (e: React.MouseEvent, product: Product) => {
    e.stopPropagation();
    addItem(product);
  };

  return (
    <div className="relative w-full max-w-md mx-auto z-50">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
        <Input 
          className="pl-9 pr-4 h-12 shadow-sm rounded-xl border-gray-200"
          placeholder="Search products, brands, categories..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setTimeout(() => setIsFocused(false), 200)}
        />
      </div>

      {isFocused && results.length > 0 && (
        <Card className="absolute top-full mt-2 w-full max-h-96 overflow-y-auto shadow-lg flex flex-col p-1">
          {results.map(product => {
            const inList = items.some(i => i.id === product.id);
            return (
              <div 
                key={product.id}
                onClick={() => handleSelectProduct(product)}
                className="flex items-center justify-between p-3 hover:bg-gray-50 cursor-pointer rounded-lg transition-colors border-b last:border-0 border-gray-100"
              >
                <div className="flex flex-col gap-1">
                  <div className="font-medium text-sm text-gray-900">{product.name}</div>
                  <div className="flex items-center gap-2 text-xs text-gray-500">
                    <span className="font-semibold text-gray-700">₹{product.price}</span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <MapPin className="h-3 w-3" />
                      {product.location.aisle}
                    </span>
                    <span>•</span>
                    <Badge variant={product.status === 'Available' ? 'secondary' : (product.status === 'Low Stock' ? 'outline' : 'destructive')} className="text-[10px] px-1.5 py-0">
                      {product.status}
                    </Badge>
                  </div>
                </div>
                <button
                  onClick={(e) => handleAddToList(e, product)}
                  disabled={inList}
                  className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-full disabled:opacity-30 transition-colors"
                >
                  <Plus className="h-5 w-5" />
                </button>
              </div>
            );
          })}
        </Card>
      )}
    </div>
  );
}
