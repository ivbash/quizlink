import type { UIMatch } from 'react-router';
import { useUser } from '@/entities/user';
import { Breadcrumb } from '@/shared/ui/admin/breadcrumb';

interface UpdateUserBreadcrumbProps {
  userId: string;
  match: UIMatch;
}

export function UpdateUserBreadcrumb({
  userId,
  match,
}: UpdateUserBreadcrumbProps) {
  const { data: user } = useUser(userId);
  return <Breadcrumb title={user?.username ?? ''} match={match} />;
}
