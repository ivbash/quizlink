import { ChevronsUpDownIcon, LogOutIcon } from 'lucide-react';
import { Link } from 'react-router';
import { UserAvatar, type User } from '@/entities/user';
import { useSignOut } from '@/features/auth';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/shared/ui/dropdown-menu';
import { SheetClose } from '@/shared/ui/sheet';
import { userNav } from '../model/user-nav';

export function MobileUserMenu({ user }: { user: User }) {
  const { mutate: signOut } = useSignOut();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="-m-2 flex items-center gap-2.5 rounded-md p-2 text-left data-popup-open:bg-accent data-popup-open:text-accent-foreground">
        <UserAvatar user={user} className="h-8 w-8" />
        <div className="flex-1">
          <div className="truncate font-medium">{user.username}</div>
          <div className="truncate text-xs text-muted-foreground">
            {user.email}
          </div>
        </div>
        <ChevronsUpDownIcon className="size-4" />
      </DropdownMenuTrigger>
      <DropdownMenuContent side="top">
        <DropdownMenuGroup>
          {userNav.map(
            ({ role, title, href, icon }) =>
              role.includes(user.role) && (
                <DropdownMenuItem
                  key={href}
                  render={
                    <SheetClose
                      nativeButton={false}
                      render={
                        <Link to={href}>
                          {icon} {title}
                        </Link>
                      }
                    />
                  }
                />
              ),
          )}
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem
            variant="destructive"
            onClick={() => signOut()}
            nativeButton={true}
            render={
              <SheetClose className="w-full">
                <LogOutIcon />
                Выйти
              </SheetClose>
            }
          />
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
