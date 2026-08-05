import { PlusIcon } from 'lucide-react';
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
        onClick={async () => {
          if (!(await validate())) return;
          const question = addQuestion();
          setCurrentQuestionId(question.editorId);
        }}
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
