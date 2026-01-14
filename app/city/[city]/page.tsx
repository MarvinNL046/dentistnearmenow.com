import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ChevronRight, MapPin, Users, Phone, Trophy } from 'lucide-react';

// ISR: Revalidate every 24 hours
export const revalidate = 86400;
import { getDentistsByCity, getStateByAbbr, getAllDentists } from '@/lib/dentist-data';
import DentistCard from '@/components/DentistCard';
import NearbyLocations from '@/components/NearbyLocations';
import QuickGuides from '@/components/QuickGuides';
import { InArticleAd, LeaderboardAd, InFeedAd } from '@/components/AdUnit';

interface PageProps {
  params: Promise<{ city: string }>;
}

// Parse city slug: "new-york-ny" -> { city: "New York", stateAbbr: "NY" }
function parseCitySlug(slug: string): { city: string; stateAbbr: string } | null {
  const parts = slug.split('-');
  if (parts.length < 2) return null;

  const stateAbbr = parts[parts.length - 1].toUpperCase();
  const cityParts = parts.slice(0, -1);
  const city = cityParts.map(p => p.charAt(0).toUpperCase() + p.slice(1)).join(' ');

  return { city, stateAbbr };
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { city: citySlug } = await params;
  const parsed = parseCitySlug(citySlug);

  if (!parsed) {
    return { title: 'City Not Found' };
  }

  const state = getStateByAbbr(parsed.stateAbbr);
  const stateName = state?.name || parsed.stateAbbr;

  const canonicalUrl = `https://dentistnearmenow.com/city/${citySlug}`;

  return {
    title: `Dentists in ${parsed.city}, ${parsed.stateAbbr} - Find Local Dental Care`,
    description: `Find dentists, dental clinics, and orthodontists in ${parsed.city}, ${stateName}. Read reviews, compare ratings, and find the best dental care near you.`,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: `Dentists in ${parsed.city}, ${parsed.stateAbbr}`,
      description: `Find quality dental care in ${parsed.city}, ${stateName}.`,
      url: canonicalUrl,
    },
  };
}

// Only pre-generate top 50 cities by dentist count
// Rest will be generated on-demand via ISR
export async function generateStaticParams() {
  const dentists = await getAllDentists();
  const cityCounts = new Map<string, number>();

  dentists.forEach((d) => {
    if (d.city && d.stateAbbr) {
      const slug = `${d.city.toLowerCase().replace(/\s+/g, '-')}-${d.stateAbbr.toLowerCase()}`;
      cityCounts.set(slug, (cityCounts.get(slug) || 0) + 1);
    }
  });

  // Sort by dentist count and take top 50
  const topCities = Array.from(cityCounts.entries())
    .sort((a, b) => b[1] - a[1])
    .slice(0, 50)
    .map(([city]) => ({ city }));

  return topCities;
}

