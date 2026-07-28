import {
  client,
  type DeleteRequest,
  type GetRequest,
  type PostRequest,
} from '@/shared/api';
import { apiRoutes } from '@/shared/config/routes';
import type {
  CreateUserDto,
  UpdateUserDto,
  UserDto,
  UserFilters,
} from './types';

export const userApi = {
  async me(config: GetRequest = {}) {
    const { data } = await client.get<UserDto>(apiRoutes.users.me(), config);
    return data;
  },

  async getList({ query, ...config }: GetRequest<UserFilters>) {
    const res = await client.get<{ users: UserDto[]; count: number }>(
      apiRoutes.users.list(),
      { params: query, ...config },
    );

    return res.data;
  },

  async getById({ query, ...config }: GetRequest<string>) {
    const res = await client.get<UserDto>(
      apiRoutes.users.detail(query),
      config,
    );
    return res.data;
  },

  async create({ data, ...config }: PostRequest<CreateUserDto>) {
    const res = await client.post<UserDto>(
      apiRoutes.users.list(),
      data,
      config,
    );
    return res.data;
  },

  async update({ data, ...config }: PostRequest<UpdateUserDto>) {
    const res = await client.patch<UserDto>(
      apiRoutes.users.detail(data.id),
      data,
      config,
    );
    return res.data;
  },

  async delete({ query, ...config }: DeleteRequest<string>) {
    await client.delete(apiRoutes.users.detail(query), config);
  },
};
