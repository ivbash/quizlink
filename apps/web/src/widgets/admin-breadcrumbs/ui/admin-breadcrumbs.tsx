import { Fragment } from 'react/jsx-runtime';
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbSeparator,
} from '@/shared/ui/breadcrumb';

export function AdminBreadcrumbs({
  breadcrumbs: [home, ...breadcrumbs],
}: {
  breadcrumbs: React.ReactNode[];
}) {
  return (
    <Breadcrumb>
      <BreadcrumbList>
        {home}
        {breadcrumbs.map((breadcrumb, i) => (
          // eslint-disable-next-line react-x/no-array-index-key
          <Fragment key={i}>
            <BreadcrumbSeparator className="hidden md:block" />
            {breadcrumb}
          </Fragment>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
