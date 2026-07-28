import { ChevronsUpDownIcon, LogOutIcon } from 'lucide-react';
import { UserAvatar, type User } from '@/entities/user';
import { useSignOut } from '@/features/auth';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/shared/ui/dropdown-menu';
import { SidebarMenuButton } from '@/shared/ui/sidebar';
import { AdminSidebarThemeToggle } from './admin-sidebar-theme-toggle';

export function AdminSidebarUser({ user }: { user: User }) {
  const { mutate: signOut } = useSignOut();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          <SidebarMenuButton
            size="lg"
            className="data-popup-open:bg-sidebar-accent data-popup-open:text-sidebar-accent-foreground"
          >
            <UserAvatar user={user} className="size-8" />
            <span>{user.username}</span>
            <ChevronsUpDownIcon className="ml-auto size-4" />
          </SidebarMenuButton>
        }
      />
      <DropdownMenuContent side="top">
        <AdminSidebarThemeToggle />
        <DropdownMenuItem variant="destructive" onClick={() => signOut()}>
          <LogOutIcon />
          Выйти
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
