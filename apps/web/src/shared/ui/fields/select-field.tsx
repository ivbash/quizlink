import {
  Controller,
  type Control,
  type FieldValues,
  type Path,
} from 'react-hook-form';
import { Field, FieldDescription, FieldError, FieldLabel } from '../field';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../select';

export interface SelectItemData {
  label: string;
  value: string;
}

// TODO: Переименовать в SelectFieldProps
export interface TextFieldProps<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
  label: string;
  items: SelectItemData[];
  placeholder?: string;
  description?: string;
  required?: boolean;
}

export function SelectField<T extends FieldValues>({
  control,
  name,
  label,
  items,
  placeholder,
  description,
  required,
}: TextFieldProps<T>) {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { value, onChange, ...field }, fieldState }) => (
        <Field data-invalid={fieldState.invalid}>
          <FieldLabel htmlFor={field.name}>
            {label}
            {required && <span className="text-destructive">*</span>}
          </FieldLabel>
          <Select
            items={items}
            value={value}
            onValueChange={onChange}
            {...field}
          >
            <SelectTrigger id={field.name} aria-invalid={fieldState.invalid}>
              <SelectValue placeholder={placeholder} />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {items.map(({ label, value }) => (
                  <SelectItem key={value} value={value}>
                    {label}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
          {description && <FieldDescription>{description}</FieldDescription>}
          {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
        </Field>
      )}
    />
  );
}
