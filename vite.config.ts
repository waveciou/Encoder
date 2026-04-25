import { fileURLToPath, URL } from 'node:url';

import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

const projectRoot = fileURLToPath(new URL('.', import.meta.url));
const root = fileURLToPath(new URL('./src', import.meta.url));
const outDir = fileURLToPath(new URL('./dist', import.meta.url));

// https://vite.dev/config/
export default defineConfig({
  root,
  base: '/',
  resolve: {
    alias: [
      {
        find: '@/Component',
        replacement: fileURLToPath(
          new URL('./src/components', import.meta.url)
        ),
      },
      {
        find: '@/Interface',
        replacement: fileURLToPath(
          new URL('./src/interface', import.meta.url)
        ),
      },
      {
        find: '@/Function',
        replacement: fileURLToPath(new URL('./src/ts', import.meta.url)),
      },
      {
        find: '@/Test',
        replacement: fileURLToPath(new URL('./src/test', import.meta.url)),
      },
    ],
  },
  plugins: [react(), tailwindcss()],
  build: {
    outDir,
    assetsInlineLimit: 0,
    emptyOutDir: true,
    rollupOptions: {
      output: {
        entryFileNames: 'js/main.js',
        chunkFileNames: 'js/[name].js',
        assetFileNames: (assetInfo) => {
          const name = assetInfo.names?.[0] ?? '';
          if (/\.(gif|jpe?g|png|svg)$/.test(name)) {
            return 'img/[name].[ext]';
          }
          if (/\.css$/.test(name)) {
            return 'css/[name].[ext]';
          }
          if (/manifest\.json$/.test(name)) {
            return '[name].[ext]';
          }
          return '[name].[ext]';
        },
      },
    },
  },
  preview: {
    port: 8080,
    strictPort: true,
  },
  server: {
    port: 8080,
    strictPort: true,
    host: true,
    origin: 'http://0.0.0.0:8080',
  },
});

void projectRoot;
