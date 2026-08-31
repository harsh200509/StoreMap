import React from 'react';
import { useShoppingListStore } from '../../../stores/shoppingListStore';
import { useMapStore } from '../../../stores/mapStore';
import { Card, CardHeader, CardTitle, CardContent } from '../../../components/ui/card';
import { Button } from '../../../components/ui/button';
import { products } from '../../../data/products';
import { navGraph } from '../../../data/navigationGraph';
import { buildRoute } from '../../navigation/buildRoute';
import { Trash2, CheckCircle2, Circle, Map as MapIcon, Route } from 'lucide-react';
import { cn } from '../../../lib/utils';

export function ShoppingList({ onClose, hideActionsOnMobile }: { onClose?: () => void, hideActionsOnMobile?: boolean }) {
  const { items, collectedIds, toggleCollected, removeItem, clearList, setInitialDemoList } = useShoppingListStore();
  const { setShowAllOnMap, setActiveRoute, setSelectedProduct } = useMapStore();

  const handleLoadDemo = () => {
    const demoSkus = ['GRO-001', 'SNA-001', 'CLN-001', 'DAI-001', 'PER-001', 'GRO-002', 'GRO-003', 'SNA-002'];
    const demoItems = products.filter(p => demoSkus.includes(p.sku));
    setInitialDemoList(demoItems);
  };

  const handleFindAll = () => {
    setShowAllOnMap(true);
    if (onClose) onClose();
  };

  const handleStartRoute = () => {
    const uncollected = items.filter(i => !collectedIds.has(i.id));
    if (uncollected.length === 0) return;
    
    const route = buildRoute(uncollected, navGraph);
    if (route) {
      setActiveRoute(route);
      setShowAllOnMap(true); // Keep showing all on map so we see the pins too
      if (onClose) onClose();
    }
  };

  return (
    <Card className="flex flex-col h-full border-0 sm:border rounded-none sm:rounded-xl shadow-none sm:shadow-sm bg-gray-50/50 sm:bg-white">
      <CardHeader className="pb-3 border-b border-gray-100 flex flex-row items-center justify-between">
        <div>
          <CardTitle className="text-lg">Shopping List</CardTitle>
          <p className="text-xs text-gray-500 mt-1">{items.length} items</p>
        </div>
        {items.length > 0 && (
          <Button variant="ghost" size="sm" onClick={clearList} className="text-red-500 hover:text-red-600 hover:bg-red-50">
            Clear
          </Button>
        )}
      </CardHeader>
      
      <CardContent className="flex-1 overflow-y-auto p-0">
        {items.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-48 text-gray-500 gap-3 px-6 text-center">
            <p className="text-sm">Your list is empty.</p>
            <Button variant="outline" size="sm" onClick={handleLoadDemo}>Load Demo List</Button>
          </div>
        ) : (
          <div className="divide-y divide-gray-100">
            {items.map((item) => {
              const isCollected = collectedIds.has(item.id);
              return (
                <div 
                  key={item.id} 
                  className={cn("flex items-center gap-3 p-4 transition-colors hover:bg-gray-50 cursor-pointer", isCollected && "opacity-60 bg-gray-50/50")}
                  onClick={() => {
                    setSelectedProduct(item);
                    if (onClose) onClose();
                  }}
                >
                  <button 
                    className="flex-shrink-0 text-gray-400 hover:text-green-600 transition-colors"
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleCollected(item.id);
                    }}
                  >
                    {isCollected ? <CheckCircle2 className="h-5 w-5 text-green-500" /> : <Circle className="h-5 w-5" />}
                  </button>
                  
                  <div className="flex-1 min-w-0">
                    <p className={cn("text-sm font-medium truncate", isCollected && "line-through text-gray-500")}>{item.name}</p>
                    <p className="text-xs text-gray-500">{item.location.section} • {item.location.aisle}</p>
                  </div>
                  
                  <button 
                    className="text-gray-300 hover:text-red-500 p-1"
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
      </CardContent>
      
      {items.length > 0 && (
        <div className={cn("p-4 bg-white border-t border-gray-100 flex-col gap-2 rounded-b-xl flex", hideActionsOnMobile ? "hidden sm:flex" : "")}>
          <Button variant="outline" className="w-full gap-2" onClick={handleFindAll}>
            <MapIcon className="h-4 w-4" /> Find All on Map
          </Button>
          <Button className="w-full gap-2 bg-blue-600 hover:bg-blue-700 text-white" onClick={handleStartRoute}>
            <Route className="h-4 w-4" /> Start Route
          </Button>
        </div>
      )}
    </Card>
  );
}
