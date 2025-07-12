// @ts-check
import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import cloudflare from '@astrojs/cloudflare';
import sitemap from '@astrojs/sitemap';

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
  
  // Default fallback - matches the layout fallback
  return 'https://dtiktokv3.pages.dev';
}

// https://astro.build/config
export default defineConfig({
  site: getSiteUrl(),
  integrations: [
    tailwind(), 
    sitemap({
      // Filter out unwanted pages
      filter: (page) => {
        // Exclude admin pages, API endpoints, and utility pages
        return !page.includes('/admin/') && 
               !page.includes('/api/') && 
               !page.includes('/404') &&
               !page.includes('/_') &&
               !page.includes('/test/');
      }
    })
  ],
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