import { Metadata } from 'next';
import Link from 'next/link';
import {
  Trophy,
  MapPin,
  Star,
  Users,
  ChevronRight,
  TrendingUp,
  Award,
  Info
} from 'lucide-react';
import { getTopCitiesForHub, getCitiesByState } from '@/lib/top10';
import { US_STATES } from '@/lib/dentist-data';
import { Badge } from '@/components/ui/badge';
import { LeaderboardAd, InArticleAd } from '@/components/AdUnit';

// ISR: Revalidate every hour
export const revalidate = 3600;

export const metadata: Metadata = {
  title: 'Best Dentists by City - Top Rated Dental Practices (2025)',
  description: 'Find the best dentists in your city. We rank dental practices using a transparent Bayesian scoring system based on verified patient reviews. Browse top-rated dentists in 700+ US cities.',
  openGraph: {
    title: 'Best Dentists by City - Top Rated Dental Practices',
    description: 'Find the best dentists in your city using our transparent ranking system.',
    type: 'website',
  },
};

// JSON-LD Schema
function generateJsonLd(totalCities: number, totalDentists: number) {
  return {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Best Dentists by City',
    description: `Find top-rated dentists in ${totalCities}+ US cities. Rankings based on verified patient reviews.`,
    numberOfItems: totalCities,
    mainEntity: {
      '@type': 'ItemList',
      name: 'Top Cities for Dental Care',
      numberOfItems: totalCities,
    },
  };
}

