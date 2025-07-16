/**
 * Shared domain detection utility for DTikTok website
 * Hardcoded for d-tiktok.net - no environment variables needed
 */

import type { AstroGlobal } from 'astro';

// Hardcoded domain - change this if you change your domain
const DOMAIN = 'https://d-tiktok.net';

/**
 * Get current domain - always returns the hardcoded domain
 */
export function getCurrentDomain(astroGlobal?: AstroGlobal): string {
  return DOMAIN;
}

/**
 * Get current domain for API routes - always returns the hardcoded domain
 */
export function getCurrentDomainForAPI(request: Request): string {
  return DOMAIN;
}

/**
 * Get canonical URL for a given path
 */
export function getCanonicalUrl(path: string, astroGlobal?: AstroGlobal): string {
  return `${DOMAIN}${path}`;
}

/**
 * Get asset URL for a given path
 */
export function getAssetUrl(path: string, astroGlobal?: AstroGlobal): string {
  return `${DOMAIN}${path}`;
} 