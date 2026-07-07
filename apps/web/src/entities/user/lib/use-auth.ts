import { use } from 'react';
import { useStore } from 'zustand';
import { AuthContext } from '../model/auth-context';
import type { AuthActions, AuthState } from '../model/auth-store';

export function useAuth<T>(selector: (state: AuthState & AuthActions) => T): T {
  const store = use(AuthContext);

  if (!store) {
    throw new Error('useAuth must be used within a AuthProvider');
  }

  return useStore(store, selector);
}
