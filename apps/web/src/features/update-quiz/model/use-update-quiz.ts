import { useMutation, useQueryClient } from '@tanstack/react-query';
import {
  mapQuizDto,
  quizApi,
  quizKeys,
  type UpdateQuizDto,
} from '@/entities/quiz';

export function useUpdateQuiz() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: UpdateQuizDto) => {
      const quiz = await quizApi.update({ data });
      return mapQuizDto(quiz);
    },
    onSuccess: async (_data, variables) => {
      const { id } = variables;
      await queryClient.invalidateQueries({ queryKey: quizKeys.lists() });
      await queryClient.invalidateQueries({
        queryKey: quizKeys.detail(id),
      });
    },
  });
}
