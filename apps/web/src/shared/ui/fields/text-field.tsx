import {
  Controller,
  type Control,
  type FieldValues,
  type Path,
} from 'react-hook-form';
import { Field, FieldDescription, FieldError, FieldLabel } from '../field';
import { Input } from '../input';

export interface TextFieldProps<T extends FieldValues> {
  control: Control<T>;
  type?: React.HTMLInputTypeAttribute;
  name: Path<T>;
  label: string;
  placeholder?: string;
  description?: string;
  nullable?: boolean;
  required?: boolean;
}

export function TextField<T extends FieldValues>({
  control,
  type,
  name,
  label,
  placeholder,
  description,
  nullable,
  required,
}: TextFieldProps<T>) {
  return (
    <Controller
      control={control}
      name={name}
      render={({
        field: { value: fieldValue, onChange, ...field },
        fieldState,
      }) => {
        const value =
          fieldValue === undefined || fieldValue === null ? '' : fieldValue;

        const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
          const stringValue = e.target.value;
          let value: string | null | undefined = stringValue;

          if (stringValue === '') {
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
              type={type}
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
