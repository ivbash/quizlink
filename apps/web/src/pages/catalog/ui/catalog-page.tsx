import { QuizCard, useQuizzes } from '@/entities/quiz';
import {
  CatalogPagination,
  useCatalogFilterParams,
  useCurrentPage,
  useSorting,
} from '@/features/catalog-filters';
import { routes } from '@/shared/config/routes';
import { useSiteDocumentTitle } from '@/shared/lib/use-document-title';
import { ErrorMessage } from '@/shared/ui/error-message';
import { Loader } from '@/shared/ui/loader';
import { CatalogFilters } from '@/widgets/catalog-filters';
import { CatalogHeader } from './catalog-header';

const pageSize = 10;

export function CatalogPage() {
  useSiteDocumentTitle('Викторины');

  const { tags, minQuestionCount, maxQuestionCount } = useCatalogFilterParams();
  const { page, getPageUrl } = useCurrentPage();
  const { sort } = useSorting();

  const { data, isPending, isError, error } = useQuizzes({
    page,
    pageSize,
    tags,
    minQuestionCount,
    maxQuestionCount,
    sort,
  });

  return (
    <div className="flex flex-col gap-8 lg:flex-row lg:gap-6">
      <div className="lg:w-64">
        <CatalogFilters className="sticky top-4" />
      </div>
      <div className="@container grow space-y-8">
        {isPending ? (
          <Loader />
        ) : isError ? (
          <ErrorMessage error={error} />
        ) : (
          <>
            <CatalogHeader quizCount={data.count} />
            <div className="grid grid-cols-1 gap-4 @lg:grid-cols-2 @3xl:grid-cols-3">
              {data.quizzes.map((quiz) => (
                <QuizCard key={quiz.id} quiz={quiz} />
              ))}
            </div>
            <CatalogPagination
              count={Math.ceil(data.count / pageSize)}
              page={page}
              getPageUrl={(page) => `${routes.quizzes()}?${getPageUrl(page)}`}
            />
          </>
        )}
      </div>
    </div>
  );
}
