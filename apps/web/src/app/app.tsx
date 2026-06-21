import { RouterProvider } from 'react-router/dom';
import { ThemeProvider } from '@/shared/lib/theme';
import { TooltipProvider } from '@/shared/ui/tooltip';
import { router } from './router';

export function App() {
  return (
    <ThemeProvider defaultTheme="system" storageKey="theme">
      <TooltipProvider>
        <RouterProvider router={router} />
      </TooltipProvider>
    </ThemeProvider>
  );
}
