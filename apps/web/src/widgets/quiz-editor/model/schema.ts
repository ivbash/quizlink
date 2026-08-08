import z from 'zod';
import {
  AnswerIsCorrectSchema,
  AnswerTextSchema,
  QuestionTextSchema,
  QuestionTimeSchema,
  QuizDescriptionSchema,
  QuizTitleSchema,
} from '@/entities/quiz';

export const QuizSchema = z.object({
  title: QuizTitleSchema,
  description: QuizDescriptionSchema,
  tags: z
    .object({
      id: z.number(),
      name: z.string(),
    })
    .array(),
});
export type QuizSchema = z.infer<typeof QuizSchema>;

export const QuestionSchema = z.object({
  text: QuestionTextSchema,
  time: QuestionTimeSchema,
  answers: z
    .object({
      isCorrect: AnswerIsCorrectSchema,
      text: AnswerTextSchema,
    })
    .array()
    .min(1, { error: 'Должен быть хотя бы один ответ' })
    .refine((answers) => answers.some((answer) => answer.isCorrect === true), {
      error: 'Выберите хотя бы один правильный ответ',
      path: [],
    }),
});
export type QuestionSchema = z.infer<typeof QuestionSchema>;
