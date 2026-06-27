import { create } from 'zustand';
import type { AuthUser } from '@/shared/api';

interface AuthState {
  user: AuthUser | null;
  accessToken: string | null;
}

interface AuthActions {
  setUser: (user: AuthUser) => void;
  setAccessToken: (token: string) => void;
  reset: () => void;
}

export const useAuth = create<AuthState & AuthActions>()(
  (set, _get, store) => ({
    user: null,
    accessToken: null,
    setUser: (user) => set({ user }),
    setAccessToken: (accessToken) => set({ accessToken }),
    reset: () => set(store.getInitialState()),
  }),
);
