import { PencilIcon } from 'lucide-react';
import { Link } from 'react-router';
import type { Tag } from '@/entities/tag';
import { DeleteTagDialog } from '@/features/delete-tag';
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

interface TagTableProps {
  tags: Tag[];
}

export function TagTable({ tags }: TagTableProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow className="hover:bg-transparent">
          <TableHead>Название</TableHead>
          <TableHead className="w-1">Действия</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {tags.map((tag) => (
          <TableRow key={tag.id}>
            <TableCell>{tag.name}</TableCell>
            <TableCell className="flex gap-1">
              <Link
                to={routes.admin.updateTag(tag.id)}
                className={buttonVariants({
                  variant: 'secondary',
                  size: 'icon',
                })}
              >
                <PencilIcon />
                <span className="sr-only">Редактировать</span>
              </Link>
              <DeleteTagDialog tag={tag} isIcon />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
