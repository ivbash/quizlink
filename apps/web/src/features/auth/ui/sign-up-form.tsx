import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router';
import { routes } from '@/shared/config/routes';
import { Button } from '@/shared/ui/button';
import { Field, FieldDescription, FieldGroup } from '@/shared/ui/field';
import { TextField } from '@/shared/ui/fields/text-field';
import { SignUpSchema } from '../model/schema';
import { useSignUp } from '../model/use-sign-up';

export function SignUpForm() {
  const { handleSubmit, control } = useForm<SignUpSchema>({
    resolver: zodResolver(SignUpSchema),
    defaultValues: {
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
    mode: 'onTouched',
  });

  const { mutate: signUp } = useSignUp();

  const onSubmit = (inputValues: SignUpSchema) => signUp(inputValues);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FieldGroup>
        <TextField control={control} name="username" label="Имя пользователя" />
        <TextField control={control} type="email" name="email" label="Email" />
        <TextField
          control={control}
          type="password"
          name="password"
          label="Пароль"
        />
        <TextField
          control={control}
          type="password"
          name="confirmPassword"
          label="Повторите пароль"
        />
        <Field>
          <Button type="submit">Зарегистрироваться</Button>
          <FieldDescription className="text-center">
            Уже есть аккаунт? <Link to={routes.signIn()}>Вход</Link>
          </FieldDescription>
        </Field>
      </FieldGroup>
    </form>
  );
}
