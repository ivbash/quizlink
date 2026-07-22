import { useMatches, type UIMatch } from 'react-router';
import type { ExtendedUIMatch } from '@/shared/ui/admin/breadcrumb';

type BreadcrumbHandle = (match: ExtendedUIMatch) => React.ReactNode;

type BreadcrumbUIMatch = UIMatch<
  unknown,
  { crumb?: BreadcrumbHandle } | undefined
>;

export function useBreadcrumbs() {
  const matches = useMatches() as BreadcrumbUIMatch[];

  const breadcrumbs = matches
    .filter((match) => match.handle?.crumb)
    .map((match, i, matches) =>
      match.handle!.crumb!(
        i === matches.length - 1 ? { last: true, ...match } : match,
      ),
    );

  return breadcrumbs;
}
