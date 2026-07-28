import { Link } from 'react-router';
import { useUsers } from '@/entities/user';
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
import { UserTable } from '@/widgets/user-table';

export function UsersPage() {
  useAdminDocumentTitle('Пользователи');

  const { page, pageSize, search } = useListParams();

  const { data, isPending, isError, error } = useUsers({
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
        title="Пользователи"
        subtitle={`Найдено записей: ${data.count}`}
      />
      <AdminListLayout
        header={
          <>
            <SearchField placeholder="Имя, Email" />
            <Link to={routes.admin.createUser()} className={buttonVariants()}>
              Создать
            </Link>
          </>
        }
        content={<UserTable users={data.users} />}
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
