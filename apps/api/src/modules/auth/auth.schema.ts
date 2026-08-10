import z from 'zod';

const ERROR_MESSAGES = {
  USERNAME: 'username: должен быть строкой от 2 до 32 символов.',
  EMAIL: 'email: должен быть корректным, до 255 символов.',
  PASSWORD: 'password: должен быть строкой от 8 до 255 символов.',
  CONFIRM_PASSWORD_TYPE: 'confirmPassword: должен быть строкой.',
  CONFIRM_PASSWORD: 'confirmPassword: должен быть равен password.',
  LOGIN: 'login: должен быть строкой до 255 символов.',
  PASSWORD_TYPE: 'password: должен быть строкой.',
};

export const SignUpSchema = z
  .object({
    username: z
      .string({ error: ERROR_MESSAGES.USERNAME })
      .min(2, { error: ERROR_MESSAGES.USERNAME })
      .max(32, { error: ERROR_MESSAGES.USERNAME }),
    email: z
      .email({ error: ERROR_MESSAGES.EMAIL })
      .max(255, { error: ERROR_MESSAGES.EMAIL }),
    password: z
      .string({ error: ERROR_MESSAGES.PASSWORD })
      .min(8, { error: ERROR_MESSAGES.PASSWORD })
      .max(255, { error: ERROR_MESSAGES.PASSWORD }),
    confirmPassword: z.string(ERROR_MESSAGES.CONFIRM_PASSWORD_TYPE),
  })
  .refine(({ password, confirmPassword }) => password === confirmPassword, {
    path: ['confirmPassword'],
    error: ERROR_MESSAGES.CONFIRM_PASSWORD,
  })
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  .transform(({ confirmPassword, ...data }) => data);
export type SignUpSchema = z.infer<typeof SignUpSchema>;

export const SignInSchema = z.object({
  login: z
    .string({ error: ERROR_MESSAGES.LOGIN })
    .max(255, { error: ERROR_MESSAGES.LOGIN }),
  password: z.string({ error: ERROR_MESSAGES.PASSWORD_TYPE }),
});
export type SignInSchema = z.infer<typeof SignInSchema>;
