import type { APIRoute } from 'astro';
import { getCurrentDomainForAPI } from '../utils/domainUtils';

export const GET: APIRoute = async ({ request }) => {
  // Get the current domain using shared utility function
  const currentDomain = getCurrentDomainForAPI(request);

  // Define all your site pages
  const pages = [
    {
      url: '/',
      lastmod: '2025-01-14',
      changefreq: 'weekly',
      priority: '1.0'
    },
    {
      url: '/add-dtiktok/',
      lastmod: '2025-01-14',
      changefreq: 'monthly',
      priority: '0.9'
    },
    {
      url: '/privacy-policy/',
      lastmod: '2025-01-14',
      changefreq: 'yearly',
      priority: '0.3'
    },
    {
      url: '/terms-and-conditions/',
      lastmod: '2025-01-14',
      changefreq: 'yearly',
      priority: '0.3'
    },
    {
      url: '/disclaimer/',
      lastmod: '2025-01-14',
      changefreq: 'yearly',
      priority: '0.3'
    },
    {
      url: '/cookie-policy/',
      lastmod: '2025-01-14',
      changefreq: 'yearly',
      priority: '0.3'
    }
  ];

  // Generate XML sitemap
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
  ${pages.map(page => `
  <url>
    <loc>${currentDomain}${page.url}</loc>
    <lastmod>${page.lastmod}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>${page.url === '/' ? `
    <image:image>
      <image:loc>${currentDomain}/DTikTok.webp</image:loc>
      <image:title>DTikTok - TikTok Video Downloader</image:title>
      <image:caption>Free iOS shortcut to download TikTok videos without watermark</image:caption>
    </image:image>` : ''}${page.url === '/add-dtiktok/' ? `
    <image:image>
      <image:loc>${currentDomain}/DTikTok-SS1.webp</image:loc>
      <image:title>DTikTok Screenshots</image:title>
    </image:image>` : ''}
  </url>`).join('')}
</urlset>`;

  return new Response(sitemap, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=3600', // Cache for 1 hour
    },
  });
}; 