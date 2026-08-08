import { useMutation, useQueryClient } from '@tanstack/react-query';
import { quizApi, quizKeys, type QuizId } from '@/entities/quiz';

export function useDeleteQuiz() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: QuizId) => {
      await quizApi.delete({ query: id });
    },
    onSuccess: async (_data, variables) => {
      const id = variables;
      await queryClient.invalidateQueries({ queryKey: quizKeys.lists() });
      queryClient.removeQueries({ queryKey: quizKeys.detail(id) });
    },
  });
}
