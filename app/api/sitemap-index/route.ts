import { NextResponse } from 'next/server';

const BASE_URL = 'https://dentistnearmenow.com';

/**
 * Sitemap Index API Route
 *
 * Generates a sitemap index XML that references all individual sitemaps:
 * - sitemap/0.xml: Static pages
 * - sitemap/1-51.xml: State-based sitemaps (50 states + DC)
 */
export async function GET() {
  const now = new Date().toISOString();

  // Generate sitemap index entries for all 52 sitemaps
  const sitemapEntries = Array.from({ length: 52 }, (_, i) => `
  <sitemap>
    <loc>${BASE_URL}/sitemap/${i}.xml</loc>
    <lastmod>${now}</lastmod>
  </sitemap>`).join('');

  const sitemapIndex = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${sitemapEntries}
</sitemapindex>`;

  return new NextResponse(sitemapIndex, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=86400, s-maxage=86400',
    },
  });
}
