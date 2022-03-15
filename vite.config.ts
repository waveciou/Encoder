import { resolve } from 'path';
import { defineConfig } from 'vite';
import { createHtmlPlugin } from 'vite-plugin-html';
import react from '@vitejs/plugin-react';

const root = resolve(__dirname, 'src');
const outDir = resolve(__dirname, 'dist');
const assetsDir = 'resources';

// https://vitejs.dev/config/
export default defineConfig({
  root,
  plugins: [
    react(),
    createHtmlPlugin({
      minify: true,
    })
  ],
  build: {
    outDir,
    assetsDir,
    assetsInlineLimit: 0,
    emptyOutDir: true,
    rollupOptions: {
      output: {
        entryFileNames: `${assetsDir}/js/main.js`,
        chunkFileNames: `${assetsDir}/js/[name].js`,
        assetFileNames: ({ name = '' }) => {
          if (/\.(gif|jpe?g|png|svg)$/.test(name)){
            return `${assetsDir}/img/[name].[ext]`;
          }
          if (/\.css$/.test(name)) {
            return `${assetsDir}/css/[name].[ext]`;
          }
          return `${assetsDir}/[name].[ext]`;
        }
      }
    },
  }
})