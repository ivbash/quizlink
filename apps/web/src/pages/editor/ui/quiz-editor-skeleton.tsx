import { Field, FieldGroup } from '@/shared/ui/field';
import { Item } from '@/shared/ui/item';
import { Separator } from '@/shared/ui/separator';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarProvider,
} from '@/shared/ui/sidebar';
import { Skeleton } from '@/shared/ui/skeleton';

export function QuizEditorSkeleton() {
  return (
    <Item
      variant="outline"
      className="relative grow flex-col flex-nowrap items-start overflow-hidden rounded-xl p-0"
    >
      <SidebarProvider className="min-h-auto grow">
        <Sidebar variant="floating" className="absolute h-auto">
          <SidebarHeader>
            <SidebarMenu>
              <SidebarMenuItem>
                <Skeleton className="h-8" />
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarHeader>
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupLabel>
                <Skeleton className="h-4 w-32" />
              </SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  <Skeleton className="h-8" />
                  <Skeleton className="h-8" />
                  <Skeleton className="h-8" />
                  <Skeleton className="h-8" />
                  <Skeleton className="h-8" />
                  <Skeleton className="h-8" />
                  <Skeleton className="h-8" />
                  <Skeleton className="h-8" />
                  <Skeleton className="h-8" />
                  <Skeleton className="h-8" />
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
          <SidebarFooter>
            <Skeleton className="h-9" />
          </SidebarFooter>
        </Sidebar>
        <div className="flex w-full flex-col transition-[width] ease-linear peer-data-[state=expanded]:w-[calc(100%-var(--sidebar-width))]">
          <div className="flex items-center gap-2 px-4 py-6">
            <Skeleton className="mr-2 size-4" />
            <Separator
              orientation="vertical"
              className="mr-2 data-vertical:h-4 data-vertical:self-auto"
            />
            <Skeleton className="h-4 w-48" />
          </div>
          <div className="relative grow">
            <div className="absolute inset-0 no-scrollbar overflow-y-auto px-4 pt-0 pb-4">
              <FieldGroup>
                <Field>
                  <div>
                    <Skeleton className="h-5 w-48" />
                  </div>
                  <Skeleton className="h-9" />
                </Field>
                <Field>
                  <div>
                    <Skeleton className="h-5 w-48" />
                  </div>
                  <Skeleton className="h-16" />
                </Field>
                <Field>
                  <div>
                    <Skeleton className="h-5 w-48" />
                  </div>
                  <Skeleton className="h-9" />
                </Field>
              </FieldGroup>
            </div>
          </div>
        </div>
      </SidebarProvider>
    </Item>
  );
}
