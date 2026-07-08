type DashboardContainerProps = {
  children?: React.ReactNode;
};

export function DashboardContainer({ children }: DashboardContainerProps) {
  return <div className="@container grid gap-3">{children}</div>;
}

type DashboardContainerGroupProps = {
  children?: React.ReactNode;
};

export function DashboardContainerGroup({
  children,
}: DashboardContainerGroupProps) {
  return <div className="grid gap-3 @xl:grid-cols-2">{children}</div>;
}
