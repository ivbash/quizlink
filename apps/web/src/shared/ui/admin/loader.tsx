import { Spinner } from '@/shared/ui/spinner';

export function Loader() {
  return (
    <div className="flex animate-in items-center justify-center px-4 py-8 duration-200 ease-linear fade-in">
      <Spinner className="size-20" />
    </div>
  );
}
