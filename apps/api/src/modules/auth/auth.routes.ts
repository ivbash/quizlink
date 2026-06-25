/* eslint-disable @typescript-eslint/require-await */
import type { FastifyPluginAsync } from 'fastify';
import { di } from '@/config/di';
import { AuthController } from './auth.controller';
import { SignInSchema, SignUpSchema } from './auth.schema';

export const authRoutes: FastifyPluginAsync = async (app) => {
  const controller = di.resolve<AuthController>(AuthController);

  app.post(
    '/sign-up',
    { schema: { body: SignUpSchema } },
    controller.signUp.bind(controller),
  );

  app.post(
    '/sign-in',
    { schema: { body: SignInSchema } },
    controller.signIn.bind(controller),
  );

  app.post('/sign-out', controller.signOut.bind(controller));

  app.post('/refresh', controller.refresh.bind(controller));
};
