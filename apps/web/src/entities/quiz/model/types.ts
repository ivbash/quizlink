export type QuizId = string;
export type QuestionId = string;

interface Owner {
  id: string;
  username: string;
}

export interface QuizTag {
  id: number;
  name: string;
}

export interface Question {
  id: QuestionId;
  text: string;
  time: number;
  answers: Answer[];
}

interface Answer {
  text: string;
  isCorrect: boolean;
}

interface QuizBase {
  id: QuizId;
  title: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
  createdById: string;
  createdBy: Owner;
  tags: QuizTag[];
}

export interface QuizList extends QuizBase {
  questionCount: number;
}

export interface Quiz extends QuizBase {
  questions: Question[];
}
