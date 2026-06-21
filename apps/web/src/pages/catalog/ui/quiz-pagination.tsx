/* eslint-disable react-x/no-array-index-key */
import { routes } from '@/shared/config/routes';
import { usePagination } from '@/shared/lib/ui/use-pagination';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/shared/ui/pagination';

export function QuizPagination() {
  const pagination = usePagination({ count: 20 });

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem className="hidden min-[390px]:list-item">
          <PaginationPrevious to={routes.quizzes()} />
        </PaginationItem>
        {pagination.map((page, i) =>
          page ? (
            <PaginationItem key={i}>
              <PaginationLink to={routes.quizzes()} isActive={page === 1}>
                {page}
              </PaginationLink>
            </PaginationItem>
          ) : (
            <PaginationItem key={i}>
              <PaginationEllipsis />
            </PaginationItem>
          ),
        )}
        <PaginationItem className="hidden min-[390px]:list-item">
          <PaginationNext to={routes.quizzes()} />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
