import { defineConfig } from 'tsdown';

export default defineConfig({
  entry: 'src/main.ts',
  platform: 'node',
  clean: true,
  minify: true,
  deps: {
    alwaysBundle: [/^@repo\//],
    neverBundle: ['@prisma/adapter-pg', /^@prisma\/client/],
  },
});
