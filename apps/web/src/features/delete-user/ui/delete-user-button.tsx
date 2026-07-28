import { Trash2Icon } from 'lucide-react';
import type { User } from '@/entities/user';
import { Toast } from '@/shared/lib/toast';
import { Button } from '@/shared/ui/button';
import { useDeleteUser } from '../model/use-delete-user';

interface DeleteUserButtonProps {
  user: User;
  isIcon?: boolean;
  onDelete?: () => void;
}

export function DeleteUserButton({
  user,
  isIcon,
  onDelete,
}: DeleteUserButtonProps) {
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
