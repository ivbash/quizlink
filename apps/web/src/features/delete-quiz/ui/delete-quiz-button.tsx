import { Trash2Icon } from 'lucide-react';
import type { Quiz } from '@/entities/quiz';
import { Toast } from '@/shared/lib/toast';
import { Button } from '@/shared/ui/button';
import { useDeleteQuiz } from '../model/use-delete-quiz';

interface DeleteQuizButtonProps {
  quiz: Pick<Quiz, 'id'>;
  isIcon?: boolean;
  onDelete?: () => void;
}

export function DeleteQuizButton({
  quiz,
  isIcon,
  onDelete,
}: DeleteQuizButtonProps) {
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
