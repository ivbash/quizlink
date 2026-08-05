import type {
  QuizTag,
  UpdateQuestionDto,
  UpdateQuizDto,
} from '@/entities/quiz';
import { isUndefined } from '@/shared/lib/utils';
import type { EditorQuestion } from '../model/types';
import { removeUndefined } from './remove-undefined';

export function compareValues<T>(current: T, initial: T): T | undefined {
  return current !== initial ? current : undefined;
}

export function compareTags(
  current: QuizTag[],
  initial: QuizTag[],
): UpdateQuizDto['tags'] {
  return {
    add: getArrayDifference(current, initial).map(({ id }) => id),
    del: getArrayDifference(initial, current).map(({ id }) => id),
  };
}

export function compareQuestions(
  current: EditorQuestion[],
  initial: EditorQuestion[],
): UpdateQuizDto['questions'] {
  return {
    add: current.filter(({ id }) => !id),
    upd: current
      .map((c) => {
        if (!c.id) return null;

        const initialQuestion = initial.find((i) => i.id === c.id);
        if (!initialQuestion) return null;

        return compareQuestion(c, initialQuestion);
      })
      .filter((c) => c) as UpdateQuestionDto[],
    // В initial, EditorQuestion.id всегда существует
    del: getArrayDifference(initial, current).map(({ id }) => id!),
  };
}

function compareQuestion(
  current: EditorQuestion,
  initial: EditorQuestion,
): UpdateQuestionDto | null {
  const id = current.id;
  if (!id) throw new Error('question.id not defined');

  const text = compareValues(current.text, initial.text);
  const time = compareValues(current.time, initial.time);

  const isAnswersEqual =
    current.answers.length === initial.answers.length &&
    current.answers.every((curAnswer, i) => {
      const initAnswer = initial.answers[i];
      return (
        curAnswer.text === initAnswer?.text &&
        curAnswer.isCorrect === initAnswer.isCorrect
      );
    });

  const dto = removeUndefined({
    id,
    text,
    time,
    answers: isAnswersEqual ? undefined : current.answers,
  }) as UpdateQuestionDto;

  return isEmptyUpdateQuestionDto(dto) ? null : dto;
}

function getArrayDifference<T extends { id?: unknown }>(
  arr1: T[],
  arr2: T[],
): T[] {
  return arr1.filter((i1) => !arr2.find((i2) => i2.id === i1.id));
}

function isEmptyUpdateQuestionDto(dto: UpdateQuestionDto) {
  return (
    isUndefined(dto.text) && isUndefined(dto.time) && isUndefined(dto.answers)
  );
}
