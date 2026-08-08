import { useSiteDocumentTitle } from '@/shared/lib/use-document-title';
import { QuizEditor } from '@/widgets/quiz-editor';

export function CreateQuizEditorPage() {
  useSiteDocumentTitle('Создать викторину');

  return <QuizEditor className="grow" />;
}
