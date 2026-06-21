import { useId } from 'react';
import { Link } from 'react-router';
import { routes } from '@/shared/config/routes';
import { Button } from '@/shared/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/shared/ui/card';
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from '@/shared/ui/field';
import { Input } from '@/shared/ui/input';

export function SignInPage() {
  const emailId = useId();
  const passwordId = useId();

  return (
    <Card className="mx-auto max-w-md">
      <CardHeader>
        <CardTitle>Вход</CardTitle>
        <CardDescription>
          Введите ваши учетные данные, чтобы войти в аккаунт
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form>
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor={emailId}>Email</FieldLabel>
              <Input id={emailId} type="email" />
            </Field>
            <Field>
              <FieldLabel htmlFor={passwordId}>Пароль</FieldLabel>
              <Input id={passwordId} type="password" />
            </Field>
            <Field>
              <Button type="submit">Войти</Button>
              <FieldDescription className="text-center">
                Еще нет аккаунта? <Link to={routes.signUp()}>Регистрация</Link>
              </FieldDescription>
            </Field>
          </FieldGroup>
        </form>
      </CardContent>
    </Card>
  );
}
