import bcrypt from 'bcrypt';

const saltRounds = 10;

export function hash(password: string) {
  return bcrypt.hash(password, saltRounds);
}

export function compare(password: string, hash: string) {
  return bcrypt.compare(password, hash);
}
