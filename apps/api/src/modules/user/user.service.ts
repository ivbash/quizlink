import { hash } from '@/libs/crypto';
import { NotFoundError } from '@/libs/errors';
import { omitPassword } from '@/libs/utils';
import type { AuthRepository } from '@/modules/auth/auth.repository';
import type { UserFilters, UserRepository } from './user.repository';
import type { CreateUserSchema, UpdateUserSchema } from './user.schema';

export interface UserQuery extends Partial<Omit<UserFilters, 'name'>> {
  search?: string;
}

export class UserService {
  constructor(
    private userRepository: UserRepository,
    private authRepository: AuthRepository,
  ) {}

  async getUsers({ page = 1, pageSize = 10, search = '' }: UserQuery) {
    const users = await this.userRepository.findMany({
      page,
      pageSize,
      emailOrUsername: search,
    });
    return users.map(omitPassword);
  }

  async getUserCount(search = '') {
    const count = await this.userRepository.count(search);
    return count;
  }

  async getUserById(id: string) {
    const user = await this.userRepository.findById(id);
    if (!user) throw new NotFoundError('Пользователь не найден');
    return omitPassword(user);
  }

  async createUser({ password, ...data }: CreateUserSchema) {
    const passwordHash = await hash(password);
    const createdUser = await this.userRepository.create({
      ...data,
      password: passwordHash,
    });
    return omitPassword(createdUser);
  }

  async updateUser(id: string, data: UpdateUserSchema) {
    const updatedData = Object.assign({}, data);
    delete updatedData.password;
    if (data.password) {
      updatedData.password = await hash(data.password);
    }
    const updatedUser = await this.userRepository.update(id, updatedData);
    return omitPassword(updatedUser);
  }

  async deleteUser(id: string) {
    await this.authRepository.deleteRefreshTokens(id);
    const deletedUser = await this.userRepository.delete(id);
    return omitPassword(deletedUser);
  }
}
