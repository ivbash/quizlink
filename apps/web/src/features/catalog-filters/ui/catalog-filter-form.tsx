import { FormProvider, useForm } from 'react-hook-form';
import { Button } from '@/shared/ui/button';
import { Field, FieldGroup } from '@/shared/ui/field';
import type { FormFilters } from '../model/types';
import { useCatalogFilterParams } from '../model/use-catalog-filter-params';
import {
  QuestionCountFilter,
  type QuestionCountFilterProps,
} from './question-count-filter';
import { TagFilter, type TagFilterProps } from './tag-filter';

type CatalogFilterFormProps = TagFilterProps & QuestionCountFilterProps;

export function CatalogFilterForm({
  tags,
  minQuestionCount,
  maxQuestionCount,
}: CatalogFilterFormProps) {
  const {
    tags: tagsParam,
    minQuestionCount: minQuestionCountParam,
    maxQuestionCount: maxQuestionCountParam,
    setFilters,
    reset,
  } = useCatalogFilterParams({ minQuestionCount, maxQuestionCount });

  const form = useForm<FormFilters>({
    values: {
      tags: tagsParam,
      minQuestionCount: minQuestionCountParam,
      maxQuestionCount: maxQuestionCountParam,
    },
  });

  return (
    <FormProvider {...form}>
      <form
        onSubmit={form.handleSubmit((filters) => {
          setFilters(filters);
        })}
        onReset={() => reset()}
      >
        <FieldGroup>
          <TagFilter tags={tags} />
          <QuestionCountFilter
            minQuestionCount={minQuestionCount}
            maxQuestionCount={maxQuestionCount}
          />
          <Field>
            <Button type="submit">Применить</Button>
            <Button type="reset" variant="outline">
              Сбросить
            </Button>
          </Field>
        </FieldGroup>
      </form>
    </FormProvider>
  );
}
