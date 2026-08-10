import z from 'zod';
import { COMMON_ERROR_MESSAGES } from '@/libs/error-messages';

export const MAX_QUESTION_COUNT = 100;
export const MAX_ANSWER_COUNT = 20;

const ERROR_MESSAGES = {
  SEARCH_MAX: 'search: должен быть меньше 200 символов.',
  TAGS: 'tags: должен быть массивом целых чисел.',
  MIN_QUESTION_COUNT: 'minQuestionCount: должен быть целым числом от 0 до 100.',
  MAX_QUESTION_COUNT: 'maxQuestionCount: должен быть целым числом от 0 до 100.',
  SORT: 'sort: должен быть "new" | "questions-asc" | "questions-desc".',
  QUIZ_TITLE: 'title: должен быть строкой от 2 до 200 символов.',
  QUIZ_DESCRIPTION: 'description: должен быть строкой от 2 до 800 символов.',
  QUESTION_TEXT: 'question.text: должен быть строкой от 2 до 400 символов.',
  QUESTION_TIME: 'question.time: должен быть целым числом от 0 до 1800.',
  ANSWER_TEXT: 'answer.text: должен быть строкой от 1 до 200 символов.',
  ANSWER_IS_CORRECT: 'answer.isCorrect: должен быть логическим значением.',
  ANSWERS: 'answers: должен быть массивом.',
  ANSWERS_MAX: `answers: должен быть массивом до ${MAX_ANSWER_COUNT} ответов.`,
  QUESTIONS: 'questions: должен быть массивом.',
  QUESTIONS_MAX: `questions: должен быть массивом до ${MAX_QUESTION_COUNT} вопросов.`,
};

export const QuizParamsSchema = z.object({
  id: z.uuidv7({ error: COMMON_ERROR_MESSAGES.UUID_V7_ID }),
});
export type QuizParamsSchema = z.infer<typeof QuizParamsSchema>;

export const QuizQuerySchema = z.object({
  page: z.coerce
    .number({ error: COMMON_ERROR_MESSAGES.PAGE })
    .int({ error: COMMON_ERROR_MESSAGES.PAGE })
    .min(1, { error: COMMON_ERROR_MESSAGES.PAGE })
    .default(1),
  pageSize: z.coerce
    .number({ error: COMMON_ERROR_MESSAGES.PAGE_SIZE })
    .int({ error: COMMON_ERROR_MESSAGES.PAGE_SIZE })
    .min(1, { error: COMMON_ERROR_MESSAGES.PAGE_SIZE })
    .max(100, { error: COMMON_ERROR_MESSAGES.PAGE_SIZE })
    .default(10),
  search: z
    .string({ error: COMMON_ERROR_MESSAGES.SEARCH_TYPE })
    .max(200, { error: ERROR_MESSAGES.SEARCH_MAX })
    .default(''),
  tags: z
    .preprocess(
      (val: number | number[] | undefined) =>
        Array.isArray(val) ? val : val === undefined ? [] : [val],
      z.array(z.coerce.number({ error: ERROR_MESSAGES.TAGS }), {
        error: ERROR_MESSAGES.TAGS,
      }),
    )
    .default([]),
  minQuestionCount: z.coerce
    .number({ error: ERROR_MESSAGES.MIN_QUESTION_COUNT })
    .int({ error: ERROR_MESSAGES.MIN_QUESTION_COUNT })
    .min(0, { error: ERROR_MESSAGES.MIN_QUESTION_COUNT })
    .max(100, { error: ERROR_MESSAGES.MIN_QUESTION_COUNT })
    .default(0),
  maxQuestionCount: z.coerce
    .number({ error: ERROR_MESSAGES.MAX_QUESTION_COUNT })
    .int({ error: ERROR_MESSAGES.MAX_QUESTION_COUNT })
    .min(0, { error: ERROR_MESSAGES.MAX_QUESTION_COUNT })
    .max(100, { error: ERROR_MESSAGES.MAX_QUESTION_COUNT })
    .default(100),
  sort: z
    .enum(['new', 'questions-asc', 'questions-desc'], {
      error: ERROR_MESSAGES.SORT,
    })
    .default('new'),
});
export type QuizQuerySchema = z.infer<typeof QuizQuerySchema>;

const TagsSchema = z.array(z.int({ error: ERROR_MESSAGES.TAGS }), {
  error: ERROR_MESSAGES.TAGS,
});
const AnswerSchema = z.object({
  text: z.string({ error: ERROR_MESSAGES.ANSWER_TEXT }),
  isCorrect: z.boolean({ error: ERROR_MESSAGES.ANSWER_IS_CORRECT }),
});
const QuestionSchema = z.object({
  text: z
    .string({ error: ERROR_MESSAGES.QUESTION_TEXT })
    .min(2, { error: ERROR_MESSAGES.QUESTION_TEXT })
    .max(400, { error: ERROR_MESSAGES.QUESTION_TEXT }),
  time: z
    .int({ error: ERROR_MESSAGES.QUESTION_TIME })
    .nonnegative({ error: ERROR_MESSAGES.QUESTION_TIME })
    .max(1800, { error: ERROR_MESSAGES.QUESTION_TIME })
    .default(0),
  answers: z
    .array(AnswerSchema, { error: ERROR_MESSAGES.ANSWERS })
    .max(MAX_ANSWER_COUNT, { error: ERROR_MESSAGES.ANSWERS_MAX }),
});

export const CreateQuizSchema = z.object({
  title: z
    .string({ error: ERROR_MESSAGES.QUIZ_TITLE })
    .min(2, { error: ERROR_MESSAGES.QUIZ_TITLE })
    .max(200, { error: ERROR_MESSAGES.QUIZ_TITLE }),
  description: z
    .string({ error: ERROR_MESSAGES.QUIZ_DESCRIPTION })
    .min(2, { error: ERROR_MESSAGES.QUIZ_DESCRIPTION })
    .max(800, { error: ERROR_MESSAGES.QUIZ_DESCRIPTION }),
  // createdBy: z.uuidv7({ error: COMMON_ERROR_MESSAGES.UUID_V7_ID }),
  tags: TagsSchema,
  questions: z
    .array(QuestionSchema, { error: ERROR_MESSAGES.QUESTIONS })
    .max(MAX_QUESTION_COUNT, { error: ERROR_MESSAGES.QUESTIONS_MAX }),
});
export type CreateQuizSchema = z.infer<typeof CreateQuizSchema>;

export const UpdateQuizSchema = CreateQuizSchema.partial().extend({
  tags: z.object({
    add: TagsSchema,
    del: TagsSchema,
  }),
  questions: z.object({
    add: z.array(QuestionSchema),
    upd: z.array(
      QuestionSchema.extend({
        time: z
          .int({ error: ERROR_MESSAGES.QUESTION_TIME })
          .nonnegative({ error: ERROR_MESSAGES.QUESTION_TIME })
          .max(1800, { error: ERROR_MESSAGES.QUESTION_TIME }),
      })
        .partial()
        .extend({ id: z.uuidv7({ error: COMMON_ERROR_MESSAGES.UUID_V7_ID }) }),
    ),
    del: z.array(z.uuidv7({ error: COMMON_ERROR_MESSAGES.UUID_V7_ID })),
  }),
});
export type UpdateQuizSchema = z.infer<typeof UpdateQuizSchema>;
