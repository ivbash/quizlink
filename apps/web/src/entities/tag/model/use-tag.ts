import { useQuery } from '@tanstack/react-query';
import { tagApi } from '../api/tag-api';
import { mapTagDto } from '../lib/map-tag-dto';
import { tagKeys } from './tag-keys';
import type { TagId } from './types';

export function useTag(id: TagId) {
  return useQuery({
    queryKey: tagKeys.detail(id),
    queryFn: async () => {
      const dto = await tagApi.getById({ query: id });
      return mapTagDto(dto);
    },
  });
}
