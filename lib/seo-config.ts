/**
 * Centralized SEO configuration for DentistNearMeNow
 *
 * This module provides:
 * - Site-wide configuration constants
 * - Schema.org structured data generators
 * - Canonical URL helpers
 * - Internal linking priority definitions
 */

// =============================================================================
// SITE CONFIGURATION
// =============================================================================

export const siteConfig = {
  name: 'DentistNearMeNow',
  url: 'https://dentistnearmenow.com',
  description:
    'Find trusted dentists near you. Search local dental offices, read reviews, compare services, and book appointments with top-rated dentists in your area.',
  tagline: 'Find Your Perfect Dentist',
  email: 'contact@dentistnearmenow.com',
  phone: '', // Add if applicable
  logo: 'https://dentistnearmenow.com/logo.png',
  socialProfiles: {
    facebook: '',
    twitter: '',
    linkedin: '',
    instagram: '',
  },
  // Default meta settings
  defaults: {
    author: 'DentistNearMeNow',
    locale: 'en_US',
    type: 'website' as const,
  },
};

// =============================================================================
// SEO PRIORITY HIERARCHY
// =============================================================================

/**
 * Internal link priorities for SEO strategy
 * Higher priority pages should receive more internal links
 */
export const linkPriorities = {
  // Highest priority - main entry points and category hubs
  pillar: [
    '/',
    '/services',
    '/guides',
    '/state',
    '/emergency-dentist',
  ],
  // High priority - sub-category pages with significant content
  subPillar: [
    '/services/*',
    '/guides/*',
    '/state/*',
  ],
  // Medium priority - detailed content pages
  detail: [
    '/city/*',
    '/dentist/*',
    '/emergency-dentist/*',
  ],
  // Low priority - utility and supplementary pages
  utility: [
    '/about',
    '/contact',
    '/for-dentists',
    '/faq',
  ],
  // Lowest priority - legal and tag pages
  support: [
    '/privacy',
    '/terms',
    '/tag/*',
  ],
};

// =============================================================================
// CANONICAL URL HELPERS
// =============================================================================

/**
 * Generate canonical URL for a given path
 * Ensures consistent URL format across the site
 */
export function getCanonicalUrl(path: string): string {
  // Ensure path starts with /
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  // Remove trailing slash (except for homepage)
  const normalizedPath = cleanPath === '/' ? '' : cleanPath.replace(/\/$/, '');
  return `${siteConfig.url}${normalizedPath}`;
}

/**
 * Generate alternate language URLs (for future i18n support)
 */
export function getAlternateUrls(path: string): { hrefLang: string; href: string }[] {
  return [
    { hrefLang: 'en', href: getCanonicalUrl(path) },
    { hrefLang: 'x-default', href: getCanonicalUrl(path) },
  ];
}

// =============================================================================
// SCHEMA.ORG STRUCTURED DATA GENERATORS
// =============================================================================

/**
 * Generate Organization schema for the site
 * Use on homepage and about pages
 */
export function generateOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: siteConfig.name,
    url: siteConfig.url,
    logo: siteConfig.logo,
    description: siteConfig.description,
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'customer service',
      email: siteConfig.email,
      availableLanguage: ['English'],
    },
    sameAs: Object.values(siteConfig.socialProfiles).filter(Boolean),
  };
}

/**
 * Generate WebSite schema with search action
 * Use on homepage
 */
export function generateWebSiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: siteConfig.name,
    url: siteConfig.url,
    description: siteConfig.description,
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${siteConfig.url}/search?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  };
}

/**
 * Generate BreadcrumbList schema
 * Use on all pages except homepage
 */
export function generateBreadcrumbSchema(
  items: { name: string; url: string }[]
): object {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url.startsWith('http') ? item.url : `${siteConfig.url}${item.url}`,
    })),
  };
}

/**
 * Generate FAQPage schema
 * Use on FAQ pages and pages with FAQ sections
 */
export function generateFAQSchema(
  faqs: { question: string; answer: string }[]
): object {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };
}

/**
 * Dentist data interface for schema generation
 */
interface DentistSchemaData {
  name: string;
  description?: string;
  address?: {
    streetAddress?: string;
    addressLocality?: string; // city
    addressRegion?: string; // state
    postalCode?: string;
    addressCountry?: string;
  };
  telephone?: string;
  email?: string;
  url?: string;
  image?: string;
  geo?: {
    latitude?: number;
    longitude?: number;
  };
  openingHours?: string[];
  priceRange?: string;
  aggregateRating?: {
    ratingValue: number;
    reviewCount: number;
  };
  services?: string[];
  acceptsInsurance?: boolean;
  paymentAccepted?: string[];
}

/**
 * Generate LocalBusiness/Dentist schema
 * Use on individual dentist profile pages
 */
