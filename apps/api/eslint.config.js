import { defineConfig, globalIgnores } from 'eslint/config';
import globals from 'globals';
import { eslintBase } from '@repo/tools';

export default defineConfig([
  globalIgnores(['dist']),
  ...eslintBase,
  {
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      globals: globals.node,
      parserOptions: {
        project: ['./tsconfig.lint.json'],
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
]);
