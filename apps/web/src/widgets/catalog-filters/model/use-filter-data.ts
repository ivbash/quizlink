import { useQuestionCountRange } from '@/entities/quiz';
import { useTags, type Tag } from '@/entities/tag';

type FilterDataState =
  | {
      tags: Tag[];
      minQuestionCount: number;
      maxQuestionCount: number;
      isPending: false;
      isError: false;
      error: null;
    }
  | {
      tags: Tag[] | undefined;
      minQuestionCount: number | undefined;
      maxQuestionCount: number | undefined;
      isPending: true;
      isError: false;
      error: null;
    }
  | {
      tags: Tag[] | undefined;
      minQuestionCount: number | undefined;
      maxQuestionCount: number | undefined;
      isPending: false;
      isError: true;
      error: Error;
    };

export function useFilterData(): FilterDataState {
  const {
    data: tagsData,
    isPending: isPendingTags,
    isError: isErrorTags,
    error: errorTags,
  } = useTags({ pageSize: 100 });
  const {
    data: range,
    isPending: isPendingRange,
    isError: isErrorRange,
    error: errorRange,
  } = useQuestionCountRange();

  const isPending = isPendingTags || isPendingRange;
  const isError = isErrorTags || isErrorRange;
  const error = errorTags || errorRange;

  return {
    tags: tagsData?.tags,
    minQuestionCount: range?.min,
    maxQuestionCount: range?.max,
    isPending,
    isError,
    error,
  } as FilterDataState;
}
