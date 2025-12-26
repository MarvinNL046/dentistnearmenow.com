'use client';

import React, { useEffect, useState, useMemo } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  ChevronRight,
  ChevronLeft,
  Menu,
  X,
  MapPin,
  BookOpen,
  Stethoscope,
  Baby,
  Sparkles,
  SmilePlus,
  Heart,
  AlertCircle,
  Crown,
  Wrench,
  Users,
  Brain,
  CreditCard,
  Shield,
  Clock,
} from 'lucide-react';

// ============================================================================
// TYPES
// ============================================================================

interface TableOfContentsItem {
  id: string;
  title: string;
  level: number;
}

interface GuideLayoutProps {
  children: React.ReactNode;
  title: string;
  category: string;
  slug: string;
  tableOfContents?: TableOfContentsItem[];
  relatedServices?: string[];
}

// ============================================================================
// DATA
// ============================================================================

// Complete guide data with navigation order
const GUIDES = [
  {
    slug: 'finding-right-dentist',
    title: 'How to Choose the Right Dentist',
    category: 'Getting Started',
    icon: Users,
    relatedServices: ['general-dentist', 'pediatric-dentist'],
    relatedGuides: ['dental-insurance', 'dental-emergencies', 'dental-health-tips'],
  },
  {
    slug: 'dental-anxiety',
    title: 'Overcoming Dental Anxiety',
    category: 'Patient Care',
    icon: Brain,
    relatedServices: ['general-dentist', 'pediatric-dentist'],
    relatedGuides: ['finding-right-dentist', 'dental-procedures', 'pediatric-dental-care'],
  },
  {
    slug: 'dental-insurance',
    title: 'Understanding Dental Insurance',
    category: 'Insurance',
    icon: CreditCard,
    relatedServices: ['general-dentist'],
    relatedGuides: ['finding-right-dentist', 'dental-procedures', 'cosmetic-dentistry'],
  },
  {
    slug: 'dental-health-tips',
    title: 'Daily Dental Care Tips',
    category: 'Prevention',
    icon: Heart,
    relatedServices: ['general-dentist', 'periodontist'],
    relatedGuides: ['oral-health-conditions', 'pediatric-dental-care', 'finding-right-dentist'],
  },
  {
    slug: 'cosmetic-dentistry',
    title: 'Guide to Cosmetic Dentistry',
    category: 'Treatments',
    icon: Sparkles,
    relatedServices: ['cosmetic-dentist', 'orthodontist', 'general-dentist'],
    relatedGuides: ['dental-procedures', 'dental-insurance', 'finding-right-dentist'],
  },
  {
    slug: 'pediatric-dental-care',
    title: 'Dental Care for Children',
    category: 'Family',
    icon: Baby,
    relatedServices: ['pediatric-dentist', 'orthodontist', 'general-dentist'],
    relatedGuides: ['dental-anxiety', 'dental-health-tips', 'finding-right-dentist'],
  },
  {
    slug: 'dental-emergencies',
    title: 'Handling Dental Emergencies',
    category: 'Emergency',
    icon: Clock,
    relatedServices: ['emergency-dentist', 'oral-surgeon', 'endodontist'],
    relatedGuides: ['finding-right-dentist', 'dental-procedures', 'oral-health-conditions'],
  },
  {
    slug: 'oral-health-conditions',
    title: 'Common Oral Health Conditions',
    category: 'Education',
    icon: Shield,
    relatedServices: ['general-dentist', 'periodontist', 'endodontist'],
    relatedGuides: ['dental-health-tips', 'dental-procedures', 'dental-emergencies'],
  },
  {
    slug: 'dental-procedures',
    title: 'Common Dental Procedures Explained',
    category: 'Treatments',
    icon: BookOpen,
    relatedServices: ['general-dentist', 'oral-surgeon', 'endodontist', 'periodontist'],
    relatedGuides: ['dental-insurance', 'dental-anxiety', 'cosmetic-dentistry'],
  },
];

// Service data for sidebar
const SERVICES = [
  { slug: 'general-dentist', name: 'General Dentist', icon: Stethoscope, color: 'bg-blue-500' },
  { slug: 'pediatric-dentist', name: 'Pediatric Dentist', icon: Baby, color: 'bg-pink-500' },
  { slug: 'cosmetic-dentist', name: 'Cosmetic Dentist', icon: Sparkles, color: 'bg-purple-500' },
  { slug: 'orthodontist', name: 'Orthodontist', icon: SmilePlus, color: 'bg-teal-500' },
  { slug: 'oral-surgeon', name: 'Oral Surgeon', icon: Wrench, color: 'bg-orange-500' },
  { slug: 'endodontist', name: 'Endodontist', icon: Heart, color: 'bg-red-500' },
  { slug: 'periodontist', name: 'Periodontist', icon: Crown, color: 'bg-green-500' },
  { slug: 'emergency-dentist', name: 'Emergency Dentist', icon: AlertCircle, color: 'bg-red-600' },
];

