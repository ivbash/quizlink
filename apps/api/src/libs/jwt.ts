import { jwtVerify, SignJWT, type JWTPayload } from 'jose';
import type { User } from '@repo/database';
import {
  accessSecret,
  JWT_ACCESS_EXPIRATION,
  JWT_ALGORITHM,
  JWT_REFRESH_EXPIRATION,
  refreshSecret,
} from '@/config/jwt';
import { uuid } from './uuid';

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

export type VerifiedAccessTokenPayload = AccessTokenPayload &
  Required<Pick<JWTPayload, 'sub'>>;

export async function verifyAccessToken(token: string) {
  const { payload } = await jwtVerify<VerifiedAccessTokenPayload>(
    token,
    accessSecret,
  );
  return payload;
}

export type RefreshTokenPayload = Pick<User, 'id'>;

export async function generateRefreshToken(payload: RefreshTokenPayload) {
  const jti = uuid();
  const refresh = await new SignJWT({
    id: payload.id,
  })
    .setProtectedHeader({ alg: JWT_ALGORITHM })
    .setSubject(payload.id)
    .setIssuedAt()
    .setExpirationTime(JWT_REFRESH_EXPIRATION)
    .setJti(jti)
    .sign(refreshSecret);

  return { jti, refresh };
}

export type VerifiedRefreshTokenPayload = RefreshTokenPayload &
  Required<Pick<JWTPayload, 'sub' | 'jti'>>;

export async function verifyRefreshToken(token: string) {
  const { payload } = await jwtVerify<VerifiedRefreshTokenPayload>(
    token,
    refreshSecret,
  );
  return payload;
}
