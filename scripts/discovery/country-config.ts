/**
 * Country Configuration for International Dentist Discovery
 *
 * Supports: USA (current), Canada, UK, Australia
 * Each country has specific:
 * - Address/postal code formats
 * - Search queries (localized terminology)
 * - Region structure (states/provinces/counties)
 * - API parameters
 */

// ============================================================================
// Types
// ============================================================================

export interface CountryConfig {
  code: string;                    // ISO 3166-1 alpha-2
  name: string;
  currency: string;
  language: string;
  timezone: string;

  // Address format
  postalCodePattern: RegExp;
  postalCodeName: string;          // "ZIP code", "postal code", "postcode"

  // Region structure
  regionType: string;              // "state", "province", "county"
  regions: RegionInfo[];

  // Search configuration
  searchQueries: string[];
  dentistTerms: string[];          // Local terms for dentist detection
  apiCountryCode: string;          // For SERP API

  // Business types
  businessTypes: string[];

  // Domain configuration
  domain?: string;                 // Future: dentistnearmenow.ca, etc.
}

export interface RegionInfo {
  name: string;
  abbr: string;
  capital?: string;
  population?: number;
}

// ============================================================================
// USA Configuration (Current - Complete)
// ============================================================================

export const USA_CONFIG: CountryConfig = {
  code: 'US',
  name: 'United States',
  currency: 'USD',
  language: 'en-US',
  timezone: 'America/New_York',

  postalCodePattern: /\b(\d{5})(?:-\d{4})?\b/,
  postalCodeName: 'ZIP code',

  regionType: 'state',
  regions: [
    { name: 'Alabama', abbr: 'AL' },
    { name: 'Alaska', abbr: 'AK' },
    { name: 'Arizona', abbr: 'AZ' },
    { name: 'Arkansas', abbr: 'AR' },
    { name: 'California', abbr: 'CA' },
    { name: 'Colorado', abbr: 'CO' },
    { name: 'Connecticut', abbr: 'CT' },
    { name: 'Delaware', abbr: 'DE' },
    { name: 'Florida', abbr: 'FL' },
    { name: 'Georgia', abbr: 'GA' },
    { name: 'Hawaii', abbr: 'HI' },
    { name: 'Idaho', abbr: 'ID' },
    { name: 'Illinois', abbr: 'IL' },
    { name: 'Indiana', abbr: 'IN' },
    { name: 'Iowa', abbr: 'IA' },
    { name: 'Kansas', abbr: 'KS' },
    { name: 'Kentucky', abbr: 'KY' },
    { name: 'Louisiana', abbr: 'LA' },
    { name: 'Maine', abbr: 'ME' },
    { name: 'Maryland', abbr: 'MD' },
    { name: 'Massachusetts', abbr: 'MA' },
    { name: 'Michigan', abbr: 'MI' },
    { name: 'Minnesota', abbr: 'MN' },
    { name: 'Mississippi', abbr: 'MS' },
    { name: 'Missouri', abbr: 'MO' },
    { name: 'Montana', abbr: 'MT' },
    { name: 'Nebraska', abbr: 'NE' },
    { name: 'Nevada', abbr: 'NV' },
    { name: 'New Hampshire', abbr: 'NH' },
    { name: 'New Jersey', abbr: 'NJ' },
    { name: 'New Mexico', abbr: 'NM' },
    { name: 'New York', abbr: 'NY' },
    { name: 'North Carolina', abbr: 'NC' },
    { name: 'North Dakota', abbr: 'ND' },
    { name: 'Ohio', abbr: 'OH' },
    { name: 'Oklahoma', abbr: 'OK' },
    { name: 'Oregon', abbr: 'OR' },
    { name: 'Pennsylvania', abbr: 'PA' },
    { name: 'Rhode Island', abbr: 'RI' },
    { name: 'South Carolina', abbr: 'SC' },
    { name: 'South Dakota', abbr: 'SD' },
    { name: 'Tennessee', abbr: 'TN' },
    { name: 'Texas', abbr: 'TX' },
    { name: 'Utah', abbr: 'UT' },
    { name: 'Vermont', abbr: 'VT' },
    { name: 'Virginia', abbr: 'VA' },
    { name: 'Washington', abbr: 'WA' },
    { name: 'West Virginia', abbr: 'WV' },
    { name: 'Wisconsin', abbr: 'WI' },
    { name: 'Wyoming', abbr: 'WY' },
    { name: 'District of Columbia', abbr: 'DC' },
  ],

  searchQueries: [
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
  ],

  dentistTerms: [
    'dentist', 'dental', 'orthodont', 'oral surgeon',
    'endodont', 'periodont', 'prosthodont', 'dds', 'dmd'
  ],

  apiCountryCode: 'us',

  businessTypes: [
    'dentist', 'dental clinic', 'dental office',
    'orthodontist', 'oral surgeon', 'endodontist',
    'periodontist', 'prosthodontist', 'pediatric dentist'
  ],
};

// ============================================================================
// Canada Configuration
// ============================================================================

