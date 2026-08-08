/* eslint-disable @typescript-eslint/require-await */
import type { FastifyPluginAsync } from 'fastify';
import { di } from '@/config/di';
import { verifyAuth } from '@/hooks/auth';
import { QuizController } from './quiz.controller';
import {
  CreateQuizSchema,
  QuizParamsSchema,
  QuizQuerySchema,
  UpdateQuizSchema,
} from './quiz.schema';

export const quizRoutes: FastifyPluginAsync = async (app) => {
  const controller = di.resolve<QuizController>(QuizController);

  app.register(verifiedAuthRoutes);

  app.get(
    '/',
    { schema: { querystring: QuizQuerySchema } },
    controller.getMany.bind(controller),
  );

  app.get(
    '/:id',
    { schema: { params: QuizParamsSchema } },
    controller.getOne.bind(controller),
  );

  app.get(
    '/questions/range',
    controller.getQuestionCountRange.bind(controller),
  );
};

const verifiedAuthRoutes: FastifyPluginAsync = async (app) => {
  const controller = di.resolve<QuizController>(QuizController);

  app.addHook('onRequest', verifyAuth());

  app.post(
    '/',
    { schema: { body: CreateQuizSchema } },
    controller.create.bind(controller),
  );

  app.patch(
    '/:id',
    { schema: { params: QuizParamsSchema, body: UpdateQuizSchema } },
    controller.update.bind(controller),
  );

  app.delete(
    '/:id',
    { schema: { params: QuizParamsSchema } },
    controller.delete.bind(controller),
  );
};
