import { create } from 'zustand';
import { API_BASE_URL } from '../lib/api';
import { Product } from '../types';

interface ProductStore {
  products: Product[];
  loading: boolean;
  error: string | null;
  fetchProducts: () => Promise<void>;
}

export const useProductStore = create<ProductStore>((set) => ({
  products: [],
  loading: true,
  error: null,
  fetchProducts: async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/products`);
      if (!res.ok) throw new Error('Failed to fetch products');
      const data = await res.json();
      const mapped = data.map((p: any) => ({
        ...p,
        location: {
          x: p.locationX || 0,
          y: p.locationY || 0,
          section: p.sectionName || '',
          aisle: p.aisle || '',
          rack: p.rackId || '',
          shelf: p.rackDivision ? `Slot ${p.rackDivision}` : '',
          floor: p.floor || 1
        }
      }));
      set({ products: mapped, loading: false });
    } catch (err: any) {
      set({ error: err.message, loading: false });
    }
  },
}));
