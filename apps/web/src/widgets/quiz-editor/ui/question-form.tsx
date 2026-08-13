import { useEffect } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { FieldGroup } from '@/shared/ui/field';
import { NumberField } from '@/shared/ui/fields/number-field';
import { TextareaField } from '@/shared/ui/fields/textarea-field';
import { useQuizEditor } from '../lib/use-quiz-editor';
import { QuestionSchema } from '../model/schema';
import type { EditorQuestion } from '../model/types';
import { AnswersField } from './answers-field';

export interface QuestionFormProps {
  question: EditorQuestion;
}

export function QuestionForm({ question }: QuestionFormProps) {
  const { control, subscribe, trigger, clearErrors } = useForm({
    resolver: zodResolver(QuestionSchema),
    defaultValues: createValues(question),
    mode: 'onTouched',
  });

  const updateQuestion = useQuizEditor(({ updateQuestion }) => updateQuestion);

  useEffect(
    () =>
      subscribe({
        formState: { values: true },
        callback: ({ values }) => updateQuestion(question.editorId, values),
      }),
    [question.editorId, subscribe, updateQuestion],
  );

  const setValidate = useQuizEditor(({ setValidate }) => setValidate);

  useEffect(() => {
    setValidate(trigger);
  }, [setValidate, trigger]);

  return (
    <FieldGroup>
      <TextareaField
        control={control}
        name="text"
        label="Текст вопроса"
        required
      />
      <NumberField
        control={control}
        name="time"
        label="Время на ответ (секунды)"
        description="0 - без ограничений по времени"
      />
      <AnswersField
        control={control}
        name="answers"
        label="Ответы"
        clearErrors={clearErrors}
        required
      />
    </FieldGroup>
  );
}

function createValues(question: EditorQuestion): QuestionSchema {
  return {
    text: question.text,
    time: question.time,
    answers: question.answers,
  };
}
