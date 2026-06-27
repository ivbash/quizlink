export function AdminFixed({ children }: { children?: React.ReactNode }) {
  return (
    <div className="fixed top-0 left-0 z-10 w-full bg-background/90 transition-[left,width] duration-200 ease-linear supports-backdrop-filter:bg-background/80 supports-backdrop-filter:backdrop-blur-2xl md:left-(--sidebar-width) md:w-[calc(100%-var(--sidebar-width))] md:group-has-data-[collapsible=icon]/sidebar-wrapper:left-(--sidebar-width-icon) md:group-has-data-[collapsible=icon]/sidebar-wrapper:w-[calc(100%-var(--sidebar-width-icon))]">
      {children}
    </div>
  );
}
