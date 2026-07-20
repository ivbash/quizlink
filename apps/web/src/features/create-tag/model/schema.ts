import z from 'zod';
import { TagNameSchema } from '@/entities/tag';

export const CreateTagSchema = z.object({
  name: TagNameSchema,
});
export type CreateTagSchema = z.infer<typeof CreateTagSchema>;
