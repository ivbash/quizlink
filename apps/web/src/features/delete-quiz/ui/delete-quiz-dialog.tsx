import { Trash2Icon } from 'lucide-react';
import type { Quiz } from '@/entities/quiz';
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
import { useDeleteQuiz } from '../model/use-delete-quiz';

interface DeleteQuizDialogProps {
  quiz: Pick<Quiz, 'id' | 'title'>;
  isIcon?: boolean;
  onDelete?: () => void;
}

export function DeleteQuizDialog({
  quiz,
  isIcon,
  onDelete,
}: DeleteQuizDialogProps) {
  const { mutate: deleteQuiz, isPending } = useDeleteQuiz();

  const handleConfirmDelete = () => {
    deleteQuiz(quiz.id, {
      onSuccess: () => {
        Toast.success('Викторина успешно удалена');
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
            Вы уверены, что хотите удалить викторину?
          </AlertDialogTitle>
          <AlertDialogDescription>
            Это действие невозможно отменить. Викторина{' '}
            <strong className="text-foreground">{quiz.title}</strong> будет
            безвозвратно удалена из базы данных.
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
