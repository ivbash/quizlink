import { useParams } from 'react-router';
import { useQuiz } from '@/entities/quiz';
import { useSiteDocumentTitle } from '@/shared/lib/use-document-title';
import { ErrorMessage } from '@/shared/ui/admin/error-message';
import { Loader } from '@/shared/ui/admin/loader';
import { QuizEditor } from '@/widgets/quiz-editor';

export function UpdateQuizEditorPage() {
  const { quizId } = useParams();

  if (!quizId) throw new Error('Params not found');

  const { data: quiz, isPending, isError, error } = useQuiz(quizId);
  useSiteDocumentTitle(quiz?.title ? `Редактировать ${quiz.title}` : undefined);

  if (isPending) {
    return <Loader />;
  }

  if (isError) {
    console.log(error);
    return <ErrorMessage />;
  }

  return <QuizEditor className="grow" quiz={quiz} />;
}
