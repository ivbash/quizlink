import { prettierBase } from '@repo/tools';

/** @type {import("prettier").Config} */
const config = {
  ...prettierBase,
  plugins: [
    '@ianvs/prettier-plugin-sort-imports',
    'prettier-plugin-tailwindcss',
  ],
  tailwindStylesheet: './src/app/styles/index.css',
  tailwindFunctions: ['cn', 'clsx', 'cva'],
  importOrder: [
    '^react$',
    '^react-dom$',
    '^react-dom/(.*)$',
    '<THIRD_PARTY_MODULES>',
    '^@repo/(.*)$',
    '^@/(.*)$',
    '^[./]',
    '^.*\\.s?css$',
  ],
  importOrderSafeSideEffects: ['^.*\\.s?css$'],
};

export default config;
