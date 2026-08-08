import { SearchXIcon } from 'lucide-react';
import { Link } from 'react-router';
import { routes } from '@/shared/config/routes';
import { useSiteDocumentTitle } from '@/shared/lib/use-document-title';
import { buttonVariants } from '@/shared/ui/button';
import { Container } from '@/shared/ui/container';

export function NotFoundPage() {
  useSiteDocumentTitle('404');

  return (
    <Container className="flex flex-col items-center justify-center gap-6 sm:flex-row sm:items-start sm:gap-9">
      <div className="text-muted-foreground sm:mt-3">
        <SearchXIcon className="size-20" />
      </div>
      <div className="flex flex-col gap-4 text-center sm:items-start sm:text-left">
        <h2 className="text-3xl font-medium">404</h2>
        <p className="max-w-96 text-muted-foreground">
          Запрашиваемая страница не найдена.
          <br />
          Но есть много других.
        </p>
        <Link
          to={routes.home()}
          className={buttonVariants({ variant: 'secondary' })}
        >
          Вернуться на главную
        </Link>
      </div>
    </Container>
  );
}
