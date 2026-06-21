import { useMemo } from 'react';

export interface UsePaginationParams {
  /** Количество страниц. */
  count: number;

  /** Текущая страница. По умолчанию: 1. */
  page?: number;

  /**
   * Количество страниц с каждой стороны текущей страницы.
   * От параметра зависит размер пагинации.
   * По умолчанию: 1.
   */
  siblingCount?: number;

  /**
   * Количество страниц с каждого края пагинации.
   * От параметра зависит размер пагинации.
   * По умолчанию: 1.
   */
  boundaryCount?: number;
}

export function usePagination({
  count,
  page = 1,
  siblingCount = 1,
  boundaryCount = 1,
}: UsePaginationParams) {
  return useMemo(() => {
    const maxItems = siblingCount * 2 + boundaryCount * 2 + 3;

    if (maxItems >= count) {
      return range(1, count);
    }

    const ellipsis = 0;

    const leftSibling = Math.max(page - siblingCount, 1);
    const rightSibling = Math.min(page + siblingCount, count);

    const leftEllipsis = leftSibling > boundaryCount + 2;
    const rightEllipsis = rightSibling < count - (boundaryCount + 1);

    if (!leftEllipsis && rightEllipsis) {
      const leftItemCount = boundaryCount + siblingCount * 2 + 2;

      return [
        ...range(1, leftItemCount),
        ellipsis,
        ...range(count - boundaryCount + 1, count),
      ];
    }

    if (leftEllipsis && !rightEllipsis) {
      const rightItemCount = boundaryCount + siblingCount * 2 + 2;

      return [
        ...range(1, boundaryCount),
        ellipsis,
        ...range(count - rightItemCount + 1, count),
      ];
    }

    if (leftEllipsis && rightEllipsis) {
      return [
        ...range(1, boundaryCount),
        ellipsis,
        ...range(leftSibling, rightSibling),
        ellipsis,
        ...range(count - boundaryCount + 1, count),
      ];
    }

    return [1];
  }, [count, page, siblingCount, boundaryCount]);
}

/**
 * Возвращает массив с элементами от start до end.
 * @param start Значение первого элемента.
 * @param end Значение последнего элемента.
 * @returns Массив.
 */
function range(start: number, end: number) {
  return Array.from({ length: end - start + 1 }, (_, i) => start + i);
}
