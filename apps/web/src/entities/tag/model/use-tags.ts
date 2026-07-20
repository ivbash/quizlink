import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { tagApi } from '../api/tag-api';
import type { TagFilters } from '../api/types';
import { mapTagDto } from '../lib/map-tag-dto';
import { tagKeys } from './tag-keys';

export function useTags(filters: TagFilters) {
  return useQuery({
    queryKey: tagKeys.list(filters),
    queryFn: async () => {
      const { tags, count } = await tagApi.getList({ query: filters });
      return { tags: tags.map(mapTagDto), count };
    },
    placeholderData: keepPreviousData,
  });
}
