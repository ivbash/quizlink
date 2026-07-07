import { compare, hash } from '@/libs/crypto';
import { ConflictError, isJOSEError, UnauthorizedError } from '@/libs/errors';
import {
  generateAccessToken,
  generateRefreshToken,
  verifyRefreshToken,
} from '@/libs/jwt';
import { omitPassword } from '@/libs/utils';
import type { UserRepository } from '@/modules/user/user.repository';
import type { AuthRepository } from './auth.repository';
import type { SignInSchema, SignUpSchema } from './auth.schema';

export class AuthService {
  constructor(
    private userRepository: UserRepository,
    private authRepository: AuthRepository,
  ) {}

  async signUpUser({ password, ...data }: SignUpSchema) {
    const [email, username] = await Promise.all([
      this.userRepository.findByEmail(data.email),
      this.userRepository.findByUsername(data.username),
    ]);

    if (email) {
      throw new ConflictError('Пользователь с таким email уже существует');
    }
    if (username) {
      throw new ConflictError('Пользователь с таким username уже существует');
    }

    const passwordHash = await hash(password);
    const createdUser = await this.userRepository.create({
      ...data,
      password: passwordHash,
      role: 'user',
    });

    const [access, { jti, refresh }] = await Promise.all([
      generateAccessToken(createdUser),
      generateRefreshToken(createdUser),
    ]);

    await this.authRepository.saveRefreshToken(createdUser.id, jti);

    return {
      user: omitPassword(createdUser),
      token: { access, refresh },
    };
  }

  async signInUser({ login, password }: SignInSchema) {
    const user = await this.userRepository.findByEmailOrUsername(login);
    if (!user || !(await compare(password, user.password))) {
      throw new UnauthorizedError('Неверные учетные данные');
    }

    const [access, { jti, refresh }] = await Promise.all([
      generateAccessToken(user),
      generateRefreshToken(user),
    ]);

    await this.authRepository.saveRefreshToken(user.id, jti);

    return {
      user: omitPassword(user),
      token: { access, refresh },
    };
  }

  async signOutUser(refreshToken?: string) {
    if (!refreshToken) return;

    try {
      const { id, jti } = await verifyRefreshToken(refreshToken);
      if (!jti) return;
      await this.authRepository.deleteRefreshToken(id, jti);
    } catch (error) {
      if (isJOSEError(error)) return;
      throw error;
    }
  }

  async refreshUser(refreshToken?: string) {
    if (!refreshToken) {
      throw new UnauthorizedError('Refresh токен отсутствует');
    }

    try {
      const payload = await verifyRefreshToken(refreshToken);
      if (
        !(await this.authRepository.findRefreshToken(payload.id, payload.jti))
      ) {
        await this.authRepository.deleteRefreshTokens(payload.id);
        throw new UnauthorizedError('Refresh токен отозван');
      }

      const [access, { jti, refresh }] = await Promise.all([
        generateAccessToken(payload),
        generateRefreshToken(payload),
      ]);

      await this.authRepository.deleteRefreshToken(payload.id, payload.jti);
      await this.authRepository.saveRefreshToken(payload.id, jti);

      return {
        token: { access, refresh },
      };
    } catch (error) {
      if (isJOSEError(error)) {
        throw new UnauthorizedError('Срок действия Refresh токена истек');
      }
      throw error;
    }
  }
}
