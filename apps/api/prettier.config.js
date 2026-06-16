import { prettierBase } from '@repo/tools';

/** @type {import("prettier").Config} */
const config = {
  ...prettierBase,
  plugins: ['@ianvs/prettier-plugin-sort-imports'],
  importOrder: [
    '<BUILTIN_MODULES>',
    '<THIRD_PARTY_MODULES>',
    '^@repo/(.*)$',
    '^@/(.*)$',
    '^[./]',
  ],
};

export default config;
