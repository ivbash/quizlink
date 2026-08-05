import {
  CircleUserRoundIcon,
  ShieldUserIcon,
  SquarePenIcon,
} from 'lucide-react';
import type { UserRole } from '@/entities/user';
import { routes } from '@/shared/config/routes';

interface UserNav {
  title: string;
  href: string;
  icon: React.ReactNode;
  role: UserRole[];
}

export const userNav: UserNav[] = [
  {
    title: 'Панель администратора',
    href: routes.admin.dashboard(),
    icon: <ShieldUserIcon />,
    role: ['admin'],
  },
  {
    title: 'Профиль',
    href: routes.user.profile(),
    icon: <CircleUserRoundIcon />,
    role: ['user', 'admin'],
  },
  {
    title: 'Создать викторину',
    href: routes.editor.create(),
    icon: <SquarePenIcon />,
    role: ['user', 'admin'],
  },
];
