import { promises as fs } from 'fs';
import path from 'path';

// US Cemetery Interface
export interface Cemetery {
  // Core identifiers
  id: string;
  name: string;
  slug: string;

  // Location - US geography
  address?: string;
  city: string;
  county?: string;
  state: string;
  state_abbr: string;
  zipCode?: string;
  country: string;
  gps_coordinates?: string;
  latitude?: number;
  longitude?: number;

  // Classification
  type: string;
  type_slug: string;

  // Contact
  phone?: string;
  email?: string;
  website?: string;

  // Details
  description?: string;
  opening_hours?: string;
  facilities?: string[];
  year_established?: string;

  // Google data
  rating?: number;
  review_count?: number;
  photo?: string;
  photo_url?: string;
  photos?: string[];

  // Reviews
  reviews?: Array<{
    reviewer_name: string;
    rating: number;
    review_text: string;
    review_date: string;
    reviewer_image?: string;
  }>;

  // Metadata
  status?: string;
  source?: string;
  discovered_at?: string;
  updated_at?: string;
}

// Generated content for SEO
export interface GeneratedContent {
  summary: string;
  history: string;
  features: string[];
  accessibility: string;
  amenities: string[];
  visitor_tips: string[];
  notable_burials?: string;
  natural_setting?: string;
  local_context?: string;
  state_info?: string;
  type_info?: string;
  practical_info?: string;
  directions?: string;
}

// Enriched cemetery with generated content
export interface EnrichedCemeteryData {
  website_url?: string;
  website_content?: string;
  website_scraped_at?: string;

  google_rating?: number;
  google_review_count?: number;
  google_reviews?: Array<{
    reviewer_name: string;
    rating: number;
    review_text: string;
    review_date: string;
  }>;
  google_photo?: string;
  google_photos?: string[];

  generated?: GeneratedContent;
  generated_at?: string;

  enriched: boolean;
  enriched_at?: string;
  last_updated?: string;

  seoTitle?: string;
  seoDescription?: string;
  enrichedContent?: string;
}

export interface CemeteryWithContent extends Cemetery, EnrichedCemeteryData {}

// State interface
export interface State {
  name: string;
  abbr: string;
  slug: string;
  counties?: number;
  capital?: string;
  major_cities?: string[];
}

// Cemetery type interface
export interface CemeteryType {
  slug: string;
  name: string;
  description?: string;
  search_terms?: string[];
}

// Cache
let cemeteriesCache: Cemetery[] | null = null;
let statesCache: State[] | null = null;
let typesCache: CemeteryType[] | null = null;

// ===== CORE DATA FUNCTIONS =====

export async function getAllCemeteries(): Promise<Cemetery[]> {
  if (cemeteriesCache) return cemeteriesCache;

  try {
    // Try public data first
    const publicPath = path.join(process.cwd(), 'public', 'data', 'cemeteries.json');
    try {
      const content = await fs.readFile(publicPath, 'utf-8');
      cemeteriesCache = JSON.parse(content) as Cemetery[];
      return cemeteriesCache;
    } catch {
      // Continue to data directory
    }

    // Try data directory
    const dataPath = path.join(process.cwd(), 'data', 'cemeteries.json');
    const content = await fs.readFile(dataPath, 'utf-8');
    cemeteriesCache = JSON.parse(content) as Cemetery[];
    return cemeteriesCache;
  } catch (error) {
    console.error('Error loading cemetery data:', error);
    return [];
  }
}

export async function getCemeteryBySlug(slug: string): Promise<CemeteryWithContent | null> {
  try {
    const cemeteries = await getAllCemeteries() as CemeteryWithContent[];
    const cemetery = cemeteries.find(c => c.slug === slug);

    if (!cemetery) return null;

    // Try to load enriched content
    try {
      const enrichedPath = path.join(process.cwd(), 'data', 'enriched-content', `${slug}.json`);
      const enrichedContent = await fs.readFile(enrichedPath, 'utf-8');
      const enrichedData = JSON.parse(enrichedContent);

      return {
        ...cemetery,
        enriched: true,
        generated: enrichedData.generated,
        enriched_at: enrichedData.enriched_at,
        seoTitle: enrichedData.seoTitle,
        seoDescription: enrichedData.seoDescription,
        enrichedContent: enrichedData.content,
      };
    } catch {
      // No enriched content, return basic data
      return {
        ...cemetery,
        enriched: false
      };
    }
  } catch (error) {
    console.error('Error loading cemetery:', error);
    return null;
  }
}

