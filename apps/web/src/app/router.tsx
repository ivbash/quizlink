import { createBrowserRouter } from 'react-router';
import { NotFoundPage } from '@/pages/not-found';
import { SiteLayout } from './layouts/site-layout';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <SiteLayout />,
    children: [
      {
        index: true,
        element: <div>App</div>,
      },
      {
        path: '*',
        element: <NotFoundPage />,
      },
    ],
  },
]);
