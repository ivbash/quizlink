/* eslint-disable @typescript-eslint/require-await */
import type { FastifyPluginAsync } from 'fastify';
import { di } from '@/config/di';
import { verifyRole } from '@/hooks/auth';
import { TagController } from './tag.controller';
import {
  CreateTagSchema,
  TagParamsSchema,
  TagQuerySchema,
  UpdateTagSchema,
} from './tag.schema';

export const tagRoutes: FastifyPluginAsync = async (app) => {
  const controller = di.resolve<TagController>(TagController);

  app.register(verifiedAdminRoutes);

  app.get(
    '/',
    { schema: { querystring: TagQuerySchema } },
    controller.getMany.bind(controller),
  );

  app.get(
    '/:id',
    { schema: { params: TagParamsSchema } },
    controller.getOne.bind(controller),
  );
};

const verifiedAdminRoutes: FastifyPluginAsync = async (app) => {
  const controller = di.resolve<TagController>(TagController);

  app.addHook('onRequest', verifyRole('admin'));

  app.post(
    '/',
    { schema: { body: CreateTagSchema } },
    controller.create.bind(controller),
  );

  app.patch(
    '/:id',
    { schema: { params: TagParamsSchema, body: UpdateTagSchema } },
    controller.update.bind(controller),
  );

  app.delete(
    '/:id',
    { schema: { params: TagParamsSchema } },
    controller.delete.bind(controller),
  );
};
