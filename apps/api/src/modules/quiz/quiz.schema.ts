import z from 'zod';

export const QuizParamsSchema = z.object({
  id: z.uuidv7(),
});
export type QuizParamsSchema = z.infer<typeof QuizParamsSchema>;

export const QuizQuerySchema = z.object({
  page: z.coerce.number().int().min(1).default(1),
  pageSize: z.coerce.number().int().min(1).max(100).default(10),
  search: z.string().max(200).default(''),
});
export type QuizQuerySchema = z.infer<typeof QuizQuerySchema>;

const TagsSchema = z.array(z.int());
const QuestionSchema = z.object({
  text: z.string(),
  time: z.int().default(0),
  answers: z.array(z.object({ text: z.string(), isCorrect: z.boolean() })),
});

export const CreateQuizSchema = z.object({
  title: z.string(),
  description: z.string(),
  // createdBy: z.uuidv7(),
  tags: TagsSchema,
  questions: z.array(QuestionSchema),
});
export type CreateQuizSchema = z.infer<typeof CreateQuizSchema>;

export const UpdateQuizSchema = CreateQuizSchema.partial().extend({
  tags: z.object({
    add: TagsSchema,
    del: TagsSchema,
  }),
  questions: z.object({
    add: z.array(QuestionSchema),
    upd: z.array(
      QuestionSchema.extend({ time: z.int() })
        .partial()
        .extend({ id: z.uuidv7() }),
    ),
    del: z.array(z.uuidv7()),
  }),
});
export type UpdateQuizSchema = z.infer<typeof UpdateQuizSchema>;
