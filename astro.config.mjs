// @ts-check
import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import cloudflare from '@astrojs/cloudflare';

// Function to get site URL from environment variables only
function getSiteUrl() {
  // Priority order for environment variables only:
  // 1. SITE_URL (highest priority)
  // 2. CUSTOM_DOMAIN (override)  
  // 3. CF_PAGES_URL (Cloudflare Pages)
  // 4. Throw error if none set
  
  const siteUrl = process.env.SITE_URL;
  if (siteUrl) {
    return siteUrl;
  }
  
  const customDomain = process.env.CUSTOM_DOMAIN;
  if (customDomain) {
    return customDomain;
  }
  
  const cfPagesUrl = process.env.CF_PAGES_URL;
  if (cfPagesUrl) {
    return cfPagesUrl;
  }
  
  // Throw error if no environment variable is set
  throw new Error('No domain environment variable found. Please set SITE_URL, CUSTOM_DOMAIN, or CF_PAGES_URL');
}

// https://astro.build/config
export default defineConfig({
  site: getSiteUrl(),
  integrations: [tailwind()],
  output: 'server',
  adapter: cloudflare(),
  vite: {
    define: {
      'import.meta.env.SITE_URL': JSON.stringify(process.env.SITE_URL),
      'import.meta.env.CUSTOM_DOMAIN': JSON.stringify(process.env.CUSTOM_DOMAIN),
      'import.meta.env.CF_PAGES_URL': JSON.stringify(process.env.CF_PAGES_URL),
    }
  }
});