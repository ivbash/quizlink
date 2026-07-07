import { Navigate, Outlet } from 'react-router';
import { useAuth } from '@/entities/user';
import { Loader } from './loader';

const routes = {
  user: '/editor',
  admin: '/admin',
};

export function PublicRoute() {
  const isInitial = useAuth(({ isInitial }) => isInitial);
  const user = useAuth(({ user }) => user);

  if (isInitial) {
    return <Loader />;
  }

  if (user) {
    const to = routes[user.role];
    return <Navigate to={to} replace />;
  }

  return <Outlet />;
}
