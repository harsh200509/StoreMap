import React, { useState } from 'react';
import { ProductSearch } from './features/products/components/ProductSearch';
import { ShoppingList } from './features/shopping-list/components/ShoppingList';
import { StoreMap } from './features/store-map/components/StoreMap';
import { NavigationUI } from './features/navigation/components/NavigationUI';
import { ProductDetail } from './features/products/components/ProductDetail';
import { MapPin, ShoppingBag, X, Route, Map as MapIcon } from 'lucide-react';
import { useShoppingListStore } from './stores/shoppingListStore';
import { useMapStore } from './stores/mapStore';
import { Button } from './components/ui/button';
import { buildRoute } from './features/navigation/buildRoute';
import { navGraph } from './data/navigationGraph';

export default function App() {
  const [isMobileListOpen, setIsMobileListOpen] = useState(false);
  const { items, collectedIds } = useShoppingListStore();
  const { activeRoute, setActiveRoute, setShowAllOnMap } = useMapStore();
  const uncollectedCount = items.length;

  const handleStartRoute = () => {
    const uncollected = items.filter(i => !collectedIds.has(i.id));
    if (uncollected.length === 0) return;
    
    const route = buildRoute(uncollected, navGraph);
    if (route) {
      setActiveRoute(route);
      setShowAllOnMap(true);
      setIsMobileListOpen(false);
    }
  };

  return (
    <div className="flex h-screen bg-gray-50 flex-col overflow-hidden font-sans text-gray-900">
      {/* Header */}
      <header className="flex-none bg-white border-b border-gray-200 px-4 py-3 sm:px-6 z-20 flex items-center justify-between shadow-sm relative">
        <div className="flex items-center gap-2">
          <div className="bg-blue-600 p-1.5 rounded-lg">
            <MapPin className="h-5 w-5 text-white" />
          </div>
          <h1 className="text-xl font-bold tracking-tight text-gray-900">SmartMap</h1>
        </div>
        
        <div className="hidden sm:block flex-1 max-w-xl mx-8">
          <ProductSearch />
        </div>
        
        <div className="flex items-center gap-4 text-sm font-medium text-gray-600">
          <span className="hidden sm:inline-block px-3 py-1 bg-gray-100 rounded-full">DMart Demo Store</span>
          <span className="px-3 py-1 bg-gray-100 rounded-full hidden sm:inline-block">Floor 1</span>
          
          {/* Mobile Shopping List Toggle */}
          <button 
            className="sm:hidden relative p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-full transition-colors"
            onClick={() => setIsMobileListOpen(!isMobileListOpen)}
          >
            <ShoppingBag className="h-6 w-6" />
            {uncollectedCount > 0 && (
              <span className="absolute top-1 right-1 bg-red-500 text-white text-[10px] font-bold h-4 w-4 rounded-full flex items-center justify-center border-2 border-white">
                {uncollectedCount}
              </span>
            )}
          </button>
        </div>
      </header>

      {/* Mobile Search - Visible only on small screens */}
      <div className="sm:hidden p-3 bg-white border-b border-gray-200 z-10 shadow-sm relative">
        <ProductSearch />
      </div>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col sm:flex-row overflow-hidden relative">
        {/* Left Sidebar (Desktop) */}
        <div className="hidden sm:flex w-80 lg:w-96 flex-col border-r border-gray-200 bg-white z-10 shadow-[4px_0_24px_rgba(0,0,0,0.02)]">
          <ShoppingList onClose={() => setIsMobileListOpen(false)} />
        </div>
        
        {/* Mobile Slide-over Sidebar */}
        <div 
          className={`sm:hidden fixed inset-y-0 right-0 z-50 w-[85%] max-w-sm bg-white shadow-2xl transform transition-transform duration-300 ease-in-out ${isMobileListOpen ? 'translate-x-0' : 'translate-x-full'} flex flex-col`}
        >
          <div className="flex items-center justify-between p-4 border-b border-gray-100">
            <h2 className="font-bold text-lg">My Shopping List</h2>
            <button 
              onClick={() => setIsMobileListOpen(false)}
              className="p-2 text-gray-400 hover:text-gray-800 rounded-full hover:bg-gray-100"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
          <div className="flex-1 overflow-hidden">
            <ShoppingList onClose={() => setIsMobileListOpen(false)} hideActionsOnMobile />
          </div>
        </div>

        {/* Mobile Sidebar Overlay */}
        {isMobileListOpen && (
          <div 
            className="sm:hidden fixed inset-0 bg-black/20 backdrop-blur-sm z-40 transition-opacity" 
            onClick={() => setIsMobileListOpen(false)}
          />
        )}
        
        {/* Map Area */}
        <div className="flex-1 relative overflow-hidden bg-gray-100 flex flex-col w-full">
          <StoreMap />
          <NavigationUI />
          <ProductDetail />
          
          {/* Mobile Floating Action Bar */}
          {!activeRoute && items.length > 0 && (
            <div className="sm:hidden absolute bottom-4 left-4 right-4 flex gap-2 z-30">
              <Button 
                variant="outline" 
                className="flex-1 bg-white shadow-lg h-12 border-2 border-gray-200" 
                onClick={() => { setShowAllOnMap(true); setIsMobileListOpen(false); }}
              >
                <MapIcon className="h-4 w-4 mr-2" /> Find All
              </Button>
              <Button 
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-200 h-12" 
                onClick={handleStartRoute}
              >
                <Route className="h-4 w-4 mr-2" /> Start Route
              </Button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
