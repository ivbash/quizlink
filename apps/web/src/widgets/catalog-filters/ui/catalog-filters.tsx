import { CatalogFilterForm } from '@/features/catalog-filters';
import { cn } from '@/shared/lib/css';
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/ui/card';
import { useFilterData } from '../model/use-filter-data';
import { CatalogFiltersSkeleton } from './catalog-filters-skeleton';

export function CatalogFilters({ className }: { className?: string }) {
  const { tags, minQuestionCount, maxQuestionCount, isPending, isError } =
    useFilterData();

  return (
    <Card className={cn('[--card-spacing:--spacing(4)]', className)}>
      <CardHeader>
        <CardTitle>Фильтры</CardTitle>
      </CardHeader>
      <CardContent>
        {isPending ? (
          <CatalogFiltersSkeleton />
        ) : isError ? (
          // <ErrorMessage error={error} />
          <CatalogFiltersSkeleton />
        ) : (
          <CatalogFilterForm
            tags={tags}
            minQuestionCount={minQuestionCount}
            maxQuestionCount={maxQuestionCount}
          />
        )}
      </CardContent>
    </Card>
  );
}
