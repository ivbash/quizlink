import { Field, FieldGroup } from '@/shared/ui/field';

interface AdminFormLayoutProps {
  fields: React.ReactNode;
  actions: React.ReactNode;
  onSubmit: React.SubmitEventHandler<HTMLFormElement>;
}

export function AdminFormLayout({
  fields,
  actions,
  onSubmit,
}: AdminFormLayoutProps) {
  return (
    <form onSubmit={onSubmit} className="max-w-5xl">
      <FieldGroup>
        {fields}
        <Field orientation="horizontal">{actions}</Field>
      </FieldGroup>
    </form>
  );
}
