import { create } from 'zustand';
import { Product, RouteResult } from '../types';

interface MapState {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  
  selectedProduct: Product | null;
  setSelectedProduct: (product: Product | null) => void;
  
  showAllOnMap: boolean;
  setShowAllOnMap: (show: boolean) => void;
  
  activeRoute: RouteResult | null;
  setActiveRoute: (route: RouteResult | null) => void;
  
  currentStopIndex: number;
  setCurrentStopIndex: (index: number) => void;

  userLocation: { x: number, y: number } | null;
  setUserLocation: (loc: { x: number, y: number } | null) => void;
  
  isNavigatingToNext: boolean;
  setIsNavigatingToNext: (isNavigating: boolean) => void;
}

export const useMapStore = create<MapState>((set) => ({
  searchQuery: '',
  setSearchQuery: (query) => set({ searchQuery: query }),
  
  selectedProduct: null,
  setSelectedProduct: (product) => set({ selectedProduct: product, showAllOnMap: false }),
  
  showAllOnMap: false,
  setShowAllOnMap: (show) => set({ showAllOnMap: show, selectedProduct: null }),
  
  activeRoute: null,
  setActiveRoute: (route) => set({ 
    activeRoute: route, 
    currentStopIndex: route && route.stops.length > 1 ? 1 : 0,
    userLocation: route ? { x: route.path[0].x, y: route.path[0].y } : null,
    isNavigatingToNext: false
  }),
  
  currentStopIndex: 0,
  setCurrentStopIndex: (index) => set({ currentStopIndex: index }),

  userLocation: null,
  setUserLocation: (loc) => set({ userLocation: loc }),

  isNavigatingToNext: false,
  setIsNavigatingToNext: (navigating) => set({ isNavigatingToNext: navigating }),
}));

