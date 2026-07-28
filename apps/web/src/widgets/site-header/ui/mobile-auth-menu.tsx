import { Link } from 'react-router';
import { buttonVariants } from '@/shared/ui/button';
import { SheetClose } from '@/shared/ui/sheet';
import { authNav } from '../model/auth-nav';

export function MobileAuthMenu() {
  return (
    <div className="flex items-center gap-2">
      {authNav.map(({ title, href, icon }) => (
        <SheetClose
          key={href}
          nativeButton={false}
          render={
            <Link
              className={buttonVariants({ variant: 'secondary' })}
              to={href}
            >
              {icon} {title}
            </Link>
          }
        />
      ))}
    </div>
  );
}
