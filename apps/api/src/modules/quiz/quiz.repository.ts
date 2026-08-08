import type { Prisma, PrismaClient } from '@repo/database';
import { removeUndefined } from '@/libs/utils';
import type { CreateQuizSchema, UpdateQuizSchema } from './quiz.schema';

export type QuizOrderBy = Prisma.QuizOrderByWithRelationInput;

export interface QuizFilters {
  page: number;
  pageSize: number;
  titleOrDescription: string;
  tags: number[];
  minQuestionCount: number;
  maxQuestionCount: number;
  orderBy: QuizOrderBy;
}

export class QuizRepository {
  constructor(private prisma: PrismaClient) {}

  findMany({
    page,
    pageSize,
    titleOrDescription,
    tags,
    minQuestionCount,
    maxQuestionCount,
    orderBy,
  }: QuizFilters) {
    return this.prisma.quiz.findMany({
      where: {
        AND: [
          {
            OR: [
              { title: { contains: titleOrDescription, mode: 'insensitive' } },
              {
                description: {
                  contains: titleOrDescription,
                  mode: 'insensitive',
                },
              },
            ],
          },
          ...tags.map((id) => ({ tags: { some: { id } } })),
          { questionCount: { gte: minQuestionCount, lte: maxQuestionCount } },
        ],
      },
      take: pageSize,
      skip: pageSize * (page - 1),
      orderBy,
      include: {
        createdBy: { select: { id: true, username: true } },
        tags: { select: { id: true, name: true } },
        // _count: { select: { questions: true } },
      },
    });
  }

  count({
    titleOrDescription,
    tags,
    minQuestionCount,
    maxQuestionCount,
  }: Omit<QuizFilters, 'page' | 'pageSize' | 'orderBy'>) {
    return this.prisma.quiz.count({
      where: {
        AND: [
          {
            OR: [
              { title: { contains: titleOrDescription, mode: 'insensitive' } },
              {
                description: {
                  contains: titleOrDescription,
                  mode: 'insensitive',
                },
              },
            ],
          },
          ...tags.map((id) => ({ tags: { some: { id } } })),
          { questionCount: { gte: minQuestionCount, lte: maxQuestionCount } },
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

  async questionCountRange() {
    const { _min, _max } = await this.prisma.quiz.aggregate({
      _min: { questionCount: true },
      _max: { questionCount: true },
    });
    return {
      min: _min.questionCount ?? 0,
      max: _max.questionCount ?? 0,
    };
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
        questionCount: questions.length,
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
      questionCount: { increment: questions.add.length - questions.del.length },
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
