import { defineConfig } from 'vite';
import { resolve } from 'node:path';

export default defineConfig(({ mode }) => {
  if (mode !== 'library' && mode !== 'library-cjs') return {};
  const format = mode === 'library-cjs' ? 'cjs' : 'es';

  return {
    build: {
      outDir: 'lib',
      emptyOutDir: format === 'es',
      lib: {
        entry: {
          index: resolve('src/index.js'),
          markup: resolve('src/markup.js'),
          ticket: resolve('src/ticket.js'),
        },
        formats: [format],
        fileName: (bundleFormat, entryName) => bundleFormat === 'es' ? `${entryName}.js` : `${entryName}.cjs`,
      },
      rollupOptions: {
        external: id => /^react(?:\/|$)/.test(id),
        output: {
          chunkFileNames: format === 'es' ? 'chunks/[name].js' : 'chunks/[name].cjs',
          exports: 'named',
        },
      },
    },
  };
});
