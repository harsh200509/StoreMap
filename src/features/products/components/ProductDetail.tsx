import React from 'react';
import { useMapStore } from '../../../stores/mapStore';
import { useShoppingListStore } from '../../../stores/shoppingListStore';
import { Card, CardContent } from '../../../components/ui/card';
import { Button } from '../../../components/ui/button';
import { Badge } from '../../../components/ui/badge';
import { X, Plus, MapPin } from 'lucide-react';

export function ProductDetail() {
  const { selectedProduct, setSelectedProduct, activeRoute } = useMapStore();
  const { addItem, items } = useShoppingListStore();

  // Don't show if active route is running (UI collision), or no product is selected
  if (!selectedProduct || activeRoute) return null;
  
  const inList = items.some(i => i.id === selectedProduct.id);

  return (
    <Card className="absolute bottom-4 left-4 right-4 sm:left-1/2 sm:right-auto sm:-translate-x-1/2 sm:w-[350px] shadow-2xl z-40 animate-in slide-in-from-bottom-4">
      <div className="relative p-5">
        <button 
          onClick={() => setSelectedProduct(null)} 
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-900 bg-gray-100 hover:bg-gray-200 rounded-full p-1 transition-colors"
        >
          <X className="h-4 w-4" />
        </button>
        
        <div className="pr-8">
          <h3 className="text-xl font-bold text-gray-900 leading-tight mb-1">{selectedProduct.name}</h3>
          <p className="text-lg font-semibold text-gray-700">₹{selectedProduct.price}</p>
        </div>
        
        <div className="flex flex-wrap gap-2 mt-4">
          <Badge variant="secondary">{selectedProduct.brand}</Badge>
          <Badge variant="outline">{selectedProduct.category}</Badge>
          <Badge variant={selectedProduct.status === 'Available' ? 'secondary' : (selectedProduct.status === 'Low Stock' ? 'outline' : 'destructive')}>
            {selectedProduct.status}
          </Badge>
        </div>
        
        <div className="mt-5 p-3 bg-gray-50 rounded-lg border border-gray-100">
          <div className="flex items-center gap-2 text-sm text-gray-600 mb-1">
            <MapPin className="h-4 w-4 text-blue-500" />
            <span className="font-semibold text-gray-900">{selectedProduct.location.section}</span>
          </div>
          <div className="grid grid-cols-3 gap-2 text-center text-xs mt-2">
            <div className="bg-white p-2 rounded border border-gray-200 shadow-sm">
              <div className="text-gray-500 mb-0.5">Aisle</div>
              <div className="font-bold text-gray-900">{selectedProduct.location.aisle}</div>
            </div>
            <div className="bg-white p-2 rounded border border-gray-200 shadow-sm">
              <div className="text-gray-500 mb-0.5">Rack</div>
              <div className="font-bold text-gray-900">{selectedProduct.location.rack}</div>
            </div>
            <div className="bg-white p-2 rounded border border-gray-200 shadow-sm">
              <div className="text-gray-500 mb-0.5">Shelf</div>
              <div className="font-bold text-gray-900">{selectedProduct.location.shelf}</div>
            </div>
          </div>
        </div>
        
        <div className="mt-5">
          <Button 
            className="w-full gap-2" 
            disabled={inList}
            onClick={() => { addItem(selectedProduct); setSelectedProduct(null); }}
            variant={inList ? "secondary" : "default"}
          >
            {inList ? 'Added to List' : (
              <>
                <Plus className="h-4 w-4" /> Add to Shopping List
              </>
            )}
          </Button>
        </div>
      </div>
    </Card>
  );
}
