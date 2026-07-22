import { CircleXIcon } from 'lucide-react';
import { useNavigate, useRouteError } from 'react-router';
import { routes } from '@/shared/config/routes';
import { Button } from '@/shared/ui/button';
import { Container } from '@/shared/ui/container';
import { extractErrorInfo } from '../lib/extract-error-info';

export function ErrorPage() {
  const error = useRouteError();
  const navigate = useNavigate();

  console.error(error);

  const { title, message } = extractErrorInfo(error);

  return (
    <div className="flex min-h-svh items-center justify-center">
      <Container className="flex flex-col items-center justify-center gap-6 sm:flex-row sm:items-start sm:gap-9">
        <div className="text-muted-foreground sm:mt-3">
          <CircleXIcon className="size-20" />
        </div>
        <div className="flex flex-col gap-4 text-center sm:items-start sm:text-left">
          <h2 className="text-3xl font-medium">{title}</h2>
          <p className="max-w-96 text-muted-foreground">{message}</p>
          <div className="flex items-center gap-2">
            <Button variant="secondary" onClick={() => navigate(-1)}>
              Назад
            </Button>
            <Button variant="secondary" onClick={() => navigate(routes.home())}>
              Вернуться на главную
            </Button>
          </div>
        </div>
      </Container>
    </div>
  );
}
