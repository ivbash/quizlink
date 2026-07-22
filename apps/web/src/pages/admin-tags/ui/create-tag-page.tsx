import { CreateTagForm } from '@/features/create-tag';
import { useAdminDocumentTitle } from '@/shared/lib/use-document-title';
import { AdminPageTitle } from '@/shared/ui/admin/admin-page-title';

export function CreateTagPage() {
  useAdminDocumentTitle('Создать тег');

  return (
    <>
      <AdminPageTitle title="Создать тег" />
      <CreateTagForm />
    </>
  );
}
