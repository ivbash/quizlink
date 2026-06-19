import { Link } from 'react-router';
import { routes } from '@/shared/config/routes';
import { Container } from '@/shared/ui/container';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/shared/ui/sheet';

const nav = [
  {
    title: 'Каталог',
    href: routes.quizzes(),
  },
];

export function SiteHeader() {
  return (
    <header className="border-b py-4">
      <Container className="flex items-center gap-8">
        <Link className="text-xl font-medium" to={routes.home()}>
          QuizLink
        </Link>
        <nav className="hidden items-center gap-4 sm:flex">
          {nav.map(({ title, href }) => (
            <Link key={href} to={href}>
              {title}
            </Link>
          ))}
        </nav>
        <div className="ml-auto">
          <Sheet>
            <SheetTrigger className="flex size-9 items-center justify-center sm:hidden">
              <span className="flex size-5 flex-col justify-around">
                <span className="h-0.5 bg-primary" />
                <span className="h-0.5 bg-primary" />
                <span className="h-0.5 bg-primary" />
              </span>
            </SheetTrigger>
            <SheetContent side="top">
              <SheetHeader className="border-b">
                <SheetTitle className="flex items-center gap-4 text-xl font-medium">
                  QuizLink
                </SheetTitle>
              </SheetHeader>
              <nav className="px-4 pb-4 text-base">
                {nav.map(({ title, href }) => (
                  <Link key={href} className="block py-3" to={href}>
                    {title}
                  </Link>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </Container>
    </header>
  );
}
