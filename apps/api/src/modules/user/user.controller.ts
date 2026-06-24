import type { FastifyReply, FastifyRequest } from 'fastify';
import type {
  CreateUserSchema,
  UpdateUserSchema,
  UserParamsSchema,
} from './user.schema';
import type { UserService } from './user.service';

export class UserController {
  constructor(private service: UserService) {}

  async getMany(_request: FastifyRequest, reply: FastifyReply) {
    const users = await this.service.getUsers();
    return reply.send(users);
  }

  async getOne(
    request: FastifyRequest<{ Params: UserParamsSchema }>,
    reply: FastifyReply,
  ) {
    const user = await this.service.getUserById(request.params.id);
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
