import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { USER_ROLES_ITEMS, type User } from '@/entities/user';
import { getChangedValues } from '@/shared/lib/form';
import { Toast } from '@/shared/lib/toast';
import { isEmpty } from '@/shared/lib/utils';
import { AdminFormLayout } from '@/shared/ui/admin/admin-form-layout';
import { Button } from '@/shared/ui/button';
import {
  SelectField,
  type SelectItemData,
} from '@/shared/ui/fields/select-field';
import { TextField } from '@/shared/ui/fields/text-field';
import { UpdateUserSchema } from '../model/schema';
import { useUpdateUser } from '../model/use-update-user';

const roles: SelectItemData[] = USER_ROLES_ITEMS;

interface UpdateUserFormProps {
  user: User;
  actions?: React.ReactNode;
}

export function UpdateUserForm({ user, actions }: UpdateUserFormProps) {
  const {
    handleSubmit,
    control,
    formState: { dirtyFields },
    reset,
  } = useForm<UpdateUserSchema>({
    resolver: zodResolver(UpdateUserSchema),
    values: { ...user, password: '' },
    mode: 'onTouched',
  });

  const { mutate: updateUser } = useUpdateUser();

  const onSubmit = (inputValues: UpdateUserSchema) => {
    const changedValues = getChangedValues(
      inputValues,
      Object.keys(dirtyFields),
    );

    if (isEmpty(changedValues)) {
      Toast.standart('Данные не изменились');
      setTimeout(() => reset());
      return;
    }

    updateUser(
      { id: inputValues.id, ...changedValues },
      {
        onSuccess: (user) => {
          Toast.success('Пользователь сохранен');
          reset(user);
        },
        onError: (error) => {
          Toast.error('Ошибка сохранения пользователя', error);
        },
      },
    );
  };

  return (
    <AdminFormLayout
      onSubmit={handleSubmit(onSubmit)}
      fields={
        <>
          <TextField control={control} name="username" label="Имя" />
          <TextField
            control={control}
            type="email"
            name="email"
            label="Email"
          />
          <TextField
            control={control}
            type="password"
            name="password"
            label="Пароль"
          />
          <SelectField
            control={control}
            name="role"
            label="Роль"
            items={roles}
          />
        </>
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
