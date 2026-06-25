import { jwtVerify, SignJWT } from 'jose';
import type { User } from '@repo/database';
import {
  accessSecret,
  JWT_ACCESS_EXPIRATION,
  JWT_ALGORITHM,
  JWT_REFRESH_EXPIRATION,
  refreshSecret,
} from '@/config/jwt';

export type AccessTokenPayload = Pick<
  User,
  'id' | 'email' | 'role' | 'username'
>;

export function generateAccessToken(payload: AccessTokenPayload) {
  return new SignJWT({
    id: payload.id,
    email: payload.email,
    role: payload.role,
    username: payload.username,
  })
    .setProtectedHeader({ alg: JWT_ALGORITHM })
    .setSubject(payload.id)
    .setIssuedAt()
    .setExpirationTime(JWT_ACCESS_EXPIRATION)
    .sign(accessSecret);
}

export async function verifyAccessToken(token: string) {
  const { payload } = await jwtVerify<AccessTokenPayload>(token, refreshSecret);
  return payload;
}

export type RefreshTokenPayload = Pick<User, 'id'>;

export function generateRefreshToken(payload: RefreshTokenPayload) {
  return new SignJWT({
    id: payload.id,
  })
    .setProtectedHeader({ alg: JWT_ALGORITHM })
    .setSubject(payload.id)
    .setIssuedAt()
    .setExpirationTime(JWT_REFRESH_EXPIRATION)
    .sign(refreshSecret);
}

export async function verifyRefreshToken(token: string) {
  const { payload } = await jwtVerify<RefreshTokenPayload>(
    token,
    refreshSecret,
  );
  return payload;
}
