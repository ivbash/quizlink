import { Link } from 'react-router';
import { useTags } from '@/entities/tag';
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
import { TagTable } from '@/widgets/tag-table';

export function TagsPage() {
  useAdminDocumentTitle('Теги');

  const { page, pageSize, search } = useListParams();

  const { data, isPending, isError, error } = useTags({
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
        title="Теги"
        subtitle={`Найдено записей: ${data.count}`}
      />
      <AdminListLayout
        header={
          <>
            <SearchField placeholder="Название" />
            <Link to={routes.admin.createTag()} className={buttonVariants()}>
              Создать
            </Link>
          </>
        }
        content={<TagTable tags={data.tags} />}
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
