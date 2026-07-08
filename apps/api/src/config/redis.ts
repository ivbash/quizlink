import { createClient } from 'redis';

const REDIS_URL = process.env['REDIS_URL'] || 'redis://localhost:6379';

export const redis = createClient({ url: REDIS_URL }).on('error', (err) =>
  console.log('Redis Client Error', err),
);
