import { useMemo } from 'react';
import {
  Controller,
  type Control,
  type FieldValues,
  type Path,
} from 'react-hook-form';
import {
  Combobox,
  ComboboxChip,
  ComboboxChips,
  ComboboxChipsInput,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxItem,
  ComboboxList,
  ComboboxValue,
  useComboboxAnchor,
} from '../combobox';
import { Field, FieldDescription, FieldError, FieldLabel } from '../field';

export interface ComboboxItemData {
  label: string;
  value: string;
}

export interface MultipleComboboxFieldProps<
  T extends FieldValues,
  K = ComboboxItemData,
> {
  control: Control<T>;
  name: Path<T>;
  label: string;
  description?: string;
  empty?: string;
  items?: K[] | undefined;
  map?: {
    to: (value: K) => ComboboxItemData;
    from: (value: ComboboxItemData) => K;
  };
  required?: boolean;
}

export function MultipleComboboxField<
  T extends FieldValues,
  K = ComboboxItemData,
>({
  control,
  name,
  label,
  description,
  empty,
  items: itemsProp,
  map,
  required,
}: MultipleComboboxFieldProps<T, K>) {
  const anchor = useComboboxAnchor();
  const items = useMemo(
    () => itemsProp?.map(map ? map.to : same),
    [itemsProp, map],
  );

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
          <Combobox
            id={field.name}
            items={items}
            isItemEqualToValue={isItemEqualToValue}
            value={(value as K[]).map(map ? map.to : same)}
            onValueChange={(value) =>
              onChange(value.map(map ? map.from : same))
            }
            multiple
            autoHighlight
            {...field}
          >
            <ComboboxChips ref={anchor}>
              <ComboboxValue>
                {(values: ComboboxItemData[]) => (
                  <>
                    {values.map((value) => (
                      <ComboboxChip key={value.value}>
                        {value.label}
                      </ComboboxChip>
                    ))}
                    <ComboboxChipsInput />
                  </>
                )}
              </ComboboxValue>
            </ComboboxChips>
            <ComboboxContent anchor={anchor}>
              <ComboboxEmpty>{empty}</ComboboxEmpty>
              <ComboboxList>
                {(item: ComboboxItemData) => (
                  <ComboboxItem key={item.value} value={item}>
                    {item.label}
                  </ComboboxItem>
                )}
              </ComboboxList>
            </ComboboxContent>
          </Combobox>
          {description && <FieldDescription>{description}</FieldDescription>}
          {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
        </Field>
      )}
    />
  );
}

function isItemEqualToValue(
  itemValue: ComboboxItemData,
  value: ComboboxItemData,
) {
  return itemValue.value === value.value;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function same(value: any): any {
  return value;
}
