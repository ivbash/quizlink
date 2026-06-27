import { useAuth } from '@/entities/auth';
import { routes } from '@/shared/config/routes';
import {
  DashboardContainer,
  DashboardContainerGroup,
} from './dashboard-container';
import { DashboardItem } from './dashboard-item';

export function DashboardPage() {
  const user = useAuth(({ user }) => user);

  return (
    <>
      <div className="mb-6">
        <h1 className="mb-1 text-3xl font-semibold">
          Привет, {user?.username}
        </h1>
        <p className="text-muted-foreground">
          Добро пожаловать в панель администратора
        </p>
      </div>
      <DashboardContainer>
        <DashboardContainerGroup>
          <DashboardItem
            title="Теги"
            href={routes.admin.tags()}
            hrefCreate={routes.admin.tags()}
          />
          <DashboardItem
            title="Викторины"
            href={routes.admin.quizzes()}
            hrefCreate={routes.admin.quizzes()}
          />
        </DashboardContainerGroup>
      </DashboardContainer>
    </>
  );
}
