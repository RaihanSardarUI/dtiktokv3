// @ts-check
import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import node from '@astrojs/node';

// https://astro.build/config
export default defineConfig({
  integrations: [tailwind()],
  output: 'server',
  adapter: node({
    mode: 'standalone'
  }),
  build: {
    inlineStylesheets: 'always',
  },
  compressHTML: true,
  vite: {
    build: {
      target: 'es2022',
      minify: 'terser',
      terserOptions: {
        compress: {
          drop_console: true,
          drop_debugger: true,
          pure_funcs: ['console.log'],
        },
      },
    },
    assetsInclude: ['**/*.webp'],
  },
});