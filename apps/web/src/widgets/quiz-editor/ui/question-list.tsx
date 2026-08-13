import { DragDropProvider, type DragEndEvent } from '@dnd-kit/react';
import { isSortable } from '@dnd-kit/react/sortable';
import { PlusIcon } from 'lucide-react';
import { MAX_QUESTION_COUNT } from '@/entities/quiz';
import {
  SidebarGroup,
  SidebarGroupAction,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
} from '@/shared/ui/sidebar';
import { useQuizEditor } from '../lib/use-quiz-editor';
import { QuestionListItem } from './question-list-item';

export function QuestionList() {
  const questions = useQuizEditor(({ questions }) => questions);
  const setCurrentQuestionId = useQuizEditor(
    ({ setCurrentQuestionId }) => setCurrentQuestionId,
  );
  const addQuestion = useQuizEditor(({ addQuestion }) => addQuestion);
  const moveQuestion = useQuizEditor(({ moveQuestion }) => moveQuestion);
  const validate = useQuizEditor(({ validate }) => validate);

  const handleAddQuestion = async () => {
    if (!(await validate())) return;
    const question = addQuestion();
    setCurrentQuestionId(question.editorId);
  };

  const handleQuestionDragEnd = (e: DragEndEvent) => {
    const { source } = e.operation;
    if (!isSortable(source)) return;
    moveQuestion(source.initialIndex, source.index);
  };

  return (
    <SidebarGroup>
      <SidebarGroupLabel>Вопросы</SidebarGroupLabel>
      <SidebarGroupAction
        className="disabled:pointer-events-none disabled:text-muted-foreground"
        onClick={handleAddQuestion}
        disabled={questions.length >= MAX_QUESTION_COUNT}
      >
        <PlusIcon />
        <span className="sr-only">Добавить вопрос</span>
      </SidebarGroupAction>
      <SidebarGroupContent>
        <DragDropProvider onDragEnd={handleQuestionDragEnd}>
          <SidebarMenu>
            {questions.map((question, index) => (
              <QuestionListItem
                key={question.editorId}
                question={question}
                index={index}
              />
            ))}
          </SidebarMenu>
        </DragDropProvider>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}
