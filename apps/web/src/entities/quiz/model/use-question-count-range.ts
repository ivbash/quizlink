import { useQuery } from '@tanstack/react-query';
import { quizApi } from '../api/quiz-api';
import { quizKeys } from './quiz-keys';
import type { QuestionCountRange } from './types';

export function useQuestionCountRange() {
  return useQuery({
    queryKey: quizKeys.questionCountRange(),
    queryFn: async (): Promise<QuestionCountRange> => {
      const dto = await quizApi.getQuestionCountRange({});
      return dto;
    },
  });
}
