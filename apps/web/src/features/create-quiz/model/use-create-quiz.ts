import { useMutation, useQueryClient } from '@tanstack/react-query';
import {
  mapQuizDto,
  quizApi,
  quizKeys,
  type CreateQuizDto,
} from '@/entities/quiz';

export function useCreateQuiz() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: CreateQuizDto) => {
      const quiz = await quizApi.create({ data });
      return mapQuizDto(quiz);
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: quizKeys.lists() });
    },
  });
}
