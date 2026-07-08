import { RouterProvider } from 'react-router/dom';
import { AuthProvider } from '@/entities/user';
import { ThemeProvider } from '@/shared/lib/theme';
import { TooltipProvider } from '@/shared/ui/tooltip';
import { router } from './router';

export function App() {
  return (
    <ThemeProvider defaultTheme="system" storageKey="theme">
      <TooltipProvider>
        <AuthProvider>
          <RouterProvider router={router} />
        </AuthProvider>
      </TooltipProvider>
    </ThemeProvider>
  );
}
