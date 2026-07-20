import {
  Controller,
  type Control,
  type FieldValues,
  type Path,
} from 'react-hook-form';
import { Field, FieldDescription, FieldError, FieldLabel } from '../field';
import { Input } from '../input';

export type NumberFieldProps<T extends FieldValues> = {
  control: Control<T>;
  name: Path<T>;
  label: string;
  placeholder?: string;
  description?: string;
  numberType?: 'int' | 'float';
  nullable?: boolean;
  empty?: boolean;
  required?: boolean;
};

export function NumberField<T extends FieldValues>({
  control,
  name,
  label,
  placeholder,
  description,
  numberType = 'int',
  nullable,
  empty,
  required,
}: NumberFieldProps<T>) {
  return (
    <Controller
      control={control}
      name={name}
      render={({
        field: { value: fieldValue, onChange, ...field },
        fieldState,
      }) => {
        const value =
          fieldValue === undefined || fieldValue === null || isNaN(fieldValue)
            ? ''
            : String(fieldValue);

        const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
          const stringValue = e.target.value;
          let value: number | null | undefined =
            numberType === 'float'
              ? parseFloat(stringValue)
              : parseInt(stringValue);

          if (stringValue === '') {
            if (!empty) value = 0;
            if (nullable) value = null;
          }

          onChange(value);
        };

        return (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor={field.name}>
              {label}
              {required && <span className="text-destructive">*</span>}
            </FieldLabel>
            <Input
              type="number"
              id={field.name}
              placeholder={placeholder}
              aria-invalid={fieldState.invalid}
              value={value}
              onChange={handleChange}
              {...field}
            />
            {description && <FieldDescription>{description}</FieldDescription>}
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        );
      }}
    />
  );
}
