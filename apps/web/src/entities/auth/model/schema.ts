import z from 'zod';

export const SignUpSchema = z
  .object({
    username: z.string(),
    email: z.email(),
    password: z.string(),
    confirmPassword: z.string(),
  })
  .refine(({ password, confirmPassword }) => password === confirmPassword, {
    path: ['confirmPassword'],
  });
export type SignUpSchema = z.infer<typeof SignUpSchema>;
