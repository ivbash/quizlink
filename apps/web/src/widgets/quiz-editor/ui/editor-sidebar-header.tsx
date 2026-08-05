import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/shared/ui/sidebar';
import { useQuizEditor } from '../lib/use-quiz-editor';

export function EditorSidebarHeader() {
  const currentQuestionId = useQuizEditor(
    ({ currentQuestionId }) => currentQuestionId,
  );
  const setCurrentQuestionId = useQuizEditor(
    ({ setCurrentQuestionId }) => setCurrentQuestionId,
  );
  const validate = useQuizEditor(({ validate }) => validate);

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <SidebarMenuButton
          onClick={async () => {
            if (!(await validate())) return;
            setCurrentQuestionId(null);
          }}
          isActive={!currentQuestionId}
        >
          Настройки викторины
        </SidebarMenuButton>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
