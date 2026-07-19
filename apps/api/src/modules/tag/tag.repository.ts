import type { PrismaClient } from '@repo/database';
import { removeUndefined } from '@/libs/utils';
import type { CreateTagSchema, UpdateTagSchema } from './tag.schema';

export interface TagFilters {
  page: number;
  pageSize: number;
  name: string;
}

export class TagRepository {
  constructor(private prisma: PrismaClient) {}

  findMany({ page, pageSize, name }: TagFilters) {
    return this.prisma.tag.findMany({
      where: { name: { contains: name, mode: 'insensitive' } },
      take: pageSize,
      skip: pageSize * (page - 1),
    });
  }

  count(name: string) {
    return this.prisma.tag.count({
      where: { name: { contains: name, mode: 'insensitive' } },
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
