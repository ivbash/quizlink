import { MoonIcon, SunIcon } from 'lucide-react';
import { useTheme } from '@/shared/lib/theme';
import {
  DropdownMenuItem,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
} from '@/shared/ui/dropdown-menu';

export function AdminSidebarThemeToggle() {
  const { setTheme } = useTheme();

  return (
    <DropdownMenuSub>
      <DropdownMenuSubTrigger>
        <SunIcon className="dark:hidden" />
        <MoonIcon className="hidden dark:block" />
        <span>Тема</span>
      </DropdownMenuSubTrigger>
      <DropdownMenuSubContent className="max-sm:absolute max-sm:right-full">
        <DropdownMenuItem onClick={() => setTheme('light')}>
          Светлая
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme('dark')}>
          Темная
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme('system')}>
          Системная
        </DropdownMenuItem>
      </DropdownMenuSubContent>
    </DropdownMenuSub>
  );
}
