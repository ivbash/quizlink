import type { TagFilters } from '../api/types';
import type { TagId } from './types';

export const tagKeys = {
  all: () => ['tags'] as const,
  lists: () => [...tagKeys.all(), 'list'] as const,
  list: (filters: TagFilters) => [...tagKeys.lists(), filters] as const,
  details: () => [...tagKeys.all(), 'detail'] as const,
  detail: (id: TagId) => [...tagKeys.details(), id] as const,
} as const;
