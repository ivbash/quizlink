import type { ExactPartial } from './types';

export function omitPassword<T extends { password: string }>({
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  password,
  ...user
}: T): Omit<T, 'password'> {
  return user;
}

export function removeUndefined<T extends object>(obj: T) {
  return Object.fromEntries(
    Object.entries(obj).filter(([, value]) => value !== undefined),
  ) as ExactPartial<T>;
}
