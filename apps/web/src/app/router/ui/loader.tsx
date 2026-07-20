import { Spinner } from '@/shared/ui/spinner';

export function Loader() {
  return (
    <div className="fixed inset-0 flex animate-in items-center justify-center bg-background ease-linear fade-in">
      <Spinner className="size-24" />
    </div>
  );
}
