import { CircleXIcon } from 'lucide-react';
import { cn } from '../lib/css';
import { extractErrorMessage } from '../lib/error';

interface ErrorMessageProps {
  className?: string;
  error?: Error | null;
}

export function ErrorMessage({ className, error }: ErrorMessageProps) {
  console.log(error);
  return (
    <p className={cn('flex items-center gap-2 p-4', className)}>
      <CircleXIcon />
      <span>{extractErrorMessage(error, 'Что-то пошло не так...')}</span>
    </p>
  );
}
