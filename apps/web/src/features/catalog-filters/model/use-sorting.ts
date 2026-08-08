import { useCallback } from 'react';
import { useSearchParams } from 'react-router';
import type { QuizSorting } from '@/entities/quiz';
import { PAGE, SORT } from './constants';

export function useSorting() {
  const [searchParams, setSearchParams] = useSearchParams();

  const sort = (searchParams.get(SORT) || 'new') as QuizSorting;

  const setSorting = useCallback(
    (sort: QuizSorting | null) =>
      setSearchParams((sp) => {
        if (sort) {
          sp.set(SORT, sort);
        }
        sp.delete(PAGE);
        return sp;
      }),
    [setSearchParams],
  );

  return { sort, setSorting };
}
