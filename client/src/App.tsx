import React, { useState } from 'react';
import { ProductSearch } from './features/products/components/ProductSearch';
import { ShoppingList } from './features/shopping-list/components/ShoppingList';
import { StoreMap } from './features/store-map/components/StoreMap';
import { ProductDetail } from './features/products/components/ProductDetail';
import { Storefront } from './features/products/components/Storefront';
import { MapPin, ShoppingBag, Map as MapIcon, Grid, Route } from 'lucide-react';
import { useShoppingListStore } from './stores/shoppingListStore';
import { useMapStore } from './stores/mapStore';
import { buildRoute } from './features/navigation/buildRoute';
import { navGraph } from './data/navigationGraph';

export default function App() {
  const { items, collectedIds } = useShoppingListStore();
  const { activeTab, setActiveTab, activeRoute, setActiveRoute, setShowAllOnMap } = useMapStore();
  const [isCartOpen, setIsCartOpen] = useState(false);
  
  const uncollectedCount = items.filter(i => !collectedIds.has(i.id)).length;
  const showFloatingStart = uncollectedCount > 0 && (activeTab === 'items' || !activeRoute);

  const handleStartRoute = () => {
    const uncollected = items.filter(i => !collectedIds.has(i.id));
    if (uncollected.length === 0) return;
    const route = buildRoute(uncollected, navGraph);
    if (route) {
      setActiveRoute(route);
      setShowAllOnMap(true);
      setActiveTab('map');
    }
  };

  return (
    <div className="flex h-[100dvh] bg-gray-50 flex-col overflow-hidden font-sans text-gray-900">
      {/* Header */}
      <header className="flex-none bg-white border-b border-gray-200 px-4 py-3 sm:px-6 z-20 flex items-center justify-between shadow-sm relative shrink-0">
        <div className="flex items-center gap-2">
          <div className="bg-purple-600 p-1.5 rounded-lg">
            <MapPin className="h-5 w-5 text-white" />
          </div>
          <h1 className="text-xl font-bold tracking-tight text-gray-900">SmartMap</h1>
        </div>
        
        <div className="hidden sm:block flex-1 max-w-xl mx-8">
          <ProductSearch />
        </div>
        
        <div className="flex items-center gap-4">
          <div className="hidden sm:flex items-center gap-2 text-sm font-medium text-gray-600">
            <span className="px-3 py-1 bg-gray-100 rounded-full">DMart Demo Store</span>
            <span className="px-3 py-1 bg-gray-100 rounded-full">Floor 1</span>
          </div>
          
          <button 
            onClick={() => setIsCartOpen(true)}
            className="relative p-2 text-gray-600 hover:text-purple-600 hover:bg-purple-50 rounded-full transition-colors"
          >
            <ShoppingBag className="h-6 w-6" />
            {items.length > 0 && (
              <span className="absolute top-1 right-1 bg-red-500 text-white text-[10px] font-bold h-4 w-4 rounded-full flex items-center justify-center border-2 border-white">
                {items.length}
              </span>
            )}
          </button>
        </div>
      </header>

      {/* Mobile Search - Visible only on items tab on small screens */}
      {activeTab === 'items' && (
        <div className="sm:hidden p-3 bg-white border-b border-gray-200 z-10 shadow-sm relative shrink-0">
          <ProductSearch />
        </div>
      )}

      {/* Main Content Area */}
      <main className="flex-1 flex overflow-hidden relative pb-[60px] sm:pb-0">
        {/* Map or Items Area */}
        <div className="flex-1 relative overflow-hidden bg-gray-50 flex-col w-full h-full">
          {activeTab === 'items' ? (
            <Storefront />
          ) : (
            <>
              <StoreMap />
              <ProductDetail />
            </>
          )}
        </div>

        {/* Global Floating Start Route Button */}
        {showFloatingStart && (
          <div className="absolute bottom-[80px] sm:bottom-8 left-0 right-0 px-4 flex justify-center z-30 pointer-events-none animate-in slide-in-from-bottom-4">
            <button
              onClick={handleStartRoute}
              className="pointer-events-auto flex items-center justify-center gap-2 bg-purple-600 hover:bg-purple-700 text-white shadow-[0_8px_16px_rgba(147,51,234,0.3)] rounded-full px-6 py-3.5 font-bold text-sm transition-transform active:scale-95"
            >
              <Route className="h-5 w-5" />
              {activeRoute ? 'Update Route' : 'Start Route'} ({uncollectedCount})
            </button>
          </div>
        )}

        {/* Desktop Cart Sidebar */}
        <div className="hidden lg:flex w-80 flex-col border-l border-gray-200 bg-white z-10 h-full overflow-hidden shadow-[-4px_0_24px_rgba(0,0,0,0.02)]">
          <ShoppingList onClose={() => setIsCartOpen(false)} />
        </div>

        {/* Mobile Cart Slide-over */}
        <div 
          className={`lg:hidden fixed inset-y-0 right-0 z-50 w-[85%] max-w-sm bg-white shadow-2xl transform transition-transform duration-300 ease-in-out ${isCartOpen ? 'translate-x-0' : 'translate-x-full'} flex flex-col`}
        >
          <ShoppingList onClose={() => setIsCartOpen(false)} isMobile />
        </div>
        
        {/* Slide-over Overlay */}
        {isCartOpen && (
          <div 
            className="lg:hidden fixed inset-0 bg-black/40 backdrop-blur-sm z-40 transition-opacity" 
            onClick={() => setIsCartOpen(false)} 
          />
        )}
      </main>

      {/* Mobile Bottom Navigation */}
      <nav className="sm:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 flex items-center justify-around z-50 h-[60px] pb-safe shadow-[0_-4px_16px_rgba(0,0,0,0.02)]">
        <button 
          onClick={() => setActiveTab('items')}
          className={`flex flex-col items-center justify-center w-full h-full ${activeTab === 'items' ? 'text-purple-600' : 'text-gray-500 hover:text-gray-900'}`}
        >
          <Grid className="h-6 w-6 mb-0.5" />
          <span className="text-[11px] font-medium leading-none">All Items</span>
        </button>
        <button 
          onClick={() => setActiveTab('map')}
          className={`flex flex-col items-center justify-center w-full h-full ${activeTab === 'map' ? 'text-purple-600' : 'text-gray-500 hover:text-gray-900'}`}
        >
          <div className="relative">
            <MapIcon className="h-6 w-6 mb-0.5" />
            {uncollectedCount > 0 && activeTab === 'items' && (
              <span className="absolute -top-1 -right-1 bg-purple-600 w-2.5 h-2.5 rounded-full border border-white"></span>
            )}
          </div>
          <span className="text-[11px] font-medium leading-none">Store Map</span>
        </button>
      </nav>
    </div>
  );
}
