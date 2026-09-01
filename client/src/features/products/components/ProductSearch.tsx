import React, { useState } from 'react';
import { Search, MapPin, Tag, Plus, Check, X } from 'lucide-react';
import { useMapStore } from '../../../stores/mapStore';
import { useShoppingListStore } from '../../../stores/shoppingListStore';
import { useProductStore } from '../../../stores/productStore';
import { Product } from '../../../types';

export function ProductSearch() {
  const { searchQuery, setSearchQuery, setSelectedProduct, setActiveTab } = useMapStore();
  const { items, addItem, removeItem } = useShoppingListStore();
  const { products } = useProductStore();
  const [isFocused, setIsFocused] = useState(false);
  const [previewProduct, setPreviewProduct] = useState<Product | null>(null);

  const results =
    searchQuery.trim() === ''
      ? []
      : products
          .filter(
            (p) =>
              p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
              p.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
              p.brand.toLowerCase().includes(searchQuery.toLowerCase())
          )
          .slice(0, 6);

  const handleSelectProduct = (product: Product) => {
    setPreviewProduct(product);
    setIsFocused(false);
  };

  const closePreview = () => {
    setPreviewProduct(null);
    setSearchQuery('');
  };

  const handleFindOnMap = (product: Product) => {
    setSelectedProduct(product, 'map');
    setActiveTab('map');
    closePreview();
  };

  return (
    <div className="relative w-full">
      <div
        className={`relative flex items-center w-full h-11 rounded-full border-2 transition-colors bg-gray-50 ${
          isFocused ? 'border-purple-500 bg-white shadow-sm' : 'border-gray-200'
        }`}
      >
        <div className="pl-4 pr-2 flex items-center justify-center text-gray-400">
          <Search className="w-5 h-5" />
        </div>
        <input
          type="text"
          className="flex-1 h-full bg-transparent border-none outline-none text-sm text-gray-900 placeholder:text-gray-500"
          placeholder="Search products, brands, or categories..."
          value={searchQuery}
          onChange={(e) => { setSearchQuery(e.target.value); setPreviewProduct(null); }}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setTimeout(() => setIsFocused(false), 200)}
        />
        {searchQuery && (
          <button
            onMouseDown={(e) => e.preventDefault()}
            onClick={() => { setSearchQuery(''); setPreviewProduct(null); }}
            className="pr-4 text-gray-400 hover:text-gray-600"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Search Results Dropdown */}
      {isFocused && searchQuery.length > 0 && !previewProduct && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden z-50">
          {results.length > 0 ? (
            <div className="py-2">
              {results.map((product) => {
                const inCart = items.some((i) => i.id === product.id);
                return (
                  <div
                    key={product.id}
                    onMouseDown={(e) => e.preventDefault()}
                    onClick={() => handleSelectProduct(product)}
                    className="px-4 py-3 hover:bg-purple-50 cursor-pointer flex items-center justify-between group transition-colors"
                  >
                    <div className="flex flex-col">
                      <span className="text-sm font-semibold text-gray-900 group-hover:text-purple-700">
                        {product.name}
                      </span>
                      <span className="text-xs text-gray-500 flex items-center gap-1 mt-0.5">
                        <Tag className="w-3 h-3" /> {product.brand} • {product.category}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      {inCart && (
                        <span className="text-[10px] font-bold text-purple-600 bg-purple-50 px-2 py-0.5 rounded-full">
                          In list
                        </span>
                      )}
                      <div className="text-xs font-medium text-gray-500 bg-gray-100 px-2 py-1 rounded flex items-center gap-1">
                        <MapPin className="w-3 h-3" />
                        {product.location.aisle}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="px-4 py-6 text-center text-sm text-gray-500">
              No products found for "{searchQuery}"
            </div>
          )}
        </div>
      )}

      {/* Inline Product Preview Card (source = 'search' → shows Add button) */}
      {previewProduct && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden z-50 animate-in slide-in-from-top-2">
          <div className="p-4">
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1 min-w-0 pr-3">
                <h3 className="font-bold text-gray-900 text-base leading-tight">{previewProduct.name}</h3>
                <p className="text-xs text-gray-500 mt-0.5">{previewProduct.brand} · {previewProduct.category}</p>
              </div>
              <button
                onClick={closePreview}
                className="shrink-0 p-1.5 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-500 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="flex items-center gap-3 mb-4">
              <span className="text-xl font-extrabold text-purple-700">₹{previewProduct.price}</span>
              <div className="flex items-center gap-1.5 text-xs text-gray-600 bg-purple-50 px-2.5 py-1.5 rounded-lg">
                <MapPin className="h-3.5 w-3.5 text-purple-400 shrink-0" />
                <span className="font-semibold">{previewProduct.location.aisle}</span>
                <span className="text-gray-300">•</span>
                <span>Rack {previewProduct.location.rack}</span>
              </div>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => handleFindOnMap(previewProduct)}
                className="flex items-center gap-1.5 px-3 py-2 rounded-lg border border-purple-200 text-purple-600 text-sm font-medium hover:bg-purple-50 transition-colors"
              >
                <MapPin className="w-4 h-4" /> Find on Map
              </button>
              {(() => {
                const inCart = items.some((i) => i.id === previewProduct.id);
                return (
                  <button
                    onClick={() => {
                      if (inCart) {
                        removeItem(previewProduct.id);
                      } else {
                        addItem(previewProduct);
                      }
                    }}
                    className={`flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg text-sm font-semibold transition-colors ${
                      inCart
                        ? 'bg-purple-100 text-purple-700 hover:bg-purple-200'
                        : 'bg-purple-600 text-white hover:bg-purple-700'
                    }`}
                  >
                    {inCart ? (
                      <>
                        <Check className="w-4 h-4" /> Added to List
                      </>
                    ) : (
                      <>
                        <Plus className="w-4 h-4" /> Add to List
                      </>
                    )}
                  </button>
                );
              })()}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
