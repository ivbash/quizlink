/* eslint-disable react-x/no-array-index-key */
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

interface CatalogPaginationProps {
  count: number;
  page: number;
  getPageUrl: (page: number) => string;
}

export function CatalogPagination({
  count,
  page,
  getPageUrl,
}: CatalogPaginationProps) {
  const pagination = usePagination({ count, page });

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem className="hidden min-[390px]:list-item">
          <PaginationPrevious to={getPageUrl(page === 1 ? 1 : page - 1)} />
        </PaginationItem>
        {pagination.map((p, i) =>
          p ? (
            <PaginationItem key={i}>
              <PaginationLink to={getPageUrl(p)} isActive={p === page}>
                {p}
              </PaginationLink>
            </PaginationItem>
          ) : (
            <PaginationItem key={i}>
              <PaginationEllipsis />
            </PaginationItem>
          ),
        )}
        <PaginationItem className="hidden min-[390px]:list-item">
          <PaginationNext to={getPageUrl(page === count ? count : page + 1)} />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
