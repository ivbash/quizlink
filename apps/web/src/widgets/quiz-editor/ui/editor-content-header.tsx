import { Separator } from '@/shared/ui/separator';
import { SidebarTrigger } from '@/shared/ui/sidebar';
import { useQuizEditor } from '../lib/use-quiz-editor';

export function EditorContentHeader() {
  const title = useQuizEditor(({ title }) => title);

  return (
    <div className="flex items-center gap-2 p-4">
      <SidebarTrigger className="-ml-1.5" />
      {title && (
        <>
          <Separator
            orientation="vertical"
            className="mr-2 data-vertical:h-4 data-vertical:self-auto"
          />
          <div className="truncate text-sm font-medium">{title}</div>
        </>
      )}
    </div>
  );
}
