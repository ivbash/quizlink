import type { Question, QuestionId, Quiz, QuizId } from '@/entities/quiz';

type EditorQuizData = Pick<Quiz, 'title' | 'description' | 'tags'>;

export interface EditorQuiz extends EditorQuizData {
  id?: QuizId;
}

export type UpdateQuizPayload = Partial<EditorQuizData>;

type EditorQuestionData = Omit<Question, 'id'>;

export interface EditorQuestion extends EditorQuestionData {
  editorId: string;
  id?: QuestionId;
}

export type UpdateQuestionPayload = Partial<EditorQuestionData>;

export interface EditorData {
  settings: EditorQuiz;
  questions: EditorQuestion[];
}
