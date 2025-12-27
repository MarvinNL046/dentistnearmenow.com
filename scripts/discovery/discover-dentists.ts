#!/usr/bin/env npx tsx
/**
 * US Dentist Discovery Script with Bright Data SERP API
 *
 * Searches for dentists across all US states via Google Maps.
 * Covers all 50 states + DC with comprehensive search queries.
 *
 * Usage:
 *   npx tsx scripts/discovery/discover-dentists.ts                    # All pending locations
 *   npx tsx scripts/discovery/discover-dentists.ts --state California
 *   npx tsx scripts/discovery/discover-dentists.ts --batch 50
 *   npx tsx scripts/discovery/discover-dentists.ts --dry-run
 *   npx tsx scripts/discovery/discover-dentists.ts --resume
 *   npx tsx scripts/discovery/discover-dentists.ts --test             # Test with 3 cities
 */

import * as dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';
import { neon } from '@neondatabase/serverless';

dotenv.config({ path: '.env.local' });

// Database connection for real-time backup
const DATABASE_URL = process.env.DATABASE_URL;
const sql = DATABASE_URL ? neon(DATABASE_URL) : null;

// ============================================================================
// Configuration
// ============================================================================

const API_KEY = process.env.BRIGHTDATA_SERP_API_KEY || process.env.BRIGHTDATA_API_KEY;
const SERP_ZONE = process.env.BRIGHTDATA_DISCOVERY_ZONE || process.env.BRIGHTDATA_SERP_ZONE || 'mcp_unlocker';

const SERP_API_URL = 'https://api.brightdata.com/request';

const DATA_DIR = path.join(process.cwd(), 'data', 'discovery');
const LOCATIONS_FILE = path.join(DATA_DIR, 'locations.json');
const PROGRESS_FILE = path.join(DATA_DIR, 'progress.json');
const RESULTS_FILE = path.join(DATA_DIR, 'discovered-dentists.json');
const RATE_LIMIT_FILE = path.join(DATA_DIR, 'rate-limits.json');

// Rate limiting
const RATE_LIMIT = {
  requestsPerMinute: 999999,
  requestsPerHour: 999999,
  requestsPerDay: 999999,
  retryDelayMs: 5000,
  maxRetries: 3,
  delayBetweenQueries: 500,
  delayBetweenLocations: 2000,
};

// Dentist-specific search queries for comprehensive coverage
const SEARCH_QUERIES = [
  'dentist',
  'dental office',
  'dental clinic',
  'family dentist',
  'cosmetic dentist',
  'pediatric dentist',
  'orthodontist',
  'oral surgeon',
  'endodontist',
  'periodontist',
  'prosthodontist',
  'emergency dentist',
  'dental implants',
  'teeth whitening',
  'dental care',
  'general dentistry',
];

// ============================================================================
// Types
// ============================================================================

interface DiscoveryLocation {
  id: string;
  city: string;
  county?: string;
  state: string;
  state_abbr: string;
  country: 'USA';
  population?: number;
  priority: number;
  status: 'pending' | 'in_progress' | 'completed' | 'failed';
  results_count: number;
  last_searched_at: string | null;
  search_query: string | null;
  created_at: string;
  error_message?: string;
  retry_count?: number;
}

interface DiscoveredDentist {
  // Identifiers
  google_cid: string;
  google_place_id?: string;

  // Basic info
  name: string;
  original_title?: string;
  address?: string;
  phone?: string;
  website?: string;

  // Location
  latitude?: number;
  longitude?: number;
  city?: string;
  county?: string;
  state?: string;
  state_abbr?: string;
  country: 'USA';
  zip_code?: string;

  // Google Maps data
  rating?: number;
  review_count?: number;
  business_type?: string;
  categories?: string[];

  // Opening hours
  opening_hours?: any;

  // Photo URL
  photo_url?: string;

  // Services/Specialties
  services?: string[];

  // Insurance accepted
  insurance?: string[];

  // Reviews
  reviews?: Array<{
    reviewer_name: string;
    rating: number;
    review_text: string;
    review_date?: string;
  }>;

  // Discovery metadata
  search_query: string;
  discovered_location_id: string;
  discovered_at: string;
}

interface RateLimitState {
  minute_count: number;
  minute_reset_at: string;
  hour_count: number;
  hour_reset_at: string;
  day_count: number;
  day_reset_at: string;
  total_requests: number;
  total_errors: number;
  last_request_at: string | null;
}

