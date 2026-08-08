import type {
  CreateQuestionDto,
  CreateQuizDto,
  QuizTag,
} from '@/entities/quiz';
import type { EditorData, EditorQuestion } from '../model/types';

export function toCreateQuizDto(data: EditorData): CreateQuizDto {
  const title = data.settings.title;
  const description = data.settings.description;
  const tags = data.settings.tags.map(mapQuizTag);
  const questions = data.questions.map(mapQuestion);

  return {
    title,
    description,
    tags,
    questions,
  };
}

function mapQuizTag(tag: QuizTag): number {
  return tag.id;
}

function mapQuestion(question: EditorQuestion): CreateQuestionDto {
  return {
    text: question.text,
    time: question.time,
    answers: question.answers,
  };
}
