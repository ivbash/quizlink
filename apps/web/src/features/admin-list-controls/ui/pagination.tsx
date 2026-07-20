import { useListParams } from '../model/use-list-params';
import {
  SelectingPagination,
  type SelectingPaginationProps,
} from './selecting-pagination';

export function Pagination({
  count,
  page,
}: Omit<SelectingPaginationProps, 'onChange'>) {
  const { setParam } = useListParams();

  const handlePageChange = (page: number) => setParam('page', page);

  return (
    <SelectingPagination
      count={count}
      page={page}
      onChange={handlePageChange}
    />
  );
}
