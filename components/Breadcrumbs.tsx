import Link from 'next/link';
import { ChevronRight, Home } from 'lucide-react';

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  variant?: 'default' | 'light' | 'dark';
  showHome?: boolean;
  className?: string;
}

export default function Breadcrumbs({
  items,
  variant = 'default',
  showHome = true,
  className = '',
}: BreadcrumbsProps) {
  // Build the full breadcrumb list including home
  const allItems: BreadcrumbItem[] = showHome
    ? [{ label: 'Home', href: '/' }, ...items]
    : items;

  // Generate BreadcrumbList schema.org markup
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: allItems.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.label,
      ...(item.href ? { item: `https://dentistnearmenow.com${item.href}` } : {}),
    })),
  };

  // Style variants
  const styles = {
    default: {
      container: 'text-muted-foreground',
      link: 'hover:text-foreground',
      current: 'text-foreground font-medium',
      separator: 'text-muted-foreground/50',
    },
    light: {
      container: 'text-white/80',
      link: 'hover:text-white',
      current: 'text-white',
      separator: 'text-white/50',
    },
    dark: {
      container: 'text-gray-600',
      link: 'hover:text-gray-900',
      current: 'text-gray-900 font-medium',
      separator: 'text-gray-400',
    },
  };

  const currentStyles = styles[variant];

  return (
    <>
      {/* Schema.org structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      {/* Visible breadcrumbs */}
      <nav
        aria-label="Breadcrumb"
        className={`${currentStyles.container} ${className}`}
      >
        <ol
          className="flex items-center flex-wrap gap-1 text-sm"
          itemScope
          itemType="https://schema.org/BreadcrumbList"
        >
          {allItems.map((item, index) => {
            const isLast = index === allItems.length - 1;
            const isHome = index === 0 && showHome;

            return (
              <li
                key={item.label}
                className="flex items-center gap-1"
                itemProp="itemListElement"
                itemScope
                itemType="https://schema.org/ListItem"
              >
                {index > 0 && (
                  <ChevronRight
                    className={`w-4 h-4 flex-shrink-0 ${currentStyles.separator}`}
                    aria-hidden="true"
                  />
                )}

                {isLast ? (
                  // Current page - no link
                  <span
                    className={currentStyles.current}
                    itemProp="name"
                    aria-current="page"
                  >
                    {isHome ? <Home className="w-4 h-4" aria-label="Home" /> : item.label}
                  </span>
                ) : item.href ? (
                  // Linked breadcrumb
                  <Link
                    href={item.href}
                    className={`${currentStyles.link} transition-colors flex items-center gap-1`}
                    itemProp="item"
                  >
                    {isHome ? (
                      <Home className="w-4 h-4" aria-label="Home" />
                    ) : (
                      <span itemProp="name">{item.label}</span>
                    )}
                  </Link>
                ) : (
                  // Non-linked breadcrumb (shouldn't happen often)
                  <span itemProp="name">
                    {isHome ? <Home className="w-4 h-4" aria-label="Home" /> : item.label}
                  </span>
                )}

                <meta itemProp="position" content={String(index + 1)} />
              </li>
            );
          })}
        </ol>
      </nav>
    </>
  );
}

// Helper function to generate common breadcrumb patterns
export function generateBreadcrumbs(
  type: 'city' | 'state' | 'dentist' | 'guide' | 'service',
  data: {
    stateName?: string;
    stateSlug?: string;
    cityName?: string;
    citySlug?: string;
    dentistName?: string;
    guideName?: string;
    guideSlug?: string;
    serviceName?: string;
    serviceSlug?: string;
  }
): BreadcrumbItem[] {
  const items: BreadcrumbItem[] = [];

  switch (type) {
    case 'state':
      items.push({ label: 'States', href: '/state' });
      if (data.stateName) {
        items.push({ label: data.stateName });
      }
      break;

    case 'city':
      items.push({ label: 'States', href: '/state' });
      if (data.stateName && data.stateSlug) {
        items.push({ label: data.stateName, href: `/state/${data.stateSlug}` });
      }
      if (data.cityName) {
        items.push({ label: data.cityName });
      }
      break;

    case 'dentist':
      items.push({ label: 'States', href: '/state' });
      if (data.stateName && data.stateSlug) {
        items.push({ label: data.stateName, href: `/state/${data.stateSlug}` });
      }
      if (data.cityName && data.citySlug) {
        items.push({ label: data.cityName, href: `/city/${data.citySlug}` });
      }
      if (data.dentistName) {
        items.push({ label: data.dentistName });
      }
      break;

    case 'guide':
      items.push({ label: 'Guides', href: '/guides' });
      if (data.guideName) {
        items.push({ label: data.guideName });
      }
      break;

    case 'service':
      items.push({ label: 'Services', href: '/services' });
      if (data.serviceName) {
        items.push({ label: data.serviceName });
      }
      break;
  }

  return items;
}
