import { Prisma } from '@repo/database';
import { ConflictError, NotFoundError } from './app-error';

export function isPrismaError(error: unknown) {
  return error instanceof Prisma.PrismaClientKnownRequestError;
}

export function mapPrismaError(error: unknown) {
  if (!isPrismaError(error)) return error;

  switch (error.code) {
    case 'P2002':
      return new ConflictError('Запись с таким значением уже существует');
    case 'P2025':
      return new NotFoundError('Запись не найдена');
    default:
      return error;
  }
}
