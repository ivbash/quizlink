import { PlusIcon, Trash2Icon } from 'lucide-react';
import { cn } from '@/shared/lib/css';
import { Field, FieldGroup, FieldLabel } from '@/shared/ui/field';
import { Input } from '@/shared/ui/input';
import { Item } from '@/shared/ui/item';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupAction,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from '@/shared/ui/sidebar';

export function QuizEditor({ className }: { className?: string }) {
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
          <SidebarHeader>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton>Настройки викторины</SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarHeader>
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupLabel>Вопросы</SidebarGroupLabel>
              <SidebarGroupAction>
                <PlusIcon />
                <span className="sr-only">Добавить вопрос</span>
              </SidebarGroupAction>
              <SidebarGroupContent>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton>Вопрос 1</SidebarMenuButton>
                    <SidebarMenuAction>
                      <Trash2Icon className="text-destructive" />
                      <span className="sr-only">Удалить вопрос</span>
                    </SidebarMenuAction>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
        </Sidebar>
        <div className="flex w-full flex-col">
          <div className="flex items-center gap-2 p-4">
            <SidebarTrigger className="-ml-1.5" />
          </div>
          <div className="relative grow">
            <div className="absolute inset-0 no-scrollbar overflow-y-auto px-4 pt-0 pb-4">
              <FieldGroup>
                <Field>
                  <FieldLabel>Название викторины</FieldLabel>
                  <Input type="text" />
                </Field>
              </FieldGroup>
            </div>
          </div>
        </div>
      </SidebarProvider>
    </Item>
  );
}
