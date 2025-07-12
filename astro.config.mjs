// @ts-check
import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import cloudflare from '@astrojs/cloudflare';

// Dynamic site URL function - matches layout.astro domain detection logic
function getSiteUrl() {
  // Check for environment variable first
  if (process.env.SITE_URL) {
    return process.env.SITE_URL;
  }
  
  // Check for Cloudflare Pages environment variables
  if (process.env.CF_PAGES_URL) {
    return process.env.CF_PAGES_URL;
  }
  
  // Check for Vercel environment variables
  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`;
  }
  
  // Check for Netlify environment variables
  if (process.env.DEPLOY_PRIME_URL) {
    return process.env.DEPLOY_PRIME_URL;
  }
  
  // Default fallback - updated to correct domain
  return 'https://dtiktokv4.pages.dev';
}

// https://astro.build/config
export default defineConfig({
  site: getSiteUrl(),
  integrations: [tailwind()],
  output: 'server',
  adapter: cloudflare(),
  build: {
    inlineStylesheets: 'auto',
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