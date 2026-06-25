import { refreshExpiration } from '@/config/jwt';
import type { RedisClient } from '@/libs/redis';

const redisKeys = {
  userRefreshToken: (userId: string, token: string) =>
    `user:${userId}:refresh:${token}`,
  userRefreshTokens: (userId: string) => `user:${userId}:refresh:*`,
};

export class AuthRepository {
  constructor(private redis: RedisClient) {}

  async findRefreshToken(userId: string, token: string) {
    const key = redisKeys.userRefreshToken(userId, token);
    const value = await this.redis.get(key);
    return value;
  }

  async findRefreshTokens(userId: string) {
    const match = redisKeys.userRefreshTokens(userId);
    const keys = await this.redis.keys(match);
    const values = await this.redis.values(keys);
    return values;
  }

  async saveRefreshToken(userId: string, token: string) {
    const key = redisKeys.userRefreshToken(userId, token);
    await this.redis.set(key, token, {
      expiration: { type: 'EX', value: refreshExpiration },
    });
  }

  async deleteRefreshToken(userId: string, token: string) {
    const key = redisKeys.userRefreshToken(userId, token);
    await this.redis.delete(key);
  }

  async deleteRefreshTokens(userId: string) {
    const match = redisKeys.userRefreshTokens(userId);
    const keys = await this.redis.keys(match);
    await this.redis.delete(keys);
  }
}
