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

export function SignUpPage() {
  const usernameId = useId();
  const emailId = useId();
  const passwordId = useId();
  const confirmPasswordId = useId();

  return (
    <Card className="mx-auto max-w-md">
      <CardHeader>
        <CardTitle>Регистрация</CardTitle>
        <CardDescription>
          Заполните все поля, чтобы создать новый аккаунт
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form>
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor={usernameId}>Имя</FieldLabel>
              <Input id={usernameId} type="text" />
            </Field>
            <Field>
              <FieldLabel htmlFor={emailId}>Email</FieldLabel>
              <Input id={emailId} type="email" />
            </Field>
            <Field>
              <FieldLabel htmlFor={passwordId}>Пароль</FieldLabel>
              <Input id={passwordId} type="password" />
            </Field>
            <Field>
              <FieldLabel htmlFor={confirmPasswordId}>
                Повторите пароль
              </FieldLabel>
              <Input id={confirmPasswordId} type="password" />
            </Field>
            <Field>
              <Button type="submit">Зарегистрироваться</Button>
              <FieldDescription className="text-center">
                Уже есть аккаунт? <Link to={routes.signIn()}>Вход</Link>
              </FieldDescription>
            </Field>
          </FieldGroup>
        </form>
      </CardContent>
    </Card>
  );
}
