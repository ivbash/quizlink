import { client, type PostRequest } from '@/shared/api';
import { apiRoutes } from '@/shared/config/routes';
import type {
  SignInRequest,
  SignInResponse,
  SignUpRequest,
  SignUpResponse,
} from '../model/types';

export const authApi = {
  async signUp({ data, ...config }: PostRequest<SignUpRequest>) {
    const res = await client.post<SignUpResponse>(
      apiRoutes.auth.signUp(),
      data,
      config,
    );
    return res.data;
  },

  async signIn({ data, ...config }: PostRequest<SignInRequest>) {
    const res = await client.post<SignInResponse>(
      apiRoutes.auth.signIn(),
      data,
      config,
    );
    return res.data;
  },

  async signOut({ data, ...config }: PostRequest = {}) {
    await client.post(apiRoutes.auth.signOut(), data, config);
  },
};
