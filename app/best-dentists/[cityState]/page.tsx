import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import {
  ChevronRight,
  MapPin,
  Phone,
  Star,
  Trophy,
  Info,
  CheckCircle,
  Users,
  TrendingUp,
  Award
} from 'lucide-react';
import { getPageBySlug, getRelatedCities, getTop10WithDetails, parseCityStateSlug, getTopCitiesForStaticGen } from '@/lib/top10';
import { getStateByAbbr } from '@/lib/dentist-data';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import DentistImage from '@/components/DentistImage';
import { InArticleAd, SidebarAd, LeaderboardAd, MobileBannerAd } from '@/components/AdUnit';

// ISR: Revalidate every 24 hours
export const revalidate = 86400;

interface PageProps {
  params: Promise<{ cityState: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { cityState } = await params;
  const slug = `best-dentists-${cityState}`;
  const pageData = await getPageBySlug(slug);

  if (!pageData) {
    return { title: 'Page Not Found' };
  }

  // Dynamic title based on dentist count - avoid "Top 10" for cities with < 10 dentists
  const isTop10 = pageData.dentist_count >= 10;
  const title = isTop10
    ? `10 Best Dentists in ${pageData.city}, ${pageData.state} (${new Date().getFullYear()})`
    : `Best Dentists in ${pageData.city}, ${pageData.state} (${new Date().getFullYear()})`;
  const description = isTop10
    ? `Find the top 10 dentists in ${pageData.city}, ${pageData.state}. Our ranking uses a transparent Bayesian scoring system based on ${pageData.dentist_count} verified dentist profiles and real patient reviews.`
    : `Find the best dentists in ${pageData.city}, ${pageData.state}. We've ranked ${pageData.dentist_count} local dentists based on verified patient reviews.`;

  const canonicalUrl = `https://dentistnearmenow.com/best-dentists/${cityState}`;

  return {
    title,
    description,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title,
      description,
      type: 'website',
      url: canonicalUrl,
    },
    robots: pageData.indexable ? undefined : { index: false, follow: true },
  };
}

// All pages generated on-demand via ISR (no static generation at build time)
// This avoids database connection issues during Vercel build
export async function generateStaticParams() {
  return [];
}

// JSON-LD Schema for ItemList
function generateListSchema(city: string, state: string, dentists: any[]) {
  const baseUrl = 'https://dentistnearmenow.com';

  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: `Best Dentists in ${city}, ${state}`,
    description: `Top-rated dental practices in ${city}, ${state} ranked by our Bayesian scoring system`,
    numberOfItems: dentists.length,
    itemListElement: dentists.map((dentist, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      item: {
        '@type': 'Dentist',
        name: dentist.name,
        url: `${baseUrl}/dentist/${dentist.slug}`,
        aggregateRating: dentist.rating ? {
          '@type': 'AggregateRating',
          ratingValue: dentist.rating,
          reviewCount: dentist.review_count,
          bestRating: 5,
          worstRating: 1,
        } : undefined,
        address: dentist.address ? {
          '@type': 'PostalAddress',
          streetAddress: dentist.address,
          addressLocality: city,
          addressRegion: state,
          addressCountry: 'US',
        } : undefined,
      },
    })),
  };
}

// JSON-LD Schema for Breadcrumbs
function generateBreadcrumbSchema(city: string, state: string, stateName: string) {
  const baseUrl = 'https://dentistnearmenow.com';
  const stateSlug = stateName.toLowerCase().replace(/\s+/g, '-');
  const cityStateSlug = `${city.toLowerCase().replace(/\s+/g, '-')}-${state.toLowerCase()}`;

  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: baseUrl },
      { '@type': 'ListItem', position: 2, name: 'States', item: `${baseUrl}/state` },
      { '@type': 'ListItem', position: 3, name: stateName, item: `${baseUrl}/state/${stateSlug}` },
      { '@type': 'ListItem', position: 4, name: `Best Dentists in ${city}`, item: `${baseUrl}/best-dentists/${cityStateSlug}` },
    ],
  };
}

// JSON-LD Schema for FAQ
function generateFAQSchema(city: string, state: string, dentistCount: number) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: `How are the best dentists in ${city}, ${state} ranked?`,
        acceptedAnswer: {
          '@type': 'Answer',
          text: `Our ranking uses a Bayesian scoring system that balances star ratings with review count. This prevents practices with few reviews from unfairly outranking established dentists with hundreds of verified patient reviews. We analyze data from ${dentistCount} dentists in ${city}.`,
        },
      },
      {
        '@type': 'Question',
        name: `How many dentists are in ${city}, ${state}?`,
        acceptedAnswer: {
          '@type': 'Answer',
          text: `There are ${dentistCount} verified dental practices in ${city}, ${state} in our directory. We continuously update our data to ensure accuracy.`,
        },
      },
      {
        '@type': 'Question',
        name: `What should I look for when choosing a dentist in ${city}?`,
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'When choosing a dentist, consider factors like patient reviews, years of experience, services offered, insurance acceptance, and location convenience. Our ranking helps identify practices with consistently positive patient experiences.',
        },
      },
    ],
  };
}

