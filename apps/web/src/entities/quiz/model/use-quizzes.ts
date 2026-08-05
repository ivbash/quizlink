import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { quizApi } from '../api/quiz-api';
import type { QuizFilters } from '../api/types';
import { mapQuizListDto } from '../lib/map-quiz-dto';
import { quizKeys } from './quiz-keys';

export function useQuizzes(filters: QuizFilters) {
  return useQuery({
    queryKey: quizKeys.list(filters),
    queryFn: async () => {
      const { quizzes, count } = await quizApi.getList({ query: filters });
      return { quizzes: quizzes.map(mapQuizListDto), count };
    },
    placeholderData: keepPreviousData,
  });
}
