import { Field, FieldGroup } from '@/shared/ui/field';
import { Skeleton } from '@/shared/ui/skeleton';

export function CatalogFiltersSkeleton() {
  return (
    <div>
      <FieldGroup>
        <Field>
          <div>
            <Skeleton className="h-5 w-32" />
          </div>
          <Skeleton className="h-9" />
        </Field>
        <Field>
          <div>
            <Skeleton className="h-5 w-36" />
          </div>
          <div>
            <Skeleton className="-mt-1 h-4 w-24" />
          </div>
          <Skeleton className="-mt-1 -mb-1.5 h-4" />
        </Field>
        <Field>
          <Skeleton className="h-9" />
          <Skeleton className="h-9" />
        </Field>
      </FieldGroup>
    </div>
  );
}
