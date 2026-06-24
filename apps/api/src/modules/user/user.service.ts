import { hash } from '@/libs/crypto';
import { NotFoundError } from '@/libs/errors';
import { omitPassword } from '@/libs/utils';
import type { UserRepository } from './user.repository';
import type { CreateUserSchema, UpdateUserSchema } from './user.schema';

export class UserService {
  constructor(private repository: UserRepository) {}

  async getUsers({
    page = 1,
    pageSize = 10,
  }: {
    page: number;
    pageSize: number;
  }) {
    const users = await this.repository.findMany(page, pageSize);
    return users.map(omitPassword);
  }

  async getUserById(id: string) {
    const user = await this.repository.findById(id);
    if (!user) throw new NotFoundError('Пользователь не найден');
    return omitPassword(user);
  }

  async createUser({ password, ...data }: CreateUserSchema) {
    const passwordHash = await hash(password);
    const createdUser = await this.repository.create({
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
    const updatedUser = await this.repository.update(id, updatedData);
    return omitPassword(updatedUser);
  }

  async deleteUser(id: string) {
    const deletedUser = await this.repository.delete(id);
    return omitPassword(deletedUser);
  }
}
