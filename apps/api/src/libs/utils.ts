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

const multipliers = {
  s: 1000,
  m: 60 * 1000,
  h: 60 * 60 * 1000,
  d: 24 * 60 * 60 * 1000,
};

export function parseTimeToMs(time: string) {
  const match = time.match(/^(\d+)([smhd])$/);
  if (!match || !match[1] || !match[2]) {
    throw new Error('Неверный формат времени');
  }

  const value = parseInt(match[1], 10);
  const unit = match[2] as keyof typeof multipliers;
  return value * multipliers[unit];
}
