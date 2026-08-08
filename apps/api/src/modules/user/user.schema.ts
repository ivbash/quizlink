import z from 'zod';
import { UserRole } from '@repo/database';

export const UserParamsSchema = z.object({
  id: z.uuidv7(),
});
export type UserParamsSchema = z.infer<typeof UserParamsSchema>;

export const UserQuerySchema = z.object({
  page: z.coerce.number().int().min(1).default(1),
  pageSize: z.coerce.number().int().min(1).max(100).default(10),
  search: z.string().max(50).default(''),
});
export type UserQuerySchema = z.infer<typeof UserQuerySchema>;

export const CreateUserSchema = z.object({
  email: z.email(),
  password: z.string(),
  username: z.string(),
  role: z.enum(UserRole).default('user'),
});
export type CreateUserSchema = z.infer<typeof CreateUserSchema>;

export const UpdateUserSchema = CreateUserSchema.extend({
  role: z.enum(UserRole),
}).partial();
export type UpdateUserSchema = z.infer<typeof UpdateUserSchema>;
