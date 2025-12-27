import { promises as fs } from 'fs';
import path from 'path';
import { db, dentists as dentistsTable } from './db';

// Dentist Interface
export interface Dentist {
  // Core identifiers
  id: string;
  name: string;
  slug: string;
  googleCid?: string;
  googlePlaceId?: string;

  // Location
  address?: string;
  city: string;
  county?: string;
  state: string;
  stateAbbr: string;
  zipCode?: string;
  country: string;
  latitude?: number;
  longitude?: number;

  // Classification
  businessType: string; // dentist, orthodontist, oral surgeon, etc.

  // Contact
  phone?: string;
  email?: string;
  website?: string;

  // Details
  description?: string;
  openingHours?: string;
  yearEstablished?: string;

  // Dental-specific
  specialties?: string[];
  services?: string[];
  insuranceAccepted?: string[];
  languages?: string[];
  acceptingNewPatients?: boolean;
  emergencyServices?: boolean;

  // Accessibility
  wheelchairAccessible?: boolean;
  parkingAvailable?: boolean;

  // Google data
  rating?: number;
  reviewCount?: number;
  photo?: string;
  photos?: string[];

  // Reviews
  reviews?: Array<{
    reviewerName: string;
    rating: number;
    reviewText: string;
    reviewDate: string;
    reviewerImage?: string;
  }>;

  // Metadata
  isVerified?: boolean;
  isActive?: boolean;
  discoveredAt?: string;
  lastUpdated?: string;
}

// State interface
export interface USState {
  name: string;
  abbr: string;
  slug: string;
  capital: string;
  region: string;
}

// Business type interface
export interface DentistType {
  slug: string;
  name: string;
  description: string;
  searchTerms: string[];
}