// ===== STATE FUNCTIONS =====

export async function getAllStates(): Promise<State[]> {
  if (statesCache) return statesCache;

  try {
    const statesPath = path.join(process.cwd(), 'data', 'states.json');
    const content = await fs.readFile(statesPath, 'utf-8');
    const data = JSON.parse(content);
    statesCache = data.states as State[];
    return statesCache;
  } catch (error) {
    console.error('Error loading states:', error);
    return [];
  }
}

export async function getStateBySlug(slug: string): Promise<State | null> {
  const states = await getAllStates();
  return states.find(s => s.slug === slug) || null;
}

export async function getStateByAbbr(abbr: string): Promise<State | null> {
  const states = await getAllStates();
  return states.find(s => s.abbr.toLowerCase() === abbr.toLowerCase()) || null;
}

export async function getCemeteriesByState(state: string): Promise<Cemetery[]> {
  const cemeteries = await getAllCemeteries();
  return cemeteries.filter(c =>
    c.state?.toLowerCase() === state.toLowerCase() ||
    c.state_abbr?.toLowerCase() === state.toLowerCase()
  );
}

// ===== COUNTY FUNCTIONS =====

export async function getAllCounties(): Promise<string[]> {
  const cemeteries = await getAllCemeteries();
  const counties = [...new Set(cemeteries
    .map(c => c.county)
    .filter((c): c is string => typeof c === 'string' && c.trim() !== '')
  )];
  return counties.sort();
}

export async function getCountiesByState(state: string): Promise<string[]> {
  const cemeteries = await getCemeteriesByState(state);
  const counties = [...new Set(cemeteries
    .map(c => c.county)
    .filter((c): c is string => typeof c === 'string' && c.trim() !== '')
  )];
  return counties.sort();
}

export async function getCemeteriesByCounty(county: string, state?: string): Promise<Cemetery[]> {
  const cemeteries = await getAllCemeteries();
  return cemeteries.filter(c => {
    const countyMatch = c.county?.toLowerCase() === county.toLowerCase();
    if (state) {
      return countyMatch && (
        c.state?.toLowerCase() === state.toLowerCase() ||
        c.state_abbr?.toLowerCase() === state.toLowerCase()
      );
    }
    return countyMatch;
  });
}

// ===== CITY FUNCTIONS =====

export async function getAllCities(): Promise<string[]> {
  const cemeteries = await getAllCemeteries();
  const cities = [...new Set(cemeteries
    .map(c => c.city)
    .filter((c): c is string => typeof c === 'string' && c.trim() !== '')
  )];
  return cities.sort();
}

export async function getCitiesByState(state: string): Promise<string[]> {
  const cemeteries = await getCemeteriesByState(state);
  const cities = [...new Set(cemeteries
    .map(c => c.city)
    .filter((c): c is string => typeof c === 'string' && c.trim() !== '')
  )];
  return cities.sort();
}

export async function getCemeteriesByCity(city: string, state?: string): Promise<Cemetery[]> {
  const cemeteries = await getAllCemeteries();
  return cemeteries.filter(c => {
    const cityMatch = c.city?.toLowerCase() === city.toLowerCase();
    if (state) {
      return cityMatch && (
        c.state?.toLowerCase() === state.toLowerCase() ||
        c.state_abbr?.toLowerCase() === state.toLowerCase()
      );
    }
    return cityMatch;
  });
}

// ===== TYPE FUNCTIONS =====

export async function getAllTypes(): Promise<CemeteryType[]> {
  if (typesCache) return typesCache;

  try {
    const typesPath = path.join(process.cwd(), 'data', 'cemetery-types.json');
    const content = await fs.readFile(typesPath, 'utf-8');
    const data = JSON.parse(content);
    typesCache = data.types as CemeteryType[];
    return typesCache;
  } catch (error) {
    console.error('Error loading cemetery types:', error);
    return [];
  }
}

export async function getTypeBySlug(slug: string): Promise<CemeteryType | null> {
  const types = await getAllTypes();
  return types.find(t => t.slug === slug) || null;
}

export async function getCemeteriesByType(type: string): Promise<Cemetery[]> {
  const cemeteries = await getAllCemeteries();
  return cemeteries.filter(c =>
    c.type?.toLowerCase() === type.toLowerCase() ||
    c.type_slug?.toLowerCase() === type.toLowerCase()
  );
}

// ===== SLUG UTILITIES =====

