import { PencilIcon } from 'lucide-react';
import { Link } from 'react-router';
import type { QuizList } from '@/entities/quiz';
import { DeleteQuizDialog } from '@/features/delete-quiz';
import { routes } from '@/shared/config/routes';
import { Badge } from '@/shared/ui/badge';
import { buttonVariants } from '@/shared/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/shared/ui/table';

interface QuizTableProps {
  quizzes: QuizList[];
}

export function QuizTable({ quizzes }: QuizTableProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow className="hover:bg-transparent">
          <TableHead className="w-1/4">Название</TableHead>
          <TableHead className="w-1/4">Вопросы</TableHead>
          <TableHead className="w-2/4">Теги</TableHead>
          <TableHead className="w-1">Действия</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {quizzes.map((quiz) => (
          <TableRow key={quiz.id}>
            <TableCell>{quiz.title}</TableCell>
            <TableCell>{quiz.questionCount}</TableCell>
            <TableCell className="whitespace-normal">
              <div className="flex flex-wrap gap-1">
                {quiz.tags.map((t) => (
                  <Badge key={t.id} variant="secondary">
                    {t.name}
                  </Badge>
                ))}
              </div>
            </TableCell>
            <TableCell>
              <div className="flex gap-1">
                <Link
                  to={routes.editor.edit(quiz.id)}
                  className={buttonVariants({
                    variant: 'secondary',
                    size: 'icon',
                  })}
                >
                  <PencilIcon />
                  <span className="sr-only">Редактировать</span>
                </Link>
                <DeleteQuizDialog quiz={quiz} isIcon />
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
