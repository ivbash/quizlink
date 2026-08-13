import { useSortable } from '@dnd-kit/react/sortable';
import { GripVerticalIcon, Trash2Icon } from 'lucide-react';
import { cn } from '@/shared/lib/css';
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

  const { ref, handleRef, isDragging } = useSortable({
    id: question.editorId,
    index,
  });

  return (
    <SidebarMenuItem ref={ref}>
      <SidebarMenuButton
        className={cn({ 'bg-sidebar-accent': isDragging })}
        onClick={async () => {
          if (!(await validate())) return;
          setCurrentQuestionId(question.editorId);
        }}
        isActive={question.editorId === currentQuestionId}
      >
        <span
          ref={handleRef}
          className={cn(
            'text-muted-foreground',
            isDragging ? 'cursor-grabbing' : 'cursor-grab',
          )}
          tabIndex={0}
        >
          <GripVerticalIcon />
          <span className="sr-only">Переместить вопрос</span>
        </span>
        <span className="text-muted-foreground">{index + 1}.</span>
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
