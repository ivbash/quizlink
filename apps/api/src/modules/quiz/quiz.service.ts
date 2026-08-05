import { NotFoundError } from '@/libs/errors';
import type { QuizFilters, QuizRepository } from './quiz.repository';
import type { CreateQuizSchema, UpdateQuizSchema } from './quiz.schema';

export interface QuizQuery extends Partial<
  Omit<QuizFilters, 'titleOrDescription'>
> {
  search?: string;
}

export class QuizService {
  constructor(private repository: QuizRepository) {}

  async getQuizzes({ page = 1, pageSize = 10, search = '' }: QuizQuery) {
    const quizzes = await this.repository.findMany({
      page,
      pageSize,
      titleOrDescription: search,
    });
    return quizzes;
  }

  async getQuizCount(search = '') {
    const count = await this.repository.count(search);
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

  async createQuiz(createdBy: string, data: CreateQuizSchema) {
    const createdQuiz = await this.repository.create({ createdBy, ...data });
    return createdQuiz;
  }

  async updateQuiz(id: string, data: UpdateQuizSchema) {
    const updatedQuiz = await this.repository.update(id, data);
    return updatedQuiz;
  }

  async deleteQuiz(id: string) {
    const deletedQuiz = await this.repository.delete(id);
    return deletedQuiz;
  }
}
