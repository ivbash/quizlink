import { Trash2Icon } from 'lucide-react';
import {
  Controller,
  type Control,
  type FieldValues,
  type Path,
} from 'react-hook-form';
import { Button } from '@/shared/ui/button';
import { Checkbox } from '@/shared/ui/checkbox';
import { Field } from '@/shared/ui/field';
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from '@/shared/ui/input-group';

export interface AnswerProps<T extends FieldValues> {
  control: Control<T>;
  id: string;
  name: Path<T>;
  index: number;
  isDeleteDisabled?: boolean;
  onClose: () => void;
  onCheck?: ((checked: boolean) => void) | undefined;
}

export function Answer<T extends FieldValues>({
  control,
  id,
  name,
  index,
  isDeleteDisabled,
  onClose,
  onCheck,
}: AnswerProps<T>) {
  return (
    <div className="flex items-center gap-2">
      <AnswerIsCorrectField
        control={control}
        name={`${name}.isCorrect` as Path<T>}
        onCheck={onCheck}
      />
      <AnswerTextField
        control={control}
        id={id}
        name={`${name}.text` as Path<T>}
        index={index}
      />
      <Button
        type="button"
        variant="ghost"
        className="text-destructive hover:bg-destructive/10 hover:text-destructive dark:hover:bg-destructive/20"
        onClick={onClose}
        disabled={isDeleteDisabled}
      >
        <Trash2Icon />
        <span className="sr-only">Удалить элемент</span>
      </Button>
    </div>
  );
}

interface AnswerIsCorrectFieldProps<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
  onCheck?: ((checked: boolean) => void) | undefined;
}

function AnswerIsCorrectField<T extends FieldValues>({
  control,
  name,
  onCheck,
}: AnswerIsCorrectFieldProps<T>) {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { value, onChange, ...field }, fieldState }) => (
        <Checkbox
          className="size-7 rounded-full group-has-disabled/field:opacity-100"
          id={field.name}
          aria-invalid={fieldState.invalid}
          checked={value}
          onCheckedChange={(checked) => {
            onChange(checked);
            onCheck?.(checked);
          }}
          {...field}
        />
      )}
    />
  );
}

interface AnswerTextFieldProps<T extends FieldValues> {
  control: Control<T>;
  id: string;
  name: Path<T>;
  index: number;
}

function AnswerTextField<T extends FieldValues>({
  control,
  id,
  name,
  index,
}: AnswerTextFieldProps<T>) {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState }) => (
        <Field>
          <InputGroup>
            <InputGroupInput
              type="text"
              id={id}
              aria-invalid={fieldState.invalid}
              {...field}
            />
            <InputGroupAddon>{index}</InputGroupAddon>
          </InputGroup>
          {/* {fieldState.invalid && <FieldError errors={[fieldState.error]} />} */}
        </Field>
      )}
    />
  );
}
