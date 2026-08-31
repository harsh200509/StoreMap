import React from 'react';
import { useMapStore } from '../../../stores/mapStore';
import { useShoppingListStore } from '../../../stores/shoppingListStore';
import { Card } from '../../../components/ui/card';
import { Button } from '../../../components/ui/button';
import { X, MapPin, Plus, Check } from 'lucide-react';

export function ProductDetail() {
  const { selectedProduct, setSelectedProduct, activeRoute } = useMapStore();
  const { addItem, items } = useShoppingListStore();

  if (!selectedProduct || activeRoute) return null;
  
  const inList = items.some(i => i.id === selectedProduct.id);

  return (
    <Card className="absolute bottom-[84px] sm:bottom-6 left-2 right-2 sm:left-1/2 sm:right-auto sm:-translate-x-1/2 sm:w-[360px] shadow-2xl z-40 animate-in slide-in-from-bottom-4 border-purple-200 rounded-2xl overflow-visible bg-white/95 backdrop-blur-sm">
      <button 
        onClick={() => setSelectedProduct(null)} 
        className="absolute -top-3 -right-2 bg-white border border-gray-200 text-gray-500 hover:text-gray-900 rounded-full p-1.5 shadow-md transition-colors z-50"
      >
        <X className="h-4 w-4" />
      </button>
      <div className="p-3.5 flex items-center gap-3">
        <div className="flex-1 min-w-0">
          <h3 className="font-bold text-gray-900 text-sm leading-tight truncate">{selectedProduct.name}</h3>
          <div className="flex items-center gap-2 mt-1">
            <span className="font-bold text-purple-700">₹{selectedProduct.price}</span>
            <span className="text-[10px] font-semibold px-1.5 py-0.5 bg-gray-100 text-gray-600 rounded">
              {selectedProduct.category}
            </span>
          </div>
          <div className="flex items-center gap-1.5 mt-2.5 text-[11px] text-gray-700 bg-purple-50/80 p-1.5 rounded-lg border border-purple-100/50 w-fit">
            <MapPin className="h-3 w-3 text-purple-500 shrink-0" />
            <span className="font-semibold text-gray-900">{selectedProduct.location.aisle}</span>
            <span className="text-gray-300">•</span>
            <span>Rack {selectedProduct.location.rack}</span>
            <span className="text-gray-300">•</span>
            <span>Shelf {selectedProduct.location.shelf}</span>
          </div>
        </div>
        
        <Button 
          className={`shrink-0 h-11 w-11 rounded-full p-0 shadow-sm transition-all active:scale-95 ${inList ? 'bg-purple-100 text-purple-700 hover:bg-purple-200' : 'bg-purple-600 text-white hover:bg-purple-700 shadow-purple-600/30'}`}
          onClick={() => { addItem(selectedProduct); setSelectedProduct(null); }}
          title={inList ? "Added" : "Add to List"}
        >
          {inList ? <Check className="h-5 w-5" /> : <Plus className="h-5 w-5" />}
        </Button>
      </div>
    </Card>
  );
}
