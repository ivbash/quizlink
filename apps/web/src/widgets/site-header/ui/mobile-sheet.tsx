import { Link } from 'react-router';
import { type User } from '@/entities/user';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/shared/ui/sheet';
import { ThemeToggle } from '@/shared/ui/theme-toggle';
import { mainNav } from '../model/main-nav';
import { Burger } from './burger';
import { MobileAuthMenu } from './mobile-auth-menu';
import { MobileUserMenu } from './mobile-user-menu';

export function MobileSheet({ user }: { user: User | null }) {
  return (
    <Sheet>
      <SheetTrigger className="flex size-9 items-center justify-center sm:hidden">
        <Burger />
      </SheetTrigger>
      <SheetContent side="top" className="data-[side=top]:h-svh">
        <SheetHeader className="border-b">
          <SheetTitle className="flex items-center gap-4 text-xl font-medium">
            <span>QuizLink</span>
            <ThemeToggle />
          </SheetTitle>
        </SheetHeader>
        <nav className="px-4 text-base">
          {mainNav.map(({ title, href }) => (
            <SheetClose
              key={href}
              nativeButton={false}
              render={
                <Link className="block py-3" to={href}>
                  {title}
                </Link>
              }
            />
          ))}
        </nav>
        <SheetFooter className="border-t">
          {user ? <MobileUserMenu user={user} /> : <MobileAuthMenu />}
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
