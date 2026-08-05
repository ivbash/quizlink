import { useEffect } from 'react';

function createTitleFormatter(baseSuffix: string) {
  return (pageTitle?: string) =>
    pageTitle ? `${pageTitle} | ${baseSuffix}` : baseSuffix;
}

export function useDocumentTitle(title: string) {
  useEffect(() => {
    document.title = title;
  }, [title]);
}

const siteTitle = createTitleFormatter('Quizlink');

export function useSiteDocumentTitle(title?: string) {
  useDocumentTitle(siteTitle(title));
}

const adminTitle = createTitleFormatter('Quizlink - Панель администратора');

export function useAdminDocumentTitle(title?: string) {
  useDocumentTitle(adminTitle(title));
}
