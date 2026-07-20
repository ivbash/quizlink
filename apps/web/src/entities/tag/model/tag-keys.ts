import type { TagFilters } from '../api/types';

export const tagKeys = {
  all: () => ['tags'] as const,
  lists: () => [...tagKeys.all(), 'list'] as const,
  list: (filters: TagFilters) => [...tagKeys.lists(), filters] as const,
  details: () => [...tagKeys.all(), 'detail'] as const,
  detail: (id: number) => [...tagKeys.details(), id] as const,
} as const;
