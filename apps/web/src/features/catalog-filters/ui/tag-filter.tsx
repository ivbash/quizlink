import { useId, useMemo } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';
import type { Tag } from '@/entities/tag';
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
} from '@/shared/ui/combobox';
import { Field, FieldLabel } from '@/shared/ui/field';
import type { FormFilters } from '../model/types';

export interface TagFilterProps {
  tags: Tag[];
}

export function TagFilter({ tags }: TagFilterProps) {
  const tagsId = useId();
  const comboboxAnchor = useComboboxAnchor();

  const { control, setValue } = useFormContext<FormFilters>();

  const value = useWatch({
    control,
    name: 'tags',
  });

  const memoizedValue = useMemo(
    () =>
      value
        .map((id) => tags.find((t) => t.id === id))
        .filter((tag): tag is Tag => !!tag),
    [tags, value],
  );

  const handleChange = (value: Tag[]) => {
    setValue(
      'tags',
      value.map(({ id }) => id),
    );
  };

  return (
    <Field>
      <FieldLabel htmlFor={tagsId}>Теги</FieldLabel>
      <Combobox
        id={tagsId}
        items={tags}
        value={memoizedValue}
        onValueChange={handleChange}
        multiple
        autoHighlight
      >
        <ComboboxChips ref={comboboxAnchor}>
          <ComboboxValue>
            {(values: Tag[]) => (
              <>
                {values.map((value) => (
                  <ComboboxChip key={value.id}>{value.name}</ComboboxChip>
                ))}
                <ComboboxChipsInput placeholder="Поиск..." />
              </>
            )}
          </ComboboxValue>
        </ComboboxChips>
        <ComboboxContent anchor={comboboxAnchor}>
          <ComboboxEmpty>Теги не найдены</ComboboxEmpty>
          <ComboboxList>
            {(tag: Tag) => (
              <ComboboxItem key={tag.id} value={tag}>
                {tag.name}
              </ComboboxItem>
            )}
          </ComboboxList>
        </ComboboxContent>
      </Combobox>
    </Field>
  );
}
