import { useMutation, useQueryClient } from '@tanstack/react-query';
import { mapTagDto, tagApi, tagKeys, type CreateTagDto } from '@/entities/tag';

export function useCreateTag() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: CreateTagDto) => {
      const tag = await tagApi.create({ data });
      return mapTagDto(tag);
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: tagKeys.lists() });
    },
  });
}
