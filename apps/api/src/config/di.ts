import { prisma, type PrismaClient } from '@repo/database';
import { DIContainer } from '@/libs/di';
import { AuthController } from '@/modules/auth/auth.controller';
import { AuthService } from '@/modules/auth/auth.service';
import { UserController } from '@/modules/user/user.controller';
import { UserRepository } from '@/modules/user/user.repository';
import { UserService } from '@/modules/user/user.service';

export const di = new DIContainer()
  .register('prisma', { factory: () => prisma })
  .register(UserRepository, {
    factory: (prisma: PrismaClient) => new UserRepository(prisma),
    inject: ['prisma'],
  })
  .register(UserService, {
    factory: (repository) => new UserService(repository),
    inject: [UserRepository],
  })
  .register(UserController, {
    factory: (service) => new UserController(service),
    inject: [UserService],
  })
  .register(AuthService, {
    factory: (repository) => new AuthService(repository),
    inject: [UserRepository],
  })
  .register(AuthController, {
    factory: (service) => new AuthController(service),
    inject: [AuthService],
  });
