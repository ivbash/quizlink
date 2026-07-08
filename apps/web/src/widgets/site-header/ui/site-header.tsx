import { Link } from 'react-router';
import { useAuth } from '@/entities/user';
import { routes } from '@/shared/config/routes';
import { Button } from '@/shared/ui/button';
import { Container } from '@/shared/ui/container';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/shared/ui/sheet';
import { ThemeToggle } from '@/shared/ui/theme-toggle';

const nav = [
  {
    title: 'Каталог',
    href: routes.quizzes(),
  },
];

export function SiteHeader() {
  const user = useAuth(({ user }) => user);
  const signIn = useAuth(({ signIn }) => signIn);
  const signOut = useAuth(({ signOut }) => signOut);

  const handleSignIn = async () => {
    await signIn({ login: 'admin', password: '1234' });
  };

  const handleSignOut = async () => {
    await signOut();
  };

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
          <div className="hidden items-center gap-4 sm:flex">
            {user ? (
              <>
                <div>
                  <Link to="/admin">{user.username}</Link>
                </div>
                <Button onClick={handleSignOut}>Выход</Button>
              </>
            ) : (
              <Button onClick={handleSignIn}>Вход</Button>
            )}
            <ThemeToggle />
          </div>
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
                  <span>QuizLink</span>
                  <ThemeToggle />
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
