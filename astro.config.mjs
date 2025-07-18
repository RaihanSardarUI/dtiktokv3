// @ts-check
import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import cloudflare from '@astrojs/cloudflare';

// https://astro.build/config
export default defineConfig({
  site: 'https://d-tiktok.net',
  integrations: [tailwind()],
  output: 'server',
  adapter: cloudflare(),
  
  // Performance optimizations
  build: {
    // Inline CSS for better LCP
    inlineStylesheets: 'auto',
    // Split chunks for better caching
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor': ['astro'],
        }
      }
    }
  },
  
  // Compress HTML
  compressHTML: true,
  
  // Image optimization
  image: {
    // Use the built-in image optimization
    service: {
      entrypoint: 'astro/assets/services/sharp'
    }
  },
  
  // Prefetch configuration
  prefetch: {
    prefetchAll: true,
    defaultStrategy: 'viewport'
  },
  
  // Experimental features for better performance
  experimental: {
    contentCollectionCache: true,
    clientPrerender: true
  }
});