import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router';
import { routes } from '@/shared/config/routes';
import { Button } from '@/shared/ui/button';
import { Field, FieldDescription, FieldGroup } from '@/shared/ui/field';
import { TextField } from '@/shared/ui/fields/text-field';
import { SignInSchema } from '../model/schema';
import { useSignIn } from '../model/use-sign-in';

export function SignInForm() {
  const { handleSubmit, control } = useForm<SignInSchema>({
    resolver: zodResolver(SignInSchema),
    defaultValues: { login: '', password: '' },
    mode: 'onTouched',
  });

  const { mutate: signIn } = useSignIn();

  const onSubmit = (inputValues: SignInSchema) => signIn(inputValues);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FieldGroup>
        <TextField
          control={control}
          name="login"
          label="Логин"
          description="Username или Email"
        />
        <TextField
          control={control}
          type="password"
          name="password"
          label="Пароль"
        />
        <Field>
          <Button type="submit">Войти</Button>
          <FieldDescription className="text-center">
            Еще нет аккаунта? <Link to={routes.signUp()}>Регистрация</Link>
          </FieldDescription>
        </Field>
      </FieldGroup>
    </form>
  );
}
