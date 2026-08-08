import { requireUser, useAuth } from '@/entities/user';
import { routes } from '@/shared/config/routes';
import { useAdminDocumentTitle } from '@/shared/lib/use-document-title';
import {
  DashboardContainer,
  DashboardContainerGroup,
} from './dashboard-container';
import { DashboardItem } from './dashboard-item';

export function DashboardPage() {
  useAdminDocumentTitle('Панель состояния');

  const user = useAuth(({ user }) => user);
  requireUser(user);

  return (
    <>
      <div className="mb-6">
        <h1 className="mb-1 text-3xl font-semibold">Привет, {user.username}</h1>
        <p className="text-muted-foreground">
          Добро пожаловать в панель администратора
        </p>
      </div>
      <DashboardContainer>
        <DashboardContainerGroup>
          <DashboardItem
            title="Теги"
            href={routes.admin.tags()}
            hrefCreate={routes.admin.createTag()}
          />
          <DashboardItem
            title="Викторины"
            href={routes.admin.quizzes()}
            hrefCreate={routes.editor.create()}
          />
        </DashboardContainerGroup>
      </DashboardContainer>
    </>
  );
}
