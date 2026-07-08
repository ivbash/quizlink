import { ChevronsUpDownIcon, LogOutIcon } from 'lucide-react';
import type { User } from '@/entities/user';
import { Avatar, AvatarFallback } from '@/shared/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/shared/ui/dropdown-menu';
import { SidebarMenuButton } from '@/shared/ui/sidebar';
import { AdminSidebarThemeToggle } from './admin-sidebar-theme-toggle';

export function AdminSidebarUser({ user }: { user: User }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          <SidebarMenuButton
            size="lg"
            className="data-popup-open:bg-sidebar-accent data-popup-open:text-sidebar-accent-foreground"
          >
            <Avatar className="size-8">
              <AvatarFallback>
                {user.username.slice(0, 1).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <span>{user.username}</span>
            <ChevronsUpDownIcon className="ml-auto size-4" />
          </SidebarMenuButton>
        }
      />
      <DropdownMenuContent side="top">
        <AdminSidebarThemeToggle />
        <DropdownMenuItem>
          <LogOutIcon />
          Выйти
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
