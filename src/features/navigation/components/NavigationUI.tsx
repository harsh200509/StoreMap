import React, { useState, useEffect } from 'react';
import { useMapStore } from '../../../stores/mapStore';
import { Card, CardContent } from '../../../components/ui/card';
import { Button } from '../../../components/ui/button';
import { X, Navigation, CheckCircle, ChevronRight, ChevronLeft, ChevronDown, ChevronUp } from 'lucide-react';
import { useShoppingListStore } from '../../../stores/shoppingListStore';
import { CHECKOUT, ENTRANCE } from '../../../data/store';

export function NavigationUI() {
  const { 
    activeRoute, setActiveRoute, 
    currentStopIndex, setCurrentStopIndex,
    setUserLocation
  } = useMapStore();
  const { toggleCollected } = useShoppingListStore();
  const [isMinimized, setIsMinimized] = useState(false);

  // Simulated GPS: Move user location to the PREVIOUS stop when navigating, 
  // representing where they currently are walking from.
  useEffect(() => {
    if (activeRoute) {
      const previousStop = currentStopIndex > 0 ? activeRoute.stops[currentStopIndex - 1] : activeRoute.stops[0];
      let userX = ENTRANCE.x;
      let userY = ENTRANCE.y;
      if (previousStop.type === 'product' && previousStop.product) {
        userX = previousStop.product.location.x;
        userY = previousStop.product.location.y;
      } else if (previousStop.type === 'checkout') {
        userX = CHECKOUT.x;
        userY = CHECKOUT.y;
      }
      setUserLocation({ x: userX, y: userY });
    }
  }, [currentStopIndex, activeRoute, setUserLocation]);

  if (!activeRoute) return null;

  const totalStops = activeRoute.stops.length;
  const currentStop = activeRoute.stops[currentStopIndex];
  
  const handleNext = () => {
    if (currentStop.product) {
      toggleCollected(currentStop.product.id);
    }
    if (currentStopIndex < totalStops - 1) {
      setCurrentStopIndex(currentStopIndex + 1);
    }
  };

  const handlePrev = () => {
    if (currentStopIndex > 0) {
      setCurrentStopIndex(currentStopIndex - 1);
    }
  };

  const handleEnd = () => {
    setActiveRoute(null);
  };

  return (
    <Card className="absolute top-2 left-2 right-2 sm:left-1/2 sm:right-auto sm:-translate-x-1/2 sm:w-[340px] shadow-lg border-2 border-purple-500 z-50 overflow-hidden transition-all duration-300">
      <div 
        className="bg-purple-600 text-white px-3 py-2 flex items-center justify-between cursor-pointer select-none"
        onClick={() => setIsMinimized(!isMinimized)}
      >
        <div className="flex items-center gap-2">
          <Navigation className="h-4 w-4" />
          <span className="font-semibold text-sm">Shopping Route</span>
          {isMinimized && <span className="text-xs font-normal text-purple-200 ml-1">({currentStopIndex} of {totalStops - 1})</span>}
        </div>
        <div className="flex items-center gap-1">
          <button className="p-1 text-purple-100 hover:text-white transition-colors" title={isMinimized ? "Maximize" : "Minimize"}>
            {isMinimized ? <ChevronDown className="h-4 w-4" /> : <ChevronUp className="h-4 w-4" />}
          </button>
          <button 
            onClick={(e) => { e.stopPropagation(); handleEnd(); }} 
            className="p-1 text-purple-100 hover:text-red-300 transition-colors"
            title="End Route"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>
      
      {!isMinimized && (
        <CardContent className="p-0 bg-white/95 backdrop-blur-sm">
          <div className="p-3 flex flex-col gap-3">
            <div className="flex items-center justify-between text-xs text-gray-500 font-medium">
              <span>Stop {currentStopIndex} of {totalStops - 1}</span>
              <span>~{activeRoute.distance} m total</span>
            </div>
            
            <div className="flex items-start gap-3">
              <div className="mt-0.5 bg-purple-100 p-1.5 rounded-full text-purple-600 shrink-0">
                {currentStop.type === 'entrance' ? <Navigation className="h-4 w-4" /> :
                 currentStop.type === 'checkout' ? <CheckCircle className="h-4 w-4" /> :
                 <span className="flex h-4 w-4 items-center justify-center font-bold text-xs">{currentStopIndex}</span>}
              </div>
              
              <div className="flex-1 min-w-0">
                <h3 className="text-sm font-bold text-gray-900 leading-tight truncate">
                  {currentStop.type === 'entrance' ? 'Start at Entrance' :
                   currentStop.type === 'checkout' ? 'Head to Checkout' :
                   currentStop.product?.name}
                </h3>
                
                {currentStop.type === 'product' && currentStop.product && (
                  <div className="mt-0.5 text-xs text-gray-600">
                    <span className="font-semibold text-purple-700">{currentStop.product.location.aisle}</span>
                    <span className="mx-1.5 text-gray-400">•</span>
                    <span>Rack {currentStop.product.location.rack}</span>
                  </div>
                )}
              </div>
            </div>
            
            <div className="flex gap-2 mt-1">
              <Button variant="outline" className="flex-1 h-8 text-xs font-semibold px-2" onClick={handlePrev} disabled={currentStopIndex === 0}>
                <ChevronLeft className="h-3 w-3 mr-1" /> Prev
              </Button>
              
              {currentStopIndex === totalStops - 1 ? (
                <Button className="flex-[2] bg-green-600 hover:bg-green-700 text-white h-8 text-xs font-semibold" onClick={handleEnd}>
                  Finish <CheckCircle className="h-3 w-3 ml-1" />
                </Button>
              ) : (
                <Button className="flex-[2] bg-purple-600 hover:bg-purple-700 text-white h-8 text-xs font-semibold" onClick={handleNext}>
                  {currentStopIndex === 0 ? "Start Route" : "Next"} <ChevronRight className="h-3 w-3 ml-1" />
                </Button>
              )}
            </div>
          </div>
        </CardContent>
      )}
    </Card>
  );
}
