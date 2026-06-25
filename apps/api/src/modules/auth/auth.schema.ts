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
  })
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  .transform(({ confirmPassword, ...data }) => data);
export type SignUpSchema = z.infer<typeof SignUpSchema>;

export const SignInSchema = z.object({
  login: z.string(),
  password: z.string(),
});
export type SignInSchema = z.infer<typeof SignInSchema>;
