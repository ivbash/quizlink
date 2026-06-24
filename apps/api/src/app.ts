import fastifyCookie from '@fastify/cookie';
import fastifyCors from '@fastify/cors';
import fastify from 'fastify';
import {
  serializerCompiler,
  validatorCompiler,
  type ZodTypeProvider,
} from 'fastify-type-provider-zod';
import { HOST, LOG_LEVEL, PORT } from './config/server';
import { errorHandlerPlugin } from './plugins/error-handler-plugin';
import { prismaPlugin } from './plugins/prisma-plugin';

const app = fastify({
  logger: { level: LOG_LEVEL },
}).withTypeProvider<ZodTypeProvider>();

app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);

app.register(fastifyCors, {
  origin: 'http://localhost:5173',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
});
app.register(fastifyCookie);
app.register(errorHandlerPlugin);
app.register(prismaPlugin);

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