export const CANADA_CONFIG: CountryConfig = {
  code: 'CA',
  name: 'Canada',
  currency: 'CAD',
  language: 'en-CA',
  timezone: 'America/Toronto',

  // Canadian postal codes: A1A 1A1 format
  postalCodePattern: /\b([A-Za-z]\d[A-Za-z])\s*(\d[A-Za-z]\d)\b/,
  postalCodeName: 'postal code',

  regionType: 'province',
  regions: [
    { name: 'Alberta', abbr: 'AB' },
    { name: 'British Columbia', abbr: 'BC' },
    { name: 'Manitoba', abbr: 'MB' },
    { name: 'New Brunswick', abbr: 'NB' },
    { name: 'Newfoundland and Labrador', abbr: 'NL' },
    { name: 'Northwest Territories', abbr: 'NT' },
    { name: 'Nova Scotia', abbr: 'NS' },
    { name: 'Nunavut', abbr: 'NU' },
    { name: 'Ontario', abbr: 'ON' },
    { name: 'Prince Edward Island', abbr: 'PE' },
    { name: 'Quebec', abbr: 'QC' },
    { name: 'Saskatchewan', abbr: 'SK' },
    { name: 'Yukon', abbr: 'YT' },
  ],

  searchQueries: [
    'dentist',
    'dental office',
    'dental clinic',
    'family dentist',
    'dentiste',           // French (Quebec)
    'clinique dentaire',  // French
    'cosmetic dentist',
    'pediatric dentist',
    'orthodontist',
    'oral surgeon',
    'endodontist',
    'periodontist',
    'emergency dentist',
    'dental implants',
    'dental care',
  ],

  dentistTerms: [
    'dentist', 'dental', 'dentiste', 'dentaire',
    'orthodont', 'oral surgeon', 'endodont', 'periodont', 'dds'
  ],

  apiCountryCode: 'ca',

  businessTypes: [
    'dentist', 'dental clinic', 'dental office',
    'clinique dentaire', 'orthodontist', 'oral surgeon'
  ],

  domain: 'dentistnearmenow.ca',
};

// ============================================================================
// UK Configuration
// ============================================================================

export const UK_CONFIG: CountryConfig = {
  code: 'GB',
  name: 'United Kingdom',
  currency: 'GBP',
  language: 'en-GB',
  timezone: 'Europe/London',

  // UK postcodes: SW1A 1AA, M1 1AE, etc.
  postalCodePattern: /\b([A-Za-z]{1,2}\d{1,2}[A-Za-z]?)\s*(\d[A-Za-z]{2})\b/,
  postalCodeName: 'postcode',

  regionType: 'county',
  regions: [
    // England - Major Counties
    { name: 'Greater London', abbr: 'LDN' },
    { name: 'Greater Manchester', abbr: 'MAN' },
    { name: 'West Midlands', abbr: 'WMD' },
    { name: 'West Yorkshire', abbr: 'WYK' },
    { name: 'Merseyside', abbr: 'MSY' },
    { name: 'South Yorkshire', abbr: 'SYK' },
    { name: 'Tyne and Wear', abbr: 'TWR' },
    { name: 'Hampshire', abbr: 'HAM' },
    { name: 'Kent', abbr: 'KEN' },
    { name: 'Essex', abbr: 'ESS' },
    { name: 'Lancashire', abbr: 'LAN' },
    { name: 'Surrey', abbr: 'SRY' },
    { name: 'Hertfordshire', abbr: 'HRT' },
    // Scotland
    { name: 'Scotland', abbr: 'SCT' },
    // Wales
    { name: 'Wales', abbr: 'WLS' },
    // Northern Ireland
    { name: 'Northern Ireland', abbr: 'NIR' },
  ],

  searchQueries: [
    'dentist',
    'dental practice',
    'dental surgery',      // UK-specific term
    'NHS dentist',         // National Health Service
    'private dentist',
    'family dentist',
    'cosmetic dentist',
    'orthodontist',
    'oral surgeon',
    'emergency dentist',
    'dental implants',
    'teeth whitening',
    'dental care',
  ],

  dentistTerms: [
    'dentist', 'dental', 'dental surgery', 'dental practice',
    'orthodont', 'oral surgeon', 'bds'  // BDS = Bachelor of Dental Surgery
  ],

  apiCountryCode: 'gb',

  businessTypes: [
    'dentist', 'dental practice', 'dental surgery',
    'nhs dentist', 'private dentist', 'orthodontist'
  ],

  domain: 'dentistnearmenow.co.uk',
};

// ============================================================================
// Australia Configuration
// ============================================================================

