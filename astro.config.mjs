// @ts-check
import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import cloudflare from '@astrojs/cloudflare';

// Dynamic site URL function - improved environment variable handling
function getSiteUrl() {
  // Priority order for URL detection:
  
  // 1. Explicit SITE_URL (highest priority)
  if (process.env.SITE_URL) {
    return process.env.SITE_URL;
  }
  
  // 2. Custom domain override
  if (process.env.CUSTOM_DOMAIN) {
    return process.env.CUSTOM_DOMAIN;
  }
  
  // 3. Cloudflare Pages environment variables
  if (process.env.CF_PAGES_URL) {
    return process.env.CF_PAGES_URL;
  }
  
  // 4. Vercel environment variables
  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`;
  }
  
  // 5. Netlify environment variables
  if (process.env.DEPLOY_PRIME_URL) {
    return process.env.DEPLOY_PRIME_URL;
  }
  
  // 6. Development fallback with better localhost handling
  const devPort = process.env.PORT || '4321';
  return process.env.NODE_ENV === 'production' 
    ? 'https://dtiktokv4.pages.dev' 
    : `http://localhost:${devPort}`;
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