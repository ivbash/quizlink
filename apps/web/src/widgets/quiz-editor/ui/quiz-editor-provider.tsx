import { useState } from 'react';
import type { Quiz } from '@/entities/quiz';
import { QuizEditorContext } from '../model/quiz-editor-context';
import { createQuizEditorStore } from '../model/quiz-editor-store';

export function QuizEditorProvider({
  children,
  quiz,
}: {
  children?: React.ReactNode;
  quiz?: Quiz;
}) {
  const [store] = useState(() => createQuizEditorStore(quiz));

  return <QuizEditorContext value={store}>{children}</QuizEditorContext>;
}
