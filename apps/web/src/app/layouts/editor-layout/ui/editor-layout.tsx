import { Outlet } from 'react-router';
import { Container } from '@/shared/ui/container';
import { SiteHeader } from '@/widgets/site-header';

export function EditorLayout() {
  return (
    <>
      <SiteHeader />
      <main className="flex grow flex-col items-center py-4">
        <Container className="mx-0 flex w-full grow flex-col">
          <Outlet />
        </Container>
      </main>
    </>
  );
}