export default async function BestDentistsPage({ params }: PageProps) {
  const { cityState } = await params;
  const slug = `best-dentists-${cityState}`;

  // Parse the slug to get city and state
  const parsed = parseCityStateSlug(cityState);
  if (!parsed) {
    notFound();
  }

  // Fetch page data
  const pageData = await getPageBySlug(slug);
  if (!pageData) {
    notFound();
  }

  // Check if this is a true "Top 10" page (10+ dentists) or smaller city
  const isTop10 = pageData.dentist_count >= 10;

  // Get fresh top dentists with full details
  const top10 = await getTop10WithDetails(pageData.city, pageData.state);

  // Get related cities
  const relatedCities = await getRelatedCities(pageData.state, pageData.city, 6);

  // Get state info
  const stateInfo = getStateByAbbr(pageData.state);
  const stateName = stateInfo?.name || pageData.state;
  const stateSlug = stateName.toLowerCase().replace(/\s+/g, '-');
  const citySlug = `${pageData.city.toLowerCase().replace(/\s+/g, '-')}-${pageData.state.toLowerCase()}`;

  // Combine JSON-LD schemas
  const jsonLd = JSON.stringify([
    generateListSchema(pageData.city, pageData.state, top10),
    generateBreadcrumbSchema(pageData.city, pageData.state, stateName),
    generateFAQSchema(pageData.city, pageData.state, pageData.dentist_count),
  ]);

  return (
    <>
      {/* JSON-LD Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLd }}
      />

      <div className="bg-background">
        {/* Breadcrumb */}
        <div className="bg-gray-50 border-b">
          <div className="container mx-auto px-4 py-3">
            <nav className="flex items-center gap-2 text-sm flex-wrap">
              <Link href="/" className="text-muted-foreground hover:text-primary">Home</Link>
              <ChevronRight className="w-4 h-4 text-muted-foreground" />
              <Link href="/state" className="text-muted-foreground hover:text-primary">States</Link>
              <ChevronRight className="w-4 h-4 text-muted-foreground" />
              <Link href={`/state/${stateSlug}`} className="text-muted-foreground hover:text-primary">
                {stateName}
              </Link>
              <ChevronRight className="w-4 h-4 text-muted-foreground" />
              <span className="text-foreground">Best Dentists in {pageData.city}</span>
            </nav>
          </div>
        </div>

        {/* Hero Section */}
        <section className="bg-gradient-to-b from-primary/5 to-background py-12">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <div className="flex items-center justify-center gap-2 mb-4">
                <Trophy className="w-8 h-8 text-amber-500" />
                <Badge variant="secondary" className="text-sm">
                  {new Date().getFullYear()} Rankings
                </Badge>
              </div>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
                {isTop10 ? '10 Best' : 'Best'} Dentists in {pageData.city}, {pageData.state}
              </h1>
              <p className="text-lg text-muted-foreground mb-6">
                {isTop10
                  ? `Ranked from ${pageData.dentist_count} verified dentists using our transparent Bayesian scoring system`
                  : `${pageData.dentist_count} local dentists ranked by verified patient reviews`}
              </p>
              <div className="flex flex-wrap justify-center gap-4 text-sm">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Users className="w-4 h-4" />
                  <span>{pageData.dentist_count} Dentists Analyzed</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Star className="w-4 h-4 text-amber-500" />
                  <span>{pageData.mean_rating.toFixed(1)} Avg Rating</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <TrendingUp className="w-4 h-4" />
                  <span>Updated {new Date(pageData.payload.generatedAt).toLocaleDateString()}</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Ranking Methodology */}
        <section className="py-8 bg-blue-50 border-y border-blue-100">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="flex items-start gap-3">
                <Info className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                <div>
                  <h2 className="font-semibold text-blue-900 mb-1">How We Rank Dentists</h2>
                  <p className="text-sm text-blue-800">
                    Our ranking uses <strong>Bayesian averaging</strong> to balance star ratings with review volume.
                    This prevents a dentist with one 5-star review from outranking an established practice with
                    hundreds of 4.8-star reviews. The formula weighs both rating quality and the statistical
                    confidence from having more reviews.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <div className="container mx-auto px-4 py-12">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Left Column - Rankings */}
            <div className="lg:col-span-2 space-y-6">
              <h2 className="text-2xl font-bold flex items-center gap-2">
                <Award className="w-6 h-6 text-amber-500" />
                {isTop10 ? 'Top 10 Ranked Dentists' : 'Top Rated Dentists'}
              </h2>

              {/* Mobile Ad */}
              <MobileBannerAd />

              {/* Dentist Cards */}
              {top10.map((dentist, index) => (
                <div
                  key={dentist.id}
                  className="bg-white rounded-xl border p-6 hover:shadow-lg transition-shadow"
                >
                  <div className="flex flex-col md:flex-row gap-6">
                    {/* Rank Badge */}
                    <div className="flex-shrink-0 flex md:flex-col items-center gap-4 md:gap-2">
                      <div className={`
                        w-12 h-12 rounded-full flex items-center justify-center text-lg font-bold
                        ${index === 0 ? 'bg-amber-500 text-white' :
                          index === 1 ? 'bg-gray-400 text-white' :
                          index === 2 ? 'bg-amber-700 text-white' :
                          'bg-gray-100 text-gray-700'}
                      `}>
                        #{index + 1}
                      </div>
                      {index < 3 && (
                        <Trophy className={`w-5 h-5 ${
                          index === 0 ? 'text-amber-500' :
                          index === 1 ? 'text-gray-400' :
                          'text-amber-700'
                        }`} />
                      )}
                    </div>

                    {/* Photo */}
                    <div className="w-full md:w-32 h-32 bg-gray-100 rounded-lg flex-shrink-0 overflow-hidden">
                      <DentistImage
                        src={dentist.photo_url}
                        alt={dentist.name}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* Info */}
                    <div className="flex-1">
                      <Link
                        href={`/dentist/${dentist.slug}`}
                        className="text-xl font-semibold text-foreground hover:text-primary transition-colors"
                      >
                        {dentist.name}
                      </Link>

                      {/* Rating */}
                      <div className="flex items-center gap-2 mt-2">
                        <div className="flex items-center gap-1">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <Star
                              key={star}
                              className={`w-4 h-4 ${
                                star <= Math.round(dentist.rating)
                                  ? 'text-amber-500 fill-amber-500'
                                  : 'text-gray-300'
                              }`}
                            />
                          ))}
                        </div>
                        <span className="font-semibold">{dentist.rating.toFixed(1)}</span>
                        <span className="text-muted-foreground">
                          ({dentist.review_count} reviews)
                        </span>
                      </div>

                      {/* Address */}
                      {dentist.address && (
                        <div className="flex items-center gap-2 mt-2 text-sm text-muted-foreground">
                          <MapPin className="w-4 h-4" />
                          <span>{dentist.address}</span>
                        </div>
                      )}

                      {/* Badges */}
                      <div className="flex flex-wrap gap-2 mt-3">
                        {dentist.accepting_new_patients && (
                          <Badge variant="secondary" className="text-xs">
                            <CheckCircle className="w-3 h-3 mr-1" />
                            Accepting Patients
                          </Badge>
                        )}
                        {dentist.emergency_services && (
                          <Badge variant="destructive" className="text-xs">
                            Emergency Services
                          </Badge>
                        )}
                        <Badge variant="outline" className="text-xs">
                          Score: {dentist.score.toFixed(2)}
                        </Badge>
                      </div>

                      {/* CTA */}
                      <div className="flex flex-wrap gap-3 mt-4">
                        <Link href={`/dentist/${dentist.slug}`}>
                          <Button size="sm">View Profile</Button>
                        </Link>
                        {dentist.phone && (
                          <a href={`tel:${dentist.phone}`}>
                            <Button variant="outline" size="sm">
                              <Phone className="w-4 h-4 mr-2" />
                              Call Now
                            </Button>
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              {/* In-article Ad after 5th dentist */}
              {top10.length >= 5 && (
                <InArticleAd />
              )}
            </div>

            {/* Right Column - Sidebar */}
            <div className="space-y-6">
              {/* City Stats Card */}
              <div className="bg-white rounded-xl border p-6 sticky top-24">
                <h3 className="font-semibold mb-4">{pageData.city} Dental Stats</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Total Dentists</span>
                    <span className="font-semibold">{pageData.dentist_count}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Average Rating</span>
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
                      <span className="font-semibold">{pageData.mean_rating.toFixed(1)}</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Avg Reviews/Dentist</span>
                    <span className="font-semibold">{pageData.payload.avgReviewCount}</span>
                  </div>
                </div>

                <div className="mt-6 pt-6 border-t">
                  <Link href={`/city/${citySlug}`}>
                    <Button variant="outline" className="w-full">
                      View All {pageData.city} Dentists
                    </Button>
                  </Link>
                </div>
              </div>

              {/* Sidebar Ad */}
              <SidebarAd />

              {/* Related Cities */}
              {relatedCities.length > 0 && (
                <div className="bg-white rounded-xl border p-6">
                  <h3 className="font-semibold mb-4">More Cities in {stateName}</h3>
                  <div className="space-y-3">
                    {relatedCities.map((city) => (
                      <Link
                        key={city.slug}
                        href={`/best-dentists/${city.slug.replace('best-dentists-', '')}`}
                        className="flex items-center justify-between p-2 rounded-lg hover:bg-gray-50 transition-colors"
                      >
                        <span className="font-medium">{city.city}</span>
                        <Badge variant="secondary" className="text-xs">
                          {city.dentist_count} dentists
                        </Badge>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Leaderboard Ad */}
        <LeaderboardAd position="bottom" />

        {/* FAQ Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl font-bold mb-8">Frequently Asked Questions</h2>
              <div className="space-y-4">
                <div className="bg-white rounded-lg p-6">
                  <h3 className="font-semibold mb-2">
                    How are the best dentists in {pageData.city}, {pageData.state} ranked?
                  </h3>
                  <p className="text-muted-foreground">
                    Our ranking uses a Bayesian scoring system that balances star ratings with review volume.
                    This mathematical approach prevents practices with very few reviews from unfairly outranking
                    established dentists with hundreds of verified patient reviews. We analyze data from{' '}
                    {pageData.dentist_count} dentists in {pageData.city} to create these rankings.
                  </p>
                </div>
                <div className="bg-white rounded-lg p-6">
                  <h3 className="font-semibold mb-2">
                    How many dentists are in {pageData.city}, {pageData.state}?
                  </h3>
                  <p className="text-muted-foreground">
                    There are {pageData.dentist_count} verified dental practices in {pageData.city},{' '}
                    {pageData.state} in our directory. Our data is continuously updated to ensure accuracy.
                  </p>
                </div>
                <div className="bg-white rounded-lg p-6">
                  <h3 className="font-semibold mb-2">
                    What should I look for when choosing a dentist in {pageData.city}?
                  </h3>
                  <p className="text-muted-foreground">
                    When choosing a dentist, consider factors like patient reviews, years of experience,
                    services offered, insurance acceptance, and location convenience. Our ranking helps identify
                    practices with consistently positive patient experiences based on verified review data.
                  </p>
                </div>
                <div className="bg-white rounded-lg p-6">
                  <h3 className="font-semibold mb-2">
                    How often is this ranking updated?
                  </h3>
                  <p className="text-muted-foreground">
                    Our rankings are recalculated daily to reflect the latest patient reviews and rating changes.
                    The current data was last updated on{' '}
                    {new Date(pageData.payload.generatedAt).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Internal Links Section */}
        <section className="py-12 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-xl font-bold mb-6">Explore More</h2>
              <div className="grid md:grid-cols-2 gap-4">
                <Link
                  href={`/city/${citySlug}`}
                  className="p-4 rounded-lg border hover:border-primary transition-colors"
                >
                  <h3 className="font-semibold">All Dentists in {pageData.city}</h3>
                  <p className="text-sm text-muted-foreground">
                    Browse all {pageData.dentist_count} dental practices
                  </p>
                </Link>
                <Link
                  href={`/state/${stateSlug}`}
                  className="p-4 rounded-lg border hover:border-primary transition-colors"
                >
                  <h3 className="font-semibold">Dentists in {stateName}</h3>
                  <p className="text-sm text-muted-foreground">
                    Find dentists across {stateName}
                  </p>
                </Link>
                <Link
                  href={`/emergency-dentist/${citySlug}`}
                  className="p-4 rounded-lg border hover:border-primary transition-colors"
                >
                  <h3 className="font-semibold">Emergency Dentists in {pageData.city}</h3>
                  <p className="text-sm text-muted-foreground">
                    24/7 emergency dental care
                  </p>
                </Link>
                <Link
                  href="/guides/finding-right-dentist"
                  className="p-4 rounded-lg border hover:border-primary transition-colors"
                >
                  <h3 className="font-semibold">How to Choose a Dentist</h3>
                  <p className="text-sm text-muted-foreground">
                    Complete guide to finding the right dentist
                  </p>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
