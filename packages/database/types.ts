export interface QuestionAnswer {
  text: string;
  isCorrect: boolean;
}

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace PrismaJson {
    type QuestionAnswers = QuestionAnswer[];
  }
}
