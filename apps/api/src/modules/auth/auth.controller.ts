import type { FastifyReply, FastifyRequest } from 'fastify';
import {
  COOKIE_REFRESH,
  COOKIE_SAMESITE,
  COOKIE_SECURE,
  refreshExpiration,
} from '@/config/jwt';
import type { SignInSchema, SignUpSchema } from './auth.schema';
import type { AuthService } from './auth.service';

export class AuthController {
  constructor(private service: AuthService) {}

  async signUp(
    request: FastifyRequest<{ Body: SignUpSchema }>,
    reply: FastifyReply,
  ) {
    const { user, token } = await this.service.signUpUser(request.body);
    return reply
      .setCookie(COOKIE_REFRESH, token.refresh, {
        httpOnly: true,
        secure: COOKIE_SECURE,
        sameSite: COOKIE_SAMESITE,
        path: '/',
        maxAge: refreshExpiration,
      })
      .status(201)
      .send({ user, accessToken: token.access });
  }

  async signIn(
    request: FastifyRequest<{ Body: SignInSchema }>,
    reply: FastifyReply,
  ) {
    const { user, token } = await this.service.signInUser(request.body);
    return reply
      .setCookie(COOKIE_REFRESH, token.refresh, {
        httpOnly: true,
        secure: COOKIE_SECURE,
        sameSite: COOKIE_SAMESITE,
        path: '/',
        maxAge: refreshExpiration,
      })
      .send({ user, accessToken: token.access });
  }

  async signOut(_request: FastifyRequest, reply: FastifyReply) {
    await this.service.signOutUser();
    return reply.clearCookie(COOKIE_REFRESH).send({ statusCode: 200 });
  }

  async refresh(request: FastifyRequest, reply: FastifyReply) {
    const refreshToken = request.cookies[COOKIE_REFRESH];
    const { user, token } = await this.service.refreshUser(refreshToken);
    return reply
      .setCookie(COOKIE_REFRESH, token.refresh, {
        httpOnly: true,
        secure: COOKIE_SECURE,
        sameSite: COOKIE_SAMESITE,
        path: '/',
        maxAge: refreshExpiration,
      })
      .send({ user, accessToken: token.access });
  }
}
