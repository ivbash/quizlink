import { Outlet } from 'react-router';
import { Container } from '@/shared/ui/container';
import { SiteFooter } from './site-footer';
import { SiteHeader } from './site-header';

export function SiteLayout() {
  return (
    <>
      <SiteHeader />
      <main className="grow py-12">
        <Container>
          <Outlet />
        </Container>
      </main>
      <SiteFooter />
    </>
  );
}
