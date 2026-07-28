import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';
import { USER_ROLES_ITEMS } from '@/entities/user';
import { routes } from '@/shared/config/routes';
import { Toast } from '@/shared/lib/toast';
import { AdminFormLayout } from '@/shared/ui/admin/admin-form-layout';
import { Button } from '@/shared/ui/button';
import {
  SelectField,
  type SelectItemData,
} from '@/shared/ui/fields/select-field';
import { TextField } from '@/shared/ui/fields/text-field';
import { CreateUserSchema } from '../model/schema';
import { useCreateUser } from '../model/use-create-user';

const roles: SelectItemData[] = USER_ROLES_ITEMS;

export function CreateUserForm() {
  const { handleSubmit, control } = useForm<CreateUserSchema>({
    resolver: zodResolver(CreateUserSchema),
    defaultValues: { username: '', email: '', password: '', role: 'user' },
    mode: 'onTouched',
  });

  const { mutate: createUser } = useCreateUser();
  const navigate = useNavigate();

  const onSubmit = (inputValues: CreateUserSchema) => {
    createUser(inputValues, {
      onSuccess: (user) => {
        Toast.success('Пользователь сохранен');
        void navigate(routes.admin.updateUser(user.id));
      },
      onError: (error) => {
        Toast.error('Ошибка сохранения пользователя', error);
      },
    });
  };

  return (
    <AdminFormLayout
      onSubmit={handleSubmit(onSubmit)}
      fields={
        <>
          <TextField control={control} name="username" label="Имя" required />
          <TextField
            control={control}
            type="email"
            name="email"
            label="Email"
            required
          />
          <TextField
            control={control}
            type="password"
            name="password"
            label="Пароль"
            required
          />
          <SelectField
            control={control}
            name="role"
            label="Роль"
            items={roles}
            required
          />
        </>
      }
      actions={<Button type="submit">Создать</Button>}
    />
  );
}
