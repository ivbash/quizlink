import type { UserRole } from '../api/types';

export type UserId = string;

export interface User {
  id: UserId;
  email: string;
  username: string;
  role: UserRole;
  createdAt: Date;
  updatedAt: Date;
}
