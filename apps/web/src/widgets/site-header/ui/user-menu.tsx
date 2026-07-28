import { LogOutIcon } from 'lucide-react';
import { Link } from 'react-router';
import { UserAvatar, type User } from '@/entities/user';
import { useSignOut } from '@/features/auth';
import { Button } from '@/shared/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/shared/ui/dropdown-menu';
import { userNav } from '../model/user-nav';

export function UserMenu({ user }: { user: User }) {
  const { mutate: signOut } = useSignOut();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          <Button variant="ghost" size="icon" className="rounded-full">
            <UserAvatar user={user} />
          </Button>
        }
      />
      <DropdownMenuContent align="end" className="min-w-56">
        <DropdownMenuGroup>
          <DropdownMenuLabel>
            <div className="px-1 py-1.5 text-sm leading-tight">
              <div className="truncate font-medium text-foreground">
                {user.username}
              </div>
              <div className="truncate text-xs text-muted-foreground">
                {user.email}
              </div>
            </div>
          </DropdownMenuLabel>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          {userNav.map(
            ({ role, title, href, icon }) =>
              role.includes(user.role) && (
                <DropdownMenuItem
                  key={href}
                  render={
                    <Link to={href}>
                      {icon} {title}
                    </Link>
                  }
                />
              ),
          )}
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem variant="destructive" onClick={() => signOut()}>
            <LogOutIcon />
            Выйти
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
