import z from 'zod';

export const UserNameSchema = z
  .string()
  .min(2, { error: 'Минимум 2 символа' })
  .max(32, { error: 'Максимум 32 символа' });

export const UserEmailSchema = z
  .email({ error: 'Некорректный email' })
  .max(255, { error: 'Максимум 255 символов' });

export const UserPasswordSchema = z
  .string()
  .min(8, { error: 'Минимум 8 символов' })
  .max(255, { error: 'Максимум 255 символов' });

export const UserRoleSchema = z.enum(['user', 'admin']);
