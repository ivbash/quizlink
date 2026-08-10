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
  const validate = useQuizEditor(({ validate }) => validate);

  return (
    <SidebarGroup>
      <SidebarGroupLabel>Вопросы</SidebarGroupLabel>
      <SidebarGroupAction
        className="disabled:pointer-events-none disabled:text-muted-foreground"
        onClick={async () => {
          if (!(await validate())) return;
          const question = addQuestion();
          setCurrentQuestionId(question.editorId);
        }}
        disabled={questions.length >= MAX_QUESTION_COUNT}
      >
        <PlusIcon />
        <span className="sr-only">Добавить вопрос</span>
      </SidebarGroupAction>
      <SidebarGroupContent>
        <SidebarMenu>
          {questions.map((question, index) => (
            <QuestionListItem
              key={question.editorId}
              question={question}
              index={index + 1}
            />
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}
