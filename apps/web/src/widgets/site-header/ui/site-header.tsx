import { Link } from 'react-router';
import { useAuth } from '@/entities/user';
import { routes } from '@/shared/config/routes';
import { Container } from '@/shared/ui/container';
import { ThemeToggle } from '@/shared/ui/theme-toggle';
import { mainNav } from '../model/main-nav';
import { AuthMenu } from './auth-menu';
import { MobileSheet } from './mobile-sheet';
import { UserMenu } from './user-menu';

export function SiteHeader() {
  const user = useAuth(({ user }) => user);

  return (
    <header className="border-b py-4">
      <Container className="flex items-center gap-8">
        <Link className="text-xl font-medium" to={routes.home()}>
          QuizLink
        </Link>
        <nav className="hidden items-center gap-4 sm:flex">
          {mainNav.map(({ title, href }) => (
            <Link key={href} to={href}>
              {title}
            </Link>
          ))}
        </nav>
        <div className="ml-auto">
          <div className="hidden items-center gap-4 sm:flex">
            {user ? <UserMenu user={user} /> : <AuthMenu />}
            <ThemeToggle />
          </div>
          <MobileSheet user={user} />
        </div>
      </Container>
    </header>
  );
}
