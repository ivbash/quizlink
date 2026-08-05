import { useQuery } from '@tanstack/react-query';
import { quizApi } from '../api/quiz-api';
import { mapQuizDto } from '../lib/map-quiz-dto';
import { quizKeys } from './quiz-keys';
import type { QuizId } from './types';

export function useQuiz(id: QuizId) {
  return useQuery({
    queryKey: quizKeys.detail(id),
    queryFn: async () => {
      const dto = await quizApi.getById({ query: id });
      return mapQuizDto(dto);
    },
  });
}
