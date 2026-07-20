import z from 'zod';
import { TagNameSchema } from '@/entities/tag';

export const UpdateTagSchema = z.object({
  id: z.number(),
  name: TagNameSchema,
});
export type UpdateTagSchema = z.infer<typeof UpdateTagSchema>;
