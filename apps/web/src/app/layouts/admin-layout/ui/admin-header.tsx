import { Separator } from '@/shared/ui/separator';
import { SidebarTrigger } from '@/shared/ui/sidebar';

export function AdminHeader({ children }: { children?: React.ReactNode }) {
  return (
    <div className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
      <div className="flex items-center gap-2 px-4">
        <SidebarTrigger className="-ml-1" />
        {children && (
          <>
            <Separator
              orientation="vertical"
              className="mr-2 data-[orientation=vertical]:h-4"
            />
            {children}
          </>
        )}
      </div>
    </div>
  );
}