// US States data
export const US_STATES: USState[] = [
  { name: 'Alabama', abbr: 'AL', slug: 'alabama', capital: 'Montgomery', region: 'South' },
  { name: 'Alaska', abbr: 'AK', slug: 'alaska', capital: 'Juneau', region: 'West' },
  { name: 'Arizona', abbr: 'AZ', slug: 'arizona', capital: 'Phoenix', region: 'West' },
  { name: 'Arkansas', abbr: 'AR', slug: 'arkansas', capital: 'Little Rock', region: 'South' },
  { name: 'California', abbr: 'CA', slug: 'california', capital: 'Sacramento', region: 'West' },
  { name: 'Colorado', abbr: 'CO', slug: 'colorado', capital: 'Denver', region: 'West' },
  { name: 'Connecticut', abbr: 'CT', slug: 'connecticut', capital: 'Hartford', region: 'Northeast' },
  { name: 'Delaware', abbr: 'DE', slug: 'delaware', capital: 'Dover', region: 'Northeast' },
  { name: 'Florida', abbr: 'FL', slug: 'florida', capital: 'Tallahassee', region: 'South' },
  { name: 'Georgia', abbr: 'GA', slug: 'georgia', capital: 'Atlanta', region: 'South' },
  { name: 'Hawaii', abbr: 'HI', slug: 'hawaii', capital: 'Honolulu', region: 'West' },
  { name: 'Idaho', abbr: 'ID', slug: 'idaho', capital: 'Boise', region: 'West' },
  { name: 'Illinois', abbr: 'IL', slug: 'illinois', capital: 'Springfield', region: 'Midwest' },
  { name: 'Indiana', abbr: 'IN', slug: 'indiana', capital: 'Indianapolis', region: 'Midwest' },
  { name: 'Iowa', abbr: 'IA', slug: 'iowa', capital: 'Des Moines', region: 'Midwest' },
  { name: 'Kansas', abbr: 'KS', slug: 'kansas', capital: 'Topeka', region: 'Midwest' },
  { name: 'Kentucky', abbr: 'KY', slug: 'kentucky', capital: 'Frankfort', region: 'South' },
  { name: 'Louisiana', abbr: 'LA', slug: 'louisiana', capital: 'Baton Rouge', region: 'South' },
  { name: 'Maine', abbr: 'ME', slug: 'maine', capital: 'Augusta', region: 'Northeast' },
  { name: 'Maryland', abbr: 'MD', slug: 'maryland', capital: 'Annapolis', region: 'Northeast' },
  { name: 'Massachusetts', abbr: 'MA', slug: 'massachusetts', capital: 'Boston', region: 'Northeast' },
  { name: 'Michigan', abbr: 'MI', slug: 'michigan', capital: 'Lansing', region: 'Midwest' },
  { name: 'Minnesota', abbr: 'MN', slug: 'minnesota', capital: 'Saint Paul', region: 'Midwest' },
  { name: 'Mississippi', abbr: 'MS', slug: 'mississippi', capital: 'Jackson', region: 'South' },
  { name: 'Missouri', abbr: 'MO', slug: 'missouri', capital: 'Jefferson City', region: 'Midwest' },
  { name: 'Montana', abbr: 'MT', slug: 'montana', capital: 'Helena', region: 'West' },
  { name: 'Nebraska', abbr: 'NE', slug: 'nebraska', capital: 'Lincoln', region: 'Midwest' },
  { name: 'Nevada', abbr: 'NV', slug: 'nevada', capital: 'Carson City', region: 'West' },
  { name: 'New Hampshire', abbr: 'NH', slug: 'new-hampshire', capital: 'Concord', region: 'Northeast' },
  { name: 'New Jersey', abbr: 'NJ', slug: 'new-jersey', capital: 'Trenton', region: 'Northeast' },
  { name: 'New Mexico', abbr: 'NM', slug: 'new-mexico', capital: 'Santa Fe', region: 'West' },
  { name: 'New York', abbr: 'NY', slug: 'new-york', capital: 'Albany', region: 'Northeast' },
  { name: 'North Carolina', abbr: 'NC', slug: 'north-carolina', capital: 'Raleigh', region: 'South' },
  { name: 'North Dakota', abbr: 'ND', slug: 'north-dakota', capital: 'Bismarck', region: 'Midwest' },
  { name: 'Ohio', abbr: 'OH', slug: 'ohio', capital: 'Columbus', region: 'Midwest' },
  { name: 'Oklahoma', abbr: 'OK', slug: 'oklahoma', capital: 'Oklahoma City', region: 'South' },
  { name: 'Oregon', abbr: 'OR', slug: 'oregon', capital: 'Salem', region: 'West' },
  { name: 'Pennsylvania', abbr: 'PA', slug: 'pennsylvania', capital: 'Harrisburg', region: 'Northeast' },
  { name: 'Rhode Island', abbr: 'RI', slug: 'rhode-island', capital: 'Providence', region: 'Northeast' },
  { name: 'South Carolina', abbr: 'SC', slug: 'south-carolina', capital: 'Columbia', region: 'South' },
  { name: 'South Dakota', abbr: 'SD', slug: 'south-dakota', capital: 'Pierre', region: 'Midwest' },
  { name: 'Tennessee', abbr: 'TN', slug: 'tennessee', capital: 'Nashville', region: 'South' },
  { name: 'Texas', abbr: 'TX', slug: 'texas', capital: 'Austin', region: 'South' },
  { name: 'Utah', abbr: 'UT', slug: 'utah', capital: 'Salt Lake City', region: 'West' },
  { name: 'Vermont', abbr: 'VT', slug: 'vermont', capital: 'Montpelier', region: 'Northeast' },
  { name: 'Virginia', abbr: 'VA', slug: 'virginia', capital: 'Richmond', region: 'South' },
  { name: 'Washington', abbr: 'WA', slug: 'washington', capital: 'Olympia', region: 'West' },
  { name: 'West Virginia', abbr: 'WV', slug: 'west-virginia', capital: 'Charleston', region: 'South' },
  { name: 'Wisconsin', abbr: 'WI', slug: 'wisconsin', capital: 'Madison', region: 'Midwest' },
  { name: 'Wyoming', abbr: 'WY', slug: 'wyoming', capital: 'Cheyenne', region: 'West' },
  { name: 'District of Columbia', abbr: 'DC', slug: 'washington-dc', capital: 'Washington', region: 'Northeast' },
];

