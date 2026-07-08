import { PlusIcon } from 'lucide-react';
import { Link } from 'react-router';
import { buttonVariants } from '@/shared/ui/button';
import { Item, ItemActions, ItemContent, ItemTitle } from '@/shared/ui/item';

type DashboardItemProps = {
  variant?: 'default' | 'outline' | 'muted' | null | undefined;
  title: string;
  href: string;
  hrefCreate: string;
};

export function DashboardItem({
  variant = 'outline',
  title,
  href,
  hrefCreate,
}: DashboardItemProps) {
  return (
    <Item variant={variant}>
      <ItemContent>
        <ItemTitle className="w-full text-base">
          <Link className="w-full" to={href}>
            {title}
          </Link>
        </ItemTitle>
      </ItemContent>
      <ItemActions>
        <Link
          to={hrefCreate}
          className={buttonVariants({ variant: 'outline', size: 'icon' })}
        >
          <PlusIcon />
          <span className="sr-only">Создать</span>
        </Link>
      </ItemActions>
    </Item>
  );
}
