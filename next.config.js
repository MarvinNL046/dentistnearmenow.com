/** @type {import('next').NextConfig} */
const nextConfig = {
  // Exclude large data files from serverless function bundles
  outputFileTracingExcludes: {
    '*': [
      './data/discovery/**',
      './data/*-backup-*.json',
      './data/*-progress.json',
      './scripts/**',
      './public/cache/**',
      './public/images/google/**',
    ],
  },
  images: {
    domains: ['lh3.googleusercontent.com', 'maps.googleapis.com', 'images.unsplash.com'],
  },
  async redirects() {
    return [
      // Redirect oude sitemap URLs naar nieuwe dynamische sitemap
      {
        source: '/sitemaps/sitemap-static.xml',
        destination: '/sitemap.xml',
        permanent: true,
      },
      {
        source: '/sitemaps/sitemap-municipalities.xml',
        destination: '/sitemap.xml',
        permanent: true,
      },
      {
        source: '/sitemaps/sitemap-municipalities-:num.xml',
        destination: '/sitemap.xml',
        permanent: true,
      },
      {
        source: '/sitemaps/sitemap-cemeteries-:num.xml',
        destination: '/sitemap.xml',
        permanent: true,
      },
      {
        source: '/sitemap-main.xml',
        destination: '/sitemap.xml',
        permanent: true,
      },
      {
        source: '/sitemap-gemeenten-:num.xml',
        destination: '/sitemap.xml',
        permanent: true,
      },
      {
        source: '/sitemap-begraafplaatsen-:num.xml',
        destination: '/sitemap.xml',
        permanent: true,
      },
      // Voeg hier eventuele andere oude URLs toe die zijn veranderd
      // Bijvoorbeeld als jullie oude URL structuur hadden
    ]
  },
  async rewrites() {
    return [
      {
        // Rewrite /sitemap.xml to the sitemap index API route
        source: '/sitemap.xml',
        destination: '/api/sitemap-index',
      },
    ]
  },
  async headers() {
    return [
      {
        // Cache headers for sitemap index
        source: '/sitemap.xml',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=86400, s-maxage=86400, stale-while-revalidate=86400',
          },
        ],
      },
      {
        // Cache headers for individual sitemaps
        source: '/sitemap/:id.xml',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=86400, s-maxage=86400, stale-while-revalidate=86400',
          },
        ],
      },
    ]
  },
}

module.exports = nextConfig