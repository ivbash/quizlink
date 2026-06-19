import { cn } from '../lib/css';

export function Container({
  className,
  ...props
}: React.ComponentProps<'div'>) {
  return <div className={cn('mx-auto max-w-7xl px-4', className)} {...props} />;
}
