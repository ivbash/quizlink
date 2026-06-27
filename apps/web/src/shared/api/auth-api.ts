import { client } from './client';
import type { AuthResponse, SignInRequest, SignUpRequest } from './types';

export const authApi = {
  async signUp(data: SignUpRequest) {
    const res = await client.post<AuthResponse>('/api/auth/sign-up', data);
    return res.data;
  },

  async signIn(data: SignInRequest) {
    const res = await client.post<AuthResponse>('/api/auth/sign-in', data);
    return res.data;
  },

  async signOut() {
    await client.post<AuthResponse>('/api/auth/sign-out');
  },

  async refresh() {
    const res = await client.post<AuthResponse>('/api/auth/refresh');
    return res.data;
  },
};
