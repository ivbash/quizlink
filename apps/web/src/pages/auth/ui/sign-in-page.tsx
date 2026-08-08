import { SignInForm } from '@/features/auth';
import { useSiteDocumentTitle } from '@/shared/lib/use-document-title';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/shared/ui/card';

export function SignInPage() {
  useSiteDocumentTitle('Вход');

  return (
    <Card className="mx-auto max-w-md">
      <CardHeader>
        <CardTitle>Вход</CardTitle>
        <CardDescription>
          Введите ваши учетные данные, чтобы войти в аккаунт
        </CardDescription>
      </CardHeader>
      <CardContent>
        <SignInForm />
      </CardContent>
    </Card>
  );
}