export const AUSTRALIA_CONFIG: CountryConfig = {
  code: 'AU',
  name: 'Australia',
  currency: 'AUD',
  language: 'en-AU',
  timezone: 'Australia/Sydney',

  // Australian postcodes: 4 digits
  postalCodePattern: /\b(\d{4})\b/,
  postalCodeName: 'postcode',

  regionType: 'state',
  regions: [
    { name: 'New South Wales', abbr: 'NSW' },
    { name: 'Victoria', abbr: 'VIC' },
    { name: 'Queensland', abbr: 'QLD' },
    { name: 'South Australia', abbr: 'SA' },
    { name: 'Western Australia', abbr: 'WA' },
    { name: 'Tasmania', abbr: 'TAS' },
    { name: 'Northern Territory', abbr: 'NT' },
    { name: 'Australian Capital Territory', abbr: 'ACT' },
  ],

  searchQueries: [
    'dentist',
    'dental clinic',
    'dental practice',
    'family dentist',
    'cosmetic dentist',
    'children dentist',    // AU term for pediatric
    'orthodontist',
    'oral surgeon',
    'emergency dentist',
    'dental implants',
    'teeth whitening',
    'dental care',
  ],

  dentistTerms: [
    'dentist', 'dental', 'dental clinic', 'dental practice',
    'orthodont', 'oral surgeon', 'bds', 'bdsc'
  ],

  apiCountryCode: 'au',

  businessTypes: [
    'dentist', 'dental clinic', 'dental practice',
    'orthodontist', 'oral surgeon'
  ],

  domain: 'dentistnearmenow.com.au',
};

// ============================================================================
// Country Registry
// ============================================================================

export const COUNTRY_CONFIGS: Record<string, CountryConfig> = {
  'US': USA_CONFIG,
  'USA': USA_CONFIG,
  'CA': CANADA_CONFIG,
  'CAN': CANADA_CONFIG,
  'GB': UK_CONFIG,
  'UK': UK_CONFIG,
  'AU': AUSTRALIA_CONFIG,
  'AUS': AUSTRALIA_CONFIG,
};

export function getCountryConfig(code: string): CountryConfig | undefined {
  return COUNTRY_CONFIGS[code.toUpperCase()];
}

export function getAllCountryConfigs(): CountryConfig[] {
  return [USA_CONFIG, CANADA_CONFIG, UK_CONFIG, AUSTRALIA_CONFIG];
}

// ============================================================================
// Address Parsing Utilities
// ============================================================================

/**
 * Extract postal code from address based on country
 */
export function extractPostalCode(address: string, country: CountryConfig): string | null {
  const match = address.match(country.postalCodePattern);
  if (match) {
    // For Canadian/UK codes, combine the groups
    if (match[2]) {
      return `${match[1]} ${match[2]}`.toUpperCase();
    }
    return match[1];
  }
  return null;
}

/**
 * Check if a business is a dentist based on country-specific terms
 */
export function isDentist(name: string, categories: string[], country: CountryConfig): boolean {
  const nameLower = name.toLowerCase();
  const categoryLower = categories.map(c => c.toLowerCase()).join(' ');

  return country.dentistTerms.some(term =>
    nameLower.includes(term) || categoryLower.includes(term)
  );
}

/**
 * Get region by abbreviation
 */
export function getRegionByAbbr(abbr: string, country: CountryConfig): RegionInfo | undefined {
  return country.regions.find(r => r.abbr.toUpperCase() === abbr.toUpperCase());
}

/**
 * Get region by name
 */
export function getRegionByName(name: string, country: CountryConfig): RegionInfo | undefined {
  return country.regions.find(r => r.name.toLowerCase() === name.toLowerCase());
}

// ============================================================================
// Major Cities by Country (for discovery priority)
// ============================================================================

export const MAJOR_CITIES: Record<string, string[]> = {
  CA: [
    'Toronto', 'Montreal', 'Vancouver', 'Calgary', 'Edmonton',
    'Ottawa', 'Mississauga', 'Winnipeg', 'Quebec City', 'Hamilton',
    'Brampton', 'Surrey', 'Laval', 'Halifax', 'London',
    'Markham', 'Vaughan', 'Gatineau', 'Longueuil', 'Burnaby',
  ],
  GB: [
    'London', 'Birmingham', 'Manchester', 'Leeds', 'Glasgow',
    'Liverpool', 'Newcastle', 'Sheffield', 'Bristol', 'Edinburgh',
    'Leicester', 'Coventry', 'Bradford', 'Cardiff', 'Belfast',
    'Nottingham', 'Kingston upon Hull', 'Southampton', 'Derby', 'Plymouth',
  ],
  AU: [
    'Sydney', 'Melbourne', 'Brisbane', 'Perth', 'Adelaide',
    'Gold Coast', 'Newcastle', 'Canberra', 'Wollongong', 'Hobart',
    'Geelong', 'Townsville', 'Cairns', 'Darwin', 'Toowoomba',
    'Ballarat', 'Bendigo', 'Launceston', 'Mackay', 'Rockhampton',
  ],
};

export default {
  USA_CONFIG,
  CANADA_CONFIG,
  UK_CONFIG,
  AUSTRALIA_CONFIG,
  COUNTRY_CONFIGS,
  getCountryConfig,
  getAllCountryConfigs,
  extractPostalCode,
  isDentist,
  getRegionByAbbr,
  getRegionByName,
  MAJOR_CITIES,
};
