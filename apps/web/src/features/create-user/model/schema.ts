import z from 'zod';
import {
  UserEmailSchema,
  UserNameSchema,
  UserPasswordSchema,
  UserRoleSchema,
} from '@/entities/user';

export const CreateUserSchema = z.object({
  username: UserNameSchema,
  email: UserEmailSchema,
  password: UserPasswordSchema,
  role: UserRoleSchema,
});
export type CreateUserSchema = z.infer<typeof CreateUserSchema>;
