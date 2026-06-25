import { compare, hash } from '@/libs/crypto';
import { ConflictError, isJOSEError, UnauthorizedError } from '@/libs/errors';
import {
  generateAccessToken,
  generateRefreshToken,
  verifyRefreshToken,
} from '@/libs/jwt';
import { omitPassword } from '@/libs/utils';
import type { UserRepository } from '@/modules/user/user.repository';
import type { SignInSchema, SignUpSchema } from './auth.schema';

export class AuthService {
  constructor(private userRepository: UserRepository) {}

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

    const [access, refresh] = await Promise.all([
      generateAccessToken(createdUser),
      generateRefreshToken(createdUser),
    ]);

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

    const [access, refresh] = await Promise.all([
      generateAccessToken(user),
      generateRefreshToken(user),
    ]);

    return {
      user: omitPassword(user),
      token: { access, refresh },
    };
  }

  async signOutUser() {}

  async refreshUser(refreshToken?: string) {
    if (!refreshToken) {
      throw new UnauthorizedError('Refresh токен отсутствует');
    }

    try {
      const payload = await verifyRefreshToken(refreshToken);

      const user = await this.userRepository.findById(payload.id);
      if (!user) {
        throw new UnauthorizedError('Пользователь удален');
      }

      const [access, refresh] = await Promise.all([
        generateAccessToken(user),
        generateRefreshToken(user),
      ]);

      return {
        user: omitPassword(user),
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
