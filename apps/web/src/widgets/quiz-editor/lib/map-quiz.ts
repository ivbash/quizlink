import type { Quiz } from '@/entities/quiz';
import { SETTINGS_TITLE } from '../model/const';
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
    questions: quiz.questions.map(({ answers, ...question }) => ({
      editorId: uuid(),
      answers: [...answers],
      ...question,
    })),
    title: SETTINGS_TITLE,
    currentQuestionId: null,
    isEdit: true,
  };
}
