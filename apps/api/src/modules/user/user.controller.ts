import type { FastifyReply, FastifyRequest } from 'fastify';
import { requireAuth } from '@/libs/invariant';
import type {
  CreateUserSchema,
  UpdateUserSchema,
  UserParamsSchema,
  UserQuerySchema,
} from './user.schema';
import type { UserService } from './user.service';

export class UserController {
  constructor(private service: UserService) {}

  async getMany(
    request: FastifyRequest<{ Querystring: UserQuerySchema }>,
    reply: FastifyReply,
  ) {
    const users = await this.service.getUsers(request.query);
    const count = await this.service.getUserCount(request.query.search);
    return reply.send({ users, count });
  }

  async getOne(
    request: FastifyRequest<{ Params: UserParamsSchema }>,
    reply: FastifyReply,
  ) {
    const user = await this.service.getUserById(request.params.id);
    return reply.send(user);
  }

  async getMe(request: FastifyRequest, reply: FastifyReply) {
    requireAuth(request.auth);
    const user = await this.service.getUserById(request.auth.id);
    return reply.send(user);
  }

  async create(
    request: FastifyRequest<{ Body: CreateUserSchema }>,
    reply: FastifyReply,
  ) {
    const user = await this.service.createUser(request.body);
    return reply.status(201).send(user);
  }

  async update(
    request: FastifyRequest<{
      Params: UserParamsSchema;
      Body: UpdateUserSchema;
    }>,
    reply: FastifyReply,
  ) {
    const user = await this.service.updateUser(request.params.id, request.body);
    return reply.send(user);
  }

  async delete(
    request: FastifyRequest<{ Params: UserParamsSchema }>,
    reply: FastifyReply,
  ) {
    await this.service.deleteUser(request.params.id);
    return reply.status(204).send();
  }
}
