import { formatDate } from '@/shared/lib/format';

interface AdminPageTitleProps {
  title: string;
  subtitle?: React.ReactNode;
}

export function AdminPageTitle({ title, subtitle }: AdminPageTitleProps) {
  return (
    <div className="mb-6">
      <h1 className="mb-1 text-3xl font-semibold">{title}</h1>
      {typeof subtitle === 'string' ? (
        <p className="text-muted-foreground">{subtitle}</p>
      ) : (
        subtitle
      )}
    </div>
  );
}

interface TimestampSubtitleProps {
  timestamp: {
    createdAt: Date;
    updatedAt: Date;
  };
}

export function TimestampSubtitle({
  timestamp: { createdAt, updatedAt },
}: TimestampSubtitleProps) {
  return (
    <p className="flex flex-wrap text-muted-foreground">
      <span className="mr-2">Создано: {formatDate(createdAt)}</span>
      <span>Обновлено: {formatDate(updatedAt)}</span>
    </p>
  );
}
