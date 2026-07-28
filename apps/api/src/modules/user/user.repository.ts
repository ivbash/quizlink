import type { PrismaClient } from '@repo/database';
import { removeUndefined } from '@/libs/utils';
import type { CreateUserSchema, UpdateUserSchema } from './user.schema';

export interface UserFilters {
  page: number;
  pageSize: number;
  emailOrUsername: string;
}

export class UserRepository {
  constructor(private prisma: PrismaClient) {}

  findMany({ page, pageSize, emailOrUsername }: UserFilters) {
    return this.prisma.user.findMany({
      where: {
        OR: [
          { username: { contains: emailOrUsername, mode: 'insensitive' } },
          { email: { contains: emailOrUsername, mode: 'insensitive' } },
        ],
      },
      take: pageSize,
      skip: pageSize * (page - 1),
    });
  }

  count(emailOrUsername: string) {
    return this.prisma.user.count({
      where: {
        OR: [
          { username: { contains: emailOrUsername, mode: 'insensitive' } },
          { email: { contains: emailOrUsername, mode: 'insensitive' } },
        ],
      },
    });
  }

  findById(id: string) {
    return this.prisma.user.findUnique({ where: { id } });
  }

  findByEmail(email: string) {
    return this.prisma.user.findUnique({ where: { email } });
  }

  findByUsername(username: string) {
    return this.prisma.user.findUnique({ where: { username } });
  }

  findByEmailOrUsername(emailOrUsername: string) {
    return this.prisma.user.findFirst({
      where: {
        OR: [{ email: emailOrUsername }, { username: emailOrUsername }],
      },
    });
  }

  create(data: CreateUserSchema) {
    return this.prisma.user.create({ data });
  }

  update(id: string, data: UpdateUserSchema) {
    const cleanData = removeUndefined(data);
    return this.prisma.user.update({ where: { id }, data: cleanData });
  }

  delete(id: string) {
    return this.prisma.user.delete({ where: { id } });
  }
}
