import { createBrowserRouter, Navigate, type UIMatch } from 'react-router';
import { DashboardPage } from '@/pages/admin-dashboard';
import { AdminNotFoundPage } from '@/pages/admin-not-found';
import { CreateTagPage, TagsPage, UpdateTagPage } from '@/pages/admin-tags';
import { SignInPage, SignUpPage } from '@/pages/auth';
import { CatalogPage } from '@/pages/catalog';
import { QuizEditorPage } from '@/pages/editor';
import { ErrorPage } from '@/pages/error';
import { HomePage } from '@/pages/home';
import { NotFoundPage } from '@/pages/not-found';
import { Breadcrumb, HomeBreadcrumb } from '@/shared/ui/admin/breadcrumb';
import { UpdateTagBreadcrumb } from '@/widgets/admin-breadcrumbs';
import { AdminLayout } from '../../layouts/admin-layout';
import { EditorLayout } from '../../layouts/editor-layout';
import { SiteLayout } from '../../layouts/site-layout';
import { ProtectedRoute } from '../ui/protected-route';
import { PublicRoute } from '../ui/public-route';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <SiteLayout />,
    errorElement: <ErrorPage />,
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
    errorElement: <ErrorPage />,
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
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/admin',
        element: <AdminLayout />,
        handle: {
          crumb: (match: UIMatch) => (
            <HomeBreadcrumb title="Панель состояния" match={match} />
          ),
        },
        children: [
          {
            index: true,
            element: <Navigate to="/admin/dashboard" replace />,
          },
          {
            path: 'dashboard',
            element: <DashboardPage />,
          },
          {
            path: 'tags',
            handle: {
              crumb: (match: UIMatch) => (
                <Breadcrumb title="Теги" match={match} />
              ),
            },
            children: [
              {
                index: true,
                element: <TagsPage />,
              },
              {
                path: 'create',
                element: <CreateTagPage />,
                handle: {
                  crumb: (match: UIMatch) => (
                    <Breadcrumb title="Создать тег" match={match} />
                  ),
                },
              },
              {
                path: ':tagId',
                element: <UpdateTagPage />,
                handle: {
                  crumb: (match: UIMatch) => (
                    <UpdateTagBreadcrumb
                      tagId={Number(match.params['tagId'])}
                      match={match}
                    />
                  ),
                },
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
