import type { PrismaClient } from '@repo/database';
import { removeUndefined } from '@/libs/utils';
import type { CreateTagSchema, UpdateTagSchema } from './tag.schema';

export class TagRepository {
  constructor(private prisma: PrismaClient) {}

  findMany(page: number, pageSize: number) {
    return this.prisma.tag.findMany({
      take: pageSize,
      skip: pageSize * (page - 1),
    });
  }

  findById(id: number) {
    return this.prisma.tag.findUnique({ where: { id } });
  }

  findByName(name: string) {
    return this.prisma.tag.findUnique({ where: { name } });
  }

  create(data: CreateTagSchema) {
    return this.prisma.tag.create({ data });
  }

  update(id: number, data: UpdateTagSchema) {
    const cleanData = removeUndefined(data);
    return this.prisma.tag.update({ where: { id }, data: cleanData });
  }

  delete(id: number) {
    return this.prisma.tag.delete({ where: { id } });
  }
}
