import { useCallback } from 'react';
import { useSearchParams } from 'react-router';
import type { TagId } from '@/entities/tag';
import { filterParamToString } from '../lib/filter-param-to-string';
import {
  MAX_QUESTION_COUNT,
  MIN_QUESTION_COUNT,
  PAGE,
  TAGS,
} from './constants';

export interface FilterParams {
  tags: TagId[];
  minQuestionCount: number;
  maxQuestionCount: number;
}

export interface DefaultCatalogFilterParams {
  minQuestionCount?: number;
  maxQuestionCount?: number;
}

export function useCatalogFilterParams({
  minQuestionCount: defaultMinQuestionCount = 1,
  maxQuestionCount: defaultMaxQuestionCount = 100,
}: DefaultCatalogFilterParams = {}) {
  const [searchParams, setSearchParams] = useSearchParams();

  const minQuestionCount =
    Number(searchParams.get(MIN_QUESTION_COUNT)) || defaultMinQuestionCount;
  const maxQuestionCount =
    Number(searchParams.get(MAX_QUESTION_COUNT)) || defaultMaxQuestionCount;

  const tagsParam = searchParams.get(TAGS);
  const tags = tagsParam ? tagsParam.split(',').map((p) => Number(p)) : [];

  const setFilters = useCallback(
    (filters: FilterParams) =>
      setSearchParams((sp) => {
        for (const key in filters) {
          const value = filters[key as keyof FilterParams];
          sp.set(key, filterParamToString(value));
        }
        sp.delete(PAGE);
        return sp;
      }),
    [setSearchParams],
  );

  const reset = useCallback(
    () =>
      setSearchParams((sp) => {
        sp.delete(TAGS);
        sp.delete(MIN_QUESTION_COUNT);
        sp.delete(MAX_QUESTION_COUNT);
        sp.delete(PAGE);
        return sp;
      }),
    [setSearchParams],
  );

  return {
    minQuestionCount,
    maxQuestionCount,
    tags,
    setFilters,
    reset,
  };
}
