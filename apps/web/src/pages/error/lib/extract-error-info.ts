import { isRouteErrorResponse } from 'react-router';

export function extractErrorInfo(error: unknown) {
  let title = 'Ошибка';
  let message = 'Что-то пошло не так...';

  if (isRouteErrorResponse(error)) {
    switch (error.status) {
      case 404:
        title = 'Страница не найдена (404)';
        message = 'Запрашиваемая страница не существует.';
        break;
      case 403:
        title = 'Доступ запрещен (403)';
        message = 'У вас нет прав для просмотра этой страницы.';
        break;
      case 500:
        title = 'Ошибка сервера (500)';
        message = 'На сервере произошел сбой.';
        break;
      default:
        title = `Ошибка (${error.status})`;
        message = error.statusText || message;
    }
  } else if (error instanceof Error) {
    message = error.message;
  }

  return { title, message };
}