export default async function BestDentistsHubPage() {
  const topCities = await getTopCitiesForHub(50);
  const citiesByState = await getCitiesByState();

  // Calculate totals
  const totalCities = Object.values(citiesByState).reduce((sum, cities) => sum + cities.length, 0);
  const totalDentists = topCities.reduce((sum, city) => sum + city.dentist_count, 0);

  // Get state info for display
  const stateNames: Record<string, string> = {};
  US_STATES.forEach(s => {
    stateNames[s.abbr] = s.name;
  });

  // Sort states by number of cities
  const sortedStates = Object.entries(citiesByState)
    .sort((a, b) => b[1].length - a[1].length);

  return (
    <>
      {/* JSON-LD Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(generateJsonLd(totalCities, totalDentists)) }}
      />

      <div className="bg-background">
        {/* Breadcrumb */}
        <div className="bg-gray-50 border-b">
          <div className="container mx-auto px-4 py-3">
            <nav className="flex items-center gap-2 text-sm">
              <Link href="/" className="text-muted-foreground hover:text-primary">Home</Link>
              <ChevronRight className="w-4 h-4 text-muted-foreground" />
              <span className="text-foreground">Best Dentists</span>
            </nav>
          </div>
        </div>

        {/* Hero Section */}
        <section className="bg-gradient-to-b from-primary/5 to-background py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <div className="flex items-center justify-center gap-2 mb-4">
                <Trophy className="w-10 h-10 text-amber-500" />
              </div>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
                Best Dentists by City
              </h1>
              <p className="text-lg text-muted-foreground mb-8">
                Find top-rated dentists in {totalCities}+ US cities, ranked by our transparent Bayesian scoring system
              </p>
              <div className="flex flex-wrap justify-center gap-6 text-sm">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <MapPin className="w-5 h-5 text-primary" />
                  <span className="font-semibold">{totalCities}+ Cities</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Users className="w-5 h-5 text-primary" />
                  <span className="font-semibold">{totalDentists.toLocaleString()}+ Dentists</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Star className="w-5 h-5 text-amber-500" />
                  <span className="font-semibold">Verified Reviews</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Methodology Box */}
        <section className="py-6 bg-blue-50 border-y border-blue-100">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="flex items-start gap-3">
                <Info className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                <div>
                  <h2 className="font-semibold text-blue-900 mb-1">How We Rank Dentists</h2>
                  <p className="text-sm text-blue-800">
                    Our rankings use <strong>Bayesian averaging</strong> (C=20) to balance star ratings with review volume.
                    This ensures dentists with hundreds of reviews aren't unfairly outranked by practices with just a few 5-star reviews.
                    We only index cities with 10+ dentists and strong review data.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Top Cities Section */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="flex items-center gap-3 mb-8">
                <Award className="w-7 h-7 text-amber-500" />
                <h2 className="text-2xl font-bold">Top 50 Cities by Dentist Count</h2>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
                {topCities.map((city, index) => (
                  <Link
                    key={city.slug}
                    href={`/best-dentists/${city.slug.replace('best-dentists-', '')}`}
                    className="flex items-center gap-4 p-4 bg-white rounded-lg border hover:border-primary hover:shadow-md transition-all"
                  >
                    <div className={`
                      w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0
                      ${index < 3 ? 'bg-amber-500 text-white' :
                        index < 10 ? 'bg-primary/10 text-primary' :
                        'bg-gray-100 text-gray-600'}
                    `}>
                      {index + 1}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-foreground truncate">
                        {city.city}, {city.state}
                      </h3>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <span>{city.dentist_count} dentists</span>
                        <span>•</span>
                        <span className="flex items-center gap-1">
                          <Star className="w-3 h-3 text-amber-500 fill-amber-500" />
                          {city.mean_rating.toFixed(1)}
                        </span>
                      </div>
                    </div>
                    <ChevronRight className="w-5 h-5 text-muted-foreground flex-shrink-0" />
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Ad */}
        <InArticleAd className="container mx-auto px-4" />

        {/* Browse by State */}
        <section className="py-12 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="flex items-center gap-3 mb-8">
                <MapPin className="w-7 h-7 text-primary" />
                <h2 className="text-2xl font-bold">Browse by State</h2>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {sortedStates.slice(0, 24).map(([state, cities]) => (
                  <div key={state} className="bg-white rounded-lg border p-5">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="font-semibold text-lg">
                        {stateNames[state] || state}
                      </h3>
                      <Badge variant="secondary">{cities.length} cities</Badge>
                    </div>
                    <div className="space-y-2">
                      {cities.slice(0, 5).map((city) => (
                        <Link
                          key={city.slug}
                          href={`/best-dentists/${city.slug.replace('best-dentists-', '')}`}
                          className="flex items-center justify-between text-sm hover:text-primary transition-colors"
                        >
                          <span>{city.city}</span>
                          <span className="text-muted-foreground">{city.dentist_count} dentists</span>
                        </Link>
                      ))}
                      {cities.length > 5 && (
                        <Link
                          href={`/state/${(stateNames[state] || state).toLowerCase().replace(/\s+/g, '-')}`}
                          className="text-sm text-primary hover:underline flex items-center gap-1 mt-2"
                        >
                          View all {cities.length} cities
                          <ChevronRight className="w-4 h-4" />
                        </Link>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {sortedStates.length > 24 && (
                <div className="text-center mt-8">
                  <Link
                    href="/state"
                    className="inline-flex items-center gap-2 text-primary hover:underline font-medium"
                  >
                    View all {sortedStates.length} states
                    <ChevronRight className="w-5 h-5" />
                  </Link>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Leaderboard Ad */}
        <LeaderboardAd position="bottom" />

        {/* FAQ Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl font-bold mb-8">Frequently Asked Questions</h2>
              <div className="space-y-4">
                <div className="bg-white rounded-lg border p-6">
                  <h3 className="font-semibold mb-2">How do you determine the best dentists?</h3>
                  <p className="text-muted-foreground">
                    We use a Bayesian scoring system that balances star ratings with review volume. This statistical
                    approach ensures that dentists with many positive reviews rank appropriately compared to those
                    with fewer reviews. A dentist with 500 reviews at 4.8 stars will typically rank higher than one
                    with 5 reviews at 5.0 stars.
                  </p>
                </div>
                <div className="bg-white rounded-lg border p-6">
                  <h3 className="font-semibold mb-2">Which cities are included?</h3>
                  <p className="text-muted-foreground">
                    We include cities that meet our quality criteria: at least 10 dental practices, sufficient
                    review data, and an average rating of 4.0 or higher. This ensures our rankings are meaningful
                    and based on substantial data.
                  </p>
                </div>
                <div className="bg-white rounded-lg border p-6">
                  <h3 className="font-semibold mb-2">How often are rankings updated?</h3>
                  <p className="text-muted-foreground">
                    Our rankings are recalculated daily to reflect the latest patient reviews and rating changes.
                    New cities are added automatically when they meet our indexing criteria.
                  </p>
                </div>
                <div className="bg-white rounded-lg border p-6">
                  <h3 className="font-semibold mb-2">Can I suggest a city to add?</h3>
                  <p className="text-muted-foreground">
                    We're continuously expanding our coverage. If your city isn't listed yet, it may not meet our
                    minimum data requirements. As we gather more data, new cities are automatically added to our rankings.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-12 bg-primary/5">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto text-center">
              <h2 className="text-2xl font-bold mb-4">Can't Find Your City?</h2>
              <p className="text-muted-foreground mb-6">
                Use our search to find dentists anywhere in the United States
              </p>
              <Link
                href="/search"
                className="inline-flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-lg font-medium hover:bg-primary/90 transition-colors"
              >
                Search All Dentists
                <ChevronRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
