import { SignUpForm } from '@/features/auth';
import { useSiteDocumentTitle } from '@/shared/lib/use-document-title';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/shared/ui/card';

export function SignUpPage() {
  useSiteDocumentTitle('Регистрация');

  return (
    <Card className="mx-auto max-w-md">
      <CardHeader>
        <CardTitle>Регистрация</CardTitle>
        <CardDescription>
          Заполните все поля, чтобы создать новый аккаунт
        </CardDescription>
      </CardHeader>
      <CardContent>
        <SignUpForm />
      </CardContent>
    </Card>
  );
}
