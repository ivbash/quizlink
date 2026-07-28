import { useMutation, useQueryClient } from '@tanstack/react-query';
import {
  mapUserDto,
  userApi,
  userKeys,
  type CreateUserDto,
} from '@/entities/user';

export function useCreateUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: CreateUserDto) => {
      const user = await userApi.create({ data });
      return mapUserDto(user);
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: userKeys.lists() });
    },
  });
}
