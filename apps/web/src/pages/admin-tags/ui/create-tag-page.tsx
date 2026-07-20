import { CreateTagForm } from '@/features/create-tag';
import { AdminPageTitle } from '@/shared/ui/admin/admin-page-title';

export function CreateTagPage() {
  return (
    <>
      <AdminPageTitle title="Создать тег" />
      <CreateTagForm />
    </>
  );
}
