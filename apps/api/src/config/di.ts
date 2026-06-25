import { prisma, type PrismaClient } from '@repo/database';
import { DIContainer } from '@/libs/di';
import { RedisClient } from '@/libs/redis';
import { AuthController } from '@/modules/auth/auth.controller';
import { AuthRepository } from '@/modules/auth/auth.repository';
import { AuthService } from '@/modules/auth/auth.service';
import { UserController } from '@/modules/user/user.controller';
import { UserRepository } from '@/modules/user/user.repository';
import { UserService } from '@/modules/user/user.service';
import { redis } from './redis';

export const di = new DIContainer()
  .register('prisma', { factory: () => prisma })
  .register('redis', { factory: () => new RedisClient(redis) })
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
  .register(AuthRepository, {
    factory: (redis: RedisClient) => new AuthRepository(redis),
    inject: ['redis'],
  })
  .register(AuthService, {
    factory: (userRepository, authRepository) =>
      new AuthService(userRepository, authRepository),
    inject: [UserRepository, AuthRepository],
  })
  .register(AuthController, {
    factory: (service) => new AuthController(service),
    inject: [AuthService],
  });
