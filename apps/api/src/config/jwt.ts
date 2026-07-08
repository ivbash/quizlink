import { parseTimeToMs } from '@/libs/utils';
import { IS_DEV } from './server';

export const JWT_ACCESS_SECRET = process.env['JWT_ACCESS_SECRET'] || '';
export const JWT_REFRESH_SECRET = process.env['JWT_REFRESH_SECRET'] || '';

export const accessSecret = new TextEncoder().encode(JWT_ACCESS_SECRET);
export const refreshSecret = new TextEncoder().encode(JWT_REFRESH_SECRET);

export const JWT_ACCESS_EXPIRATION =
  process.env['JWT_ACCESS_EXPIRATION'] || '15m';
export const JWT_REFRESH_EXPIRATION =
  process.env['JWT_REFRESH_EXPIRATION'] || '7d';

export const accessExpiration = parseTimeToMs(JWT_ACCESS_EXPIRATION) / 1000;
export const refreshExpiration = parseTimeToMs(JWT_REFRESH_EXPIRATION) / 1000;

export const JWT_ALGORITHM = 'HS256';

export const COOKIE_REFRESH = 'refreshToken';
export const COOKIE_SECURE = !IS_DEV;
export const COOKIE_SAMESITE = IS_DEV ? 'lax' : 'strict';
