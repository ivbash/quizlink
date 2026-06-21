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

interface QuizCardProps {
  quiz: {
    title: string;
    description: string;
    questionCount: number;
  };
}

export function QuizCard({
  quiz: { title, description, questionCount },
}: QuizCardProps) {
  return (
    <Card className="pt-0 [--card-spacing:--spacing(4)]">
      <AspectRatio ratio={16 / 10}>
        <div className="h-full w-full bg-mauve-500" />
      </AspectRatio>
      <CardHeader className="grow">
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <Badge variant="secondary">
          <span className="tabular-nums">{questionCount}</span> вопрос(-a/-ов)
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
