import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { AuthState, UserRole } from '../types/auth';

interface AuthStore extends AuthState {
  setAuth: (token: string, role: UserRole) => void;
  clearAuth: () => void;
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      token: null,
      role: null,
      isAuthenticated: false,
      setAuth: (token, role) => set({ token, role, isAuthenticated: true }),
      clearAuth: () => set({ token: null, role: null, isAuthenticated: false }),
    }),
    {
      name: 'auth-storage',
    }
  )
);
