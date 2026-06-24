/* eslint-disable @typescript-eslint/require-await */
import type { FastifyPluginAsync } from 'fastify';
import { di } from '@/config/di';
import { UserController } from './user.controller';
import {
  CreateUserSchema,
  UpdateUserSchema,
  UserParamsSchema,
} from './user.schema';

export const userRoutes: FastifyPluginAsync = async (app) => {
  const controller = di.resolve<UserController>(UserController);

  app.get('/', controller.getMany.bind(controller));

  app.get(
    '/:id',
    { schema: { params: UserParamsSchema } },
    controller.getOne.bind(controller),
  );

  app.post(
    '/',
    { schema: { body: CreateUserSchema } },
    controller.create.bind(controller),
  );

  app.patch(
    '/:id',
    { schema: { params: UserParamsSchema, body: UpdateUserSchema } },
    controller.update.bind(controller),
  );

  app.delete(
    '/:id',
    { schema: { params: UserParamsSchema } },
    controller.delete.bind(controller),
  );
};
