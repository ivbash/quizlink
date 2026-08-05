import { cn } from '@/shared/lib/css';
import { Item } from '@/shared/ui/item';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarProvider,
} from '@/shared/ui/sidebar';

interface EditorLayoutProps {
  className?: string;
  sidebarHeader: React.ReactNode;
  sidebarContent: React.ReactNode;
  sidebarFooter: React.ReactNode;
  contentHeader?: React.ReactNode;
  content: React.ReactNode;
}

export function EditorLayout({
  className,
  sidebarHeader,
  sidebarContent,
  sidebarFooter,
  contentHeader,
  content,
}: EditorLayoutProps) {
  return (
    <Item
      variant="outline"
      className={cn(
        'relative flex-col flex-nowrap items-start overflow-hidden rounded-xl p-0',
        className,
      )}
    >
      <SidebarProvider className="min-h-auto grow">
        <Sidebar variant="floating" className="absolute h-auto">
          <SidebarHeader>{sidebarHeader}</SidebarHeader>
          <SidebarContent>{sidebarContent}</SidebarContent>
          <SidebarFooter>{sidebarFooter}</SidebarFooter>
        </Sidebar>
        <div className="flex w-full flex-col transition-[width] ease-linear peer-data-[state=expanded]:w-[calc(100%-var(--sidebar-width))]">
          {contentHeader}
          <div className="relative grow">
            <div className="absolute inset-0 no-scrollbar overflow-y-auto px-4 pt-0 pb-4">
              {content}
            </div>
          </div>
        </div>
      </SidebarProvider>
    </Item>
  );
}
