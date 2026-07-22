import { HomeIcon } from 'lucide-react';
import { Link, type UIMatch } from 'react-router';
import { BreadcrumbItem, BreadcrumbLink, BreadcrumbPage } from '../breadcrumb';

export type ExtendedUIMatch = UIMatch & { last?: boolean };

interface BreadcrumbProps {
  title: string;
  match: ExtendedUIMatch;
}

export function Breadcrumb({ title, match }: BreadcrumbProps) {
  return match.last ? (
    <BreadcrumbItem>
      <BreadcrumbPage>{title}</BreadcrumbPage>
    </BreadcrumbItem>
  ) : (
    <BreadcrumbItem className="hidden md:block">
      <BreadcrumbLink
        render={
          <Link title={title} to={match.pathname}>
            {title}
          </Link>
        }
      />
    </BreadcrumbItem>
  );
}

export function HomeBreadcrumb({ title, match }: BreadcrumbProps) {
  return (
    <BreadcrumbItem className="hidden md:block">
      <BreadcrumbLink
        render={
          <Link title={title} to={match.pathname}>
            <HomeIcon className="size-4" />
            <span className="sr-only">{title}</span>
          </Link>
        }
      />
    </BreadcrumbItem>
  );
}
