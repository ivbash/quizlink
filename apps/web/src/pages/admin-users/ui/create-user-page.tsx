import { CreateUserForm } from '@/features/create-user';
import { useAdminDocumentTitle } from '@/shared/lib/use-document-title';
import { AdminPageTitle } from '@/shared/ui/admin/admin-page-title';

export function CreateUserPage() {
  useAdminDocumentTitle('Создать пользователя');

  return (
    <>
      <AdminPageTitle title="Создать пользователя" />
      <CreateUserForm />
    </>
  );
}
