import { Navigate, Outlet } from 'react-router';
import { useAuth } from '@/entities/user';
import { routes } from '@/shared/config/routes';
import { Loader } from './loader';

const roleRoutes = {
  user: routes.user.profile(),
  admin: routes.admin.dashboard(),
};

export function PublicRoute() {
  const isInitial = useAuth(({ isInitial }) => isInitial);
  const user = useAuth(({ user }) => user);

  if (isInitial) {
    return <Loader />;
  }

  if (user) {
    const to = roleRoutes[user.role];
    return <Navigate to={to} replace />;
  }

  return <Outlet />;
}
