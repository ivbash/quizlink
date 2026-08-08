import type { UpdateQuizDto } from '@/entities/quiz';
import { isEmpty, isUndefined } from '@/shared/lib/utils';
import type { EditorData } from '../model/types';
import { compareQuestions, compareTags, compareValues } from './compare';
import { removeUndefined } from './remove-undefined';

export function toUpdateQuizDto(
  initial: EditorData,
  current: EditorData,
): UpdateQuizDto | null {
  const id = initial.settings.id;
  if (!id) throw new Error('settings.id not defined');

  const title = compareValues(current.settings.title, initial.settings.title);
  const description = compareValues(
    current.settings.description,
    initial.settings.description,
  );
  const tags = compareTags(current.settings.tags, initial.settings.tags);
  const questions = compareQuestions(current.questions, initial.questions);

  const dto = removeUndefined({
    id,
    title,
    description,
    tags,
    questions,
  }) as UpdateQuizDto;

  console.log(dto);

  return isEmptyUpdateQuizDto(dto) ? null : dto;
}

function isEmptyUpdateQuizDto(dto: UpdateQuizDto) {
  return (
    isUndefined(dto.title) &&
    isUndefined(dto.description) &&
    isEmpty(dto.tags.add) &&
    isEmpty(dto.tags.del) &&
    isEmpty(dto.questions.add) &&
    isEmpty(dto.questions.upd) &&
    isEmpty(dto.questions.del)
  );
}
