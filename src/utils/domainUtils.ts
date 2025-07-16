/**
 * Shared domain detection utility for DTikTok website
 * This ensures consistent domain detection using ONLY environment variables
 */

import type { AstroGlobal } from 'astro';

/**
 * Get current domain using ONLY environment variables
 * Priority order:
 * 1. SITE_URL environment variable (highest priority)
 * 2. CUSTOM_DOMAIN override
 * 3. CF_PAGES_URL (Cloudflare Pages)
 * 4. Throws error if none set
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
  
  // 3. Cloudflare Pages environment variables
  if (import.meta.env.CF_PAGES_URL) {
    return import.meta.env.CF_PAGES_URL;
  }
  
  // 4. Throw error if no environment variable is set
  throw new Error('No domain environment variable found. Please set SITE_URL, CUSTOM_DOMAIN, or CF_PAGES_URL');
}

/**
 * Get current domain for API routes using ONLY environment variables
 * Same priority as getCurrentDomain but for API context
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
  
  // 4. Throw error if no environment variable is set
  throw new Error('No domain environment variable found. Please set SITE_URL, CUSTOM_DOMAIN, or CF_PAGES_URL');
}

/**
 * Get canonical URL for a given path using environment variables only
 */
export function getCanonicalUrl(path: string, astroGlobal?: AstroGlobal): string {
  const domain = getCurrentDomain(astroGlobal);
  return `${domain}${path}`;
}

/**
 * Get asset URL for a given path using environment variables only
 */
export function getAssetUrl(path: string, astroGlobal?: AstroGlobal): string {
  const domain = getCurrentDomain(astroGlobal);
  return `${domain}${path}`;
} 