import { Separator } from '@/shared/ui/separator';
import { SidebarInset } from '@/shared/ui/sidebar';
import { AdminBreadcrumbs, useBreadcrumbs } from '@/widgets/admin-breadcrumbs';
import { AdminContent } from './admin-content';
import { AdminFixed } from './admin-fixed';
import { AdminHeader } from './admin-header';

export function AdminSidebarInset({
  children,
}: {
  children?: React.ReactNode;
}) {
  const breadcrumbs = useBreadcrumbs();

  return (
    <SidebarInset className="transition-[width] duration-200 ease-linear md:w-[calc(100%-var(--sidebar-width))] md:group-has-data-[collapsible=icon]/sidebar-wrapper:w-[calc(100%-var(--sidebar-width-icon))]">
      <AdminFixed>
        <AdminHeader>
          {breadcrumbs.length > 1 && (
            <AdminBreadcrumbs breadcrumbs={breadcrumbs} />
          )}
        </AdminHeader>
        <Separator />
      </AdminFixed>
      <AdminContent>{children}</AdminContent>
    </SidebarInset>
  );
}
