import { useMutation, useQueryClient } from '@tanstack/react-query';
import { userApi, userKeys, type UserId } from '@/entities/user';

export function useDeleteUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: UserId) => {
      await userApi.delete({ query: id });
    },
    onSuccess: async (_data, variables) => {
      const id = variables;
      await queryClient.invalidateQueries({ queryKey: userKeys.lists() });
      queryClient.removeQueries({ queryKey: userKeys.detail(id) });
    },
  });
}
