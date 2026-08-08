import { useFormContext, useWatch } from 'react-hook-form';
import { Field, FieldDescription, FieldTitle } from '@/shared/ui/field';
import { Slider } from '@/shared/ui/slider';
import type { FormFilters } from '../model/types';

export interface QuestionCountFilterProps {
  minQuestionCount: number;
  maxQuestionCount: number;
}

export function QuestionCountFilter({
  minQuestionCount,
  maxQuestionCount,
}: QuestionCountFilterProps) {
  const { control, setValues } = useFormContext<FormFilters>();

  const value = useWatch({
    control,
    name: ['minQuestionCount', 'maxQuestionCount'],
  });
  const [min, max] = value;

  const handleChange = (value: number | readonly number[]) => {
    const [min, max] = value as [number, number];
    setValues({ minQuestionCount: min, maxQuestionCount: max });
  };

  return (
    <Field>
      <FieldTitle>Количество вопросов</FieldTitle>
      <FieldDescription>
        <span className="font-medium tabular-nums">{min}</span> –{' '}
        <span className="font-medium tabular-nums">{max}</span> вопросов
      </FieldDescription>
      <Slider
        min={minQuestionCount}
        max={maxQuestionCount}
        step={1}
        value={value}
        onValueChange={handleChange}
      />
    </Field>
  );
}
