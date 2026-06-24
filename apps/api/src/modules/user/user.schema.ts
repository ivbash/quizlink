import z from 'zod';
import { UserRole } from '@repo/database';

export const UserParamsSchema = z.object({
  id: z.uuidv7(),
});
export type UserParamsSchema = z.infer<typeof UserParamsSchema>;

export const UserQuerySchema = z.object({
  page: z.int().min(1).default(1),
  pageSize: z.int().min(1).max(100).default(10),
});
export type UserQuerySchema = z.infer<typeof UserQuerySchema>;

export const CreateUserSchema = z.object({
  email: z.email(),
  password: z.string(),
  username: z.string(),
  role: z.enum(UserRole).default('user'),
});
export type CreateUserSchema = z.infer<typeof CreateUserSchema>;

export const UpdateUserSchema = CreateUserSchema.partial();
export type UpdateUserSchema = z.infer<typeof UpdateUserSchema>;
