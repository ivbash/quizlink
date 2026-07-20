import { useCallback } from 'react';
import { useSearchParams } from 'react-router';

interface ListParams {
  page: number;
  pageSize: number;
  search: string;
}

export function useListParams() {
  const [searchParams, setSearchParams] = useSearchParams();

  const page = Number(searchParams.get('page')) || 1;
  const pageSize = Number(searchParams.get('pageSize')) || 10;
  const search = searchParams.get('search') || '';

  const setParam = useCallback(
    <T extends keyof ListParams>(key: T, value: ListParams[T]) => {
      setSearchParams((sp) => {
        if (value) {
          sp.set(key, String(value));
        } else {
          sp.delete(key);
        }

        if (key !== 'page') {
          // sp.set('page', '1');
          sp.delete('page');
        }

        return sp;
      });
    },
    [setSearchParams],
  );

  return { page, pageSize, search, setParam };
}
