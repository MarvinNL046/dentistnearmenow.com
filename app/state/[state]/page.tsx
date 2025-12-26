import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ChevronRight, MapPin, Users } from 'lucide-react';

// ISR: Revalidate every 24 hours
export const revalidate = 86400;
import { getStateBySlug, getDentistsByState, getCitiesByState, US_STATES } from '@/lib/dentist-data';
import DentistCard from '@/components/DentistCard';

interface PageProps {
  params: Promise<{ state: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { state: stateSlug } = await params;
  const state = getStateBySlug(stateSlug);

  if (!state) {
    return {
      title: 'State Not Found',
    };
  }

  return {
    title: `Dentists in ${state.name} - Find Dental Care in ${state.abbr}`,
    description: `Find dentists, dental clinics, and orthodontists in ${state.name}. Browse by city, read reviews, and find the best dental care near you in ${state.abbr}.`,
    openGraph: {
      title: `Dentists in ${state.name}`,
      description: `Find quality dental care in ${state.name}. Browse dentists by city and specialty.`,
    },
  };
}

export async function generateStaticParams() {
  return US_STATES.map((state) => ({
    state: state.slug,
  }));
}

export default async function StatePage({ params }: PageProps) {
  const { state: stateSlug } = await params;
  const state = getStateBySlug(stateSlug);

  if (!state) {
    notFound();
  }

  const dentists = await getDentistsByState(state.abbr);
  const cities = await getCitiesByState(state.abbr);

  // Group cities alphabetically
  const cityGroups = cities.reduce((acc, city) => {
    const letter = city.charAt(0).toUpperCase();
    if (!acc[letter]) acc[letter] = [];
    acc[letter].push(city);
    return acc;
  }, {} as Record<string, string[]>);

  return (
    <div className="bg-background">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary to-primary/80 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            <nav className="flex items-center gap-2 text-white/80 mb-4 text-sm">
              <Link href="/" className="hover:text-white">Home</Link>
              <ChevronRight className="w-4 h-4" />
              <Link href="/state" className="hover:text-white">States</Link>
              <ChevronRight className="w-4 h-4" />
              <span className="text-white">{state.name}</span>
            </nav>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Dentists in {state.name}
            </h1>
            <p className="text-xl text-white/90 mb-6">
              Find trusted dental care providers across {state.name}. Browse by city or
              view all dentists in {state.abbr}.
            </p>
            <div className="flex flex-wrap gap-4 text-sm">
              <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-lg">
                <Users className="w-4 h-4" />
                <span>{dentists.length} Dentists</span>
              </div>
              <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-lg">
                <MapPin className="w-4 h-4" />
                <span>{cities.length} Cities</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar - Cities */}
          <aside className="lg:col-span-1">
            <div className="sticky top-24 bg-white rounded-xl border p-6">
              <h2 className="font-semibold text-lg mb-4">Browse by City</h2>
              {Object.keys(cityGroups).length > 0 ? (
                <div className="space-y-4 max-h-96 overflow-y-auto">
                  {Object.entries(cityGroups).sort().map(([letter, cities]) => (
                    <div key={letter}>
                      <p className="font-semibold text-primary text-sm mb-1">{letter}</p>
                      <ul className="space-y-1">
                        {cities.map((city) => (
                          <li key={city}>
                            <Link
                              href={`/city/${city.toLowerCase().replace(/\s+/g, '-')}-${state.abbr.toLowerCase()}`}
                              className="text-sm text-muted-foreground hover:text-primary"
                            >
                              {city}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-muted-foreground">
                  No cities found yet. Check back soon!
                </p>
              )}
            </div>
          </aside>

          {/* Main Content - Dentists */}
          <main className="lg:col-span-3">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold">All Dentists in {state.name}</h2>
              <p className="text-muted-foreground">{dentists.length} results</p>
            </div>

            {dentists.length > 0 ? (
              <div className="space-y-4">
                {dentists.map((dentist) => (
                  <DentistCard key={dentist.id} dentist={dentist} />
                ))}
              </div>
            ) : (
              <div className="bg-gray-50 rounded-xl p-12 text-center">
                <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
                  <MapPin className="w-8 h-8 text-gray-400" />
                </div>
                <h3 className="text-xl font-semibold mb-2">No Dentists Found Yet</h3>
                <p className="text-muted-foreground max-w-md mx-auto">
                  We&apos;re still building our directory for {state.name}. Check back soon for
                  dental care providers in your area.
                </p>
              </div>
            )}
          </main>
        </div>
      </div>

      {/* State Info Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto prose prose-lg">
            <h2>Dental Care in {state.name}</h2>
            <p>
              Finding quality dental care in {state.name} is essential for maintaining your oral health.
              Our directory includes general dentists, orthodontists, oral surgeons, pediatric dentists,
              and other dental specialists throughout the state.
            </p>
            <h3>What to Look for in a {state.name} Dentist</h3>
            <ul>
              <li>Check if they accept your dental insurance</li>
              <li>Read patient reviews and ratings</li>
              <li>Consider the office location and hours</li>
              <li>Ask about their experience with specific procedures</li>
              <li>Verify they are licensed to practice in {state.name}</li>
            </ul>
            <h3>Emergency Dental Care in {state.name}</h3>
            <p>
              If you need urgent dental care, many dentists in {state.name} offer emergency services.
              Look for practices that offer same-day appointments or 24-hour emergency lines for
              issues like severe toothaches, broken teeth, or dental infections.
            </p>
            <p>
              <Link href="/emergency-dentist" className="text-primary hover:underline">
                Find an emergency dentist near you
              </Link>
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
