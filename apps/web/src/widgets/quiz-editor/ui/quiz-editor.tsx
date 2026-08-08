import type { Quiz } from '@/entities/quiz';
import { useQuizEditor } from '../lib/use-quiz-editor';
import { EditorContentHeader } from './editor-content-header';
import { EditorLayout } from './editor-layout';
import { EditorSidebarFooter } from './editor-sidebar-footer';
import { EditorSidebarHeader } from './editor-sidebar-header';
import { QuestionForm } from './question-form';
import { QuestionList } from './question-list';
import { QuizEditorProvider } from './quiz-editor-provider';
import { SettingsForm } from './settings-form';

interface QuizEditorProps {
  className?: string;
  quiz?: Quiz;
}

export function QuizEditor(props: QuizEditorProps) {
  return (
    <QuizEditorProvider {...props}>
      <QuizEditorInternal {...props} />
    </QuizEditorProvider>
  );
}

function QuizEditorInternal(props: QuizEditorProps) {
  const currentQuestionId = useQuizEditor(
    ({ currentQuestionId }) => currentQuestionId,
  );
  const settings = useQuizEditor(({ settings }) => settings);
  const questions = useQuizEditor(({ questions }) => questions);

  const question = questions.find((q) => q.editorId === currentQuestionId);

  return (
    <EditorLayout
      {...props}
      sidebarHeader={<EditorSidebarHeader />}
      sidebarContent={<QuestionList />}
      sidebarFooter={<EditorSidebarFooter />}
      contentHeader={<EditorContentHeader />}
      content={
        question ? (
          <QuestionForm key={question.editorId} question={question} />
        ) : (
          <SettingsForm settings={settings} />
        )
      }
    />
  );
}
