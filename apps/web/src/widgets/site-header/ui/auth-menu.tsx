import { UserRoundIcon } from 'lucide-react';
import { Link } from 'react-router';
import { Avatar, AvatarFallback } from '@/shared/ui/avatar';
import { Button } from '@/shared/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/shared/ui/dropdown-menu';
import { authNav } from '../model/auth-nav';

export function AuthMenu() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          <Button variant="ghost" size="icon" className="rounded-full">
            <Avatar>
              <AvatarFallback>
                <UserRoundIcon />
              </AvatarFallback>
            </Avatar>
          </Button>
        }
      />
      <DropdownMenuContent className="min-w-40">
        <DropdownMenuGroup>
          {authNav.map(({ title, href, icon }) => (
            <DropdownMenuItem
              key={href}
              render={
                <Link to={href} className="cursor-pointer">
                  {icon} {title}
                </Link>
              }
            />
          ))}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
