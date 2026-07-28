import { PencilIcon } from 'lucide-react';
import { Link } from 'react-router';
import { mapRole, type User } from '@/entities/user';
import { DeleteUserDialog } from '@/features/delete-user';
import { routes } from '@/shared/config/routes';
import { buttonVariants } from '@/shared/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/shared/ui/table';

interface UserTableProps {
  users: User[];
}

export function UserTable({ users }: UserTableProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow className="hover:bg-transparent">
          <TableHead className="w-1/4">Имя</TableHead>
          <TableHead className="w-2/4">Email</TableHead>
          <TableHead className="w-1/4">Роль</TableHead>
          <TableHead className="w-1">Действия</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {users.map((user) => (
          <TableRow key={user.id}>
            <TableCell>{user.username}</TableCell>
            <TableCell>{user.email}</TableCell>
            <TableCell>{mapRole(user.role)}</TableCell>
            <TableCell className="flex gap-1">
              <Link
                to={routes.admin.updateUser(user.id)}
                className={buttonVariants({
                  variant: 'secondary',
                  size: 'icon',
                })}
              >
                <PencilIcon />
                <span className="sr-only">Редактировать</span>
              </Link>
              <DeleteUserDialog user={user} isIcon />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
