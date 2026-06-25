import { JOSEError } from 'jose/errors';
import { UnauthorizedError } from './app-error';

export function isJOSEError(error: unknown) {
  return error instanceof JOSEError;
}

export function mapJOSEError(error: unknown) {
  if (!isJOSEError(error)) return error;

  return new UnauthorizedError('Токен недействителен');
}
