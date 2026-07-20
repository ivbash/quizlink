import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';
import { toast } from 'sonner';
import { routes } from '@/shared/config/routes';
import { extractErrorMessage } from '@/shared/lib/error';
import { AdminFormLayout } from '@/shared/ui/admin/admin-form-layout';
import { Button } from '@/shared/ui/button';
import { TextField } from '@/shared/ui/fields/text-field';
import { CreateTagSchema } from '../model/schema';
import { useCreateTag } from '../model/use-create-tag';

export function CreateTagForm() {
  const { handleSubmit, control } = useForm<CreateTagSchema>({
    resolver: zodResolver(CreateTagSchema),
    defaultValues: { name: '' },
    mode: 'onTouched',
  });

  const { mutate: createTag } = useCreateTag();
  const navigate = useNavigate();

  const onSubmit = (inputValues: CreateTagSchema) => {
    createTag(inputValues, {
      onSuccess: (tag) => {
        toast.success('Тег сохранен');
        void navigate(routes.admin.updateTag(tag.id));
      },
      onError: (error) => {
        toast.error('Ошибка сохранения тега', {
          description: extractErrorMessage(error, 'Что-то пошло не так'),
        });
      },
    });
  };

  return (
    <AdminFormLayout
      onSubmit={handleSubmit(onSubmit)}
      fields={
        <TextField control={control} name="name" label="Название" required />
      }
      actions={<Button type="submit">Создать</Button>}
    />
  );
}
