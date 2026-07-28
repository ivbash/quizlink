import { RouterProvider } from 'react-router/dom';
import { AuthProvider } from '@/entities/user';
import { ThemeProvider } from '@/shared/lib/theme';
import { Toaster } from '@/shared/ui/sonner';
import { TooltipProvider } from '@/shared/ui/tooltip';
import { QueryProvider } from './providers/query-provider';
import { router } from './router';

export function App() {
  return (
    <ThemeProvider defaultTheme="system" storageKey="theme">
      <TooltipProvider>
        <QueryProvider>
          <AuthProvider>
            <RouterProvider router={router} />
          </AuthProvider>
        </QueryProvider>
      </TooltipProvider>
      <Toaster />
    </ThemeProvider>
  );
}
