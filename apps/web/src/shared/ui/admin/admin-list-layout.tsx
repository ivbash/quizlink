interface AdminListLayoutProps {
  header?: React.ReactNode;
  content?: React.ReactNode;
  footer?: React.ReactNode;
}

export function AdminListLayout({
  header,
  content,
  footer,
}: AdminListLayoutProps) {
  return (
    <div>
      <div className="my-4 flex justify-between gap-2">{header}</div>
      <div className="rounded-md border">{content}</div>
      <div className="mt-4 flex flex-wrap justify-center gap-2">{footer}</div>
    </div>
  );
}
