import { useMutation } from '@tanstack/react-query';
import { useAuth, type SignUpDto } from '@/entities/user';
import { Toast } from '@/shared/lib/toast';

export function useSignUp() {
  const signUp = useAuth(({ signUp }) => signUp);

  return useMutation({
    mutationFn: (data: SignUpDto) => signUp(data),
    onSuccess: () => Toast.success('Регистрация прошла успешно'),
    onError: (error) => Toast.error('Ошибка регистрации', error),
  });
}
