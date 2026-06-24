import type { PrismaClient } from '@repo/database';
import { removeUndefined } from '@/libs/utils';
import type { CreateUserSchema, UpdateUserSchema } from './user.schema';

export class UserRepository {
  constructor(private prisma: PrismaClient) {}

  findMany(page: number, pageSize: number) {
    return this.prisma.user.findMany({
      take: pageSize,
      skip: pageSize * (page - 1),
    });
  }

  findById(id: string) {
    return this.prisma.user.findUnique({ where: { id } });
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
