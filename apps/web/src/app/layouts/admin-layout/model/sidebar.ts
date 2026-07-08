import {
  CircleQuestionMarkIcon,
  HomeIcon,
  LayoutDashboardIcon,
  TagIcon,
  UserRoundIcon,
} from 'lucide-react';
import { routes } from '@/shared/config/routes';

export const sidebar = {
  header: {
    label: 'QuizLink',
    tooltip: 'Вернуться на сайт',
    href: routes.home(),
    Icon: HomeIcon,
  },
  main: [
    {
      label: 'Панель состояния',
      href: routes.admin.dashboard(),
      Icon: LayoutDashboardIcon,
    },
    {
      label: 'Теги',
      href: routes.admin.tags(),
      Icon: TagIcon,
    },
    {
      label: 'Викторины',
      href: routes.admin.quizzes(),
      Icon: CircleQuestionMarkIcon,
    },
  ],
  system: [
    {
      label: 'Пользователи',
      href: routes.admin.users(),
      Icon: UserRoundIcon,
    },
  ],
};