// Dentist types
export const DENTIST_TYPES: DentistType[] = [
  {
    slug: 'general-dentist',
    name: 'General Dentist',
    description: 'Provides routine dental care including cleanings, fillings, and preventive treatments.',
    searchTerms: ['dentist', 'dental office', 'dental clinic', 'family dentist'],
  },
  {
    slug: 'cosmetic-dentist',
    name: 'Cosmetic Dentist',
    description: 'Specializes in improving the appearance of teeth through whitening, veneers, and smile makeovers.',
    searchTerms: ['cosmetic dentist', 'teeth whitening', 'veneers'],
  },
  {
    slug: 'pediatric-dentist',
    name: 'Pediatric Dentist',
    description: 'Specializes in dental care for children and adolescents.',
    searchTerms: ['pediatric dentist', 'kids dentist', 'children dentist'],
  },
  {
    slug: 'orthodontist',
    name: 'Orthodontist',
    description: 'Specializes in correcting teeth alignment using braces, Invisalign, and other appliances.',
    searchTerms: ['orthodontist', 'braces', 'invisalign'],
  },
  {
    slug: 'oral-surgeon',
    name: 'Oral Surgeon',
    description: 'Performs surgical procedures including extractions, implants, and jaw surgery.',
    searchTerms: ['oral surgeon', 'dental surgery', 'tooth extraction'],
  },
  {
    slug: 'endodontist',
    name: 'Endodontist',
    description: 'Specializes in root canal treatments and treating dental pulp diseases.',
    searchTerms: ['endodontist', 'root canal'],
  },
  {
    slug: 'periodontist',
    name: 'Periodontist',
    description: 'Specializes in treating gum diseases and placing dental implants.',
    searchTerms: ['periodontist', 'gum disease', 'gum treatment'],
  },
  {
    slug: 'prosthodontist',
    name: 'Prosthodontist',
    description: 'Specializes in replacing missing teeth with dentures, bridges, and implants.',
    searchTerms: ['prosthodontist', 'dentures', 'dental implants'],
  },
  {
    slug: 'emergency-dentist',
    name: 'Emergency Dentist',
    description: 'Provides urgent dental care for toothaches, broken teeth, and dental emergencies.',
    searchTerms: ['emergency dentist', '24 hour dentist', 'urgent dental care'],
  },
];

// Cache
let dentistsCache: Dentist[] | null = null;

// Transform snake_case discovery data to camelCase Dentist interface
function transformDiscoveryData(raw: Record<string, unknown>): Dentist {
  return {
    id: (raw.google_cid as string) || (raw.id as string) || '',
    name: (raw.name as string) || '',
    slug: createSlug(
      (raw.name as string) || '',
      (raw.city as string) || '',
      (raw.state_abbr as string) || (raw.stateAbbr as string)
    ),
    googleCid: raw.google_cid as string,
    googlePlaceId: raw.google_place_id as string,
    address: raw.address as string,
    city: (raw.city as string) || '',
    county: raw.county as string,
    state: (raw.state as string) || '',
    stateAbbr: (raw.state_abbr as string) || (raw.stateAbbr as string) || '',
    zipCode: raw.zip_code as string,
    country: (raw.country as string) || 'USA',
    latitude: raw.latitude as number,
    longitude: raw.longitude as number,
    businessType: (raw.business_type as string) || (raw.businessType as string) || 'dentist',
    phone: raw.phone as string,
    website: raw.website as string,
    openingHours: raw.opening_hours as string,
    specialties: raw.categories as string[],
    services: raw.services as string[],
    rating: raw.rating as number,
    reviewCount: (raw.review_count as number) || (raw.reviewCount as number),
    photo: (raw.photo_url as string) || (raw.photo as string),
    photos: raw.photos as string[],
    // Check for emergency in services or categories
    emergencyServices: Boolean(
      (raw.services as string[])?.some(s => s.toLowerCase().includes('emergency')) ||
      (raw.categories as string[])?.some(c => c.toLowerCase().includes('emergency')) ||
      (raw.business_type as string)?.toLowerCase().includes('emergency')
    ),
    discoveredAt: raw.discovered_at as string,
    lastUpdated: raw.last_updated as string,
  };
}

