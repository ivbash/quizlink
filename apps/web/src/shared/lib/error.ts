import { isAxiosError } from 'axios';
import type { ErrorResponse } from '../api';

export function extractErrorMessage(error: unknown, fallbackMessage: string) {
  return (
    (isAxiosError<ErrorResponse>(error)
      ? error.response?.data.error
      : undefined) ?? fallbackMessage
  );
}