export default async function CityPage({ params }: PageProps) {
  const { city: citySlug } = await params;
  const parsed = parseCitySlug(citySlug);

  if (!parsed) {
    notFound();
  }

  const state = getStateByAbbr(parsed.stateAbbr);
  const dentists = await getDentistsByCity(parsed.city, parsed.stateAbbr);
  const emergencyDentists = dentists.filter(d => d.emergencyServices);

  const stateName = state?.name || parsed.stateAbbr;

  return (
    <div className="bg-background">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary to-primary/80 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            <nav className="flex items-center gap-2 text-white/80 mb-4 text-sm flex-wrap">
              <Link href="/" className="hover:text-white">Home</Link>
              <ChevronRight className="w-4 h-4" />
              <Link href="/state" className="hover:text-white">States</Link>
              <ChevronRight className="w-4 h-4" />
              {state && (
                <>
                  <Link href={`/state/${state.slug}`} className="hover:text-white">
                    {state.name}
                  </Link>
                  <ChevronRight className="w-4 h-4" />
                </>
              )}
              <span className="text-white">{parsed.city}</span>
            </nav>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Dentists in {parsed.city}, {parsed.stateAbbr}
            </h1>
            <p className="text-xl text-white/90 mb-6">
              Find trusted dental care providers in {parsed.city}, {stateName}. Browse
              local dentists, read reviews, and book appointments.
            </p>
            <div className="flex flex-wrap gap-4 text-sm">
              <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-lg">
                <Users className="w-4 h-4" />
                <span>{dentists.length} Dentists</span>
              </div>
              {emergencyDentists.length > 0 && (
                <Link
                  href={`/emergency-dentist/${citySlug}`}
                  className="flex items-center gap-2 bg-red-500/80 hover:bg-red-500 px-4 py-2 rounded-lg transition-colors"
                >
                  <Phone className="w-4 h-4" />
                  <span>{emergencyDentists.length} Emergency Dentists</span>
                </Link>
              )}
              {dentists.length >= 5 && (
                <Link
                  href={`/best-dentists/${citySlug}`}
                  className="flex items-center gap-2 bg-amber-500/80 hover:bg-amber-500 px-4 py-2 rounded-lg transition-colors"
                >
                  <Trophy className="w-4 h-4" />
                  <span>Top Rated Dentists</span>
                </Link>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Leaderboard Ad - High visibility placement after hero */}
      <LeaderboardAd position="top" />

      <div className="container mx-auto px-4 py-12">
        {/* Quick Filters */}
        <div className="flex flex-wrap gap-2 mb-8">
          <button className="px-4 py-2 bg-primary text-white rounded-lg text-sm font-medium">
            All Dentists
          </button>
          <button className="px-4 py-2 bg-white border rounded-lg text-sm font-medium hover:bg-gray-50">
            General Dentistry
          </button>
          <button className="px-4 py-2 bg-white border rounded-lg text-sm font-medium hover:bg-gray-50">
            Orthodontists
          </button>
          <button className="px-4 py-2 bg-white border rounded-lg text-sm font-medium hover:bg-gray-50">
            Cosmetic
          </button>
          <button className="px-4 py-2 bg-white border rounded-lg text-sm font-medium hover:bg-gray-50">
            Pediatric
          </button>
        </div>

        {/* Results */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">
            {dentists.length} Dentists in {parsed.city}, {parsed.stateAbbr}
          </h2>
        </div>

        {dentists.length > 0 ? (
          <div className="space-y-4">
            {dentists.map((dentist, index) => (
              <div key={dentist.id}>
                <DentistCard dentist={dentist} />
                {/* Insert in-feed ad after every 4th dentist (but not the last one) */}
                {(index + 1) % 4 === 0 && index < dentists.length - 1 && (
                  <div className="my-4">
                    <InFeedAd />
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-gray-50 rounded-xl p-12 text-center">
            <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
              <MapPin className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold mb-2">No Dentists Found Yet</h3>
            <p className="text-muted-foreground max-w-md mx-auto mb-4">
              We&apos;re still building our directory for {parsed.city}, {parsed.stateAbbr}.
            </p>
            <Link
              href={state ? `/state/${state.slug}` : '/state'}
              className="text-primary hover:underline"
            >
              Browse other cities in {stateName}
            </Link>
          </div>
        )}

        {/* Ad placement between listings and content */}
        {dentists.length > 0 && <InArticleAd />}
      </div>

      {/* City Info Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto prose prose-lg">
            <h2>Finding a Dentist in {parsed.city}, {parsed.stateAbbr}</h2>
            <p>
              Looking for quality dental care in {parsed.city}? Our directory helps you find
              experienced dentists and dental specialists in your area. Whether you need a
              routine cleaning, cosmetic dentistry, orthodontic treatment, or emergency care,
              you&apos;ll find the right provider here.
            </p>

            <h3>Popular Dental Services in {parsed.city}</h3>
            <ul>
              <li><strong>Preventive Care</strong> - Regular cleanings, exams, and X-rays</li>
              <li><strong>Restorative Dentistry</strong> - Fillings, crowns, bridges, and implants</li>
              <li><strong>Cosmetic Dentistry</strong> - Teeth whitening, veneers, and smile makeovers</li>
              <li><strong>Orthodontics</strong> - Braces and Invisalign for teeth alignment</li>
              <li><strong>Emergency Dental Care</strong> - Same-day treatment for dental emergencies</li>
            </ul>

            <h3>Tips for Choosing a Dentist in {parsed.city}</h3>
            <p>
              When selecting a dentist, consider their location, office hours, and whether they
              accept your insurance. Reading patient reviews can also help you find a dentist
              who provides excellent care and makes you feel comfortable.
            </p>

            {dentists.length >= 5 && (
              <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 not-prose mb-4">
                <h4 className="font-semibold text-amber-800 mb-2">Looking for the Best Dentist in {parsed.city}?</h4>
                <p className="text-amber-700 text-sm mb-3">
                  See our ranked list of top-rated dentists based on verified patient reviews
                  using our transparent Bayesian scoring system.
                </p>
                <Link
                  href={`/best-dentists/${citySlug}`}
                  className="inline-flex items-center gap-2 bg-amber-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-amber-700"
                >
                  <Trophy className="w-4 h-4" />
                  View Top Rated Dentists
                </Link>
              </div>
            )}

            <div className="bg-red-50 border border-red-200 rounded-lg p-4 not-prose">
              <h4 className="font-semibold text-red-800 mb-2">Need Emergency Dental Care?</h4>
              <p className="text-red-700 text-sm mb-3">
                If you have a dental emergency in {parsed.city}, find immediate care from our
                emergency dentist directory.
              </p>
              <Link
                href="/emergency-dentist"
                className="inline-flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-red-700"
              >
                <Phone className="w-4 h-4" />
                Find Emergency Dentist
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Popular Services Section */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold mb-6">Find Dental Services in {parsed.city}</h2>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            <Link
              href={`/services/general-dentistry`}
              className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl hover:bg-primary/5 hover:border-primary border border-transparent transition-all group"
            >
              <span className="text-2xl">🦷</span>
              <div>
                <p className="font-medium group-hover:text-primary transition-colors">General Dentistry</p>
                <p className="text-sm text-muted-foreground">Cleanings & checkups</p>
              </div>
            </Link>
            <Link
              href={`/services/cosmetic-dentistry`}
              className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl hover:bg-primary/5 hover:border-primary border border-transparent transition-all group"
            >
              <span className="text-2xl">✨</span>
              <div>
                <p className="font-medium group-hover:text-primary transition-colors">Cosmetic Dentistry</p>
                <p className="text-sm text-muted-foreground">Whitening & veneers</p>
              </div>
            </Link>
            <Link
              href={`/services/orthodontics`}
              className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl hover:bg-primary/5 hover:border-primary border border-transparent transition-all group"
            >
              <span className="text-2xl">😁</span>
              <div>
                <p className="font-medium group-hover:text-primary transition-colors">Orthodontics</p>
                <p className="text-sm text-muted-foreground">Braces & Invisalign</p>
              </div>
            </Link>
            <Link
              href={`/emergency-dentist/${citySlug}`}
              className="flex items-center gap-3 p-4 bg-red-50 rounded-xl hover:bg-red-100 border border-transparent hover:border-red-200 transition-all group"
            >
              <span className="text-2xl">🚨</span>
              <div>
                <p className="font-medium text-red-700">Emergency Care</p>
                <p className="text-sm text-red-600">24/7 urgent dental</p>
              </div>
            </Link>
            <Link
              href={`/services/pediatric-dentistry`}
              className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl hover:bg-primary/5 hover:border-primary border border-transparent transition-all group"
            >
              <span className="text-2xl">👶</span>
              <div>
                <p className="font-medium group-hover:text-primary transition-colors">Pediatric Dentistry</p>
                <p className="text-sm text-muted-foreground">Kids dental care</p>
              </div>
            </Link>
            <Link
              href={`/services/dental-implants`}
              className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl hover:bg-primary/5 hover:border-primary border border-transparent transition-all group"
            >
              <span className="text-2xl">🔩</span>
              <div>
                <p className="font-medium group-hover:text-primary transition-colors">Dental Implants</p>
                <p className="text-sm text-muted-foreground">Tooth replacement</p>
              </div>
            </Link>
            <Link
              href={`/services/oral-surgery`}
              className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl hover:bg-primary/5 hover:border-primary border border-transparent transition-all group"
            >
              <span className="text-2xl">🏥</span>
              <div>
                <p className="font-medium group-hover:text-primary transition-colors">Oral Surgery</p>
                <p className="text-sm text-muted-foreground">Extractions & more</p>
              </div>
            </Link>
            {dentists.length >= 5 && (
              <Link
                href={`/best-dentists/${citySlug}`}
                className="flex items-center gap-3 p-4 bg-amber-50 rounded-xl hover:bg-amber-100 border border-transparent hover:border-amber-200 transition-all group"
              >
                <span className="text-2xl">🏆</span>
                <div>
                  <p className="font-medium text-amber-700">Top Rated</p>
                  <p className="text-sm text-amber-600">Best dentists ranked</p>
                </div>
              </Link>
            )}
            <Link
              href={`/services`}
              className="flex items-center gap-3 p-4 bg-primary/5 rounded-xl hover:bg-primary/10 border border-primary/20 transition-all group"
            >
              <span className="text-2xl">→</span>
              <div>
                <p className="font-medium text-primary">View All Services</p>
                <p className="text-sm text-primary/70">Browse all options</p>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Nearby Cities */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <NearbyLocations
            currentCity={parsed.city}
            state={parsed.stateAbbr}
            variant="grid"
            limit={8}
          />
        </div>
      </section>

      {/* Helpful Guides */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold mb-6">Dental Care Resources</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <Link
                href="/guides/finding-right-dentist"
                className="p-6 bg-gray-50 rounded-xl hover:shadow-md transition-shadow group"
              >
                <h3 className="font-semibold mb-2 group-hover:text-primary transition-colors">How to Choose a Dentist</h3>
                <p className="text-sm text-muted-foreground">Tips for finding the right dental care provider for your needs.</p>
              </Link>
              <Link
                href="/guides/dental-insurance"
                className="p-6 bg-gray-50 rounded-xl hover:shadow-md transition-shadow group"
              >
                <h3 className="font-semibold mb-2 group-hover:text-primary transition-colors">Dental Insurance Guide</h3>
                <p className="text-sm text-muted-foreground">Understanding dental insurance and maximizing your benefits.</p>
              </Link>
              <Link
                href="/guides/dental-emergencies"
                className="p-6 bg-gray-50 rounded-xl hover:shadow-md transition-shadow group"
              >
                <h3 className="font-semibold mb-2 group-hover:text-primary transition-colors">Dental Emergencies</h3>
                <p className="text-sm text-muted-foreground">What to do in a dental emergency and when to seek care.</p>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
