import { prisma } from '@repo/database';
import { DIContainer } from '@/libs/di';

export const di = new DIContainer().register('prisma', {
  factory: () => prisma,
});
