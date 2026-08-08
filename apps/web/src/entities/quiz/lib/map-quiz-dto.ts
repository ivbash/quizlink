import type { QuizDto, QuizListDto } from '../api/types';
import type { Quiz, QuizList } from '../model/types';

export function mapQuizDto({ createdAt, updatedAt, ...dto }: QuizDto): Quiz {
  return {
    ...dto,
    createdAt: new Date(createdAt),
    updatedAt: new Date(updatedAt),
  };
}

export function mapQuizListDto({
  createdAt,
  updatedAt,
  ...dto
}: QuizListDto): QuizList {
  return {
    ...dto,
    createdAt: new Date(createdAt),
    updatedAt: new Date(updatedAt),
  };
}
