import type { FastifyReply, FastifyRequest } from 'fastify';
import type { User } from '@repo/database';
import { ForbiddenError } from '@/libs/errors';
import { requireAuth } from '@/libs/invariant';
import type {
  CreateQuizSchema,
  QuizParamsSchema,
  QuizQuerySchema,
  UpdateQuizSchema,
} from './quiz.schema';
import type { QuizService } from './quiz.service';

export class QuizController {
  constructor(private service: QuizService) {}

  async getMany(
    request: FastifyRequest<{ Querystring: QuizQuerySchema }>,
    reply: FastifyReply,
  ) {
    const quizzes = await this.service.getQuizzes(request.query);
    const count = await this.service.getQuizCount(request.query.search);
    return reply.send({ quizzes, count });
  }

  async getOne(
    request: FastifyRequest<{ Params: QuizParamsSchema }>,
    reply: FastifyReply,
  ) {
    const quiz = await this.service.getQuizById(request.params.id);
    return reply.send(quiz);
  }

  async create(
    request: FastifyRequest<{ Body: CreateQuizSchema }>,
    reply: FastifyReply,
  ) {
    requireAuth(request.auth);
    const quiz = await this.service.createQuiz(request.auth.id, request.body);
    return reply.status(201).send(quiz);
  }

  async update(
    request: FastifyRequest<{
      Params: QuizParamsSchema;
      Body: UpdateQuizSchema;
    }>,
    reply: FastifyReply,
  ) {
    requireAuth(request.auth);
    await this._verifyUserByQuizId(request.params.id, request.auth);
    const quiz = await this.service.updateQuiz(request.params.id, request.body);
    return reply.send(quiz);
  }

  async delete(
    request: FastifyRequest<{ Params: QuizParamsSchema }>,
    reply: FastifyReply,
  ) {
    requireAuth(request.auth);
    await this._verifyUserByQuizId(request.params.id, request.auth);
    await this.service.deleteQuiz(request.params.id);
    return reply.status(204).send();
  }

  private async _verifyUserByQuizId(
    quizId: string,
    user: Pick<User, 'id' | 'role'>,
  ) {
    if (user.role !== 'admin') {
      const ownerId = await this.service.getOwnerIdByQuizId(quizId);
      if (user.id !== ownerId) {
        throw new ForbiddenError('Недостаточные права доступа');
      }
    }
  }
}
