import z from 'zod';

export const TagParamsSchema = z.object({
  id: z.coerce.number().int().positive(),
});
export type TagParamsSchema = z.infer<typeof TagParamsSchema>;

export const TagQuerySchema = z.object({
  page: z.coerce.number().int().min(1).default(1),
  pageSize: z.coerce.number().int().min(1).max(100).default(10),
  search: z.string().max(50).default(''),
});
export type TagQuerySchema = z.infer<typeof TagQuerySchema>;

export const CreateTagSchema = z.object({
  name: z.string().min(2).max(50),
});
export type CreateTagSchema = z.infer<typeof CreateTagSchema>;

export const UpdateTagSchema = CreateTagSchema.partial();
export type UpdateTagSchema = z.infer<typeof UpdateTagSchema>;
