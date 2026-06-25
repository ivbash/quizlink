import type { FastifyPluginAsync } from 'fastify';
import fp from 'fastify-plugin';
import { di } from '@/config/di';
import type { RedisClient } from '@/libs/redis';

declare module 'fastify' {
  interface FastifyInstance {
    redis: RedisClient;
  }
}

export const redisPlugin: FastifyPluginAsync = fp(async (app) => {
  const redis = di.resolve<RedisClient>('redis');
  await redis.connect();
  app.decorate('redis', redis);
  app.addHook('onClose', async (app) => {
    await app.redis.disconnect();
  });
});
