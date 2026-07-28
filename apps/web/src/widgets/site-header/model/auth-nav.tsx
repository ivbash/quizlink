import { LogInIcon, SquarePenIcon } from 'lucide-react';
import { routes } from '@/shared/config/routes';

export const authNav = [
  {
    title: 'Вход',
    href: routes.signIn(),
    icon: <LogInIcon />,
  },
  {
    title: 'Регистрация',
    href: routes.signUp(),
    icon: <SquarePenIcon />,
  },
];
