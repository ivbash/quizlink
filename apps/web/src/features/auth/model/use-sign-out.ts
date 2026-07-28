import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router';
import { useAuth } from '@/entities/user';
import { routes } from '@/shared/config/routes';
import { Toast } from '@/shared/lib/toast';

export function useSignOut() {
  const signOut = useAuth(({ signOut }) => signOut);
  const navigate = useNavigate();

  return useMutation({
    mutationFn: () => signOut(),
    onSuccess: () => {
      Toast.success('Вы успешно вышли из системы');
      void navigate(routes.home());
    },
    onError: (error) => Toast.error('Ошибка выхода из системы', error),
  });
}