// ============================================================================
// BREADCRUMB SCHEMA COMPONENT
// ============================================================================

function BreadcrumbSchema({ title, slug }: { title: string; slug: string }) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: 'https://dentistnearmenow.com',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Guides',
        item: 'https://dentistnearmenow.com/guides',
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: title,
        item: `https://dentistnearmenow.com/guides/${slug}`,
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

// ============================================================================
// BREADCRUMBS COMPONENT
// ============================================================================

function Breadcrumbs({ title, category }: { title: string; category: string }) {
  return (
    <section className="bg-gray-50 py-4">
      <div className="container mx-auto px-4">
        <nav
          className="flex items-center gap-2 text-sm text-muted-foreground"
          aria-label="Breadcrumb"
        >
          <Link href="/" className="hover:text-primary transition-colors">
            Home
          </Link>
          <ChevronRight className="w-4 h-4" aria-hidden="true" />
          <Link href="/guides" className="hover:text-primary transition-colors">
            Guides
          </Link>
          <ChevronRight className="w-4 h-4" aria-hidden="true" />
          <span className="text-foreground font-medium">{title}</span>
        </nav>
      </div>
    </section>
  );
}

// ============================================================================
// TABLE OF CONTENTS COMPONENT
// ============================================================================

function TableOfContents({
  items,
  isMobile = false,
}: {
  items: TableOfContentsItem[];
  isMobile?: boolean;
}) {
  const [activeId, setActiveId] = useState<string>('');

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      {
        rootMargin: '-80px 0px -80% 0px',
        threshold: 0,
      }
    );

    items.forEach((item) => {
      const element = document.getElementById(item.id);
      if (element) {
        observer.observe(element);
      }
    });

    return () => observer.disconnect();
  }, [items]);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      const yOffset = -80;
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  if (items.length === 0) return null;

  return (
    <div className={`bg-gray-50 rounded-lg p-4 ${isMobile ? '' : 'sticky top-24'}`}>
      <h3 className="font-semibold mb-3 text-sm uppercase tracking-wide text-muted-foreground">
        On This Page
      </h3>
      <nav aria-label="Table of contents">
        <ul className="space-y-2 text-sm">
          {items.map((item) => (
            <li
              key={item.id}
              style={{ paddingLeft: item.level > 2 ? `${(item.level - 2) * 12}px` : 0 }}
            >
              <a
                href={`#${item.id}`}
                onClick={(e) => handleClick(e, item.id)}
                className={`block py-1 transition-colors hover:text-primary ${
                  activeId === item.id
                    ? 'text-primary font-medium border-l-2 border-primary pl-3 -ml-3'
                    : 'text-muted-foreground'
                }`}
              >
                {item.title}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}

// ============================================================================
// RELATED SERVICES SIDEBAR
// ============================================================================

function RelatedServicesSidebar({ servicesSlugs }: { servicesSlugs: string[] }) {
  const relatedServices = SERVICES.filter((s) => servicesSlugs.includes(s.slug));

  if (relatedServices.length === 0) return null;

  return (
    <div className="bg-white border rounded-lg p-4">
      <h3 className="font-semibold mb-3 text-sm uppercase tracking-wide text-muted-foreground">
        Related Services
      </h3>
      <ul className="space-y-2">
        {relatedServices.map((service) => {
          const Icon = service.icon;
          return (
            <li key={service.slug}>
              <Link
                href={`/search?type=${service.slug}`}
                className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 transition-colors group"
              >
                <div
                  className={`w-8 h-8 ${service.color} rounded-lg flex items-center justify-center flex-shrink-0`}
                >
                  <Icon className="w-4 h-4 text-white" />
                </div>
                <span className="text-sm font-medium group-hover:text-primary transition-colors">
                  {service.name}
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

// ============================================================================
// FIND A DENTIST CTA
// ============================================================================

function FindDentistCTA({ category, servicesSlugs }: { category: string; servicesSlugs?: string[] }) {
  // Determine the most relevant service for the CTA
  const primaryService = servicesSlugs?.[0] || 'general-dentist';
  const service = SERVICES.find((s) => s.slug === primaryService);

  const ctaText = useMemo(() => {
    switch (category) {
      case 'Emergency':
        return 'Find Emergency Dental Care Now';
      case 'Family':
        return 'Find a Family Dentist';
      case 'Treatments':
        return 'Find a Specialist Near You';
      case 'Insurance':
        return 'Find In-Network Dentists';
      default:
        return 'Find a Dentist Near You';
    }
  }, [category]);

  return (
    <div className="bg-primary/5 border border-primary/20 rounded-lg p-4">
      <div className="flex items-center gap-3 mb-3">
        <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
          <MapPin className="w-5 h-5 text-white" />
        </div>
        <div>
          <h3 className="font-semibold text-sm">{ctaText}</h3>
          <p className="text-xs text-muted-foreground">Search our directory of verified dentists</p>
        </div>
      </div>
      <Link
        href={service ? `/search?type=${service.slug}` : '/search'}
        className="block w-full text-center bg-primary text-white py-2.5 px-4 rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors"
      >
        Search Now
        <ChevronRight className="w-4 h-4 inline-block ml-1" />
      </Link>
    </div>
  );
}

// ============================================================================
// GUIDE NAVIGATION (PREV/NEXT)
// ============================================================================

function GuideNavigation({ currentSlug }: { currentSlug: string }) {
  const currentIndex = GUIDES.findIndex((g) => g.slug === currentSlug);
  const prevGuide = currentIndex > 0 ? GUIDES[currentIndex - 1] : null;
  const nextGuide = currentIndex < GUIDES.length - 1 ? GUIDES[currentIndex + 1] : null;

  return (
    <div className="border-t pt-8 mt-12">
      <div className="grid md:grid-cols-2 gap-4">
        {prevGuide ? (
          <Link
            href={`/guides/${prevGuide.slug}`}
            className="group border rounded-lg p-4 hover:border-primary transition-colors flex items-center gap-3"
          >
            <ChevronLeft className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
            <div className="text-left">
              <span className="text-xs text-muted-foreground uppercase tracking-wide">
                Previous Guide
              </span>
              <p className="font-medium group-hover:text-primary transition-colors line-clamp-1">
                {prevGuide.title}
              </p>
            </div>
          </Link>
        ) : (
          <div />
        )}
        {nextGuide ? (
          <Link
            href={`/guides/${nextGuide.slug}`}
            className="group border rounded-lg p-4 hover:border-primary transition-colors flex items-center justify-end gap-3 text-right"
          >
            <div>
              <span className="text-xs text-muted-foreground uppercase tracking-wide">
                Next Guide
              </span>
              <p className="font-medium group-hover:text-primary transition-colors line-clamp-1">
                {nextGuide.title}
              </p>
            </div>
            <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
          </Link>
        ) : (
          <div />
        )}
      </div>
    </div>
  );
}

// ============================================================================
// RELATED GUIDES SECTION
// ============================================================================

function RelatedGuidesSection({ currentSlug }: { currentSlug: string }) {
  const currentGuide = GUIDES.find((g) => g.slug === currentSlug);
  const relatedSlugs = currentGuide?.relatedGuides || [];
  const relatedGuides = GUIDES.filter((g) => relatedSlugs.includes(g.slug));

  if (relatedGuides.length === 0) return null;

  return (
    <div className="border-t pt-8 mt-8">
      <h3 className="text-2xl font-bold mb-6">Related Guides</h3>
      <div className="grid md:grid-cols-3 gap-4">
        {relatedGuides.map((guide) => {
          const Icon = guide.icon;
          return (
            <Link
              key={guide.slug}
              href={`/guides/${guide.slug}`}
              className="group border rounded-lg p-4 hover:border-primary hover:shadow-sm transition-all"
            >
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-colors">
                  <Icon className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <span className="text-xs font-medium text-primary bg-primary/10 px-2 py-0.5 rounded">
                    {guide.category}
                  </span>
                  <h4 className="font-semibold mt-1 group-hover:text-primary transition-colors line-clamp-2">
                    {guide.title}
                  </h4>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

// ============================================================================
// MOBILE SIDEBAR
// ============================================================================

function MobileSidebar({
  isOpen,
  onClose,
  tableOfContents,
  relatedServices,
  category,
}: {
  isOpen: boolean;
  onClose: () => void;
  tableOfContents: TableOfContentsItem[];
  relatedServices: string[];
  category: string;
}) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 lg:hidden">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <div className="absolute right-0 top-0 bottom-0 w-80 max-w-[85vw] bg-white overflow-y-auto">
        <div className="sticky top-0 bg-white border-b p-4 flex items-center justify-between">
          <h2 className="font-semibold">Guide Navigation</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            aria-label="Close navigation"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="p-4 space-y-6">
          {tableOfContents.length > 0 && (
            <TableOfContents items={tableOfContents} isMobile />
          )}
          <FindDentistCTA category={category} servicesSlugs={relatedServices} />
          {relatedServices.length > 0 && (
            <RelatedServicesSidebar servicesSlugs={relatedServices} />
          )}
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// AUTO-GENERATE TABLE OF CONTENTS
// ============================================================================

function useAutoTableOfContents(
  providedToc?: TableOfContentsItem[]
): TableOfContentsItem[] {
  const [autoToc, setAutoToc] = useState<TableOfContentsItem[]>([]);

  useEffect(() => {
    if (providedToc && providedToc.length > 0) {
      setAutoToc(providedToc);
      return;
    }

    // Auto-generate from h2/h3 headings in the article
    const article = document.querySelector('article');
    if (!article) return;

    const headings = article.querySelectorAll('h2[id], h3[id]');
    const items: TableOfContentsItem[] = [];

    headings.forEach((heading) => {
      const id = heading.getAttribute('id');
      const text = heading.textContent?.trim();
      if (id && text) {
        items.push({
          id,
          title: text,
          level: heading.tagName === 'H2' ? 2 : 3,
        });
      }
    });

    setAutoToc(items);
  }, [providedToc]);

  return autoToc;
}

// ============================================================================
// MAIN GUIDE LAYOUT COMPONENT
// ============================================================================

export default function GuideLayout({
  children,
  title,
  category,
  slug,
  tableOfContents: providedToc,
  relatedServices: providedServices,
}: GuideLayoutProps) {
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const pathname = usePathname();

  // Get guide data
  const guideData = GUIDES.find((g) => g.slug === slug);
  const relatedServices = providedServices || guideData?.relatedServices || [];
  const tableOfContents = useAutoTableOfContents(providedToc);

  // Close mobile sidebar on route change
  useEffect(() => {
    setIsMobileSidebarOpen(false);
  }, [pathname]);

  return (
    <>
      {/* Schema.org Breadcrumb Markup */}
      <BreadcrumbSchema title={title} slug={slug} />

      <div className="bg-background min-h-screen">
        {/* Breadcrumbs */}
        <Breadcrumbs title={title} category={category} />

        {/* Mobile Menu Button */}
        <div className="lg:hidden sticky top-16 z-40 bg-white border-b">
          <div className="container mx-auto px-4 py-2">
            <button
              onClick={() => setIsMobileSidebarOpen(true)}
              className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              <Menu className="w-5 h-5" />
              <span>Guide Navigation</span>
            </button>
          </div>
        </div>

        {/* Mobile Sidebar */}
        <MobileSidebar
          isOpen={isMobileSidebarOpen}
          onClose={() => setIsMobileSidebarOpen(false)}
          tableOfContents={tableOfContents}
          relatedServices={relatedServices}
          category={category}
        />

        {/* Main Content with Sidebar */}
        <div className="container mx-auto px-4 py-8">
          <div className="flex gap-8">
            {/* Main Article Content */}
            <article className="flex-1 min-w-0 max-w-4xl">
              {children}

              {/* Related Guides Section */}
              <RelatedGuidesSection currentSlug={slug} />

              {/* Prev/Next Navigation */}
              <GuideNavigation currentSlug={slug} />
            </article>

            {/* Desktop Sidebar */}
            <aside className="hidden lg:block w-72 flex-shrink-0">
              <div className="sticky top-24 space-y-6">
                {/* Table of Contents */}
                {tableOfContents.length > 0 && (
                  <TableOfContents items={tableOfContents} />
                )}

                {/* Find a Dentist CTA */}
                <FindDentistCTA category={category} servicesSlugs={relatedServices} />

                {/* Related Services */}
                {relatedServices.length > 0 && (
                  <RelatedServicesSidebar servicesSlugs={relatedServices} />
                )}

                {/* All Guides Link */}
                <div className="border rounded-lg p-4">
                  <Link
                    href="/guides"
                    className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
                  >
                    <BookOpen className="w-4 h-4" />
                    <span>View All Guides</span>
                    <ChevronRight className="w-4 h-4 ml-auto" />
                  </Link>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </div>
    </>
  );
}

// ============================================================================
// EXPORTS
// ============================================================================

export { GUIDES, SERVICES };
export type { GuideLayoutProps, TableOfContentsItem };
