-- AlterTable
ALTER TABLE "Quiz" ADD COLUMN "questionCount" INTEGER;

UPDATE "Quiz" qz SET "questionCount" = (
  SELECT COUNT(*)
  FROM "Question" qn
  WHERE qn."quizId" = qz.id
);

ALTER TABLE "Quiz" ALTER COLUMN "questionCount" SET NOT NULL;
