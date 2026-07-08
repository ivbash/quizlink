/* eslint-disable @typescript-eslint/require-await */
import { type FastifyPluginAsync } from 'fastify';
import fp from 'fastify-plugin';
import {
  AppError,
  mapJOSEError,
  mapPrismaError,
  mapZodError,
} from '@/libs/errors';
import { pipe } from '@/libs/pipe';

const mapError = pipe(mapZodError, mapPrismaError, mapJOSEError);

export const errorHandlerPlugin: FastifyPluginAsync = fp(async (app) => {
  app.setErrorHandler((error, request, reply) => {
    const mappedError = mapError(error);

    if (mappedError instanceof AppError) {
      return reply.status(mappedError.statusCode).send({
        statusCode: mappedError.statusCode,
        error: mappedError.message,
      });
    }

    request.log.error(error);
    return reply
      .status(500)
      .send({ statusCode: 500, error: 'Internal Server Error' });
  });
});