// Transform database row to Dentist interface
function transformDatabaseRow(row: typeof dentistsTable.$inferSelect): Dentist {
  return {
    id: row.googleCid || String(row.id),
    name: row.name,
    slug: row.slug,
    googleCid: row.googleCid || undefined,
    googlePlaceId: row.googlePlaceId || undefined,
    address: row.address || undefined,
    city: row.city || '',
    county: row.county || undefined,
    state: row.state || '',
    stateAbbr: row.stateAbbr || '',
    zipCode: row.zipCode || undefined,
    country: row.country || 'USA',
    latitude: row.latitude ? Number(row.latitude) : undefined,
    longitude: row.longitude ? Number(row.longitude) : undefined,
    businessType: row.businessType || 'dentist',
    phone: row.phone || undefined,
    email: row.email || undefined,
    website: row.website || undefined,
    description: row.description || undefined,
    openingHours: row.openingHours || undefined,
    yearEstablished: row.yearEstablished || undefined,
    specialties: row.specialties ? JSON.parse(row.specialties) : undefined,
    services: row.services ? JSON.parse(row.services) : undefined,
    insuranceAccepted: row.insuranceAccepted ? JSON.parse(row.insuranceAccepted) : undefined,
    languages: row.languages ? JSON.parse(row.languages) : undefined,
    acceptingNewPatients: row.acceptingNewPatients || undefined,
    emergencyServices: row.emergencyServices || undefined,
    wheelchairAccessible: row.wheelchairAccessible || undefined,
    parkingAvailable: row.parkingAvailable || undefined,
    rating: row.rating ? Number(row.rating) : undefined,
    reviewCount: row.reviewCount || undefined,
    photo: row.photoUrl || undefined,
    photos: row.photos ? JSON.parse(row.photos) : undefined,
    isVerified: row.isVerified || undefined,
    isActive: row.isActive || undefined,
    discoveredAt: row.discoveredAt?.toISOString() || undefined,
    lastUpdated: row.lastUpdated?.toISOString() || undefined,
  };
}

// ===== CORE DATA FUNCTIONS =====

export async function getAllDentists(): Promise<Dentist[]> {
  if (dentistsCache) return dentistsCache;

  try {
    // Try database first (production)
    if (process.env.DATABASE_URL) {
      try {
        const rows = await db.select().from(dentistsTable);
        if (rows.length > 0) {
          const dentists = rows.map(transformDatabaseRow);
          dentistsCache = dentists;
          return dentists;
        }
      } catch (dbError) {
        console.warn('Database fetch failed, falling back to JSON:', dbError);
      }
    }

    // Fallback: Try discovery data (local development)
    const discoveryPath = path.join(process.cwd(), 'data', 'discovery', 'discovered-dentists.json');
    try {
      const content = await fs.readFile(discoveryPath, 'utf-8');
      const data = JSON.parse(content);
      // Handle both array format and object with dentists property
      const rawData: Record<string, unknown>[] = Array.isArray(data) ? data : (data.dentists || []);
      // Transform snake_case to camelCase
      const dentists: Dentist[] = rawData.map(transformDiscoveryData);
      dentistsCache = dentists;
      return dentists;
    } catch {
      // Continue to public data
    }

    // Fallback: Try public data
    const publicPath = path.join(process.cwd(), 'public', 'data', 'dentists.json');
    try {
      const content = await fs.readFile(publicPath, 'utf-8');
      const dentists = JSON.parse(content) as Dentist[];
      dentistsCache = dentists;
      return dentists;
    } catch {
      // No data yet
    }

    return [];
  } catch (error) {
    console.error('Error loading dentist data:', error);
    return [];
  }
}

export async function getDentistBySlug(slug: string): Promise<Dentist | null> {
  const dentists = await getAllDentists();
  return dentists.find(d => d.slug === slug) || null;
}

// ===== STATE FUNCTIONS =====

export function getAllStates(): USState[] {
  return US_STATES;
}

export function getStateBySlug(slug: string): USState | null {
  return US_STATES.find(s => s.slug === slug) || null;
}

export function getStateByAbbr(abbr: string): USState | null {
  return US_STATES.find(s => s.abbr.toLowerCase() === abbr.toLowerCase()) || null;
}

export async function getDentistsByState(state: string): Promise<Dentist[]> {
  const dentists = await getAllDentists();
  return dentists.filter(d =>
    d.state?.toLowerCase() === state.toLowerCase() ||
    d.stateAbbr?.toLowerCase() === state.toLowerCase()
  );
}

// ===== CITY FUNCTIONS =====

export async function getAllCities(): Promise<string[]> {
  const dentists = await getAllDentists();
  const cities = [...new Set(dentists
    .map(d => d.city)
    .filter((c): c is string => typeof c === 'string' && c.trim() !== '')
  )];
  return cities.sort();
}

export async function getCitiesByState(state: string): Promise<string[]> {
  const dentists = await getDentistsByState(state);
  const cities = [...new Set(dentists
    .map(d => d.city)
    .filter((c): c is string => typeof c === 'string' && c.trim() !== '')
  )];
  return cities.sort();
}