export function createSlug(name: string, city: string, state_abbr?: string): string {
  const base = state_abbr
    ? `${name}-${city}-${state_abbr}`
    : `${name}-${city}`;

  return base
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export function createStateSlug(state: string): string {
  return state
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-]/g, '');
}

export function createCountySlug(county: string): string {
  return county
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-]/g, '');
}

export function createCitySlug(city: string): string {
  return city
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-]/g, '');
}

export function createTypeSlug(type: string): string {
  return type
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-]/g, '');
}

// ===== STATISTICS =====

export async function getStats() {
  const cemeteries = await getAllCemeteries();
  const states = await getAllStates();
  const types = await getAllTypes();

  const statesWithCemeteries = [...new Set(cemeteries.map(c => c.state))].length;
  const citiesWithCemeteries = [...new Set(cemeteries.map(c => c.city))].length;
  const withRatings = cemeteries.filter(c => c.rating).length;
  const withPhotos = cemeteries.filter(c => c.photo || (c.photos && c.photos.length > 0)).length;

  return {
    total_cemeteries: cemeteries.length,
    total_states: states.length,
    states_with_cemeteries: statesWithCemeteries,
    cities_with_cemeteries: citiesWithCemeteries,
    total_types: types.length,
    with_ratings: withRatings,
    with_photos: withPhotos,
  };
}

// ===== SEARCH =====

export async function searchCemeteries(query: string, filters?: {
  state?: string;
  type?: string;
  city?: string;
  county?: string;
}): Promise<Cemetery[]> {
  let cemeteries = await getAllCemeteries();

  // Apply filters
  if (filters?.state) {
    cemeteries = cemeteries.filter(c =>
      c.state?.toLowerCase() === filters.state!.toLowerCase() ||
      c.state_abbr?.toLowerCase() === filters.state!.toLowerCase()
    );
  }

  if (filters?.type) {
    cemeteries = cemeteries.filter(c =>
      c.type?.toLowerCase().includes(filters.type!.toLowerCase()) ||
      c.type_slug?.toLowerCase() === filters.type!.toLowerCase()
    );
  }

  if (filters?.city) {
    cemeteries = cemeteries.filter(c =>
      c.city?.toLowerCase() === filters.city!.toLowerCase()
    );
  }

  if (filters?.county) {
    cemeteries = cemeteries.filter(c =>
      c.county?.toLowerCase() === filters.county!.toLowerCase()
    );
  }

  // Apply search query
  if (query && query.trim()) {
    const q = query.toLowerCase().trim();
    cemeteries = cemeteries.filter(c =>
      c.name?.toLowerCase().includes(q) ||
      c.city?.toLowerCase().includes(q) ||
      c.county?.toLowerCase().includes(q) ||
      c.state?.toLowerCase().includes(q) ||
      c.address?.toLowerCase().includes(q) ||
      c.zipCode?.includes(q)
    );
  }

  return cemeteries;
}

// ===== NEARBY CEMETERIES =====

function haversineDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 3959; // Earth's radius in miles
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a =
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
    Math.sin(dLon/2) * Math.sin(dLon/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  return R * c;
}

export async function getNearbyCemeteries(
  lat: number,
  lon: number,
  radiusMiles: number = 25,
  limit: number = 20
): Promise<Array<Cemetery & { distance: number }>> {
  const cemeteries = await getAllCemeteries();

  const withDistance = cemeteries
    .filter(c => c.latitude && c.longitude)
    .map(c => ({
      ...c,
      distance: haversineDistance(lat, lon, c.latitude!, c.longitude!)
    }))
    .filter(c => c.distance <= radiusMiles)
    .sort((a, b) => a.distance - b.distance)
    .slice(0, limit);

  return withDistance;
}

// ===== FEATURED/POPULAR =====

export async function getFeaturedCemeteries(limit: number = 10): Promise<Cemetery[]> {
  const cemeteries = await getAllCemeteries();

  // Sort by rating and review count
  return cemeteries
    .filter(c => c.rating && c.review_count)
    .sort((a, b) => {
      const scoreA = (a.rating || 0) * Math.log10((a.review_count || 1) + 1);
      const scoreB = (b.rating || 0) * Math.log10((b.review_count || 1) + 1);
      return scoreB - scoreA;
    })
    .slice(0, limit);
}

export async function getRecentlyUpdated(limit: number = 10): Promise<Cemetery[]> {
  const cemeteries = await getAllCemeteries();

  return cemeteries
    .filter(c => c.updated_at)
    .sort((a, b) => new Date(b.updated_at!).getTime() - new Date(a.updated_at!).getTime())
    .slice(0, limit);
}
