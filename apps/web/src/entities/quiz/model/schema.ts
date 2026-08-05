import z from 'zod';

export const QuizTitleSchema = z
  .string()
  .min(2, { error: 'Минимум 2 символа' })
  .max(200, { error: 'Максимум 200 символов' });

export const QuizDescriptionSchema = z
  .string()
  .min(2, { error: 'Минимум 2 символа' })
  .max(800, { error: 'Максимум 800 символов' });

export const QuestionTextSchema = z
  .string()
  .min(2, { error: 'Минимум 2 символа' })
  .max(400, { error: 'Максимум 400 символов' });

export const QuestionTimeSchema = z
  .int()
  .nonnegative({ error: 'Время не должно быть отрицательным' })
  .max(1800, { error: 'Максимум 1800 секунд' });

export const AnswerTextSchema = z
  .string()
  .min(1, { error: 'Минимум 1 символ' })
  .max(200, { error: 'Максимум 200 символов' });

export const AnswerIsCorrectSchema = z.boolean();
