import { ImageIcon } from 'lucide-react';
import { AspectRatio } from '@/shared/ui/aspect-ratio';
import { Badge } from '@/shared/ui/badge';
import { Button } from '@/shared/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/shared/ui/card';
import type { QuizList } from '../model/types';

interface QuizCardProps {
  quiz: QuizList;
}

export function QuizCard({ quiz }: QuizCardProps) {
  return (
    <Card className="pt-0 [--card-spacing:--spacing(4)]">
      <AspectRatio ratio={16 / 9}>
        <div className="h-full w-full bg-mauve-500" />
        <ImageIcon className="absolute top-1/2 left-1/2 size-16 -translate-1/2 opacity-10" />
      </AspectRatio>
      <CardHeader className="grow">
        <CardTitle>{quiz.title}</CardTitle>
        <CardDescription>{quiz.description}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-2">
        <div className="flex flex-wrap gap-1">
          {quiz.tags.map((tag) => (
            <Badge key={tag.id} variant="outline">
              {tag.name}
            </Badge>
          ))}
        </div>
        <Badge variant="secondary">
          <span className="tabular-nums">{quiz.questionCount}</span>{' '}
          вопрос(-a/-ов)
        </Badge>
      </CardContent>
      <CardFooter>
        <Button type="button" className="w-full">
          Играть
        </Button>
      </CardFooter>
    </Card>
  );
}
