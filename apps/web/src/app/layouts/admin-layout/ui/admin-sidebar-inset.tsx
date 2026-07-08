import { Separator } from '@/shared/ui/separator';
import { SidebarInset } from '@/shared/ui/sidebar';
import { AdminContent } from './admin-content';
import { AdminFixed } from './admin-fixed';
import { AdminHeader } from './admin-header';

export function AdminSidebarInset({
  children,
}: {
  children?: React.ReactNode;
}) {
  return (
    <SidebarInset className="transition-[width] duration-200 ease-linear md:w-[calc(100%-var(--sidebar-width))] md:group-has-data-[collapsible=icon]/sidebar-wrapper:w-[calc(100%-var(--sidebar-width-icon))]">
      <AdminFixed>
        <AdminHeader />
        <Separator />
      </AdminFixed>
      <AdminContent>{children}</AdminContent>
    </SidebarInset>
  );
}
