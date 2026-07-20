import { extractErrorMessage } from '@/shared/lib/error';

export function ErrorMessage({ error }: { error?: Error | null }) {
  console.log(error);
  return (
    <p className="p-4">
      {extractErrorMessage(error, 'Что-то пошло не так...')}
    </p>
  );
}
