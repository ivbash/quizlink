import { toast } from 'sonner';
import { config } from '@/shared/config/toast';
import { extractErrorMessage } from './error';

function standart(message: string) {
  toast(message, config);
}

function success(message: string) {
  toast.success(message, config);
}

function error(message: string, error: unknown) {
  toast.error(message, {
    ...config,
    description: extractErrorMessage(error, 'Что-то пошло не так...'),
  });
}

export const Toast = { standart, success, error };
