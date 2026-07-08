export function AdminContent({ children }: { children?: React.ReactNode }) {
  return (
    <div className="px-4 pt-19 pb-3 transition-[padding] duration-200 ease-linear md:px-12 md:pt-24 md:pb-8 md:group-has-data-[collapsible=icon]/sidebar-wrapper:pt-20">
      {children}
    </div>
  );
}
