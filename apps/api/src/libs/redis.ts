import type { RedisClientType } from 'redis';
import { isEmpty } from './utils';

export class RedisClient {
  constructor(private _client: RedisClientType) {}

  get client() {
    return this._client;
  }

  connect() {
    return this._client.connect();
  }

  disconnect() {
    return this._client.close();
  }

  async keys(match: string, count = 100) {
    const keys: string[] = [];
    for await (const k of this._client.scanIterator({
      MATCH: match,
      COUNT: count,
    })) {
      keys.push(...k);
    }
    return keys;
  }

  async values(keys: string[]) {
    const values = await this._client.mGet(keys);
    return values;
  }

  async hashValues<T extends string>(keys: string[]) {
    const multi = this._client.multi();
    keys.forEach((key) => multi.hGetAll(key));
    const values = (await multi.exec()) as unknown as Record<T, string>[];
    return values.map((value) => (isEmpty(value) ? null : value));
  }

  async set(...args: Parameters<typeof this._client.set>) {
    await this._client.set(...args);
  }

  async get(...args: Parameters<typeof this._client.get>) {
    const value = await this._client.get(...args);
    return value;
  }

  async setHash(...args: Parameters<typeof this._client.hSet>) {
    await this._client.hSet(...args);
  }

  async getHash<T extends string>(
    ...args: Parameters<typeof this._client.hGetAll>
  ) {
    const hash = await this._client.hGetAll(...args);
    return isEmpty(hash) ? null : (hash as Record<T, string>);
  }

  async delete(keys: Parameters<typeof this._client.del>[0]) {
    if (Array.isArray(keys) && !keys.length) return;
    await this._client.del(keys);
  }

  async expire(...args: Parameters<typeof this._client.expire>) {
    await this._client.expire(...args);
  }
}
