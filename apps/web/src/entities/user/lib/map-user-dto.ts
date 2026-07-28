import type { UserDto } from '../api/types';
import type { User } from '../model/types';

export function mapUserDto({ createdAt, updatedAt, ...dto }: UserDto): User {
  return {
    ...dto,
    createdAt: new Date(createdAt),
    updatedAt: new Date(updatedAt),
  };
}
