import { useParams } from 'react-router';
import { useQuiz } from '@/entities/quiz';
import { useSiteDocumentTitle } from '@/shared/lib/use-document-title';
import { ErrorMessage } from '@/shared/ui/error-message';
import { QuizEditor } from '@/widgets/quiz-editor';
import { QuizEditorSkeleton } from './quiz-editor-skeleton';

export function UpdateQuizEditorPage() {
  const { quizId } = useParams();

  if (!quizId) throw new Error('Params not found');

  const { data: quiz, isPending, isError, error } = useQuiz(quizId);

  useSiteDocumentTitle(quiz?.title ? `Редактировать ${quiz.title}` : undefined);

  return isPending ? (
    <QuizEditorSkeleton />
  ) : isError ? (
    <ErrorMessage error={error} />
  ) : (
    <QuizEditor className="grow" quiz={quiz} />
  );
}
