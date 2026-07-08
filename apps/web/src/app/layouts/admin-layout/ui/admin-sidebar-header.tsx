import { Link } from 'react-router';
import {
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarTrigger,
} from '@/shared/ui/sidebar';

export type AdminSidebarHeaderProps = {
  label: string;
  href: string;
  icon?: React.ReactNode;
  tooltip?: string;
};

export function AdminSidebarHeader({
  label,
  href,
  icon,
  tooltip = label,
}: AdminSidebarHeaderProps) {
  return (
    <>
      <SidebarMenuButton
        size="lg"
        tooltip={tooltip}
        render={
          <Link to={href} title={tooltip}>
            <div className="flex aspect-square items-center justify-center group-has-data-[collapsible=icon]/sidebar-wrapper:size-8">
              {icon}
            </div>
            <span className="text-base font-semibold">{label}</span>
          </Link>
        }
      />
      <SidebarMenuAction
        className="md:hidden"
        render={<SidebarTrigger className="-mt-0.5" />}
      />
    </>
  );
}
