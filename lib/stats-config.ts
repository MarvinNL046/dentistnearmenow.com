/**
 * Central Statistics Configuration for CemeteryNearMe.com
 *
 * Update these values in ONE place when data changes.
 * All components and pages import from here.
 *
 * Last update: 2025-12-25
 * - Scraped 6,038 cemeteries from 98 major US cities
 */

export const SITE_STATS = {
  // Display values (formatted for UI)
  totalCemeteriesDisplay: '6,000',  // Actual scraped data
  totalCemeteriesExact: 6038,

  // Geographic coverage
  totalStates: 50,
  totalStatesWithDC: 51,  // 50 states + DC
  totalCounties: 3143,    // US counties

  // Dynamic placeholder (when API hasn't loaded yet)
  cemeteriesPlaceholder: '6,000+',

  // Site info
  siteName: 'Cemetery Near Me',
  siteUrl: 'https://www.cemeterynearbyme.com',
  country: 'United States',
  countryShort: 'USA',

  // National cemetery stats (from VA)
  nationalCemeteriesCount: 227,  // Found in our data
  veteransCemeteriesCount: 263,  // Found in our data
  veteransInterred: '4 million',

  // Top states by count
  topStates: {
    california: 820,
    texas: 724,
    florida: 373,
    northCarolina: 358,
    ohio: 355,
  },
} as const;

/**
 * Get formatted stats description for SEO and meta tags
 */
export function getStatsDescription(variant: 'short' | 'long' | 'seo' = 'short'): string {
  switch (variant) {
    case 'short':
      return `Find cemeteries across all ${SITE_STATS.totalStates} states.`;
    case 'long':
      return `Search our comprehensive database of ${SITE_STATS.totalCemeteriesDisplay}+ cemeteries, memorial parks, and burial grounds across all ${SITE_STATS.totalStates} states in the ${SITE_STATS.country}.`;
    case 'seo':
      return `Find cemeteries, memorial parks, and burial grounds near you. Search by state, city, or zip code. Get directions, contact info, and reviews for cemeteries across the ${SITE_STATS.country}.`;
    default:
      return `Find cemeteries across all ${SITE_STATS.totalStates} states.`;
  }
}

/**
 * Get CTA stats text for blog pages and promotional sections
 */
export function getCtaStatsText(): string {
  return `Search directly for cemeteries in our extensive database with more than ${SITE_STATS.totalCemeteriesDisplay} locations.`;
}

/**
 * Get FAQ answer about cemetery count
 */
export function getFaqCemeteriesAnswer(): string {
  return `The ${SITE_STATS.country} has approximately ${SITE_STATS.totalCemeteriesDisplay} cemeteries, ranging from large memorial parks to small family burial grounds. These include public, private, national, and veterans cemeteries spread across all ${SITE_STATS.totalStates} states.`;
}

/**
 * Get "why us" feature text
 */
export function getComprehensiveDataText(): string {
  return `Information on cemeteries across all ${SITE_STATS.totalStates} states with hours, directions, and contact details.`;
}

/**
 * Get states message for empty state pages
 */
export function getStatesComingSoonText(): string {
  return `We're actively adding cemetery data for all ${SITE_STATS.totalStates} states. Check back soon for updates!`;
}
