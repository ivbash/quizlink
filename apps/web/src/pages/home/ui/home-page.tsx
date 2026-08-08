import { useSiteDocumentTitle } from '@/shared/lib/use-document-title';
import { Features } from './features';
import { Guide } from './guide';
import { Hero } from './hero';

export function HomePage() {
  useSiteDocumentTitle('Главная');

  return (
    <div className="space-y-12">
      <Hero />
      <Features />
      <Guide />
    </div>
  );
}
