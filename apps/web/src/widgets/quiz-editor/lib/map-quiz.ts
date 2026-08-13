import type { Quiz } from '@/entities/quiz';
import { SETTINGS_TITLE } from '../model/constants';
import type { QuizEditorState } from '../model/quiz-editor-store';
import { uuid } from './uuid';

export function mapQuiz(quiz: Quiz): QuizEditorState {
  return {
    settings: {
      id: quiz.id,
      title: quiz.title,
      description: quiz.description,
      tags: [...quiz.tags],
    },
    questions: quiz.questions
      .map(({ answers, ...question }) => ({
        editorId: uuid(),
        answers: [...answers],
        ...question,
      }))
      .sort((q1, q2) => q1.sortOrder - q2.sortOrder),
    title: SETTINGS_TITLE,
    currentQuestionId: null,
    isEdit: true,
  };
}
