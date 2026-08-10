import { BadRequestError, NotFoundError } from '@/libs/errors';
import type {
  QuizFilters,
  QuizOrderBy,
  QuizRepository,
} from './quiz.repository';
import {
  MAX_QUESTION_COUNT,
  type CreateQuizSchema,
  type QuizQuerySchema,
  type UpdateQuizSchema,
} from './quiz.schema';

export interface QuizQuery extends Partial<
  Omit<QuizFilters, 'titleOrDescription' | 'orderBy'>
> {
  search?: string;
  sort: QuizQuerySchema['sort'];
}

export class QuizService {
  constructor(private repository: QuizRepository) {}

  async getQuizzes({
    page = 1,
    pageSize = 10,
    search = '',
    tags = [],
    minQuestionCount = 0,
    maxQuestionCount = 100,
    sort = 'new',
  }: QuizQuery) {
    const quizzes = await this.repository.findMany({
      page,
      pageSize,
      titleOrDescription: search,
      tags,
      minQuestionCount,
      maxQuestionCount,
      orderBy: mapOrderBy[sort],
    });
    return quizzes;
  }

  async getQuizCount({
    search = '',
    tags = [],
    minQuestionCount = 0,
    maxQuestionCount = 100,
  }: Omit<QuizQuery, 'page' | 'pageSize' | 'sort'>) {
    const count = await this.repository.count({
      titleOrDescription: search,
      tags,
      minQuestionCount,
      maxQuestionCount,
    });
    return count;
  }

  async getQuizById(id: string) {
    const quiz = await this.repository.findById(id);
    if (!quiz) throw new NotFoundError('Викторина не найдена');
    return quiz;
  }

  async getOwnerIdByQuizId(quizId: string) {
    const quiz = await this.repository.findOwnerIdByQuizId(quizId);
    if (!quiz) throw new NotFoundError('Викторина не найдена');
    return quiz.createdById;
  }

  async getQuestionCountRange() {
    const range = await this.repository.questionCountRange();
    return range;
  }

  async createQuiz(createdBy: string, data: CreateQuizSchema) {
    const createdQuiz = await this.repository.create({ createdBy, ...data });
    return createdQuiz;
  }

  async updateQuiz(id: string, data: UpdateQuizSchema) {
    const quiz = await this.repository.findById(id);
    if (!quiz) throw new NotFoundError('Викторина не найдена');
    if (quiz.questionCount + data.questions.add.length > MAX_QUESTION_COUNT) {
      throw new BadRequestError(
        `Викторина не может иметь больше ${MAX_QUESTION_COUNT} вопросов`,
      );
    }
    const updatedQuiz = await this.repository.update(id, data);
    return updatedQuiz;
  }

  async deleteQuiz(id: string) {
    const deletedQuiz = await this.repository.delete(id);
    return deletedQuiz;
  }
}

const mapOrderBy = {
  new: { createdAt: 'desc' },
  'questions-asc': { questionCount: 'asc' },
  'questions-desc': { questionCount: 'desc' },
} satisfies Record<QuizQuerySchema['sort'], QuizOrderBy | undefined>;
