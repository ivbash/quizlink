import {
  client,
  type DeleteRequest,
  type GetRequest,
  type PatchRequest,
  type PostRequest,
} from '@/shared/api';
import { apiRoutes } from '@/shared/config/routes';
import type {
  CreateQuizDto,
  QuizDto,
  QuizFilters,
  QuizListDto,
  UpdateQuizDto,
} from './types';

export const quizApi = {
  async getList({ query, ...config }: GetRequest<QuizFilters>) {
    const res = await client.get<{ quizzes: QuizListDto[]; count: number }>(
      apiRoutes.quizzes.list(),
      { params: query, ...config },
    );

    return res.data;
  },

  async getById({ query, ...config }: GetRequest<string>) {
    const res = await client.get<QuizDto>(
      apiRoutes.quizzes.detail(query),
      config,
    );
    return res.data;
  },

  async create({ data, ...config }: PostRequest<CreateQuizDto>) {
    const res = await client.post<QuizDto>(
      apiRoutes.quizzes.list(),
      data,
      config,
    );
    return res.data;
  },

  async update({ data, ...config }: PatchRequest<UpdateQuizDto>) {
    const res = await client.patch<QuizDto>(
      apiRoutes.quizzes.detail(data.id),
      data,
      config,
    );
    return res.data;
  },

  async delete({ query, ...config }: DeleteRequest<string>) {
    await client.delete(apiRoutes.quizzes.detail(query), config);
  },
};
