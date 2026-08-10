import z from 'zod';
import { COMMON_ERROR_MESSAGES } from '@/libs/error-messages';

const ERROR_MESSAGES = {
  SEARCH_MAX: 'search: должен быть меньше 50 символов.',
  TAG_NAME: 'name: должен быть строкой от 2 до 50 символов.',
};

export const TagParamsSchema = z.object({
  id: z.coerce
    .number({ error: COMMON_ERROR_MESSAGES.INT_ID })
    .int({ error: COMMON_ERROR_MESSAGES.INT_ID })
    .nonnegative({ error: COMMON_ERROR_MESSAGES.INT_ID }),
});
export type TagParamsSchema = z.infer<typeof TagParamsSchema>;

export const TagQuerySchema = z.object({
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
    .max(50, { error: ERROR_MESSAGES.SEARCH_MAX })
    .default(''),
});
export type TagQuerySchema = z.infer<typeof TagQuerySchema>;

export const CreateTagSchema = z.object({
  name: z
    .string({ error: ERROR_MESSAGES.TAG_NAME })
    .min(2, { error: ERROR_MESSAGES.TAG_NAME })
    .max(50, { error: ERROR_MESSAGES.TAG_NAME }),
});
export type CreateTagSchema = z.infer<typeof CreateTagSchema>;

export const UpdateTagSchema = CreateTagSchema.partial();
export type UpdateTagSchema = z.infer<typeof UpdateTagSchema>;
