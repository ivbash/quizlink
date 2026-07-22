import { Link, useLocation } from 'react-router';
import {
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from '@/shared/ui/sidebar';

export type AdminSidebarMenuItemProps = {
  label: string;
  href: string;
  icon?: React.ReactNode;
  tooltip?: string;
};

export function AdminSidebarMenuItem({
  label,
  href,
  icon,
  tooltip = label,
}: AdminSidebarMenuItemProps) {
  const { setOpenMobile } = useSidebar();
  const location = useLocation();

  return (
    <SidebarMenuItem>
      <SidebarMenuButton
        tooltip={tooltip}
        isActive={location.pathname.startsWith(href)}
        render={
          <Link to={href} onClick={() => setOpenMobile(false)}>
            {icon}
            <span>{label}</span>
          </Link>
        }
      />
    </SidebarMenuItem>
  );
}
