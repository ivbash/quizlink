import { cn } from '@/shared/lib/css';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/shared/ui/select';
import { useListParams } from '../model/use-list-params';

export function SelectPageSize({ className }: { className?: string }) {
  const { pageSize, setParam } = useListParams();

  const handlePageSizeChange = (pageSize: string | null) => {
    if (!pageSize) return;
    setParam('pageSize', Number(pageSize));
  };

  return (
    <div className={cn('flex shrink-0 items-center gap-2', className)}>
      <Select value={String(pageSize)} onValueChange={handlePageSizeChange}>
        <SelectTrigger size="sm">
          <SelectValue placeholder="Количество" />
        </SelectTrigger>
        <SelectContent align="start" className="min-w-16">
          <SelectItem value="10">10</SelectItem>
          <SelectItem value="25">25</SelectItem>
          <SelectItem value="50">50</SelectItem>
          <SelectItem value="100">100</SelectItem>
        </SelectContent>
      </Select>
      <p className="text-sm">записей на странице</p>
    </div>
  );
}
