/* eslint-disable @typescript-eslint/require-await */
import type { onRequestAsyncHookHandler } from 'fastify';
import type { UserRole } from '@repo/database';
import { ForbiddenError, UnauthorizedError } from '@/libs/errors';

export function verifyAuth(): onRequestAsyncHookHandler {
  return async (request) => {
    if (!request.auth) {
      throw new UnauthorizedError('Не авторизован');
    }
  };
}

export function verifyRole(...roles: UserRole[]): onRequestAsyncHookHandler {
  return async (request) => {
    if (!request.auth) {
      throw new UnauthorizedError('Не авторизован');
    }

    const { role } = request.auth;

    if (!roles.includes(role)) {
      throw new ForbiddenError('Недостаточные права доступа');
    }
  };
}
