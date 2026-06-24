import type { FastifyPluginAsync } from 'fastify';
import fp from 'fastify-plugin';
import type { PrismaClient } from '@repo/database';
import { di } from '@/config/di';

declare module 'fastify' {
  interface FastifyInstance {
    prisma: PrismaClient;
  }
}

export const prismaPlugin: FastifyPluginAsync = fp(async (app) => {
  const prisma = di.resolve<PrismaClient>('prisma');
  await prisma.$connect();
  app.decorate('prisma', prisma);
  app.addHook('onClose', async (app) => {
    await app.prisma.$disconnect();
  });
});
