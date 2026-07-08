import { client, type GetRequest } from '@/shared/api';
import { routesAPI } from '@/shared/config/routes';
import type { User } from '../model/types';

export const userApi = {
  async me({ signal }: GetRequest = {}) {
    const config = signal ? { signal } : undefined;
    const { data } = await client.get<User>(routesAPI.users.me(), config);
    return data;
  },
};
