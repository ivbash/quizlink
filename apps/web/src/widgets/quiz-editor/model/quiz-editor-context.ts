import { createContext } from 'react';
import type { QuizEditorStore } from './quiz-editor-store';

export const QuizEditorContext = createContext<QuizEditorStore | null>(null);
