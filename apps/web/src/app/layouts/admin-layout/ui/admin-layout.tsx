/* eslint-disable react-x/no-array-index-key */
import { Outlet } from 'react-router';
import { useAuth } from '@/entities/auth';
import { SidebarProvider } from '@/shared/ui/sidebar';
import { sidebar } from '../model/sidebar';
import { AdminSidebar } from './admin-sidebar';
import { AdminSidebarHeader } from './admin-sidebar-header';
import { AdminSidebarInset } from './admin-sidebar-inset';
import { AdminSidebarMenuItem } from './admin-sidebar-menu-item';
import { AdminSidebarUser } from './admin-sidebar-user';

export function AdminLayout() {
  const user = useAuth(({ user }) => user);

  return user ? (
    <SidebarProvider>
      <AdminSidebar
        header={
          <AdminSidebarHeader
            label={sidebar.header.label}
            tooltip={sidebar.header.tooltip}
            href={sidebar.header.href}
            icon={<sidebar.header.Icon className="size-5" />}
          />
        }
        main={sidebar.main.map((item, i) => (
          <AdminSidebarMenuItem
            key={i}
            label={item.label}
            href={item.href}
            icon={<item.Icon />}
          />
        ))}
        system={sidebar.system.map((item, i) => (
          <AdminSidebarMenuItem
            key={i}
            label={item.label}
            href={item.href}
            icon={<item.Icon />}
          />
        ))}
        footer={<AdminSidebarUser user={user} />}
      />
      <AdminSidebarInset>
        <Outlet />
      </AdminSidebarInset>
    </SidebarProvider>
  ) : (
    'Загрузка...'
  );
}
