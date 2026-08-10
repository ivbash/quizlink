import z from 'zod';

export const TagNameSchema = z
  .string()
  .min(2, { error: 'Минимум 2 символа' })
  .max(50, { error: 'Максимум 50 символов' });
