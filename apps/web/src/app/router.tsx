import { createBrowserRouter } from 'react-router';
import { DashboardPage } from '@/pages/admin-dashboard';
import { AdminNotFoundPage } from '@/pages/admin-not-found';
import { SignInPage, SignUpPage } from '@/pages/auth';
import { CatalogPage } from '@/pages/catalog';
import { QuizEditorPage } from '@/pages/editor';
import { HomePage } from '@/pages/home';
import { NotFoundPage } from '@/pages/not-found';
import { AdminLayout } from './layouts/admin-layout';
import { EditorLayout } from './layouts/editor-layout';
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
        path: 'sign-up',
        element: <SignUpPage />,
      },
      {
        path: 'sign-in',
        element: <SignInPage />,
      },
      {
        path: '*',
        element: <NotFoundPage />,
      },
    ],
  },
  {
    path: '/editor',
    element: <EditorLayout />,
    children: [
      {
        index: true,
        element: <QuizEditorPage />,
      },
    ],
  },
  {
    path: '/admin',
    element: <AdminLayout />,
    children: [
      {
        index: true,
        element: <DashboardPage />,
      },
      {
        path: '*',
        element: <AdminNotFoundPage />,
      },
    ],
  },
]);
