import { useEffect } from 'react';
import { RouterProvider } from 'react-router/dom';
import { useAuth } from '@/entities/auth';
import { authApi } from '@/shared/api';
import { ThemeProvider } from '@/shared/lib/theme';
import { TooltipProvider } from '@/shared/ui/tooltip';
import { router } from './router';

export function App() {
  const { user, setUser, setAccessToken } = useAuth();

  useEffect(() => {
    if (!user) {
      authApi
        .refresh()
        .then(({ user, accessToken }) => {
          setUser(user);
          setAccessToken(accessToken);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  });

  return (
    <ThemeProvider defaultTheme="system" storageKey="theme">
      <TooltipProvider>
        <RouterProvider router={router} />
      </TooltipProvider>
    </ThemeProvider>
  );
}
