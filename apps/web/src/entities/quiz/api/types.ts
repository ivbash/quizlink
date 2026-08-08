interface OwnerDto {
  id: string;
  username: string;
}

interface TagDto {
  id: number;
  name: string;
}

interface QuestionDto {
  id: string;
  text: string;
  time: number;
  answers: AnswerDto[];
}

interface AnswerDto {
  text: string;
  isCorrect: boolean;
}

interface QuizBaseDto {
  id: string;
  title: string;
  description: string;
  questionCount: number;
  createdAt: string;
  updatedAt: string;
  createdById: string;
  createdBy: OwnerDto;
  tags: TagDto[];
}

export type QuizListDto = QuizBaseDto;

export interface QuizDto extends QuizBaseDto {
  questions: QuestionDto[];
}

export type CreateQuestionDto = Omit<QuestionDto, 'id'>;

export type UpdateQuestionDto = Partial<CreateQuestionDto> & { id: string };

export interface CreateQuizDto {
  title: string;
  description: string;
  // createdBy: string;
  tags: number[];
  questions: CreateQuestionDto[];
}

export interface UpdateQuizDto {
  id: string;
  title?: string;
  description?: string;
  // createdBy?: string;
  tags: {
    add: number[];
    del: number[];
  };
  questions: {
    add: CreateQuestionDto[];
    upd: UpdateQuestionDto[];
    del: string[];
  };
}

export type QuizSorting = 'new' | 'questions-asc' | 'questions-desc';

export interface QuizFilters {
  page?: number;
  pageSize?: number;
  search?: string;
  tags?: number[];
  minQuestionCount?: number;
  maxQuestionCount?: number;
  sort?: QuizSorting;
}

export interface QuestionCountRangeDto {
  min: number;
  max: number;
}