// ============================================================================
// US Address Parsing
// ============================================================================

/**
 * Extract US ZIP code from address
 * US ZIP codes: 5 digits or 5+4 format (12345 or 12345-6789)
 */
function extractZipCode(address: string): string | null {
  const patterns = [
    /\b(\d{5})-?\d{4}\b/,  // ZIP+4
    /\b(\d{5})\b/,         // 5-digit ZIP
  ];

  for (const pattern of patterns) {
    const match = address.match(pattern);
    if (match) {
      return match[1];
    }
  }

  return null;
}

/**
 * Extract city from US address
 */
function extractCityFromAddress(address: string): string | null {
  // US format: "123 Main St, City, ST 12345"
  const pattern = /,\s*([A-Za-z\s'-]+?),\s*[A-Z]{2}\s*\d{5}/;
  const match = address.match(pattern);
  if (match) {
    return match[1].trim();
  }
  return null;
}

/**
 * Extract state abbreviation from address
 */
function extractStateFromAddress(address: string): string | null {
  const pattern = /,\s*([A-Z]{2})\s*\d{5}/;
  const match = address.match(pattern);
  if (match) {
    return match[1];
  }
  return null;
}

// ============================================================================
// Rate Limiting
// ============================================================================

function loadRateLimits(): RateLimitState {
  const now = new Date();
  const defaults: RateLimitState = {
    minute_count: 0,
    minute_reset_at: new Date(now.getTime() + 60000).toISOString(),
    hour_count: 0,
    hour_reset_at: new Date(now.getTime() + 3600000).toISOString(),
    day_count: 0,
    day_reset_at: new Date(now.setHours(24, 0, 0, 0)).toISOString(),
    total_requests: 0,
    total_errors: 0,
    last_request_at: null,
  };

  if (!fs.existsSync(RATE_LIMIT_FILE)) {
    return defaults;
  }

  try {
    const state = JSON.parse(fs.readFileSync(RATE_LIMIT_FILE, 'utf-8'));

    if (new Date(state.minute_reset_at) < now) {
      state.minute_count = 0;
      state.minute_reset_at = new Date(now.getTime() + 60000).toISOString();
    }
    if (new Date(state.hour_reset_at) < now) {
      state.hour_count = 0;
      state.hour_reset_at = new Date(now.getTime() + 3600000).toISOString();
    }
    if (new Date(state.day_reset_at) < now) {
      state.day_count = 0;
      state.day_reset_at = new Date(now.setHours(24, 0, 0, 0)).toISOString();
    }

    return state;
  } catch {
    return defaults;
  }
}

function saveRateLimits(state: RateLimitState): void {
  fs.writeFileSync(RATE_LIMIT_FILE, JSON.stringify(state, null, 2));
}

// ============================================================================
// Bright Data SERP API
// ============================================================================

/**
 * Search Google Maps via SERP API for US locations
 */
async function searchGoogleMapsSERP(
  query: string,
  location: string,
  state: string,
  retryCount = 0
): Promise<any> {
  // Build search query with US context
  const searchQuery = `${query} ${location} ${state} USA`;
  const googleUrl = `https://www.google.com/maps/search/${encodeURIComponent(searchQuery)}?hl=en&brd_json=1`;

  try {
    const response = await fetch(SERP_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${API_KEY}`,
      },
      body: JSON.stringify({
        zone: SERP_ZONE,
        url: googleUrl,
        format: 'json',
        country: 'us',  // US country code
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();

      if (response.status === 429) {
        throw new Error('RATE_LIMITED');
      }

      throw new Error(`API error ${response.status}: ${errorText}`);
    }

    const data = await response.json();
    return { data, searchQuery };

  } catch (error: any) {
    if (retryCount < RATE_LIMIT.maxRetries) {
      const delay = RATE_LIMIT.retryDelayMs * Math.pow(2, retryCount);
      console.log(`   ⟳ Retry ${retryCount + 1}/${RATE_LIMIT.maxRetries} in ${delay / 1000}s...`);
      await sleep(delay);
      return searchGoogleMapsSERP(query, location, state, retryCount + 1);
    }

    throw error;
  }
}

// ============================================================================
// Data Processing
// ============================================================================

/**
 * Process SERP JSON response and extract dentist data for US
 */
async function processSerpResponse(
  response: { data: any; searchQuery: string },
  location: DiscoveryLocation,
  query: string
): Promise<DiscoveredDentist[]> {
  const dentists: DiscoveredDentist[] = [];
  let data = response.data;
  const seenCids = new Set<string>();

  // Parse body if it's a string
  if (data.body && typeof data.body === 'string') {
    try {
      data = JSON.parse(data.body);
    } catch {
      console.error('   ⚠️ Failed to parse body JSON');
      return dentists;
    }
  }

  // Handle different response structures
  const places = data.organic ||
                 data.local_results ||
                 data.places ||
                 data.organic_results ||
                 data.results ||
                 (Array.isArray(data) ? data : []);

  for (const place of places) {
    // Extract CID
    const cid = place.fid ||
                place.map_id ||
                place.cid ||
                place.data_cid ||
                place.place_id ||
                place.data_id ||
                extractCidFromUrl(place.link || place.url || place.map_link);

    if (!cid || seenCids.has(String(cid))) continue;
    seenCids.add(String(cid));

    // Check if this looks like a dentist
    const name = place.title || place.name || '';
    const nameLower = name.toLowerCase();

    const categories = place.category || [];
    const categoryIds = categories.map((c: any) => (c.id || c).toLowerCase());
    const categoryTitles = categories.map((c: any) => (c.title || '').toLowerCase());

    // Dentist detection for US
    const isDentist =
      nameLower.includes('dentist') ||
      nameLower.includes('dental') ||
      nameLower.includes('orthodont') ||
      nameLower.includes('oral surgeon') ||
      nameLower.includes('endodont') ||
      nameLower.includes('periodont') ||
      nameLower.includes('prosthodont') ||
      nameLower.includes('dds') ||
      nameLower.includes('dmd') ||
      categoryIds.includes('dentist') ||
      categoryIds.includes('dental') ||
      categoryIds.includes('orthodontist') ||
      categoryTitles.includes('dentist') ||
      categoryTitles.includes('dental clinic') ||
      categoryTitles.includes('dental office');

    // For dentist searches, be more lenient
    const isRelevantQuery = query.toLowerCase().includes('dentist') ||
                           query.toLowerCase().includes('dental') ||
                           query.toLowerCase().includes('orthodont');
    if (!isDentist && !isRelevantQuery) continue;

    // Get primary category
    const primaryCategory = categories[0]?.title || categories[0]?.id || 'dentist';

    // Extract address info
    const address = place.address || place.formatted_address || '';
    const zipCode = extractZipCode(address);
    const cityFromAddress = extractCityFromAddress(address);
    const stateFromAddress = extractStateFromAddress(address);

    // Use search location as fallback
    const city = cityFromAddress || location.city;
    const state = stateFromAddress || location.state_abbr;

    // Extract photo URL
    const photoUrl = place.original_image ||
                     place.image ||
                     place.photo ||
                     place.thumbnail ||
                     place.main_image;

    // Extract all category titles
    const allCategories = categories.map((c: any) => c.title || c.id || c).filter(Boolean);

    // Extract services/specialties
    const tags = place.tags || [];
    const services = tags
      .map((t: any) => t.value_title_short || t.key_title || t.value_title)
      .filter(Boolean);

    const dentist: DiscoveredDentist = {
      google_cid: String(cid),
      google_place_id: place.map_id_encoded || (String(cid).startsWith('ChIJ') ? String(cid) : undefined),
      name: name,
      original_title: place.original_title || undefined,
      address: address,
      phone: place.phone,
      website: place.website || place.link || place.display_link,
      latitude: place.latitude || place.lat,
      longitude: place.longitude || place.lng,
      city: city,
      county: location.county,
      state: location.state,
      state_abbr: state,
      country: 'USA',
      zip_code: zipCode || undefined,
      rating: place.rating ? parseFloat(String(place.rating)) : undefined,
      review_count: place.reviews_cnt || place.reviews_count || place.review_count,
      business_type: primaryCategory,
      categories: allCategories.length > 0 ? allCategories : undefined,
      opening_hours: place.work_status || place.hours || place.opening_hours,
      photo_url: photoUrl || undefined,
      services: services.length > 0 ? services : undefined,
      search_query: query,
      discovered_location_id: location.id,
      discovered_at: new Date().toISOString(),
    };

    // Parse reviews if available
    if (place.top_reviews || place.reviews_data) {
      dentist.reviews = parseReviews(place);
    }

    dentists.push(dentist);
  }

  return dentists;
}

/**
 * Extract CID from Google Maps URL
 */
function extractCidFromUrl(url?: string): string | null {
  if (!url) return null;

  const cidMatch = url.match(/[?&]cid=(\d+)/);
  if (cidMatch) return cidMatch[1];

  const dataIdMatch = url.match(/data=.*?!1s(0x[a-f0-9]+:[a-f0-9]+)/);
  if (dataIdMatch) return dataIdMatch[1];

  const placeIdMatch = url.match(/(ChIJ[a-zA-Z0-9_-]+)/);
  if (placeIdMatch) return placeIdMatch[1];

  return null;
}

/**
 * Parse reviews from place data
 */
function parseReviews(place: any): DiscoveredDentist['reviews'] {
  const reviews: DiscoveredDentist['reviews'] = [];
  const rawReviews = place.top_reviews || place.reviews_data || [];

  for (const review of rawReviews.slice(0, 10)) {
    reviews.push({
      reviewer_name: review.author || review.reviewer_name || 'Anonymous',
      rating: review.rating || 0,
      review_text: review.text || review.content || review.snippet || '',
      review_date: review.date || review.review_date,
    });
  }

  return reviews;
}

// ============================================================================
// File Operations
// ============================================================================

function loadLocations(): DiscoveryLocation[] {
  if (!fs.existsSync(LOCATIONS_FILE)) {
    console.error('❌ Locations file not found. Create data/discovery/locations.json first.');
    process.exit(1);
  }
  const data = JSON.parse(fs.readFileSync(LOCATIONS_FILE, 'utf-8'));
  return data.locations || data;
}

function saveLocations(locations: DiscoveryLocation[]): void {
  const data = { locations, search_queries: SEARCH_QUERIES };
  fs.writeFileSync(LOCATIONS_FILE, JSON.stringify(data, null, 2));
}

function loadDiscoveredDentists(): DiscoveredDentist[] {
  if (!fs.existsSync(RESULTS_FILE)) {
    return [];
  }
  try {
    return JSON.parse(fs.readFileSync(RESULTS_FILE, 'utf-8'));
  } catch {
    return [];
  }
}

function saveDiscoveredDentists(dentists: DiscoveredDentist[]): void {
  fs.writeFileSync(RESULTS_FILE, JSON.stringify(dentists, null, 2));
}

/**
 * Save dentist to Neon database for real-time backup
 */
async function saveDentistToDatabase(dentist: DiscoveredDentist): Promise<boolean> {
  if (!sql) return false;

  try {
    // Generate slug
    const slug = createSlug(dentist.name, dentist.city || '', dentist.state_abbr);

    // Check for emergency services
    const hasEmergency = Boolean(
      dentist.services?.some(s => s.toLowerCase().includes('emergency')) ||
      dentist.categories?.some(c => c.toLowerCase().includes('emergency')) ||
      dentist.business_type?.toLowerCase().includes('emergency')
    );

    await sql`
      INSERT INTO dentists (
        google_cid,
        google_place_id,
        slug,
        name,
        business_type,
        address,
        city,
        county,
        state,
        state_abbr,
        zip_code,
        country,
        latitude,
        longitude,
        phone,
        website,
        rating,
        review_count,
        opening_hours,
        photo_url,
        specialties,
        services,
        emergency_services,
        discovered_at,
        is_active
      ) VALUES (
        ${dentist.google_cid},
        ${dentist.google_place_id || null},
        ${slug},
        ${dentist.name},
        ${dentist.business_type || 'dentist'},
        ${dentist.address || null},
        ${dentist.city || null},
        ${dentist.county || null},
        ${dentist.state || null},
        ${dentist.state_abbr || null},
        ${dentist.zip_code || null},
        'USA',
        ${dentist.latitude || null},
        ${dentist.longitude || null},
        ${dentist.phone || null},
        ${dentist.website || null},
        ${dentist.rating || null},
        ${dentist.review_count || null},
        ${dentist.opening_hours ? String(dentist.opening_hours) : null},
        ${dentist.photo_url || null},
        ${dentist.categories ? JSON.stringify(dentist.categories) : null},
        ${dentist.services ? JSON.stringify(dentist.services) : null},
        ${hasEmergency},
        ${new Date(dentist.discovered_at)},
        true
      )
      ON CONFLICT (google_cid) DO UPDATE SET
        name = EXCLUDED.name,
        business_type = EXCLUDED.business_type,
        address = EXCLUDED.address,
        rating = EXCLUDED.rating,
        review_count = EXCLUDED.review_count,
        last_updated = NOW()
    `;
    return true;
  } catch (error) {
    // Silently fail for duplicates, log other errors
    const errorMsg = String(error);
    if (!errorMsg.includes('duplicate key') || !errorMsg.includes('slug')) {
      console.warn(`   ⚠️ DB backup failed: ${errorMsg.slice(0, 50)}`);
    }
    return false;
  }
}

/**
 * Create slug from name, city, and state
 */
function createSlug(name: string, city: string, stateAbbr?: string): string {
  const base = stateAbbr ? `${name}-${city}-${stateAbbr}` : `${name}-${city}`;
  return base
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function updateProgress(locations: DiscoveryLocation[], dentists: DiscoveredDentist[]): void {
  // Group by state
  const stateStats: Record<string, { total: number; completed: number; dentists: number }> = {};

  for (const loc of locations) {
    if (!stateStats[loc.state]) {
      stateStats[loc.state] = { total: 0, completed: 0, dentists: 0 };
    }
    stateStats[loc.state].total++;
    if (loc.status === 'completed') {
      stateStats[loc.state].completed++;
    }
  }

  for (const dent of dentists) {
    if (dent.state && stateStats[dent.state]) {
      stateStats[dent.state].dentists++;
    }
  }

  const progress = {
    total_locations: locations.length,
    pending: locations.filter(l => l.status === 'pending').length,
    in_progress: locations.filter(l => l.status === 'in_progress').length,
    completed: locations.filter(l => l.status === 'completed').length,
    failed: locations.filter(l => l.status === 'failed').length,
    total_dentists_found: dentists.length,
    unique_cids: new Set(dentists.map(d => d.google_cid)).size,
    per_state: stateStats,
    last_run_at: new Date().toISOString(),
  };
  fs.writeFileSync(PROGRESS_FILE, JSON.stringify(progress, null, 2));
}

// ============================================================================
// Utilities
// ============================================================================

function sleep(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function parseArgs() {
  const args = process.argv.slice(2);
  const options = {
    state: null as string | null,
    batch: 0,
    dryRun: false,
    resume: false,
    test: false,
  };

  for (let i = 0; i < args.length; i++) {
    if (args[i] === '--state' && args[i + 1]) {
      options.state = args[i + 1];
      i++;
    } else if (args[i] === '--batch' && args[i + 1]) {
      options.batch = parseInt(args[i + 1]);
      i++;
    } else if (args[i] === '--dry-run') {
      options.dryRun = true;
    } else if (args[i] === '--resume') {
      options.resume = true;
    } else if (args[i] === '--test') {
      options.test = true;
      options.batch = 3;
    }
  }

  return options;
}

// ============================================================================
// Main
// ============================================================================

async function main() {
  const options = parseArgs();

  console.log('🦷 Dentist Discovery Script - USA\n');
  console.log('━'.repeat(50));

  // Check API key
  if (!API_KEY) {
    console.error('❌ BRIGHTDATA_API_KEY not found in .env.local');
    process.exit(1);
  }

  // Check if locations file exists
  if (!fs.existsSync(LOCATIONS_FILE)) {
    console.log('⚠️ Locations file not found.');
    console.log('   Create data/discovery/locations.json with US cities first.');
    process.exit(1);
  }

  // Load data
  let locations = loadLocations();
  let discoveredDentists = loadDiscoveredDentists();
  const rateLimits = loadRateLimits();

  // Build set of existing CIDs to avoid duplicates
  const existingCids = new Set(discoveredDentists.map(d => d.google_cid));

  // Filter locations to process
  let toProcess = locations.filter(l => {
    if (options.resume && l.status === 'in_progress') return true;
    if (l.status === 'pending') return true;
    if (l.status === 'failed' && (l.retry_count || 0) < RATE_LIMIT.maxRetries) return true;
    return false;
  });

  // Filter by state
  if (options.state) {
    toProcess = toProcess.filter(l =>
      l.state.toLowerCase() === options.state!.toLowerCase() ||
      l.state_abbr.toLowerCase() === options.state!.toLowerCase()
    );
  }

  // Sort by priority (higher first)
  toProcess.sort((a, b) => b.priority - a.priority);

  // Apply batch limit
  if (options.batch > 0) {
    toProcess = toProcess.slice(0, options.batch);
  }

  console.log(`📊 Status:`);
  console.log(`   Total locations: ${locations.length}`);
  console.log(`   To process: ${toProcess.length}`);
  console.log(`   Already found: ${discoveredDentists.length} dentists`);
  console.log(`   Unique CIDs: ${existingCids.size}`);
  console.log(`   Database backup: ${sql ? '✅ Enabled (real-time sync to Neon)' : '❌ Disabled (DATABASE_URL not set)'}`);
  console.log('');

  // Show state breakdown
  const stateBreakdown = toProcess.reduce((acc, l) => {
    acc[l.state_abbr] = (acc[l.state_abbr] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  if (Object.keys(stateBreakdown).length > 0 && Object.keys(stateBreakdown).length <= 10) {
    console.log('   Per state:');
    for (const [state, count] of Object.entries(stateBreakdown)) {
      console.log(`   - ${state}: ${count} cities`);
    }
    console.log('');
  }

  if (toProcess.length === 0) {
    console.log('✅ All locations have been processed!');
    return;
  }

  if (options.dryRun) {
    console.log('🧪 DRY RUN - No API calls will be made\n');
    console.log('Locations to process:');
    toProcess.slice(0, 10).forEach((loc, i) => {
      console.log(`   ${i + 1}. ${loc.city}, ${loc.state_abbr}`);
    });
    if (toProcess.length > 10) {
      console.log(`   ... and ${toProcess.length - 10} more`);
    }
    return;
  }

  // Process locations
  console.log(`🚀 Starting discovery for ${toProcess.length} locations...\n`);

  let processed = 0;
  let newDentists = 0;

  for (const location of toProcess) {
    console.log(`\n🏥 ${location.city}, ${location.state_abbr}`);

    // Update status
    location.status = 'in_progress';
    saveLocations(locations);

    try {
      let locationResults: DiscoveredDentist[] = [];

      // Search with each query
      for (const query of SEARCH_QUERIES) {
        console.log(`   🔎 Searching: "${query} ${location.city}"...`);

        const response = await searchGoogleMapsSERP(query, location.city, location.state);
        const dentists = await processSerpResponse(response, location, query);

        // Filter duplicates and save to database
        let dbSaved = 0;
        for (const dentist of dentists) {
          if (!existingCids.has(dentist.google_cid)) {
            existingCids.add(dentist.google_cid);
            locationResults.push(dentist);
            discoveredDentists.push(dentist);
            newDentists++;

            // Real-time backup to database (crash protection)
            const saved = await saveDentistToDatabase(dentist);
            if (saved) dbSaved++;
          }
        }

        const dbStatus = sql ? ` (${dbSaved} → DB)` : '';
        console.log(`   ✓ ${dentists.length} CIDs found (${locationResults.length} new)${dbStatus}`);

        // Small delay between queries
        await sleep(RATE_LIMIT.delayBetweenQueries);
      }

      // Update location
      location.status = 'completed';
      location.results_count = locationResults.length;
      location.last_searched_at = new Date().toISOString();
      location.search_query = SEARCH_QUERIES.join(', ');

      // Save progress
      saveLocations(locations);
      saveDiscoveredDentists(discoveredDentists);
      updateProgress(locations, discoveredDentists);
      saveRateLimits(rateLimits);

      processed++;
      console.log(`   💾 Saved (${processed}/${toProcess.length}) - Total: ${newDentists} new dentists`);

    } catch (error: any) {
      console.error(`   ❌ Error: ${error.message}`);

      location.status = 'failed';
      location.error_message = error.message;
      location.retry_count = (location.retry_count || 0) + 1;

      saveLocations(locations);
      rateLimits.total_errors++;
      saveRateLimits(rateLimits);
    }

    // Delay between locations
    await sleep(RATE_LIMIT.delayBetweenLocations);
  }

  // Final summary
  console.log('\n' + '━'.repeat(50));
  console.log('📊 Discovery Complete!');
  console.log(`   Locations processed: ${processed}`);
  console.log(`   New dentists found: ${newDentists}`);
  console.log(`   Total dentists: ${discoveredDentists.length}`);
  console.log(`   Unique CIDs: ${new Set(discoveredDentists.map(d => d.google_cid)).size}`);
}

main().catch(console.error);
