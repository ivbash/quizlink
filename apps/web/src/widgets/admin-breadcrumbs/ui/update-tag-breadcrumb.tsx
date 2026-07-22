import type { UIMatch } from 'react-router';
import { useTag } from '@/entities/tag';
import { Breadcrumb } from '@/shared/ui/admin/breadcrumb';

interface UpdateTagBreadcrumbProps {
  tagId: number;
  match: UIMatch;
}

export function UpdateTagBreadcrumb({
  tagId,
  match,
}: UpdateTagBreadcrumbProps) {
  const { data: tag } = useTag(tagId);
  return <Breadcrumb title={tag?.name ?? ''} match={match} />;
}
