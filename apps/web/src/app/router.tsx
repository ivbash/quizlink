import { createBrowserRouter } from 'react-router';
import { CatalogPage } from '@/pages/catalog';
import { HomePage } from '@/pages/home';
import { NotFoundPage } from '@/pages/not-found';
import { SiteLayout } from './layouts/site-layout';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <SiteLayout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: 'quizzes',
        element: <CatalogPage />,
      },
      {
        path: '*',
        element: <NotFoundPage />,
      },
    ],
  },
]);
