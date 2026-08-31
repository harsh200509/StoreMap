import React from 'react';
import { useMapStore } from '../../../stores/mapStore';
import { useShoppingListStore } from '../../../stores/shoppingListStore';
import { Card } from '../../../components/ui/card';
import { Button } from '../../../components/ui/button';
import { X, MapPin, Plus, Check } from 'lucide-react';

export function ProductDetail() {
  const { selectedProduct, setSelectedProduct } = useMapStore();
  const { items, addItem, collectedIds, toggleCollected } = useShoppingListStore();

  if (!selectedProduct) return null;
  
  const inList = items.some(i => i.id === selectedProduct.id);
  const isCollected = collectedIds.has(selectedProduct.id);

  return (
    <Card className="absolute bottom-[84px] sm:bottom-6 left-2 right-2 sm:left-1/2 sm:right-auto sm:-translate-x-1/2 sm:w-[360px] shadow-2xl z-40 animate-in slide-in-from-bottom-4 border-none rounded-[24px] overflow-visible bg-white backdrop-blur-sm">
      <div className="p-4 flex items-center gap-3">
        <div className="flex-1 min-w-0">
          <h3 className="font-bold text-gray-900 text-base leading-tight truncate">{selectedProduct.name}</h3>
          <div className="flex items-center gap-2 mt-1.5">
            <span className="font-extrabold text-purple-700 text-lg">₹{selectedProduct.price}</span>
            <span className="text-[11px] font-medium px-2 py-0.5 bg-gray-100/80 text-gray-600 rounded-md">
              {selectedProduct.category}
            </span>
          </div>
          <div className="flex items-center gap-1.5 mt-3 text-[12px] text-gray-600 bg-purple-50/50 px-2.5 py-1.5 rounded-xl w-fit">
            <MapPin className="h-3.5 w-3.5 text-purple-400 shrink-0" />
            <span className="font-semibold text-gray-900">{selectedProduct.location.aisle}</span>
            <span className="text-gray-300">•</span>
            <span>Rack {selectedProduct.location.rack}</span>
            <span className="text-gray-300">•</span>
            <span>Shelf {selectedProduct.location.shelf}</span>
          </div>
        </div>
        
        <Button 
          className={`shrink-0 h-14 w-14 rounded-full p-0 shadow-sm transition-all active:scale-95 ${
            isCollected 
              ? 'bg-purple-100 text-purple-700 hover:bg-purple-200' 
              : (inList ? 'bg-purple-100 text-purple-700 hover:bg-purple-200' : 'bg-purple-50 text-purple-600 hover:bg-purple-100')
          }`}
          onClick={() => { 
            if (inList) {
              toggleCollected(selectedProduct.id);
              setSelectedProduct(null);
            } else {
              addItem(selectedProduct);
              setSelectedProduct(null);
            }
          }}
          title={isCollected ? "Collected" : (inList ? "Mark Collected" : "Add to List")}
        >
          <Check className="h-6 w-6" strokeWidth={2.5} />
        </Button>
      </div>
    </Card>
  );
}