export async function getDentistsByCity(city: string, state?: string): Promise<Dentist[]> {
  const dentists = await getAllDentists();
  return dentists.filter(d => {
    const cityMatch = d.city?.toLowerCase() === city.toLowerCase();
    if (state) {
      return cityMatch && (
        d.state?.toLowerCase() === state.toLowerCase() ||
        d.stateAbbr?.toLowerCase() === state.toLowerCase()
      );
    }
    return cityMatch;
  });
}

// ===== TYPE FUNCTIONS =====

export function getAllTypes(): DentistType[] {
  return DENTIST_TYPES;
}

export function getTypeBySlug(slug: string): DentistType | null {
  return DENTIST_TYPES.find(t => t.slug === slug) || null;
}

export async function getDentistsByType(type: string): Promise<Dentist[]> {
  const dentists = await getAllDentists();
  return dentists.filter(d =>
    d.businessType?.toLowerCase().includes(type.toLowerCase())
  );
}

// ===== EMERGENCY DENTISTS =====

export async function getEmergencyDentists(city?: string, state?: string): Promise<Dentist[]> {
  const dentists = await getAllDentists();
  return dentists.filter(d => {
    const isEmergency = d.emergencyServices === true ||
      d.businessType?.toLowerCase().includes('emergency') ||
      d.services?.some(s => s.toLowerCase().includes('emergency'));

    if (city && state) {
      return isEmergency &&
        d.city?.toLowerCase() === city.toLowerCase() &&
        (d.state?.toLowerCase() === state.toLowerCase() || d.stateAbbr?.toLowerCase() === state.toLowerCase());
    }
    if (state) {
      return isEmergency &&
        (d.state?.toLowerCase() === state.toLowerCase() || d.stateAbbr?.toLowerCase() === state.toLowerCase());
    }
    return isEmergency;
  });
}

// ===== SLUG UTILITIES =====

export function createSlug(name: string, city: string, stateAbbr?: string): string {
  const base = stateAbbr
    ? `${name}-${city}-${stateAbbr}`
    : `${name}-${city}`;

  return base
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export function createCitySlug(city: string, stateAbbr: string): string {
  return `${city}-${stateAbbr}`
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-]/g, '');
}

// ===== STATISTICS =====

export async function getStats() {
  const dentists = await getAllDentists();

  const statesWithDentists = [...new Set(dentists.map(d => d.state))].length;
  const citiesWithDentists = [...new Set(dentists.map(d => d.city))].length;
  const withRatings = dentists.filter(d => d.rating).length;
  const withPhotos = dentists.filter(d => d.photo || (d.photos && d.photos.length > 0)).length;
  const emergencyDentists = dentists.filter(d => d.emergencyServices).length;

  return {
    totalDentists: dentists.length,
    totalStates: US_STATES.length,
    statesWithDentists,
    citiesWithDentists,
    withRatings,
    withPhotos,
    emergencyDentists,
  };
}

// ===== SEARCH =====

