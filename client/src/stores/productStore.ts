import { create } from 'zustand';
import { API_BASE_URL } from '../lib/api';
import { Product } from '../types';

const PAGE_SIZE = 20;

interface ProductStore {
  products: Product[];
  displayCount: number;
  loading: boolean;
  loadingMore: boolean;
  error: string | null;
  hasFetched: boolean;
  fetchProducts: () => Promise<void>;
  loadMore: () => void;
}

export const useProductStore = create<ProductStore>((set, get) => ({
  products: [],
  displayCount: PAGE_SIZE,
  loading: false,
  loadingMore: false,
  error: null,
  hasFetched: false,

  fetchProducts: async () => {
    // Cache: don't re-fetch if we already have products
    if (get().hasFetched) return;

    set({ loading: true });
    try {
      const res = await fetch(`${API_BASE_URL}/products`);
      if (!res.ok) throw new Error('Failed to fetch products');
      const data = await res.json();
      const mapped = data.map((p: any): Product => ({
        ...p,
        location: {
          x: p.locationX || 0,
          y: p.locationY || 0,
          section: p.sectionName || '',
          aisle: p.aisle || '',
          rack: p.rackId || '',
          shelf: p.rackDivision ? `Slot ${p.rackDivision}` : '',
          floor: p.floor || 1,
        },
      }));
      set({ products: mapped, loading: false, hasFetched: true });
    } catch (err: any) {
      set({ error: err.message, loading: false });
    }
  },

  loadMore: () => {
    const { displayCount, products, loadingMore } = get();
    if (loadingMore || displayCount >= products.length) return;
    set({ loadingMore: true });
    // Simulate small async delay so the skeleton briefly shows
    setTimeout(() => {
      set((s) => ({
        displayCount: Math.min(s.displayCount + PAGE_SIZE, s.products.length),
        loadingMore: false,
      }));
    }, 300);
  },
}));
