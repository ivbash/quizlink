import { useNavigate, useParams } from 'react-router';
import { useTag } from '@/entities/tag';
import { DeleteTagDialog } from '@/features/delete-tag';
import { UpdateTagForm } from '@/features/update-tag';
import { routes } from '@/shared/config/routes';
import {
  AdminPageTitle,
  TimestampSubtitle,
} from '@/shared/ui/admin/admin-page-title';
import { ErrorMessage } from '@/shared/ui/admin/error-message';
import { Loader } from '@/shared/ui/admin/loader';

export function UpdateTagPage() {
  const { tagId } = useParams();
  const navigate = useNavigate();

  if (!tagId) throw new Error('Params not found');

  const { data: tag, isPending, isError, error } = useTag(Number(tagId));

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
        title={tag.name}
        subtitle={<TimestampSubtitle timestamp={tag} />}
      />
      <UpdateTagForm
        tag={tag}
        actions={
          <DeleteTagDialog
            tag={tag}
            onDelete={() => navigate(routes.admin.tags())}
          />
        }
      />
    </>
  );
}
