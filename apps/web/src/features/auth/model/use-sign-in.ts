import { useMutation } from '@tanstack/react-query';
import { useAuth, type SignInDto } from '@/entities/user';
import { Toast } from '@/shared/lib/toast';

export function useSignIn() {
  const signIn = useAuth(({ signIn }) => signIn);

  return useMutation({
    mutationFn: (data: SignInDto) => signIn(data),
    onSuccess: () => Toast.success('Авторизация прошла успешно'),
    onError: (error) => Toast.error('Ошибка авторизации', error),
  });
}
