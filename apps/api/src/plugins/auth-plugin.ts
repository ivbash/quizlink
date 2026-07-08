/* eslint-disable @typescript-eslint/require-await */
import type { FastifyPluginAsync } from 'fastify';
import fp from 'fastify-plugin';
import { verifyAccessToken, type VerifiedAccessTokenPayload } from '@/libs/jwt';

declare module 'fastify' {
  interface FastifyRequest {
    auth?: VerifiedAccessTokenPayload;
  }
}

export const authPlugin: FastifyPluginAsync = fp(async (app) => {
  app.addHook('onRequest', async (request) => {
    const token = request.headers.authorization?.split(' ')[1];
    if (!token) return;

    try {
      request.auth = await verifyAccessToken(token);
    } catch {
      /* empty */
    }
  });
});
