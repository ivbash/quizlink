import type { UserRole } from '../api/types';
import { USER_ROLES_MAP } from '../model/user-roles';

export function mapRole(role: UserRole) {
  return USER_ROLES_MAP[role];
}