export function generateLocalBusinessSchema(dentist: DentistSchemaData): object {
  const schema: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'Dentist',
    name: dentist.name,
    description: dentist.description,
    url: dentist.url,
    image: dentist.image,
    telephone: dentist.telephone,
    email: dentist.email,
  };

  // Add address if available
  if (dentist.address) {
    schema.address = {
      '@type': 'PostalAddress',
      streetAddress: dentist.address.streetAddress,
      addressLocality: dentist.address.addressLocality,
      addressRegion: dentist.address.addressRegion,
      postalCode: dentist.address.postalCode,
      addressCountry: dentist.address.addressCountry || 'US',
    };
  }

  // Add geo coordinates if available
  if (dentist.geo?.latitude && dentist.geo?.longitude) {
    schema.geo = {
      '@type': 'GeoCoordinates',
      latitude: dentist.geo.latitude,
      longitude: dentist.geo.longitude,
    };
  }

  // Add opening hours if available
  if (dentist.openingHours?.length) {
    schema.openingHoursSpecification = dentist.openingHours;
  }

  // Add aggregate rating if available
  if (dentist.aggregateRating) {
    schema.aggregateRating = {
      '@type': 'AggregateRating',
      ratingValue: dentist.aggregateRating.ratingValue,
      reviewCount: dentist.aggregateRating.reviewCount,
      bestRating: 5,
      worstRating: 1,
    };
  }

  // Add price range if available
  if (dentist.priceRange) {
    schema.priceRange = dentist.priceRange;
  }

  // Add payment accepted if available
  if (dentist.paymentAccepted?.length) {
    schema.paymentAccepted = dentist.paymentAccepted.join(', ');
  }

  // Add services as makesOffer
  if (dentist.services?.length) {
    schema.makesOffer = dentist.services.map((service) => ({
      '@type': 'Offer',
      itemOffered: {
        '@type': 'Service',
        name: service,
      },
    }));
  }

  return schema;
}

/**
 * Generate Article schema for guide/blog content
 * Use on educational content pages
 */
export function generateArticleSchema(article: {
  title: string;
  description: string;
  url: string;
  image?: string;
  datePublished: string;
  dateModified?: string;
  author?: string;
  category?: string;
}): object {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description: article.description,
    url: article.url.startsWith('http') ? article.url : `${siteConfig.url}${article.url}`,
    image: article.image,
    datePublished: article.datePublished,
    dateModified: article.dateModified || article.datePublished,
    author: {
      '@type': 'Organization',
      name: article.author || siteConfig.name,
      url: siteConfig.url,
    },
    publisher: {
      '@type': 'Organization',
      name: siteConfig.name,
      url: siteConfig.url,
      logo: {
        '@type': 'ImageObject',
        url: siteConfig.logo,
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': article.url.startsWith('http') ? article.url : `${siteConfig.url}${article.url}`,
    },
    articleSection: article.category,
  };
}

/**
 * Generate MedicalWebPage schema for health-related content
 * Use on dental health guides and educational content
 */
export function generateMedicalWebPageSchema(page: {
  title: string;
  description: string;
  url: string;
  datePublished?: string;
  dateModified?: string;
  reviewedBy?: string;
}): object {
  return {
    '@context': 'https://schema.org',
    '@type': 'MedicalWebPage',
    name: page.title,
    description: page.description,
    url: page.url.startsWith('http') ? page.url : `${siteConfig.url}${page.url}`,
    datePublished: page.datePublished,
    dateModified: page.dateModified,
    lastReviewed: page.dateModified,
    reviewedBy: page.reviewedBy
      ? {
          '@type': 'Organization',
          name: page.reviewedBy,
        }
      : undefined,
    publisher: {
      '@type': 'Organization',
      name: siteConfig.name,
      url: siteConfig.url,
    },
    about: {
      '@type': 'MedicalSpecialty',
      name: 'Dentistry',
    },
  };
}

/**
 * Generate Service schema for dental service pages
 * Use on service type pages (/services/[type])
 */
export function generateServiceSchema(service: {
  name: string;
  description: string;
  url: string;
  provider?: string;
  areaServed?: string;
  category?: string;
}): object {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: service.name,
    description: service.description,
    url: service.url.startsWith('http') ? service.url : `${siteConfig.url}${service.url}`,
    provider: {
      '@type': 'Organization',
      name: service.provider || siteConfig.name,
      url: siteConfig.url,
    },
    areaServed: {
      '@type': 'Country',
      name: service.areaServed || 'United States',
    },
    category: service.category || 'Dental Services',
    serviceType: 'Dental Care',
  };
}

/**
 * Generate ItemList schema for list pages
 * Use on search results, state pages, city pages
 */
export function generateItemListSchema(
  items: { name: string; url: string; position?: number }[],
  listName?: string
): object {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: listName,
    numberOfItems: items.length,
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: item.position || index + 1,
      name: item.name,
      url: item.url.startsWith('http') ? item.url : `${siteConfig.url}${item.url}`,
    })),
  };
}

// =============================================================================
// META TAG HELPERS
// =============================================================================

/**
 * Generate standard meta tags for a page
 */
export function generateMetaTags(page: {
  title: string;
  description: string;
  url: string;
  image?: string;
  type?: 'website' | 'article';
  noIndex?: boolean;
}) {
  return {
    title: page.title,
    description: page.description,
    canonical: getCanonicalUrl(page.url),
    openGraph: {
      title: page.title,
      description: page.description,
      url: getCanonicalUrl(page.url),
      siteName: siteConfig.name,
      type: page.type || 'website',
      images: page.image ? [{ url: page.image }] : undefined,
      locale: siteConfig.defaults.locale,
    },
    twitter: {
      card: 'summary_large_image',
      title: page.title,
      description: page.description,
      images: page.image ? [page.image] : undefined,
    },
    robots: page.noIndex
      ? { index: false, follow: true }
      : { index: true, follow: true },
    alternates: {
      canonical: getCanonicalUrl(page.url),
    },
  };
}
