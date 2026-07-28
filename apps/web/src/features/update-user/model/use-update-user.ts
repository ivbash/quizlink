import { useMutation, useQueryClient } from '@tanstack/react-query';
import {
  mapUserDto,
  userApi,
  userKeys,
  type UpdateUserDto,
} from '@/entities/user';

export function useUpdateUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: UpdateUserDto) => {
      const user = await userApi.update({ data });
      return mapUserDto(user);
    },
    onSuccess: async (_data, variables) => {
      const { id } = variables;
      await queryClient.invalidateQueries({ queryKey: userKeys.lists() });
      await queryClient.invalidateQueries({
        queryKey: userKeys.detail(id),
      });
    },
  });
}
