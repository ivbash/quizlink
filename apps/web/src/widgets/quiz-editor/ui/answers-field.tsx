import { PlusIcon } from 'lucide-react';
import {
  useFieldArray,
  useFormState,
  type ArrayPath,
  type Control,
  type FieldArray,
  type FieldValues,
  type Path,
  type UseFormClearErrors,
} from 'react-hook-form';
import { MAX_ANSWER_COUNT } from '@/entities/quiz';
import { Button } from '@/shared/ui/button';
import { Field, FieldContent, FieldError, FieldLabel } from '@/shared/ui/field';
import { Answer } from './answer';

export interface AnswersFieldProps<T extends FieldValues> {
  control: Control<T>;
  name: ArrayPath<T>;
  label: string;
  required?: boolean;
  clearErrors?: UseFormClearErrors<T>;
}

export function AnswersField<T extends FieldValues>({
  control,
  name,
  label,
  required,
  clearErrors,
}: AnswersFieldProps<T>) {
  const { fields, append, remove } = useFieldArray({ name, control });

  const { errors } = useFormState({ control, name: name as Path<T> });
  const fieldError = errors[name];

  const isDeleteDisabled = fields.length <= 1;
  const isAddDisabled = fields.length >= MAX_ANSWER_COUNT;

  const handleCheck = (checked: boolean) => {
    if (checked) clearErrors?.(`${name}.root` as Path<T>);
  };

  return (
    <Field>
      <FieldLabel htmlFor={fields[0]?.id}>
        {label}
        {required && <span className="text-destructive">*</span>}
      </FieldLabel>
      <FieldContent>
        <div className="flex flex-col gap-3">
          {fields.map(({ id }, index) => (
            <Answer
              key={id}
              control={control}
              id={id}
              name={`${name}.${index}` as Path<T>}
              index={index + 1}
              onClose={() => remove(index)}
              onCheck={handleCheck}
              isDeleteDisabled={isDeleteDisabled}
            />
          ))}
        </div>
        <div>
          <Button
            type="button"
            variant="ghost"
            onClick={() =>
              append({ isCorrect: false, text: '' } as FieldArray<
                T,
                ArrayPath<T>
              >)
            }
            disabled={isAddDisabled}
          >
            <span>Добавить ответ</span>
            <PlusIcon />
          </Button>
        </div>
      </FieldContent>
      {fieldError?.root && <FieldError errors={[fieldError?.root]} />}
    </Field>
  );
}
