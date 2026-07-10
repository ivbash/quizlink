import type { FastifyReply, FastifyRequest } from 'fastify';
import type {
  CreateTagSchema,
  TagParamsSchema,
  TagQuerySchema,
  UpdateTagSchema,
} from './tag.schema';
import type { TagService } from './tag.service';

export class TagController {
  constructor(private service: TagService) {}

  async getMany(
    request: FastifyRequest<{ Querystring: TagQuerySchema }>,
    reply: FastifyReply,
  ) {
    const tags = await this.service.getTags(request.query);
    return reply.send(tags);
  }

  async getOne(
    request: FastifyRequest<{ Params: TagParamsSchema }>,
    reply: FastifyReply,
  ) {
    const tag = await this.service.getTagById(request.params.id);
    return reply.send(tag);
  }

  async create(
    request: FastifyRequest<{ Body: CreateTagSchema }>,
    reply: FastifyReply,
  ) {
    const tag = await this.service.createTag(request.body);
    return reply.status(201).send(tag);
  }

  async update(
    request: FastifyRequest<{
      Params: TagParamsSchema;
      Body: UpdateTagSchema;
    }>,
    reply: FastifyReply,
  ) {
    const tag = await this.service.updateTag(request.params.id, request.body);
    return reply.send(tag);
  }

  async delete(
    request: FastifyRequest<{ Params: TagParamsSchema }>,
    reply: FastifyReply,
  ) {
    await this.service.deleteTag(request.params.id);
    return reply.status(204).send();
  }
}
