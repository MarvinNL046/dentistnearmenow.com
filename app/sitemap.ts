import { MetadataRoute } from 'next';
import { getAllDentists, US_STATES, Dentist } from '@/lib/dentist-data';
import { getIndexablePages } from '@/lib/top10';

// ISR: Revalidate sitemaps every 24 hours
export const revalidate = 86400;

const BASE_URL = 'https://dentistnearmenow.com';

/**
 * Sitemap Index Structure:
 * - sitemap-0.xml: Static pages (homepage, services, guides, utility, legal)
 * - sitemap-1.xml to sitemap-51.xml: State-based sitemaps (50 states + DC)
 *
 * Each state sitemap contains:
 * - State page
 * - City pages for that state
 * - Emergency city pages for that state
 * - Dentist profile pages for that state
 *
 * SEO Priority Hierarchy:
 * - 1.0: Homepage
 * - 0.9: Pillar pages (/services, /guides, /state, /emergency-dentist)
 * - 0.8: Sub-pillar pages (/state/[state], /services/[type])
 * - 0.7: City pages, guide articles
 * - 0.6: Dentist profile pages
 * - 0.5: Utility pages (about, contact, for-dentists)
 * - 0.3: Legal pages, tag pages
 */

// Tag categories for organizing dental content
const tagCategories = [
  'accepts-insurance',
  'weekend-hours',
  'emergency-available',
];

// Generate sitemap IDs: 0 for static, 1-51 for states
export async function generateSitemaps() {
  // Sitemap 0 = static pages
  // Sitemaps 1-51 = one per state (50 states + DC)
  const sitemaps = [{ id: 0 }];

  US_STATES.forEach((_, index) => {
    sitemaps.push({ id: index + 1 });
  });

  return sitemaps;
}

export default async function sitemap(props: {
  id: Promise<string>
}): Promise<MetadataRoute.Sitemap> {
  // Next.js 16+ passes id as Promise<string>
  const id = Number(await props.id);

  // Sitemap 0: Static pages
  if (id === 0) {
    return await generateStaticSitemap();
  }

  // Sitemaps 1-51: State-based sitemaps
  const stateIndex = id - 1;
  if (stateIndex >= 0 && stateIndex < US_STATES.length) {
    const state = US_STATES[stateIndex];
    return generateStateSitemap(state.abbr, state.slug);
  }

  return [];
}

/**
 * Generate sitemap for static pages
 */
async function generateStaticSitemap(): Promise<MetadataRoute.Sitemap> {
  const sitemap: MetadataRoute.Sitemap = [];
  const now = new Date();

  // Homepage - highest priority
  sitemap.push({
    url: `${BASE_URL}`,
    lastModified: now,
    changeFrequency: 'daily',
    priority: 1.0,
  });

  // Search page
  sitemap.push({
    url: `${BASE_URL}/search`,
    lastModified: now,
    changeFrequency: 'daily',
    priority: 0.8,
  });

  // Pillar pages - priority 0.9
  const pillarPages = ['/services', '/state', '/emergency-dentist', '/guides', '/best-dentists'];
  pillarPages.forEach(page => {
    sitemap.push({
      url: `${BASE_URL}${page}`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.9,
    });
  });

  // Guide articles - priority 0.8
  const guidePages = [
    '/guides/finding-right-dentist',
    '/guides/dental-anxiety',
    '/guides/dental-insurance',
    '/guides/dental-health-tips',
    '/guides/cosmetic-dentistry',
    '/guides/pediatric-dental-care',
    '/guides/dental-emergencies',
    '/guides/oral-health-conditions',
    '/guides/dental-procedures',
  ];
  guidePages.forEach(page => {
    sitemap.push({
      url: `${BASE_URL}${page}`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.8,
    });
  });

  // Service type pages - priority 0.8
  const serviceTypes = [
    'general-dentistry',
    'cosmetic-dentistry',
    'orthodontics',
    'oral-surgery',
    'pediatric-dentistry',
    'endodontist',
    'periodontist',
    'emergency-dentist',
  ];
  serviceTypes.forEach(type => {
    sitemap.push({
      url: `${BASE_URL}/services/${type}`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.8,
    });
  });

  // Utility pages - priority 0.5
  const utilityPages = ['/for-dentists', '/about', '/contact', '/faq'];
  utilityPages.forEach(page => {
    sitemap.push({
      url: `${BASE_URL}${page}`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.5,
    });
  });

  // Legal pages - priority 0.3
  const legalPages = ['/privacy', '/terms', '/html-sitemap'];
  legalPages.forEach(page => {
    sitemap.push({
      url: `${BASE_URL}${page}`,
      lastModified: now,
      changeFrequency: 'yearly',
      priority: 0.3,
    });
  });

  // Tag pages - priority 0.3
  tagCategories.forEach(tag => {
    sitemap.push({
      url: `${BASE_URL}/tag/${tag}`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.3,
    });
  });

  // Best dentists pages (Top 10) - priority 0.8
  // These are programmatic SEO pages with high value
  const indexablePages = await getIndexablePages();
  indexablePages.forEach(page => {
    // Convert slug from "best-dentists-chicago-il" to URL path
    const cityStatePart = page.slug.replace('best-dentists-', '');
    sitemap.push({
      url: `${BASE_URL}/best-dentists/${cityStatePart}`,
      lastModified: page.updated_at ? new Date(page.updated_at) : now,
      changeFrequency: 'daily',
      priority: 0.85, // High priority for these ranking pages
    });
  });

  return sitemap;
}

/**
 * Generate sitemap for a specific state
 */
async function generateStateSitemap(stateAbbr: string, stateSlug: string): Promise<MetadataRoute.Sitemap> {
  const sitemap: MetadataRoute.Sitemap = [];
  const now = new Date();

  // Get all dentists and filter for this state
  const allDentists = await getAllDentists();
  const stateDentists = allDentists.filter(d =>
    d.stateAbbr?.toUpperCase() === stateAbbr.toUpperCase()
  );

  // State page - priority 0.8
  sitemap.push({
    url: `${BASE_URL}/state/${stateSlug}`,
    lastModified: now,
    changeFrequency: 'weekly',
    priority: 0.8,
  });

  // Collect unique cities for this state
  const citySet = new Set<string>();
  const emergencyCitySet = new Set<string>();

  stateDentists.forEach((d: Dentist) => {
    if (d.city) {
      const citySlug = `${d.city.toLowerCase().replace(/\s+/g, '-')}-${stateAbbr.toLowerCase()}`;
      citySet.add(citySlug);

      if (d.emergencyServices) {
        emergencyCitySet.add(citySlug);
      }
    }
  });

  // City pages - priority 0.7
  citySet.forEach(citySlug => {
    sitemap.push({
      url: `${BASE_URL}/city/${citySlug}`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.7,
    });
  });

  // Emergency city pages - priority 0.7
  emergencyCitySet.forEach(citySlug => {
    sitemap.push({
      url: `${BASE_URL}/emergency-dentist/${citySlug}`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.7,
    });
  });

  // Dentist pages for this state - priority 0.6
  stateDentists.forEach((dentist: Dentist) => {
    sitemap.push({
      url: `${BASE_URL}/dentist/${dentist.slug}`,
      lastModified: dentist.lastUpdated ? new Date(dentist.lastUpdated) : now,
      changeFrequency: 'monthly',
      priority: 0.6,
    });
  });

  return sitemap;
}
