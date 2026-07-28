import { client, type PostRequest } from '@/shared/api';
import { apiRoutes } from '@/shared/config/routes';
import type { AuthDto, SignInDto, SignUpDto } from './types';

export const authApi = {
  async signUp({ data, ...config }: PostRequest<SignUpDto>) {
    const res = await client.post<AuthDto>(
      apiRoutes.auth.signUp(),
      data,
      config,
    );
    return res.data;
  },

  async signIn({ data, ...config }: PostRequest<SignInDto>) {
    const res = await client.post<AuthDto>(
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
