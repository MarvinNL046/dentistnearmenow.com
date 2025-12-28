import { neon } from '@neondatabase/serverless';
import { unstable_cache } from 'next/cache';

const sql = neon(process.env.DATABASE_URL!);

// Confidence factor for Bayesian scoring
const C = 20;

export interface Top10Dentist {
  id: number;
  slug: string;
  name: string;
  rating: number;
  review_count: number;
  score: number;
  address?: string;
  phone?: string;
  photo_url?: string;
  emergency_services?: boolean;
  accepting_new_patients?: boolean;
}

export interface PageData {
  slug: string;
  city: string;
  state: string;
  indexable: boolean;
  dentist_count: number;
  mean_rating: number;
  payload: {
    top10: Top10Dentist[];
    avgReviewCount: number;
    generatedAt: string;
  };
}

/**
 * Get page data by city and state
 */
export const getPageByCityState = unstable_cache(
  async (city: string, state: string): Promise<PageData | null> => {
    const results = await sql`
      SELECT slug, city, state, indexable, dentist_count, mean_rating, payload
      FROM pages
      WHERE city = ${city} AND state = ${state}
      LIMIT 1
    `;

    if (results.length === 0) return null;

    const row = results[0] as any;
    return {
      ...row,
      dentist_count: Number(row.dentist_count),
      mean_rating: Number(row.mean_rating || 0),
      payload: typeof row.payload === 'string' ? JSON.parse(row.payload) : row.payload,
    };
  },
  ['page-by-city-state'],
  { revalidate: 86400 } // 24 hours
);

/**
 * Get page data by slug
 */
export const getPageBySlug = unstable_cache(
  async (slug: string): Promise<PageData | null> => {
    const results = await sql`
      SELECT slug, city, state, indexable, dentist_count, mean_rating, payload
      FROM pages
      WHERE slug = ${slug}
      LIMIT 1
    `;

    if (results.length === 0) return null;

    const row = results[0] as any;
    return {
      ...row,
      dentist_count: Number(row.dentist_count),
      mean_rating: Number(row.mean_rating || 0),
      payload: typeof row.payload === 'string' ? JSON.parse(row.payload) : row.payload,
    };
  },
  ['page-by-slug'],
  { revalidate: 86400 }
);

/**
 * Get fresh top 10 dentists with full details
 */
export const getTop10WithDetails = unstable_cache(
  async (city: string, state: string): Promise<Top10Dentist[]> => {
    // First get city mean rating
    const statsResult = await sql`
      SELECT COALESCE(AVG(rating), 0)::float as mean_rating
      FROM dentists
      WHERE city = ${city} AND state_abbr = ${state}
        AND rating IS NOT NULL
    `;
    const meanRating = statsResult[0]?.mean_rating || 0;

    // Get top 10 with Bayesian score
    const results = await sql`
      SELECT
        id,
        slug,
        name,
        rating,
        review_count,
        address,
        phone,
        photo_url,
        emergency_services,
        accepting_new_patients,
        ((rating::numeric * review_count::numeric) + (${C}::numeric * ${meanRating}::numeric)) / (review_count::numeric + ${C}::numeric) AS score
      FROM dentists
      WHERE city = ${city}
        AND state_abbr = ${state}
        AND rating IS NOT NULL
        AND review_count IS NOT NULL
      ORDER BY score DESC, review_count DESC
      LIMIT 10
    `;

    return results.map((d: any) => ({
      ...d,
      rating: Number(d.rating),
      score: Number(d.score),
    }));
  },
  ['top10-details'],
  { revalidate: 86400 }
);

/**
 * Get all indexable pages for sitemap
 */
export const getIndexablePages = unstable_cache(
  async (): Promise<{ slug: string; updated_at: string }[]> => {
    const results = await sql`
      SELECT slug, updated_at
      FROM pages
      WHERE indexable = TRUE
      ORDER BY dentist_count DESC
    `;
    return results as any[];
  },
  ['indexable-pages'],
  { revalidate: 3600 } // 1 hour
);

/**
 * Get top indexable cities for static generation
 */
export async function getTopCitiesForStaticGen(limit = 50): Promise<string[]> {
  const results = await sql`
    SELECT slug
    FROM pages
    WHERE indexable = TRUE
    ORDER BY dentist_count DESC
    LIMIT ${limit}
  `;
  return results.map((r: any) => r.slug.replace('best-dentists-', ''));
}

/**
 * Parse city-state slug back to city and state
 */
export function parseCityStateSlug(slug: string): { city: string; state: string } | null {
  // Expected format: "chicago-il" or "san-diego-ca"
  const parts = slug.toLowerCase().split('-');
  if (parts.length < 2) return null;

  const state = parts.at(-1)!.toUpperCase();
  const cityParts = parts.slice(0, -1);

  // Title case the city
  const city = cityParts
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');

  return { city, state };
}

/**
 * Get top indexable cities for hub page
 */
export const getTopCitiesForHub = unstable_cache(
  async (limit = 100): Promise<{ city: string; state: string; slug: string; dentist_count: number; mean_rating: number }[]> => {
    const results = await sql`
      SELECT city, state, slug, dentist_count, mean_rating
      FROM pages
      WHERE indexable = TRUE
      ORDER BY dentist_count DESC
      LIMIT ${limit}
    `;
    return results.map((r: any) => ({
      ...r,
      dentist_count: Number(r.dentist_count),
      mean_rating: Number(r.mean_rating || 0),
    }));
  },
  ['top-cities-hub'],
  { revalidate: 3600 } // 1 hour
);

/**
 * Get cities grouped by state for hub page
 */
export const getCitiesByState = unstable_cache(
  async (): Promise<Record<string, { city: string; slug: string; dentist_count: number }[]>> => {
    const results = await sql`
      SELECT city, state, slug, dentist_count
      FROM pages
      WHERE indexable = TRUE
      ORDER BY state, dentist_count DESC
    `;

    const byState: Record<string, { city: string; slug: string; dentist_count: number }[]> = {};
    for (const row of results as any[]) {
      if (!byState[row.state]) {
        byState[row.state] = [];
      }
      byState[row.state].push({
        city: row.city,
        slug: row.slug,
        dentist_count: Number(row.dentist_count),
      });
    }
    return byState;
  },
  ['cities-by-state'],
  { revalidate: 3600 }
);

/**
 * Get related cities in same state
 */
export const getRelatedCities = unstable_cache(
  async (state: string, excludeCity: string, limit = 5): Promise<{ city: string; slug: string; dentist_count: number }[]> => {
    const results = await sql`
      SELECT city, slug, dentist_count
      FROM pages
      WHERE state = ${state}
        AND city != ${excludeCity}
        AND indexable = TRUE
      ORDER BY dentist_count DESC
      LIMIT ${limit}
    `;
    return results as any[];
  },
  ['related-cities'],
  { revalidate: 86400 }
);
