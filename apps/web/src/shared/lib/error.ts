import { isAxiosError } from 'axios';
import type { ErrorResponse } from '../api';

export function extractErrorMessage(error: unknown, fallbackMessage: string) {
  if (!isAxiosError<ErrorResponse>(error)) return fallbackMessage;

  switch (error.code) {
    case 'ERR_NETWORK':
      return 'Ошибка сети.';
    case 'ECONNABORTED':
    case 'ETIMEDOUT':
      return 'Время запроса истекло. Пожалуйста попробуйте ещё раз.';
  }

  return error.response?.data.error ?? fallbackMessage;
}
