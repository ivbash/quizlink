import type { UserFilters } from '../api/types';
import type { UserId } from './types';

export const userKeys = {
  all: () => ['users'] as const,
  lists: () => [...userKeys.all(), 'list'] as const,
  list: (filters: UserFilters) => [...userKeys.lists(), filters] as const,
  details: () => [...userKeys.all(), 'detail'] as const,
  detail: (id: UserId) => [...userKeys.details(), id] as const,
} as const;
