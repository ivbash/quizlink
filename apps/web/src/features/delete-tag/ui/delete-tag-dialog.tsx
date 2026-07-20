import { Trash2Icon } from 'lucide-react';
import { toast } from 'sonner';
import type { Tag } from '@/entities/tag';
import { extractErrorMessage } from '@/shared/lib/error';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/shared/ui/alert-dialog';
import { Button } from '@/shared/ui/button';
import { useDeleteTag } from '../model/use-delete-tag';

interface DeleteTagDialogProps {
  tag: Tag;
  isIcon?: boolean;
  onDelete?: () => void;
}

export function DeleteTagDialog({
  tag,
  isIcon,
  onDelete,
}: DeleteTagDialogProps) {
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
    <AlertDialog>
      <AlertDialogTrigger
        render={
          <Button
            title="Удалить"
            variant="destructive"
            size={isIcon ? 'icon' : 'default'}
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
        }
      />
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Вы уверены, что хотите удалить тег?
          </AlertDialogTitle>
          <AlertDialogDescription>
            Это действие невозможно отменить. Тег{' '}
            <strong className="text-foreground">{tag.name}</strong> будет
            безвозвратно удален из базы данных.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={isPending}>Отмена</AlertDialogCancel>
          <AlertDialogAction onClick={handleConfirmDelete} disabled={isPending}>
            {isPending ? 'Удаление...' : 'Удалить'}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
