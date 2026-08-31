import React from 'react';
import { useShoppingListStore } from '../../../stores/shoppingListStore';
import { useMapStore } from '../../../stores/mapStore';
import { Button } from '../../../components/ui/button';
import { products } from '../../../data/products';
import { Trash2, CheckCircle2, Circle, Tag, X } from 'lucide-react';
import { cn } from '../../../lib/utils';

export function ShoppingList({ onClose, isMobile }: { onClose: () => void, isMobile?: boolean }) {
  const { items, collectedIds, toggleCollected, removeItem, clearList, setInitialDemoList } = useShoppingListStore();
  const { setSelectedProduct, setActiveTab } = useMapStore();

  const handleLoadDemo = () => {
    const demoSkus = ['GRO-001', 'SNA-001', 'CLN-001', 'DAI-001', 'PER-001', 'GRO-002', 'GRO-003', 'SNA-002'];
    const demoItems = products.filter(p => demoSkus.includes(p.sku));
    setInitialDemoList(demoItems);
  };

  return (
    <div className="flex flex-col h-full bg-white">
      <div className="pb-3 pt-4 px-4 border-b border-gray-100 flex flex-row items-center justify-between shrink-0">
        <div>
          <h2 className="text-lg font-bold text-gray-900">My Cart</h2>
          <p className="text-xs text-gray-500 mt-1">{items.length} items to pick</p>
        </div>
        <div className="flex items-center gap-1">
          {items.length > 0 && (
            <Button variant="ghost" size="sm" onClick={clearList} className="text-red-500 hover:text-red-600 hover:bg-red-50 px-2 h-8 text-xs">
              Clear All
            </Button>
          )}
          {isMobile && (
            <button onClick={onClose} className="p-1.5 ml-2 text-gray-400 hover:text-gray-800 hover:bg-gray-100 rounded-full transition-colors">
              <X className="w-5 h-5" />
            </button>
          )}
        </div>
      </div>
      
      <div className="flex-1 overflow-y-auto p-0 bg-gray-50/30">
        {items.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full min-h-[200px] text-gray-500 gap-3 px-6 text-center">
            <div className="w-16 h-16 bg-purple-50 rounded-full flex items-center justify-center text-purple-300 mb-2">
              <Tag className="w-8 h-8" />
            </div>
            <p className="text-sm font-medium text-gray-900">Your cart is empty!</p>
            <p className="text-xs text-gray-500 mb-2">Add items from the store to build your route.</p>
            <Button variant="outline" size="sm" className="border-purple-200 text-purple-700 hover:bg-purple-50" onClick={handleLoadDemo}>Load Demo Cart</Button>
          </div>
        ) : (
          <div className="divide-y divide-gray-100 pb-20">
            {items.map((item) => {
              const isCollected = collectedIds.has(item.id);
              return (
                <div 
                  key={item.id} 
                  className={cn("flex gap-3 p-4 bg-white transition-colors hover:bg-purple-50/50 cursor-pointer", isCollected && "opacity-60 bg-gray-50")}
                  onClick={() => {
                    setSelectedProduct(item);
                    setActiveTab('map');
                    if (isMobile) onClose();
                  }}
                >
                  <button 
                    className="flex-shrink-0 text-gray-300 hover:text-purple-600 transition-colors mt-1"
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleCollected(item.id);
                    }}
                  >
                    {isCollected ? <CheckCircle2 className="h-6 w-6 text-green-500" /> : <Circle className="h-6 w-6" />}
                  </button>
                  
                  <div className="flex-1 min-w-0 flex flex-col justify-center">
                    <p className={cn("text-sm font-semibold text-gray-900 leading-tight", isCollected && "line-through text-gray-500")}>{item.name}</p>
                    <div className="flex items-center gap-2 mt-1.5">
                      <span className="text-[10px] font-medium px-2 py-0.5 bg-gray-100 text-gray-600 rounded-sm">
                        {item.category}
                      </span>
                      <span className="text-[11px] text-gray-500 truncate">
                        {item.location.section} • {item.location.aisle}
                      </span>
                    </div>
                    <div className="mt-1 font-bold text-gray-900 text-sm">
                      ₹{item.price}
                    </div>
                  </div>
                  
                  <button 
                    className="text-gray-300 hover:text-red-500 p-2 self-start rounded-full hover:bg-red-50 transition-colors"
                    onClick={(e) => {
                      e.stopPropagation();
                      removeItem(item.id);
                    }}
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
