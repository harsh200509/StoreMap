import React, { useEffect, useState } from 'react';
import { useShoppingListStore } from '../../../stores/shoppingListStore';
import { useMapStore } from '../../../stores/mapStore';
import { useProductStore } from '../../../stores/productStore';
import { MapPin, Plus, Check, Sparkles } from 'lucide-react';
import { Button } from '../../../components/ui/button';
import { SkeletonCard } from '../../../components/ui/SkeletonCard';

const CATEGORIES = ['All', 'Grocery', 'Dairy', 'Snacks', 'Beverages', 'Personal Care', 'Cleaning', 'Household'];

export function Storefront() {
  const { items, addItem, removeItem } = useShoppingListStore();
  const { setSelectedProduct, setActiveTab } = useMapStore();
  const { products, loading, fetchProducts } = useProductStore();
  const [selectedCategory, setSelectedCategory] = useState('All');

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const filteredProducts = selectedCategory === 'All'
    ? products
    : products.filter((p) => p.category?.toLowerCase() === selectedCategory.toLowerCase());

  return (
    <div className="flex-1 overflow-y-auto bg-gray-50 p-3 sm:p-5 pb-28 w-full h-full">
      <div className="max-w-7xl mx-auto space-y-4">
        {/* Category Filters Header */}
        <div className="flex items-center justify-between gap-2 overflow-x-auto no-scrollbar pb-1">
          <div className="flex items-center gap-1.5 shrink-0">
            {CATEGORIES.map((cat) => {
              const isActive = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all whitespace-nowrap ${
                    isActive
                      ? 'bg-purple-600 text-white shadow-md shadow-purple-600/20'
                      : 'bg-white text-gray-600 hover:bg-purple-50 hover:text-purple-600 border border-gray-200'
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>

          <div className="hidden sm:flex items-center gap-1.5 text-xs text-gray-500 font-medium shrink-0">
            <Sparkles className="w-3.5 h-3.5 text-purple-500" />
            <span>{filteredProducts.length} Items Available</span>
          </div>
        </div>

        {/* Product Cards Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-4">
          {loading ? (
            Array.from({ length: 15 }).map((_, i) => <SkeletonCard key={i} />)
          ) : filteredProducts.length > 0 ? (
            filteredProducts.map((product) => {
              const inCart = items.some((i) => i.id === product.id);
              return (
                <div
                  key={product.id}
                  className="bg-white rounded-2xl shadow-sm border border-gray-100/80 overflow-hidden flex flex-col hover:shadow-md hover:border-purple-200 transition-all group"
                >
                  {/* Product Image */}
                  <div className="aspect-[4/3] bg-gray-50 relative overflow-hidden flex items-center justify-center p-2">
                    {product.imageUrl ? (
                      <img
                        src={product.imageUrl}
                        alt={product.name}
                        className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
                        loading="lazy"
                        decoding="async"
                      />
                    ) : (
                      <div className="w-full h-full bg-purple-50 flex items-center justify-center text-purple-400 text-xs font-bold">
                        {product.category}
                      </div>
                    )}
                    <div className="absolute top-2 right-2 bg-white/90 backdrop-blur-sm px-2 py-0.5 rounded-full text-[10px] font-bold text-purple-700 shadow-sm border border-purple-100">
                      {product.category}
                    </div>
                  </div>

                  {/* Product Info */}
                  <div className="p-3.5 flex flex-col flex-1">
                    <h3 className="font-bold text-gray-900 text-sm leading-snug line-clamp-2 min-h-[2.5rem]">
                      {product.name}
                    </h3>
                    <div className="text-[11px] text-gray-400 font-medium mt-0.5">{product.brand || 'Store Item'}</div>

                    <div className="flex items-baseline justify-between mt-2 mb-3">
                      <div className="text-base font-extrabold text-gray-900">₹{product.price}</div>
                      <div className="text-[10px] font-semibold text-gray-500 bg-gray-100 px-1.5 py-0.5 rounded">
                        {product.location.aisle}
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="mt-auto flex gap-2 pt-1">
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-9 w-9 shrink-0 border-purple-200 text-purple-600 hover:bg-purple-50 rounded-xl"
                        onClick={() => {
                          setSelectedProduct(product, 'map');
                          setActiveTab('map');
                        }}
                        title="Find on Store Map"
                      >
                        <MapPin className="h-4 w-4" />
                      </Button>
                      <Button
                        className={`flex-1 h-9 text-xs font-bold rounded-xl transition-all ${
                          inCart
                            ? 'bg-purple-100 text-purple-700 hover:bg-purple-200'
                            : 'bg-purple-600 text-white hover:bg-purple-700 active:scale-95'
                        }`}
                        onClick={() => (inCart ? removeItem(product.id) : addItem(product))}
                      >
                        {inCart ? (
                          <>
                            <Check className="h-3.5 w-3.5 mr-1" /> Added
                          </>
                        ) : (
                          <>
                            <Plus className="h-3.5 w-3.5 mr-1" /> Add
                          </>
                        )}
                      </Button>
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="col-span-full py-16 text-center text-gray-400 text-sm font-medium">
              No products found in this category.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
