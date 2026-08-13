import { createStore } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import type { Quiz } from '@/entities/quiz';
import { isUndefined } from '@/shared/lib/utils';
import { createQuestion } from '../lib/create-question';
import { mapQuiz } from '../lib/map-quiz';
import { SETTINGS_TITLE } from './constants';
import type {
  EditorQuestion,
  EditorQuiz,
  UpdateQuestionPayload,
  UpdateQuizPayload,
} from './types';

export interface QuizEditorState {
  settings: EditorQuiz;
  questions: EditorQuestion[];
  title: string;
  currentQuestionId: string | null;
  isEdit: boolean;
}

export interface QuizEditorActions {
  updateSettings: (payload: UpdateQuizPayload) => void;
  addQuestion: () => EditorQuestion;
  updateQuestion: (id: string, payload: UpdateQuestionPayload) => void;
  removeQuestion: (id: string) => void;
  moveQuestion: (from: number, to: number) => void;
  setCurrentQuestionId: (currentId: string | null) => void;
  validate: () => Promise<boolean>;
  setValidate: (validate: () => Promise<boolean>) => void;
  getInitialState: () => QuizEditorState;
}

export type QuizEditorStore = ReturnType<typeof createQuizEditorStore>;

export function createQuizEditorStore(quiz?: Quiz) {
  const defaultState: QuizEditorState = quiz
    ? mapQuiz(quiz)
    : {
        settings: { title: '', description: '', tags: [] },
        questions: [],
        title: SETTINGS_TITLE,
        currentQuestionId: null,
        isEdit: false,
      };

  return createStore<QuizEditorState & QuizEditorActions>()(
    immer((set, get, store) => ({
      ...defaultState,

      updateSettings: (payload) => {
        set(({ settings }) => {
          Object.assign(settings, payload);
        });
      },

      addQuestion: () => {
        const question = createQuestion();

        set(({ questions }) => {
          question.sortOrder = questions.length + 1;
          questions.push(question);
        });

        return question;
      },

      updateQuestion: (id, payload) => {
        const { questions, currentQuestionId } = get();
        const idx = questions.findIndex((q) => q.editorId === id);
        if (idx === -1) return;

        if (id === currentQuestionId && !isUndefined(payload.text)) {
          set({ title: payload.text });
        }

        set(({ questions }) => {
          const question = questions[idx];
          if (question) Object.assign(question, payload);
        });
      },

      removeQuestion: (id) => {
        const { questions, currentQuestionId, setCurrentQuestionId } = get();
        const idx = questions.findIndex((q) => q.editorId === id);
        if (idx === -1) return;

        if (id === currentQuestionId) {
          const nextQuestion = questions[idx + 1] ?? questions[idx - 1];
          if (nextQuestion) {
            setCurrentQuestionId(nextQuestion.editorId);
          } else {
            setCurrentQuestionId(null);
          }
        }

        set(({ questions }) => {
          questions.splice(idx, 1);
        });
      },

      moveQuestion: (from, to) => {
        if (from === to) return;

        set(({ questions }) => {
          const question = questions.splice(from, 1)[0];
          if (!question) return;
          questions.splice(to, 0, question);

          const start = Math.min(from, to);
          const end = Math.max(from, to);
          for (let i = start; i <= end; i++) {
            questions[i]!.sortOrder = i + 1;
          }
        });
      },

      setCurrentQuestionId: (currentId) => {
        if (!currentId) {
          return set({ title: SETTINGS_TITLE, currentQuestionId: null });
        }

        const { questions } = get();
        const question = questions.find((q) => q.editorId === currentId);
        if (!question) return;

        set({ title: question.text, currentQuestionId: currentId });
      },

      validate: () => Promise.resolve(true),

      setValidate: (validate) => set({ validate }),

      getInitialState: () => store.getInitialState(),
    })),
  );
}
