import {
  client,
  type DeleteRequest,
  type GetRequest,
  type PostRequest,
} from '@/shared/api';
import { apiRoutes } from '@/shared/config/routes';
import type { CreateTagDto, TagDto, TagFilters, UpdateTagDto } from './types';

export const tagApi = {
  async getList({ query, ...config }: GetRequest<TagFilters>) {
    const res = await client.get<{ tags: TagDto[]; count: number }>(
      apiRoutes.tags.list(),
      { params: query, ...config },
    );

    return res.data;
  },

  async getById({ query, ...config }: GetRequest<number>) {
    const res = await client.get<TagDto>(apiRoutes.tags.detail(query), config);
    return res.data;
  },

  async create({ data, ...config }: PostRequest<CreateTagDto>) {
    const res = await client.post<TagDto>(apiRoutes.tags.list(), data, config);
    return res.data;
  },

  async update({ data, ...config }: PostRequest<UpdateTagDto>) {
    const res = await client.patch<TagDto>(
      apiRoutes.tags.detail(data.id),
      data,
      config,
    );
    return res.data;
  },

  async delete({ query, ...config }: DeleteRequest<number>) {
    await client.delete(apiRoutes.tags.detail(query), config);
  },
};
