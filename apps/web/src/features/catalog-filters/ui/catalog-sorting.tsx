import type { QuizSorting } from '@/entities/quiz';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/shared/ui/select';
import { useSorting } from '../model/use-sorting';

interface SortingItem {
  label: string;
  value: QuizSorting;
}

const sorting = [
  // { label: 'Популярные', value: 'popular' },
  { label: 'Новые', value: 'new' },
  { label: 'Больше вопросов', value: 'questions-desc' },
  { label: 'Меньше вопросов', value: 'questions-asc' },
] satisfies SortingItem[];

export function CatalogSorting() {
  const { sort, setSorting } = useSorting();

  return (
    <Select
      items={sorting}
      value={sort}
      onValueChange={(value) => setSorting(value)}
    >
      <SelectTrigger>
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {sorting.map(({ label, value }) => (
            <SelectItem key={value} value={value}>
              {label}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
