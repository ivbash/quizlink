import type { TagDto } from '../api/types';
import type { Tag } from '../model/types';

export function mapTagDto({ createdAt, updatedAt, ...dto }: TagDto): Tag {
  return {
    ...dto,
    createdAt: new Date(createdAt),
    updatedAt: new Date(updatedAt),
  };
}
