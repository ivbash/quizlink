import { use } from 'react';
import { useStore } from 'zustand';
import { QuizEditorContext } from '../model/quiz-editor-context';
import type {
  QuizEditorActions,
  QuizEditorState,
} from '../model/quiz-editor-store';

export function useQuizEditor<T>(
  selector: (state: QuizEditorState & QuizEditorActions) => T,
): T {
  const store = use(QuizEditorContext);

  if (!store) {
    throw new Error('useQuizEditor must be used within a QuizEditorProvider');
  }

  return useStore(store, selector);
}
