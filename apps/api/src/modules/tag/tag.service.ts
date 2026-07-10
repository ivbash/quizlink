import { NotFoundError } from '@/libs/errors';
import type { TagRepository } from './tag.repository';
import type { CreateTagSchema, UpdateTagSchema } from './tag.schema';

export class TagService {
  constructor(private repository: TagRepository) {}

  async getTags({
    page = 1,
    pageSize = 10,
  }: {
    page: number;
    pageSize: number;
  }) {
    const tags = await this.repository.findMany(page, pageSize);
    return tags;
  }

  async getTagById(id: number) {
    const tag = await this.repository.findById(id);
    if (!tag) throw new NotFoundError('Тег не найден');
    return tag;
  }

  async getTagByName(name: string) {
    const tag = await this.repository.findByName(name);
    if (!tag) throw new NotFoundError('Тег не найден');
    return tag;
  }

  async createTag(data: CreateTagSchema) {
    const createdTag = await this.repository.create(data);
    return createdTag;
  }

  async updateTag(id: number, data: UpdateTagSchema) {
    const updatedTag = await this.repository.update(id, data);
    return updatedTag;
  }

  async deleteTag(id: number) {
    const deletedTag = await this.repository.delete(id);
    return deletedTag;
  }
}
