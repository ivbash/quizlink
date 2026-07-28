import { useQuery } from '@tanstack/react-query';
import { userApi } from '../api/user-api';
import { mapUserDto } from '../lib/map-user-dto';
import type { UserId } from './types';
import { userKeys } from './user-keys';

export function useUser(id: UserId) {
  return useQuery({
    queryKey: userKeys.detail(id),
    queryFn: async () => {
      const dto = await userApi.getById({ query: id });
      return mapUserDto(dto);
    },
  });
}
