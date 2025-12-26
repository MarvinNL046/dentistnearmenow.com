import { MetadataRoute } from 'next';
import { getAllDentists, US_STATES } from '@/lib/dentist-data';

const BASE_URL = 'https://dentistnearmenow.com';

// Max URLs per sitemap (Google recommends max 50,000)
const MAX_URLS_PER_SITEMAP = 10000;

/**
 * SEO Priority Hierarchy:
 * - 1.0: Homepage (most important, entry point)
 * - 0.9: Pillar pages (/services, /guides, /state, /emergency-dentist)
 * - 0.8: Sub-pillar pages (/state/[state], /services/[type])
 * - 0.7: City pages, guide articles
 * - 0.6: Detail pages (dentist profiles)
 * - 0.5: Utility pages (about, contact, for-dentists)
 * - 0.3: Legal pages, tag pages (low priority but crawlable for link equity)
 */

/**
 * Tag categories for organizing dental content
 * These help with internal linking and topic clustering
 */
const tagCategories = [
  // Service-related tags
  'teeth-whitening',
  'dental-implants',
  'braces',
  'invisalign',
  'root-canal',
  'dental-crowns',
  'dental-veneers',
  'tooth-extraction',
  'dental-cleaning',
  'dental-fillings',
  // Condition-related tags
  'toothache',
  'gum-disease',
  'cavities',
  'tooth-sensitivity',
  'bad-breath',
  // Audience tags
  'family-dentistry',
  'senior-dental-care',
  'dental-anxiety',
  // Insurance/payment tags
  'accepts-medicaid',
  'accepts-insurance',
  'affordable-dental-care',
  'dental-payment-plans',
];

/**
 * Generate multiple sitemaps for scalability
 * This creates sitemap-0.xml, sitemap-1.xml, etc.
 * Google recommends splitting large sitemaps for better crawling
 */
export async function generateSitemaps() {
  const dentists = await getAllDentists();

  // Calculate number of sitemaps needed:
  // 1 for static pages
  // 1 for states/cities
  // N for dentists (split by MAX_URLS_PER_SITEMAP)
  const dentistSitemapCount = Math.ceil(dentists.length / MAX_URLS_PER_SITEMAP);

  // Generate sitemap IDs: 0 = static, 1 = locations, 2+ = dentists
  const sitemaps = [
    { id: 0 }, // Static pages, services, guides
    { id: 1 }, // States and cities
    ...Array.from({ length: dentistSitemapCount }, (_, i) => ({ id: i + 2 })),
  ];

  return sitemaps;
}

export default async function sitemap({ id }: { id: number }): Promise<MetadataRoute.Sitemap> {
  const dentists = await getAllDentists();

  // Sitemap 0: Static pages
  if (id === 0) {
    return getStaticSitemap();
  }

  // Sitemap 1: Locations (states and cities)
  if (id === 1) {
    return getLocationsSitemap(dentists);
  }

  // Sitemap 2+: Dentists (paginated)
  const dentistIndex = id - 2;
  const start = dentistIndex * MAX_URLS_PER_SITEMAP;
  const end = start + MAX_URLS_PER_SITEMAP;
  const dentistSlice = dentists.slice(start, end);

  return getDentistsSitemap(dentistSlice);
}

/**
 * Static pages sitemap (sitemap-0.xml)
 * Includes homepage, pillar pages, utility pages, legal pages, and tag pages
 */
function getStaticSitemap(): MetadataRoute.Sitemap {
  const staticPages: MetadataRoute.Sitemap = [
    // Homepage - highest priority
    {
      url: `${BASE_URL}`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1.0,
    },
    // Search - high priority utility
    {
      url: `${BASE_URL}/search`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.8,
    },
    // Pillar pages - priority 0.9
    {
      url: `${BASE_URL}/services`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/state`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/emergency-dentist`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/guides`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    // Guide articles - sub-pillar priority 0.8
    {
      url: `${BASE_URL}/guides/finding-right-dentist`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/guides/dental-anxiety`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/guides/dental-insurance`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/guides/dental-health-tips`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/guides/cosmetic-dentistry`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/guides/pediatric-dental-care`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/guides/dental-emergencies`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/guides/oral-health-conditions`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/guides/dental-procedures`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    // Utility pages - priority 0.5
    {
      url: `${BASE_URL}/for-dentists`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: `${BASE_URL}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: `${BASE_URL}/contact`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: `${BASE_URL}/faq`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    // Legal pages - priority 0.3
    {
      url: `${BASE_URL}/privacy`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: `${BASE_URL}/terms`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.3,
    },
  ];

  // Service type pages
  const serviceTypes = [
    'general-dentistry',
    'cosmetic-dentistry',
    'orthodontics',
    'oral-surgery',
    'pediatric-dentistry',
    'endodontist',
    'periodontist',
    'emergency-dentist',
    // Alternative slugs
    'general-dentist',
    'cosmetic-dentist',
    'orthodontist',
    'oral-surgeon',
    'pediatric-dentist',
  ];

  // Service type pages - sub-pillar priority 0.8
  const servicePages: MetadataRoute.Sitemap = serviceTypes.map((type) => ({
    url: `${BASE_URL}/services/${type}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  // Tag pages - low priority 0.3 (crawlable for link equity)
  const tagPages: MetadataRoute.Sitemap = tagCategories.map((tag) => ({
    url: `${BASE_URL}/tag/${tag}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.3,
  }));

  return [...staticPages, ...servicePages, ...tagPages];
}

/**
 * Locations sitemap (sitemap-1.xml)
 * Contains all state and city pages
 */
function getLocationsSitemap(dentists: { city: string; stateAbbr: string; emergencyServices?: boolean }[]): MetadataRoute.Sitemap {
  const sitemap: MetadataRoute.Sitemap = [];

  // Add all state pages - sub-pillar priority 0.8
  US_STATES.forEach((state) => {
    sitemap.push({
      url: `${BASE_URL}/state/${state.slug}`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    });
  });

  // Get unique city-state combinations
  const cityStateSet = new Set<string>();
  const emergencyCitySet = new Set<string>();

  dentists.forEach((d) => {
    if (d.city && d.stateAbbr) {
      const slug = `${d.city.toLowerCase().replace(/\s+/g, '-')}-${d.stateAbbr.toLowerCase()}`;
      cityStateSet.add(slug);

      // Track emergency cities
      if (d.emergencyServices) {
        emergencyCitySet.add(slug);
      }
    }
  });

  // Add city pages
  cityStateSet.forEach((citySlug) => {
    sitemap.push({
      url: `${BASE_URL}/city/${citySlug}`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.7,
    });
  });

  // Add emergency city pages
  emergencyCitySet.forEach((citySlug) => {
    sitemap.push({
      url: `${BASE_URL}/emergency-dentist/${citySlug}`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.7,
    });
  });

  return sitemap;
}

/**
 * Dentists sitemap (sitemap-2+.xml)
 * Contains individual dentist pages, paginated
 */
function getDentistsSitemap(dentists: { slug: string; lastUpdated?: string }[]): MetadataRoute.Sitemap {
  return dentists.map((dentist) => ({
    url: `${BASE_URL}/dentist/${dentist.slug}`,
    lastModified: dentist.lastUpdated ? new Date(dentist.lastUpdated) : new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }));
}
