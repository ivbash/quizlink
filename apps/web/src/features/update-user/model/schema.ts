import z from 'zod';
import {
  UserEmailSchema,
  UserNameSchema,
  UserPasswordSchema,
  UserRoleSchema,
} from '@/entities/user';

export const UpdateUserSchema = z.object({
  id: z.string(),
  username: UserNameSchema,
  email: UserEmailSchema,
  password: UserPasswordSchema.or(z.literal('')),
  role: UserRoleSchema,
});
export type UpdateUserSchema = z.infer<typeof UpdateUserSchema>;
