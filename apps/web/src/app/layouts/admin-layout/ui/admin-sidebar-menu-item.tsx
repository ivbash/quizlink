import { Link } from 'react-router';
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

  return (
    <SidebarMenuItem>
      <SidebarMenuButton
        tooltip={tooltip}
        // isActive={pathname.startsWith(href)}
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
