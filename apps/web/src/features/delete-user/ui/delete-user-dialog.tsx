import { Trash2Icon } from 'lucide-react';
import type { User } from '@/entities/user';
import { Toast } from '@/shared/lib/toast';
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
import { useDeleteUser } from '../model/use-delete-user';

interface DeleteUserDialogProps {
  user: User;
  isIcon?: boolean;
  onDelete?: () => void;
}

export function DeleteUserDialog({
  user,
  isIcon,
  onDelete,
}: DeleteUserDialogProps) {
  const { mutate: deleteUser, isPending } = useDeleteUser();

  const handleConfirmDelete = () => {
    deleteUser(user.id, {
      onSuccess: () => {
        Toast.success('Пользователь успешно удален');
        onDelete?.();
      },
      onError: (error) => {
        console.log(error);
        Toast.error('Ошибка удаления', error);
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
            Вы уверены, что хотите удалить пользователя?
          </AlertDialogTitle>
          <AlertDialogDescription>
            Это действие невозможно отменить. Пользователь{' '}
            <strong className="text-foreground">{user.username}</strong> будет
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
