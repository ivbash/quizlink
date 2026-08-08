import type { QuizFilters } from '../api/types';
import type { QuizId } from './types';

export const quizKeys = {
  all: () => ['quizzes'] as const,
  questions: () => [...quizKeys.all(), 'questions'] as const,
  questionCountRange: () => [...quizKeys.questions(), 'range'] as const,
  lists: () => [...quizKeys.all(), 'list'] as const,
  list: (filters: QuizFilters) => [...quizKeys.lists(), filters] as const,
  details: () => [...quizKeys.all(), 'detail'] as const,
  detail: (id: QuizId) => [...quizKeys.details(), id] as const,
} as const;
