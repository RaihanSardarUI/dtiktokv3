/**
 * Shared domain detection utility for DTikTok website
 * This ensures consistent domain detection across all components
 */

import type { AstroGlobal } from 'astro';

/**
 * Get current domain using environment variables and request headers
 * Priority order:
 * 1. SITE_URL environment variable (highest priority)
 * 2. CUSTOM_DOMAIN override
 * 3. CF_PAGES_URL (Cloudflare Pages)
 * 4. Request headers (fallback)
 * 5. Environment-based fallback
 */
export function getCurrentDomain(astroGlobal?: AstroGlobal): string {
  // 1. Explicit SITE_URL environment variable (highest priority)
  if (import.meta.env.SITE_URL) {
    return import.meta.env.SITE_URL;
  }
  
  // 2. Custom domain override
  if (import.meta.env.CUSTOM_DOMAIN) {
    return import.meta.env.CUSTOM_DOMAIN;
  }
  
  // 3. Astro.site configuration (if available)
  if (astroGlobal?.site) {
    return astroGlobal.site.origin;
  }
  
  // 4. Cloudflare Pages environment variables
  if (import.meta.env.CF_PAGES_URL) {
    return import.meta.env.CF_PAGES_URL;
  }
  
  // 5. Request headers detection (fallback)
  if (astroGlobal?.request) {
    const host = astroGlobal.request.headers.get('host');
    if (host) {
      // Use HTTPS for production-like hostnames, HTTP for localhost
      const protocol = host.includes('localhost') || host.includes('127.0.0.1') ? 'http' : 'https';
      return `${protocol}://${host}`;
    }
  }
  
  // 6. Final fallback
  return import.meta.env.NODE_ENV === 'production' 
    ? 'https://dtiktokv4.pages.dev' 
    : 'http://localhost:4321';
}

/**
 * Get current domain for API routes (without Astro global)
 */
export function getCurrentDomainForAPI(request: Request): string {
  // 1. Explicit SITE_URL environment variable (highest priority)
  if (import.meta.env.SITE_URL) {
    return import.meta.env.SITE_URL;
  }
  
  // 2. Custom domain override
  if (import.meta.env.CUSTOM_DOMAIN) {
    return import.meta.env.CUSTOM_DOMAIN;
  }
  
  // 3. Cloudflare Pages environment variables
  if (import.meta.env.CF_PAGES_URL) {
    return import.meta.env.CF_PAGES_URL;
  }
  
  // 4. Request headers detection (fallback)
  const host = request.headers.get('host');
  if (host) {
    // Use HTTPS for production-like hostnames, HTTP for localhost
    const protocol = host.includes('localhost') || host.includes('127.0.0.1') ? 'http' : 'https';
    return `${protocol}://${host}`;
  }
  
  // 5. Final fallback
  return import.meta.env.NODE_ENV === 'production' 
    ? 'https://dtiktokv4.pages.dev' 
    : 'http://localhost:4321';
}

/**
 * Generate canonical URL for a given path
 */
export function getCanonicalUrl(path: string, astroGlobal?: AstroGlobal): string {
  const domain = getCurrentDomain(astroGlobal);
  return `${domain}${path}`;
}

/**
 * Generate full URL for assets (images, etc.)
 */
export function getAssetUrl(assetPath: string, astroGlobal?: AstroGlobal): string {
  const domain = getCurrentDomain(astroGlobal);
  return `${domain}${assetPath.startsWith('/') ? '' : '/'}${assetPath}`;
} 