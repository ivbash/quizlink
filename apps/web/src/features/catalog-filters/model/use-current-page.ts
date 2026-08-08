import { useCallback } from 'react';
import { useSearchParams } from 'react-router';
import { PAGE } from './constants';

export function useCurrentPage() {
  const [searchParams] = useSearchParams();

  const page = Number(searchParams.get(PAGE)) || 1;

  const getPageUrl = useCallback(
    (page: number) => {
      const sp = new URLSearchParams(searchParams);
      sp.delete(PAGE);
      sp.set(PAGE, String(page));
      return sp.toString();
    },
    [searchParams],
  );

  return { page, getPageUrl };
}
