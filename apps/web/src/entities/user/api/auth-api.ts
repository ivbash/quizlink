import { client, type PostRequest } from '@/shared/api';
import { routesAPI } from '@/shared/config/routes';
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
      routesAPI.auth.signUp(),
      data,
      config,
    );
    return res.data;
  },

  async signIn({ data, signal }: PostRequest<SignInRequest> = {}) {
    const config = signal ? { signal } : undefined;
    const res = await client.post<SignInResponse>(
      routesAPI.auth.signIn(),
      data,
      config,
    );
    return res.data;
  },

  async signOut({ data, signal }: PostRequest = {}) {
    const config = signal ? { signal } : undefined;
    await client.post(routesAPI.auth.signOut(), data, config);
  },
};
