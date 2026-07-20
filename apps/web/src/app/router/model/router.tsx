import { createBrowserRouter } from 'react-router';
import { DashboardPage } from '@/pages/admin-dashboard';
import { AdminNotFoundPage } from '@/pages/admin-not-found';
import { CreateTagPage, TagsPage, UpdateTagPage } from '@/pages/admin-tags';
import { SignInPage, SignUpPage } from '@/pages/auth';
import { CatalogPage } from '@/pages/catalog';
import { QuizEditorPage } from '@/pages/editor';
import { HomePage } from '@/pages/home';
import { NotFoundPage } from '@/pages/not-found';
import { AdminLayout } from '../../layouts/admin-layout';
import { EditorLayout } from '../../layouts/editor-layout';
import { SiteLayout } from '../../layouts/site-layout';
import { ProtectedRoute } from '../ui/protected-route';
import { PublicRoute } from '../ui/public-route';

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
        element: <PublicRoute />,
        children: [
          {
            path: 'sign-up',
            element: <SignUpPage />,
          },
          {
            path: 'sign-in',
            element: <SignInPage />,
          },
        ],
      },
      {
        path: '*',
        element: <NotFoundPage />,
      },
    ],
  },
  {
    element: <ProtectedRoute />,
    children: [
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
    ],
  },
  {
    element: <ProtectedRoute roles={['admin']} />,
    children: [
      {
        path: '/admin',
        element: <AdminLayout />,
        children: [
          {
            index: true,
            element: <DashboardPage />,
          },
          {
            path: 'tags',
            children: [
              {
                index: true,
                element: <TagsPage />,
              },
              {
                path: 'create',
                element: <CreateTagPage />,
              },
              {
                path: ':tagId',
                element: <UpdateTagPage />,
              },
            ],
          },
          {
            path: '*',
            element: <AdminNotFoundPage />,
          },
        ],
      },
    ],
  },
]);
