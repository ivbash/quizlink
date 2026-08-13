import { useNavigate } from 'react-router';
import { useShallow } from 'zustand/react/shallow';
import { useCreateQuiz } from '@/features/create-quiz';
import { useUpdateQuiz } from '@/features/update-quiz';
import { routes } from '@/shared/config/routes';
import { Toast } from '@/shared/lib/toast';
import { Button } from '@/shared/ui/button';
import { toCreateQuizDto } from '../lib/to-create-quiz-dto';
import { toUpdateQuizDto } from '../lib/to-update-quiz-dto';
import { useQuizEditor } from '../lib/use-quiz-editor';

export function EditorSidebarFooter() {
  const data = useQuizEditor(
    useShallow(({ settings, questions }) => ({ settings, questions })),
  );
  const validate = useQuizEditor(({ validate }) => validate);
  const isEdit = useQuizEditor(({ isEdit }) => isEdit);
  const getInitialState = useQuizEditor(
    ({ getInitialState }) => getInitialState,
  );
  const setInitialState = useQuizEditor(
    ({ setInitialState }) => setInitialState,
  );

  const { mutate: createQuiz } = useCreateQuiz();
  const { mutate: updateQuiz } = useUpdateQuiz();

  const navigate = useNavigate();

  const handleSave = async () => {
    if (!(await validate())) return;

    if (isEdit) {
      const dto = toUpdateQuizDto(getInitialState(), data);
      if (!dto) {
        Toast.standart('Данные не изменились');
        return;
      }

      updateQuiz(dto, {
        onSuccess: (quiz) => {
          Toast.success('Викторина сохранена');
          setInitialState(quiz);
        },
        onError: (error) => {
          Toast.error('Ошибка сохранения викторины', error);
        },
      });
    } else {
      createQuiz(toCreateQuizDto(data), {
        onSuccess: (quiz) => {
          Toast.success('Викторина сохранена');
          void navigate(routes.editor.edit(quiz.id));
        },
        onError: (error) => {
          Toast.error('Ошибка сохранения викторины', error);
        },
      });
    }
  };

  return <Button onClick={handleSave}>Сохранить</Button>;
}
