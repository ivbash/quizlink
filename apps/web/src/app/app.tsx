import { RouterProvider } from 'react-router/dom';
import { ThemeProvider } from '@/shared/lib/theme';
import { router } from './router';

export function App() {
  return (
    <ThemeProvider defaultTheme="system" storageKey="theme">
      <RouterProvider router={router} />
    </ThemeProvider>
  );
}
