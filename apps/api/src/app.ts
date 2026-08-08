import fastifyCookie from '@fastify/cookie';
import fastifyCors from '@fastify/cors';
import fastify from 'fastify';
import {
  serializerCompiler,
  validatorCompiler,
  type ZodTypeProvider,
} from 'fastify-type-provider-zod';
import { CORS_ORIGIN, HOST, LOG_LEVEL, PORT } from './config/server';
import { authRoutes } from './modules/auth/auth.routes';
import { quizRoutes } from './modules/quiz/quiz.routes';
import { tagRoutes } from './modules/tag/tag.routes';
import { userRoutes } from './modules/user/user.routes';
import { authPlugin } from './plugins/auth-plugin';
import { errorHandlerPlugin } from './plugins/error-handler-plugin';
import { prismaPlugin } from './plugins/prisma-plugin';
import { redisPlugin } from './plugins/redis-plugin';

const app = fastify({
  logger: { level: LOG_LEVEL },
}).withTypeProvider<ZodTypeProvider>();

app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);

app.register(fastifyCors, {
  origin: CORS_ORIGIN,
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
});
app.register(fastifyCookie);
app.register(errorHandlerPlugin);
app.register(authPlugin);
app.register(prismaPlugin);
app.register(redisPlugin);

app.register(authRoutes, { prefix: '/api/auth' });
app.register(userRoutes, { prefix: '/api/users' });
app.register(tagRoutes, { prefix: '/api/tags' });
app.register(quizRoutes, { prefix: '/api/quizzes' });

export async function start({ port = PORT, host = HOST } = {}) {
  try {
    await app.listen({ port, host });
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
}

async function shutdown() {
  await app.close();
}

export function handleShutdown() {
  console.log('Starting graceful shutdown...');

  shutdown()
    .then(() => {
      console.log('Server closed successfully');
      process.exit(0);
    })
    .catch((err) => {
      console.error('Error during shutdown:', err);
      process.exit(1);
    });
}
