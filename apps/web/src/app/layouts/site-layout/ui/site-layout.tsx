import { Outlet, ScrollRestoration } from 'react-router';
import { Container } from '@/shared/ui/container';
import { SiteHeader } from '@/widgets/site-header';
import { SiteFooter } from './site-footer';

export function SiteLayout() {
  return (
    <>
      <SiteHeader />
      <main className="grow py-12">
        <Container>
          <Outlet />
          <ScrollRestoration />
        </Container>
      </main>
      <SiteFooter />
    </>
  );
}
