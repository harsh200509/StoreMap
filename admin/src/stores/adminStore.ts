import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface Admin {
  id: number;
  username: string;
}

interface AdminStore {
  admin: Admin | null;
  token: string | null;
  setAdmin: (admin: Admin | null, token?: string) => void;
  logout: () => void;
}

export const useAdminStore = create<AdminStore>()(
  persist(
    (set) => ({
      admin: null,
      token: null,
      setAdmin: (admin, token) => set({ admin, token: token || null }),
      logout: () => set({ admin: null, token: null }),
    }),
    { name: 'storemap-admin-auth' }
  )
);
