import { Link } from 'react-router';
import { routes } from '@/shared/config/routes';
import { Container } from '@/shared/ui/container';

const nav = [
  {
    title: 'О нас',
    href: routes.about(),
  },
];

export function SiteFooter() {
  return (
    <footer className="border-t py-4">
      <Container className="flex flex-col items-center justify-between gap-8 sm:flex-row">
        <nav className="flex flex-col items-center gap-4 sm:flex-row">
          {nav.map(({ title, href }) => (
            <Link key={href} to={href}>
              {title}
            </Link>
          ))}
        </nav>
        <p className="text-muted-foreground">© 2026 QuizLink</p>
      </Container>
    </footer>
  );
}
