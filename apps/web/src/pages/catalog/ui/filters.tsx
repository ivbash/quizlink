import { useId, useState } from 'react';
import { cn } from '@/shared/lib/css';
import { Button } from '@/shared/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/ui/card';
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
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldTitle,
} from '@/shared/ui/field';
import { Slider } from '@/shared/ui/slider';

const tags = ['Кино', 'Сериалы', 'Музыка', 'Игры'];

export function Filters({ className }: { className?: string }) {
  const comboboxAnchor = useComboboxAnchor();
  const tagsId = useId();
  const [questions, setQuestions] = useState([1, 40]);

  return (
    <Card className={cn('[--card-spacing:--spacing(4)]', className)}>
      <CardHeader>
        <CardTitle>Фильтры</CardTitle>
      </CardHeader>
      <CardContent>
        <form>
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor={tagsId}>Теги</FieldLabel>
              <Combobox id={tagsId} items={tags} multiple autoHighlight>
                <ComboboxChips ref={comboboxAnchor}>
                  <ComboboxValue>
                    {(values: string[]) => (
                      <>
                        {values.map((value: string) => (
                          <ComboboxChip key={value}>{value}</ComboboxChip>
                        ))}
                        <ComboboxChipsInput placeholder="Поиск..." />
                      </>
                    )}
                  </ComboboxValue>
                </ComboboxChips>
                <ComboboxContent anchor={comboboxAnchor}>
                  <ComboboxEmpty>Теги не найдены.</ComboboxEmpty>
                  <ComboboxList>
                    {(tag: string) => (
                      <ComboboxItem key={tag} value={tag}>
                        {tag}
                      </ComboboxItem>
                    )}
                  </ComboboxList>
                </ComboboxContent>
              </Combobox>
            </Field>
            <Field>
              <FieldTitle>Количество вопросов</FieldTitle>
              <FieldDescription>
                <span className="font-medium tabular-nums">{questions[0]}</span>{' '}
                –{' '}
                <span className="font-medium tabular-nums">{questions[1]}</span>{' '}
                вопросов
              </FieldDescription>
              <Slider
                min={1}
                max={40}
                step={1}
                value={questions}
                onValueChange={(value) =>
                  setQuestions(value as [number, number])
                }
              />
            </Field>
            <Field>
              <Button type="submit">Применить</Button>
              <Button type="reset" variant="outline">
                Сбросить
              </Button>
            </Field>
          </FieldGroup>
        </form>
      </CardContent>
    </Card>
  );
}
