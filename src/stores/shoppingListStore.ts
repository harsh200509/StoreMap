import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Product } from '../types';

interface ShoppingListState {
  items: Product[];
  collectedIds: Set<string>;
  addItem: (product: Product) => void;
  removeItem: (id: string) => void;
  toggleCollected: (id: string) => void;
  clearList: () => void;
  setInitialDemoList: (products: Product[]) => void;
}

export const useShoppingListStore = create<ShoppingListState>()(
  persist(
    (set) => ({
      items: [],
      collectedIds: new Set<string>(),
      addItem: (product) => set((state) => {
        if (state.items.find((p) => p.id === product.id)) return state;
        return { items: [...state.items, product] };
      }),
      removeItem: (id) => set((state) => {
        const newCollected = new Set(state.collectedIds);
        newCollected.delete(id);
        return {
          items: state.items.filter((p) => p.id !== id),
          collectedIds: newCollected
        };
      }),
      toggleCollected: (id) => set((state) => {
        const newCollected = new Set(state.collectedIds);
        if (newCollected.has(id)) {
          newCollected.delete(id);
        } else {
          newCollected.add(id);
        }
        return { collectedIds: newCollected };
      }),
      clearList: () => set({ items: [], collectedIds: new Set() }),
      setInitialDemoList: (products) => set((state) => {
        if (state.items.length > 0) return state; // Don't overwrite if they already have items
        return { items: products, collectedIds: new Set() };
      }),
    }),
    {
      name: 'smartmap-shopping-list',
      partialize: (state) => ({
        items: state.items,
        collectedIds: Array.from(state.collectedIds),
      }),
      merge: (persistedState: any, currentState) => ({
        ...currentState,
        items: persistedState.items || [],
        collectedIds: new Set(persistedState.collectedIds || []),
      })
    }
  )
);
