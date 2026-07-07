import { client, type GetRequest } from '@/shared/api';
import type { User } from '../model/types';

export const userApi = {
  async me({ signal }: GetRequest = {}) {
    const config = signal ? { signal } : undefined;
    const { data } = await client.get<User>('/api/users/me', config);
    return data;
  },
};
