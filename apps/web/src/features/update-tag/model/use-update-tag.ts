import { useMutation, useQueryClient } from '@tanstack/react-query';
import { mapTagDto, tagApi, tagKeys, type UpdateTagDto } from '@/entities/tag';

export function useUpdateTag() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: UpdateTagDto) => {
      const tag = await tagApi.update({ data });
      return mapTagDto(tag);
    },
    onSuccess: async (_data, variables) => {
      const { id } = variables;
      await queryClient.invalidateQueries({ queryKey: tagKeys.lists() });
      await queryClient.invalidateQueries({
        queryKey: tagKeys.detail(id),
      });
    },
  });
}
