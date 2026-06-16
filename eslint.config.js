import { defineConfig } from 'eslint/config';
import { eslintBase } from '@repo/tools';

export default defineConfig([
  ...eslintBase,
  {
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.json'],
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
]);
