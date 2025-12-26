/**
 * Affiliate Partner Configuration
 *
 * Add affiliate partners here. Set 'active: true' when you have a partner.
 * Ads are only shown when there is at least one active partner.
 */

export interface AffiliatePartner {
  id: string;
  name: string;
  description: string;
  url: string;
  imageUrl?: string;
  buttonText: string;
  active: boolean;
  // Optional tracking parameters
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
}

export const affiliatePartners: AffiliatePartner[] = [
  {
    id: 'funeral-insurance',
    name: 'Compare Funeral Insurance',
    description: 'Compare funeral insurance plans and save up to 30% on your premium.',
    url: 'https://example.com/funeral-insurance',
    imageUrl: '/images/affiliates/funeral-insurance.png',
    buttonText: 'Compare now',
    active: false, // Set to true when you have a partner
    utmSource: 'cemeterynearbyme',
    utmMedium: 'sidebar',
    utmCampaign: 'funeral-insurance',
  },
  {
    id: 'flowers',
    name: 'Order Sympathy Flowers',
    description: 'Order beautiful sympathy arrangements and wreaths for a final tribute.',
    url: 'https://example.com/flowers',
    imageUrl: '/images/affiliates/flowers.png',
    buttonText: 'View selection',
    active: false,
    utmSource: 'cemeterynearbyme',
    utmMedium: 'sidebar',
    utmCampaign: 'sympathy-flowers',
  },
  {
    id: 'headstones',
    name: 'Headstones & Monuments',
    description: 'Design a personalized headstone. Free in-home consultation.',
    url: 'https://example.com/headstones',
    imageUrl: '/images/affiliates/headstones.png',
    buttonText: 'Request quote',
    active: false,
    utmSource: 'cemeterynearbyme',
    utmMedium: 'sidebar',
    utmCampaign: 'headstones',
  },
  {
    id: 'funeral-homes',
    name: 'Funeral Homes',
    description: 'Find a trusted funeral home in your area.',
    url: 'https://example.com/funeral-homes',
    imageUrl: '/images/affiliates/funeral-homes.png',
    buttonText: 'Find funeral home',
    active: false,
    utmSource: 'cemeterynearbyme',
    utmMedium: 'sidebar',
    utmCampaign: 'funeral-homes',
  },
];

/**
 * Helper function to get active partners
 */
export function getActivePartners(): AffiliatePartner[] {
  return affiliatePartners.filter(partner => partner.active);
}

/**
 * Helper function to check if there are active partners
 */
export function hasActivePartners(): boolean {
  return affiliatePartners.some(partner => partner.active);
}

/**
 * Helper function to build affiliate URL with UTM parameters
 */
export function buildAffiliateUrl(partner: AffiliatePartner): string {
  const url = new URL(partner.url);

  if (partner.utmSource) {
    url.searchParams.set('utm_source', partner.utmSource);
  }
  if (partner.utmMedium) {
    url.searchParams.set('utm_medium', partner.utmMedium);
  }
  if (partner.utmCampaign) {
    url.searchParams.set('utm_campaign', partner.utmCampaign);
  }

  return url.toString();
}
