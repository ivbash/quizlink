import { prisma, type PrismaClient } from '@repo/database';
import { DIContainer } from '@/libs/di';
import { RedisClient } from '@/libs/redis';
import { AuthController } from '@/modules/auth/auth.controller';
import { AuthRepository } from '@/modules/auth/auth.repository';
import { AuthService } from '@/modules/auth/auth.service';
import { QuizController } from '@/modules/quiz/quiz.controller';
import { QuizRepository } from '@/modules/quiz/quiz.repository';
import { QuizService } from '@/modules/quiz/quiz.service';
import { TagController } from '@/modules/tag/tag.controller';
import { TagRepository } from '@/modules/tag/tag.repository';
import { TagService } from '@/modules/tag/tag.service';
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
    factory: (userRepository, authRepository) =>
      new UserService(userRepository, authRepository),
    inject: [UserRepository, AuthRepository],
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
  })
  .register(TagRepository, {
    factory: (prisma: PrismaClient) => new TagRepository(prisma),
    inject: ['prisma'],
  })
  .register(TagService, {
    factory: (repository) => new TagService(repository),
    inject: [TagRepository],
  })
  .register(TagController, {
    factory: (service) => new TagController(service),
    inject: [TagService],
  })
  .register(QuizRepository, {
    factory: (prisma: PrismaClient) => new QuizRepository(prisma),
    inject: ['prisma'],
  })
  .register(QuizService, {
    factory: (repository) => new QuizService(repository),
    inject: [QuizRepository],
  })
  .register(QuizController, {
    factory: (service) => new QuizController(service),
    inject: [QuizService],
  });
