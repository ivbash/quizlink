import { client, type GetRequest } from '@/shared/api';
import { apiRoutes } from '@/shared/config/routes';
import type { User } from '../model/types';

export const userApi = {
  async me(config: GetRequest = {}) {
    const { data } = await client.get<User>(apiRoutes.users.me(), config);
    return data;
  },
};
