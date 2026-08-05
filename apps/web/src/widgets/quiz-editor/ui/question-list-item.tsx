import { Trash2Icon } from 'lucide-react';
import {
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/shared/ui/sidebar';
import { useQuizEditor } from '../lib/use-quiz-editor';
import type { EditorQuestion } from '../model/types';

interface QuestionListItemProps {
  question: EditorQuestion;
  index: number;
}

export function QuestionListItem({ question, index }: QuestionListItemProps) {
  const currentQuestionId = useQuizEditor(
    ({ currentQuestionId }) => currentQuestionId,
  );
  const setCurrentQuestionId = useQuizEditor(
    ({ setCurrentQuestionId }) => setCurrentQuestionId,
  );
  const removeQuestion = useQuizEditor(({ removeQuestion }) => removeQuestion);
  const validate = useQuizEditor(({ validate }) => validate);

  return (
    <SidebarMenuItem>
      <SidebarMenuButton
        onClick={async () => {
          if (!(await validate())) return;
          setCurrentQuestionId(question.editorId);
        }}
        isActive={question.editorId === currentQuestionId}
      >
        <span className="text-muted-foreground">{index}.</span>
        <span>{question.text}</span>
      </SidebarMenuButton>
      <SidebarMenuAction
        className="text-destructive! hover:text-destructive/50!"
        onClick={() => removeQuestion(question.editorId)}
      >
        <Trash2Icon />
        <span className="sr-only">Удалить вопрос</span>
      </SidebarMenuAction>
    </SidebarMenuItem>
  );
}
