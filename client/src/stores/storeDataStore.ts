import { create } from 'zustand';
import { API_BASE_URL } from '../lib/api';

interface MapSection {
  id: string;
  name: string;
  x: number;
  y: number;
  width: number;
  height: number;
  color: string;
}

interface MapRack {
  id: string;
  name: string;
  sectionId: string;
  x: number;
  y: number;
  width: number;
  height: number;
  divisions: number;
  orientation: string;
}

interface StoreData {
  sections: MapSection[];
  racks: MapRack[];
  entrance: { x: number; y: number };
  checkout: { x: number; y: number };
  loading: boolean;
  error: string | null;
  fetchData: () => Promise<void>;
}

export const useStoreData = create<StoreData>((set) => ({
  sections: [],
  racks: [],
  entrance: { x: 100, y: 760 },
  checkout: { x: 800, y: 700 },
  loading: true,
  error: null,
  fetchData: async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/map`);
      if (!res.ok) throw new Error('Failed to fetch map data');
      const data = await res.json();
      set({
        sections: data.sections || [],
        racks: data.racks || [],
        entrance: data.config?.entrance || { x: 100, y: 760 },
        checkout: data.config?.checkout || { x: 800, y: 700 },
        loading: false,
      });
    } catch (err: any) {
      set({ error: err.message, loading: false });
    }
  },
}));
