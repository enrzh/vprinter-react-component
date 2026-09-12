import { defineConfig } from 'vite';
import { resolve } from 'node:path';

export default defineConfig(({ mode }) => {
  if (mode !== 'library') return {};

  return {
    build: {
      outDir: 'dist',
      emptyOutDir: true,
      lib: {
        entry: resolve('src/index.js'),
        formats: ['es', 'cjs'],
        fileName: format => format === 'es' ? 'index.js' : 'index.cjs',
      },
      rollupOptions: {
        external: id => /^react(?:\/|$)/.test(id),
      },
    },
  };
});
