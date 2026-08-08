import { CatalogSorting } from '@/features/catalog-filters';

export function CatalogHeader({ quizCount }: { quizCount: number }) {
  return (
    <div className="flex items-center justify-between">
      <p>
        <span className="tabular-nums">{quizCount}</span> викторин(-а/-ы)
      </p>
      <CatalogSorting />
    </div>
  );
}
