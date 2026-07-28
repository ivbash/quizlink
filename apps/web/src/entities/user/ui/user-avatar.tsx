import { Avatar, AvatarFallback } from '@/shared/ui/avatar';
import type { User } from '../model/types';

interface UserAvatarProps {
  className?: string;
  user: User;
}

export function UserAvatar({ className, user }: UserAvatarProps) {
  return (
    <Avatar className={className}>
      <AvatarFallback>{user.username.slice(0, 1).toUpperCase()}</AvatarFallback>
    </Avatar>
  );
}
