import { MetadataRoute } from 'next';

/**
 * Robots.txt configuration for DentistNearMeNow
 *
 * SEO Strategy:
 * - All public content pages are crawlable (including tag pages for link equity)
 * - API routes and Next.js internals are blocked for security/efficiency
 * - Specific rules for major search engine bots
 *
 * Tag pages (/tag/*) are intentionally NOT blocked:
 * - They provide internal linking value and topic clustering
 * - Low priority in sitemap (0.3) but still crawlable for link equity
 * - Help search engines understand site structure and content relationships
 */
export default function robots(): MetadataRoute.Robots {
  const baseUrl = 'https://dentistnearmenow.com';

  return {
    rules: [
      {
        // Default rules for all crawlers
        userAgent: '*',
        allow: [
          '/',              // Allow all public pages
          '/tag/',          // Tag pages are crawlable (for link equity)
          '/services/',     // Service type pages
          '/state/',        // Location pages
          '/city/',         // City pages
          '/dentist/',      // Dentist profile pages
          '/guides/',       // Educational content
        ],
        disallow: [
          '/api/',          // API routes (security)
          '/_next/',        // Next.js internals (no value for SEO)
          '/private/',      // Private pages if any
          '/*.json$',       // JSON files (internal data)
          '/admin/',        // Admin pages if any
        ],
      },
      {
        // Googlebot - more permissive for best indexing
        userAgent: 'Googlebot',
        allow: '/',
        disallow: [
          '/api/',
          '/_next/',
        ],
      },
      {
        // Bingbot - similar to Googlebot
        userAgent: 'Bingbot',
        allow: '/',
        disallow: [
          '/api/',
          '/_next/',
        ],
      },
      // Uncomment below to block AI training bots if desired:
      // {
      //   userAgent: 'GPTBot',
      //   disallow: '/',
      // },
    ],
    // Reference all sitemaps for comprehensive crawling
    sitemap: [
      `${baseUrl}/sitemap/0.xml`,  // Static pages, services, guides, tags
      `${baseUrl}/sitemap/1.xml`,  // Location pages (states, cities)
      `${baseUrl}/sitemap/2.xml`,  // Dentist profile pages
    ],
    host: baseUrl,
  };
}
