import { Navigate, Outlet } from 'react-router';
import { useAuth, type User } from '@/entities/user';
import { routes } from '@/shared/config/routes';
import { Loader } from './loader';

interface ProtectedRouteProps {
  roles?: User['role'][];
}

export function ProtectedRoute({ roles }: ProtectedRouteProps) {
  const isInitial = useAuth(({ isInitial }) => isInitial);
  const user = useAuth(({ user }) => user);

  if (isInitial) {
    return <Loader />;
  }

  if (!user) {
    return <Navigate to={routes.signIn()} replace />;
  }

  if (roles && !roles.includes(user.role)) {
    return <Navigate to={routes.forbidden()} replace />;
  }

  return <Outlet />;
}
