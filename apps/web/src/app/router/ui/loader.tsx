import { LoaderCircleIcon } from 'lucide-react';

export function Loader() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-background">
      <LoaderCircleIcon className="size-24 animate-spin" />
    </div>
  );
}
