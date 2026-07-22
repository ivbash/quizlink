import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import type { Tag } from '@/entities/tag';
import { Toast } from '@/shared/lib/toast';
import { AdminFormLayout } from '@/shared/ui/admin/admin-form-layout';
import { Button } from '@/shared/ui/button';
import { TextField } from '@/shared/ui/fields/text-field';
import { UpdateTagSchema } from '../model/schema';
import { useUpdateTag } from '../model/use-update-tag';

interface UpdateTagFormProps {
  tag: Tag;
  actions?: React.ReactNode;
}

export function UpdateTagForm({ tag, actions }: UpdateTagFormProps) {
  const { handleSubmit, control, reset } = useForm<UpdateTagSchema>({
    resolver: zodResolver(UpdateTagSchema),
    defaultValues: tag,
    mode: 'onTouched',
  });

  const { mutate: updateTag } = useUpdateTag();

  const onSubmit = (inputValues: UpdateTagSchema) => {
    updateTag(inputValues, {
      onSuccess: (tag) => {
        Toast.success('Тег сохранен');
        reset(tag);
      },
      onError: (error) => {
        Toast.error('Ошибка сохранения тега', error);
      },
    });
  };

  return (
    <AdminFormLayout
      onSubmit={handleSubmit(onSubmit)}
      fields={
        <TextField control={control} name="name" label="Название" required />
      }
      actions={
        <>
          <Button type="submit">Сохранить</Button>
          {actions}
        </>
      }
    />
  );
}
