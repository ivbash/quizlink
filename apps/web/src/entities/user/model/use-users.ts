import { keepPreviousData, useQuery } from '@tanstack/react-query';
import type { UserFilters } from '../api/types';
import { userApi } from '../api/user-api';
import { mapUserDto } from '../lib/map-user-dto';
import { userKeys } from './user-keys';

export function useUsers(filters: UserFilters) {
  return useQuery({
    queryKey: userKeys.list(filters),
    queryFn: async () => {
      const { users, count } = await userApi.getList({ query: filters });
      return { users: users.map(mapUserDto), count };
    },
    placeholderData: keepPreviousData,
  });
}
