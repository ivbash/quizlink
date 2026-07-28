import { useNavigate, useParams } from 'react-router';
import { useUser } from '@/entities/user';
import { DeleteUserDialog } from '@/features/delete-user';
import { UpdateUserForm } from '@/features/update-user';
import { routes } from '@/shared/config/routes';
import { useAdminDocumentTitle } from '@/shared/lib/use-document-title';
import {
  AdminPageTitle,
  TimestampSubtitle,
} from '@/shared/ui/admin/admin-page-title';
import { ErrorMessage } from '@/shared/ui/admin/error-message';
import { Loader } from '@/shared/ui/admin/loader';

export function UpdateUserPage() {
  const { userId } = useParams();
  const navigate = useNavigate();

  if (!userId) throw new Error('Params not found');

  const { data: user, isPending, isError, error } = useUser(userId);
  useAdminDocumentTitle(user?.username);

  if (isPending) {
    return <Loader />;
  }

  if (isError) {
    console.log(error);
    return <ErrorMessage />;
  }

  return (
    <>
      <AdminPageTitle
        title={user.username}
        subtitle={<TimestampSubtitle timestamp={user} />}
      />
      <UpdateUserForm
        user={user}
        actions={
          <DeleteUserDialog
            user={user}
            onDelete={() => navigate(routes.admin.users())}
          />
        }
      />
    </>
  );
}
