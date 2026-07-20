import { useMemo } from 'react';
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronsLeftIcon,
  ChevronsRightIcon,
} from 'lucide-react';
import { range } from '@/shared/lib/ui/use-pagination';
import { Button } from '@/shared/ui/button';
import { ButtonGroup } from '@/shared/ui/button-group';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/shared/ui/select';

export interface SelectingPaginationProps {
  count: number;
  page?: number | undefined;
  onChange?: ((page: number) => void) | undefined;
}

export function SelectingPagination({
  count,
  page = 1,
  onChange,
}: SelectingPaginationProps) {
  const pages = useMemo(
    () =>
      range(1, count).map((page) => (
        <SelectItem key={page} value={`${page}`}>
          {page}
        </SelectItem>
      )),
    [count],
  );

  return (
    <ButtonGroup>
      <Button
        variant="outline"
        size="icon-sm"
        onClick={() => onChange?.(1)}
        disabled={!(page > 1)}
      >
        <ChevronsLeftIcon />
        <span className="sr-only">Первая страница</span>
      </Button>
      <Button
        variant="outline"
        size="icon-sm"
        className="border-r-0!"
        onClick={() => onChange?.(page - 1)}
        disabled={!(page > 1)}
      >
        <ChevronLeftIcon />
        <span className="sr-only">Предыдущая страница</span>
      </Button>
      <Select
        value={`${page}`}
        onValueChange={(page) => onChange?.(Number(page) || 1)}
      >
        <SelectTrigger size="sm" className="border-l!">
          <SelectValue placeholder="Страница" />
        </SelectTrigger>
        <SelectContent align="center" className="min-w-16">
          {pages}
        </SelectContent>
      </Select>
      <Button
        variant="outline"
        size="icon-sm"
        onClick={() => onChange?.(page + 1)}
        disabled={!(page < count)}
      >
        <ChevronRightIcon />
        <span className="sr-only">Следующая страница</span>
      </Button>
      <Button
        variant="outline"
        size="icon-sm"
        onClick={() => onChange?.(count)}
        disabled={!(page < count)}
      >
        <ChevronsRightIcon />
        <span className="sr-only">Последняя страница</span>
      </Button>
    </ButtonGroup>
  );
}
