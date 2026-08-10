import z from 'zod';
import { UserRole } from '@repo/database';
import { COMMON_ERROR_MESSAGES } from '@/libs/error-messages';

const ERROR_MESSAGES = {
  SEARCH_MAX: 'search: должен быть меньше 255 символов.',
  EMAIL: 'email: должен быть корректным, до 255 символов.',
  PASSWORD: 'password: должен быть строкой от 4 до 255 символов.',
  USERNAME: 'username: должен быть строкой от 2 до 32 символов.',
  ROLE: 'role: должен быть "user" | "admin"',
};

export const UserParamsSchema = z.object({
  id: z.uuidv7({ error: COMMON_ERROR_MESSAGES.UUID_V7_ID }),
});
export type UserParamsSchema = z.infer<typeof UserParamsSchema>;

export const UserQuerySchema = z.object({
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
    .max(255, { error: ERROR_MESSAGES.SEARCH_MAX })
    .default(''),
});
export type UserQuerySchema = z.infer<typeof UserQuerySchema>;

export const CreateUserSchema = z.object({
  email: z
    .email({ error: ERROR_MESSAGES.EMAIL })
    .max(255, { error: ERROR_MESSAGES.EMAIL }),
  password: z
    .string({ error: ERROR_MESSAGES.PASSWORD })
    .min(4, { error: ERROR_MESSAGES.PASSWORD })
    .max(255, { error: ERROR_MESSAGES.PASSWORD }),
  username: z
    .string({ error: ERROR_MESSAGES.USERNAME })
    .min(2, { error: ERROR_MESSAGES.USERNAME })
    .max(32, { error: ERROR_MESSAGES.USERNAME }),
  role: z.enum(UserRole, { error: ERROR_MESSAGES.ROLE }).default('user'),
});
export type CreateUserSchema = z.infer<typeof CreateUserSchema>;

export const UpdateUserSchema = CreateUserSchema.extend({
  role: z.enum(UserRole, { error: ERROR_MESSAGES.ROLE }),
}).partial();
export type UpdateUserSchema = z.infer<typeof UpdateUserSchema>;