export async function searchDentists(query: string, filters?: {
  state?: string;
  type?: string;
  city?: string;
  emergency?: boolean;
  sedation?: boolean;
}): Promise<Dentist[]> {
  let dentists = await getAllDentists();

  // Apply filters
  if (filters?.state) {
    dentists = dentists.filter(d =>
      d.state?.toLowerCase() === filters.state!.toLowerCase() ||
      d.stateAbbr?.toLowerCase() === filters.state!.toLowerCase()
    );
  }

  if (filters?.type) {
    const typeFilter = filters.type.toLowerCase();
    // Map filter slugs to actual business_type values
    // Support both formats: general-dentist and general-dentistry
    // Map URL slugs to business_type search terms (based on actual data values)
    const typeMapping: Record<string, string[]> = {
      // General dentistry - matches: Dentist (3159), Dental clinic (379)
      'general-dentist': ['dentist', 'dental clinic', 'dental office', 'family dentist'],
      'general-dentistry': ['dentist', 'dental clinic', 'dental office', 'family dentist'],
      // Pediatric - matches: Pediatric dentist (532), Paediatric Dentist (20)
      'pediatric-dentist': ['pediatric dentist', 'paediatric dentist', 'pediatric', 'children', 'kids dentist'],
      'pediatric-dentistry': ['pediatric dentist', 'paediatric dentist', 'pediatric', 'children', 'kids dentist'],
      // Cosmetic - matches: Cosmetic dentist (150), Teeth whitening service (26)
      'cosmetic-dentist': ['cosmetic dentist', 'cosmetic', 'teeth whitening'],
      'cosmetic-dentistry': ['cosmetic dentist', 'cosmetic', 'teeth whitening'],
      // Orthodontics - matches: Orthodontist (543)
      'orthodontist': ['orthodontist', 'braces', 'invisalign'],
      'orthodontics': ['orthodontist', 'braces', 'invisalign'],
      // Oral surgery - matches: Oral surgeon (232), Oral and maxillofacial surgeon (69)
      'oral-surgeon': ['oral surgeon', 'oral and maxillofacial', 'dental surgery'],
      'oral-surgery': ['oral surgeon', 'oral and maxillofacial', 'dental surgery'],
      // Endodontics - matches: Endodontist (436)
      'endodontist': ['endodontist', 'root canal'],
      'endodontics': ['endodontist', 'root canal'],
      // Periodontics - matches: Periodontist (90), Dental implants periodontist (238)
      'periodontist': ['periodontist', 'gum', 'dental implants periodontist'],
      'periodontics': ['periodontist', 'gum', 'dental implants periodontist'],
      // Emergency - matches: Emergency dental service (181)
      'emergency-dentist': ['emergency dental', 'emergency dentist', 'urgent care', '24 hour'],
      'emergency-dentistry': ['emergency dental', 'emergency dentist', 'urgent care', '24 hour'],
      // Prosthodontics - matches: Prosthodontist (60), Dental implants provider (76)
      'prosthodontist': ['prosthodontist', 'dentures', 'dental implants provider'],
    };

    const searchTerms = typeMapping[typeFilter] || [typeFilter];
    dentists = dentists.filter(d => {
      const bt = d.businessType?.toLowerCase() || '';
      const categories = d.specialties?.map(s => s.toLowerCase()) || [];
      return searchTerms.some(term =>
        bt.includes(term) || categories.some(cat => cat.includes(term))
      );
    });
  }

  if (filters?.city) {
    dentists = dentists.filter(d =>
      d.city?.toLowerCase() === filters.city!.toLowerCase()
    );
  }

  if (filters?.emergency) {
    dentists = dentists.filter(d => d.emergencyServices === true);
  }

  if (filters?.sedation) {
    dentists = dentists.filter(d => {
      // Check services and specialties for sedation-related keywords
      const services = d.services?.map(s => s.toLowerCase()) || [];
      const specialties = d.specialties?.map(s => s.toLowerCase()) || [];
      const sedationKeywords = ['sedation', 'anxiety', 'nervous', 'anxious', 'conscious sedation', 'iv sedation', 'oral sedation', 'nitrous', 'laughing gas'];

      return sedationKeywords.some(keyword =>
        services.some(s => s.includes(keyword)) ||
        specialties.some(s => s.includes(keyword))
      );
    });
  }

  // Apply search query
  if (query && query.trim()) {
    const q = query.toLowerCase().trim();
    dentists = dentists.filter(d =>
      d.name?.toLowerCase().includes(q) ||
      d.city?.toLowerCase().includes(q) ||
      d.state?.toLowerCase().includes(q) ||
      d.address?.toLowerCase().includes(q) ||
      d.zipCode?.includes(q) ||
      d.specialties?.some(s => s.toLowerCase().includes(q)) ||
      d.services?.some(s => s.toLowerCase().includes(q))
    );
  }

  return dentists;
}

// ===== NEARBY DENTISTS =====

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

export async function getNearbyDentists(
  lat: number,
  lon: number,
  radiusMiles: number = 25,
  limit: number = 20
): Promise<Array<Dentist & { distance: number }>> {
  const dentists = await getAllDentists();

  const withDistance = dentists
    .filter(d => d.latitude && d.longitude)
    .map(d => ({
      ...d,
      distance: haversineDistance(lat, lon, d.latitude!, d.longitude!)
    }))
    .filter(d => d.distance <= radiusMiles)
    .sort((a, b) => a.distance - b.distance)
    .slice(0, limit);

  return withDistance;
}

// ===== FEATURED/POPULAR =====

export async function getFeaturedDentists(limit: number = 10): Promise<Dentist[]> {
  const dentists = await getAllDentists();

  return dentists
    .filter(d => d.rating && d.reviewCount)
    .sort((a, b) => {
      const scoreA = (a.rating || 0) * Math.log10((a.reviewCount || 1) + 1);
      const scoreB = (b.rating || 0) * Math.log10((b.reviewCount || 1) + 1);
      return scoreB - scoreA;
    })
    .slice(0, limit);
}
