interface OwnerDto {
  id: string;
  username: string;
}

interface TagDto {
  id: string;
  username: string;
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
  createdAt: string;
  updatedAt: string;
  createdById: string;
  createdBy: OwnerDto;
  tags: TagDto[];
}

export interface QuizListDto extends QuizBaseDto {
  _count: {
    questions: number;
  };
}

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

export interface QuizFilters {
  page?: number;
  pageSize?: number;
  search?: string;
}
