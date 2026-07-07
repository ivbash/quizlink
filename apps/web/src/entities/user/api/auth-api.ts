import { client, type PostRequest } from '@/shared/api';
import type {
  SignInRequest,
  SignInResponse,
  SignUpRequest,
  SignUpResponse,
} from '../model/types';

export const authApi = {
  async signUp({ data, signal }: PostRequest<SignUpRequest> = {}) {
    const config = signal ? { signal } : undefined;
    const res = await client.post<SignUpResponse>(
      '/api/auth/sign-up',
      data,
      config,
    );
    return res.data;
  },

  async signIn({ data, signal }: PostRequest<SignInRequest> = {}) {
    const config = signal ? { signal } : undefined;
    const res = await client.post<SignInResponse>(
      '/api/auth/sign-in',
      data,
      config,
    );
    return res.data;
  },

  async signOut({ data, signal }: PostRequest = {}) {
    const config = signal ? { signal } : undefined;
    await client.post('/api/auth/sign-out', data, config);
  },
};
