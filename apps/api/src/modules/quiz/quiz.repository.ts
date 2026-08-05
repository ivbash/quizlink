import type { PrismaClient } from '@repo/database';
import { removeUndefined } from '@/libs/utils';
import type { CreateQuizSchema, UpdateQuizSchema } from './quiz.schema';

export interface QuizFilters {
  page: number;
  pageSize: number;
  titleOrDescription: string;
}

export class QuizRepository {
  constructor(private prisma: PrismaClient) {}

  findMany({ page, pageSize, titleOrDescription }: QuizFilters) {
    return this.prisma.quiz.findMany({
      where: {
        OR: [
          { title: { contains: titleOrDescription, mode: 'insensitive' } },
          {
            description: { contains: titleOrDescription, mode: 'insensitive' },
          },
        ],
      },
      take: pageSize,
      skip: pageSize * (page - 1),
      include: {
        createdBy: { select: { id: true, username: true } },
        tags: { select: { id: true, name: true } },
        _count: { select: { questions: true } },
      },
    });
  }

  count(titleOrDescription: string) {
    return this.prisma.quiz.count({
      where: {
        OR: [
          { title: { contains: titleOrDescription, mode: 'insensitive' } },
          {
            description: { contains: titleOrDescription, mode: 'insensitive' },
          },
        ],
      },
    });
  }

  findById(id: string) {
    return this.prisma.quiz.findUnique({
      where: { id },
      include: {
        createdBy: { select: { id: true, username: true } },
        tags: { select: { id: true, name: true } },
        questions: {
          select: { id: true, text: true, time: true, answers: true },
        },
      },
    });
  }

  findOwnerIdByQuizId(id: string) {
    return this.prisma.quiz.findUnique({
      where: { id },
      select: { createdById: true },
    });
  }

  create({
    createdBy,
    tags,
    questions,
    ...data
  }: CreateQuizSchema & { createdBy: string }) {
    return this.prisma.quiz.create({
      data: {
        ...data,
        createdBy: { connect: { id: createdBy } },
        tags: { connect: tags.map((id) => ({ id })) },
        questions: { create: questions },
      },
      include: {
        createdBy: { select: { id: true, username: true } },
        tags: { select: { id: true, name: true } },
        questions: {
          select: { id: true, text: true, time: true, answers: true },
        },
      },
    });
  }

  update(id: string, { tags, questions, ...data }: UpdateQuizSchema) {
    const tagsData = {
      connect: tags.add.map((id) => ({ id })),
      disconnect: tags.del.map((id) => ({ id })),
    };

    const questionsData = {
      create: questions.add,
      update: questions.upd.map(({ id, ...data }) => ({
        where: { id },
        data: removeUndefined(data),
      })),
      delete: questions.del.map((id) => ({ id })),
    };

    const cleanData = removeUndefined({
      ...data,
      tags: tagsData,
      questions: questionsData,
    });

    return this.prisma.quiz.update({
      where: { id },
      data: cleanData,
      include: {
        createdBy: { select: { id: true, username: true } },
        tags: { select: { id: true, name: true } },
        questions: {
          select: { id: true, text: true, time: true, answers: true },
        },
      },
    });
  }

  delete(id: string) {
    return this.prisma.quiz.delete({ where: { id } });
  }
}
