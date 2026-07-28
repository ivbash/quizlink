import z from 'zod';
import {
  UserEmailSchema,
  UserNameSchema,
  UserPasswordSchema,
} from '@/entities/user';

export const SignInSchema = z.object({
  login: z.string().min(1, { error: 'Введите логин' }),
  password: z.string().min(1, { error: 'Введите пароль' }),
});
export type SignInSchema = z.infer<typeof SignInSchema>;

export const SignUpSchema = z
  .object({
    username: UserNameSchema,
    email: UserEmailSchema,
    password: UserPasswordSchema,
    confirmPassword: z.string(),
  })
  .refine(({ password, confirmPassword }) => password === confirmPassword, {
    path: ['confirmPassword'],
    error: 'Пароли не совпадают',
  });
export type SignUpSchema = z.infer<typeof SignUpSchema>;
