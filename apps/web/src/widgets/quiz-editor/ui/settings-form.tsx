import { useEffect } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useTags } from '@/entities/tag';
import { FieldGroup } from '@/shared/ui/field';
import {
  MultipleComboboxField,
  type ComboboxItemData,
} from '@/shared/ui/fields/multiple-combobox-field';
import { TextField } from '@/shared/ui/fields/text-field';
import { TextareaField } from '@/shared/ui/fields/textarea-field';
import { useQuizEditor } from '../lib/use-quiz-editor';
import { QuizSchema } from '../model/schema';
import type { EditorQuiz } from '../model/types';

export interface SettingsFormProps {
  settings: EditorQuiz;
}

export function SettingsForm({ settings }: SettingsFormProps) {
  const { data } = useTags({ pageSize: 100 });

  const { control, subscribe, trigger } = useForm({
    resolver: zodResolver(QuizSchema),
    defaultValues: createValues(settings),
    mode: 'onTouched',
  });

  const updateSettings = useQuizEditor(({ updateSettings }) => updateSettings);

  useEffect(
    () =>
      subscribe({
        formState: { values: true },
        callback: ({ values }) => updateSettings(values),
      }),
    [subscribe, updateSettings],
  );

  const setValidate = useQuizEditor(({ setValidate }) => setValidate);

  useEffect(() => {
    setValidate(trigger);
  }, [setValidate, trigger]);

  return (
    <FieldGroup>
      <TextField
        control={control}
        name="title"
        label="Название викторины"
        required
      />
      <TextareaField
        control={control}
        name="description"
        label="Описание викторины"
        required
      />
      <MultipleComboboxField
        control={control}
        name="tags"
        label="Теги"
        items={data?.tags}
        map={mapComboboxTag}
        empty="Теги не найдены"
      />
    </FieldGroup>
  );
}

function createValues(quiz: EditorQuiz): QuizSchema {
  return {
    title: quiz.title,
    description: quiz.description,
    tags: quiz.tags,
  };
}

const mapComboboxTag = {
  to: (v: EditorQuiz['tags'][number]) => ({
    label: v.name,
    value: v.id.toString(),
  }),
  from: (v: ComboboxItemData) => ({ id: Number(v.value), name: v.label }),
};
