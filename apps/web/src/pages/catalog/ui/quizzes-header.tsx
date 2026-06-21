import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/shared/ui/select';
import { quizzes } from '../model/quizzes';

const sorting = [{ label: 'Популярные', value: 'popular' }];

export function QuizzesHeader() {
  return (
    <div className="flex items-center justify-between">
      <p>
        <span className="tabular-nums">{quizzes.length}</span> викторин(-а/-ы)
      </p>
      <Select items={sorting} defaultValue="popular">
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
    </div>
  );
}
