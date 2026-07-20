import { Trash2Icon } from 'lucide-react';
import { toast } from 'sonner';
import type { Tag } from '@/entities/tag';
import { extractErrorMessage } from '@/shared/lib/error';
import { Button } from '@/shared/ui/button';
import { useDeleteTag } from '../model/use-delete-tag';

interface DeleteTagButtonProps {
  tag: Tag;
  isIcon?: boolean;
  onDelete?: () => void;
}

export function DeleteTagButton({
  tag,
  isIcon,
  onDelete,
}: DeleteTagButtonProps) {
  const { mutate: deleteTag, isPending } = useDeleteTag();

  const handleConfirmDelete = () => {
    deleteTag(tag.id, {
      onSuccess: () => {
        toast.success('Тег успешно удален');
        onDelete?.();
      },
      onError: (error) => {
        console.log(error);
        toast.error('Ошибка удаления', {
          description: extractErrorMessage(error, 'Что-то пошло не так...'),
        });
      },
    });
  };

  return (
    <Button
      title="Удалить"
      variant="destructive"
      size={isIcon ? 'icon' : 'default'}
      onClick={handleConfirmDelete}
      disabled={isPending}
    >
      {isIcon ? (
        <>
          <Trash2Icon />
          <span className="sr-only">Удалить</span>
        </>
      ) : (
        'Удалить'
      )}
    </Button>
  );
}
