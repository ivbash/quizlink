import { invariant } from '@/shared/lib/invariant';
import type { User } from '../model/types';

export function requireUser(user: User | null | undefined): asserts user {
  invariant(user, 'User required');
}
