import { createStore } from 'zustand';
import { setAccessToken } from '@/shared/api';
import { authApi } from '../api/auth-api';
import type { SignInDto, SignUpDto } from '../api/types';
import { userApi } from '../api/user-api';
import { mapUserDto } from '../lib/map-user-dto';
import type { User } from './types';

export interface AuthState {
  user: User | null;
  isInitial: boolean;
}

export interface AuthActions {
  signUp: (registerData: SignUpDto) => Promise<void>;
  signIn: (credentials: SignInDto) => Promise<void>;
  signOut: () => Promise<void>;
  fetchCurrentUser: () => Promise<void>;
  setInitial: (isInitial: boolean) => void;
}

export type AuthStore = ReturnType<typeof createAuthStore>;

export function createAuthStore(props: Partial<AuthState> = {}) {
  const defaultProps: AuthState = {
    user: null,
    isInitial: true,
  };

  return createStore<AuthState & AuthActions>()((set) => ({
    ...defaultProps,
    ...props,

    async signUp(registerData) {
      const { accessToken, user } = await authApi.signUp({
        data: registerData,
      });
      setAccessToken(accessToken);
      set({ user: mapUserDto(user) });
    },

    async signIn(credentials) {
      const { accessToken, user } = await authApi.signIn({ data: credentials });
      setAccessToken(accessToken);
      set({ user: mapUserDto(user) });
    },

    async signOut() {
      await authApi.signOut();
      setAccessToken(null);
      set({ user: null });
    },

    async fetchCurrentUser() {
      try {
        const user = await userApi.me();
        set({ user: mapUserDto(user) });
      } catch {
        set({ user: null });
      }
    },

    setInitial: (isInitial: boolean) => set({ isInitial }),
  }));
}
