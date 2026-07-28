import { useMutation, useQueryClient } from '@tanstack/react-query';
import { tagApi, tagKeys, type TagId } from '@/entities/tag';

export function useDeleteTag() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: TagId) => {
      await tagApi.delete({ query: id });
    },
    onSuccess: async (_data, variables) => {
      const id = variables;
      await queryClient.invalidateQueries({ queryKey: tagKeys.lists() });
      queryClient.removeQueries({ queryKey: tagKeys.detail(id) });
    },
  });
}
