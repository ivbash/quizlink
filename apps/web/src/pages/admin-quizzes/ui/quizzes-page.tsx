import { Link } from 'react-router';
import { useQuizzes } from '@/entities/quiz';
import {
  Pagination,
  SearchField,
  SelectPageSize,
  useListParams,
} from '@/features/admin-list-controls';
import { routes } from '@/shared/config/routes';
import { useAdminDocumentTitle } from '@/shared/lib/use-document-title';
import { AdminListLayout } from '@/shared/ui/admin/admin-list-layout';
import { AdminPageTitle } from '@/shared/ui/admin/admin-page-title';
import { ErrorMessage } from '@/shared/ui/admin/error-message';
import { Loader } from '@/shared/ui/admin/loader';
import { buttonVariants } from '@/shared/ui/button';
import { QuizTable } from '@/widgets/quiz-table';

export function QuizzesPage() {
  useAdminDocumentTitle('Викторины');

  const { page, pageSize, search } = useListParams();

  const { data, isPending, isError, error } = useQuizzes({
    page,
    pageSize,
    search,
  });

  return isPending ? (
    <Loader />
  ) : isError ? (
    <ErrorMessage error={error} />
  ) : (
    <>
      <AdminPageTitle
        title="Викторины"
        subtitle={`Найдено записей: ${data.count}`}
      />
      <AdminListLayout
        header={
          <>
            <SearchField placeholder="Название, описание" />
            <Link to={routes.editor.create()} className={buttonVariants()}>
              Создать
            </Link>
          </>
        }
        content={<QuizTable quizzes={data.quizzes} />}
        footer={
          <>
            <SelectPageSize className="mr-auto" />
            <Pagination
              count={Math.ceil(data.count / pageSize) || 1}
              page={page}
            />
          </>
        }
      />
    </>
  );
}
