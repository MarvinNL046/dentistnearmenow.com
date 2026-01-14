import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ChevronRight, MapPin, Users, Phone, Clock, Star, Stethoscope, AlertCircle, ArrowRight, Building2 } from 'lucide-react';

// ISR: Revalidate every 24 hours
export const revalidate = 86400;
import { getStateBySlug, getDentistsByState, getCitiesByState, US_STATES, DENTIST_TYPES, getEmergencyDentists } from '@/lib/dentist-data';
import DentistCard from '@/components/DentistCard';
import { Button } from '@/components/ui/button';

interface PageProps {
  params: Promise<{ state: string }>;
}

// Adjacent states mapping for internal linking
const adjacentStates: Record<string, string[]> = {
  'alabama': ['tennessee', 'georgia', 'florida', 'mississippi'],
  'alaska': [],
  'arizona': ['california', 'nevada', 'utah', 'colorado', 'new-mexico'],
  'arkansas': ['missouri', 'tennessee', 'mississippi', 'louisiana', 'texas', 'oklahoma'],
  'california': ['oregon', 'nevada', 'arizona'],
  'colorado': ['wyoming', 'nebraska', 'kansas', 'oklahoma', 'new-mexico', 'arizona', 'utah'],
  'connecticut': ['massachusetts', 'rhode-island', 'new-york'],
  'delaware': ['pennsylvania', 'new-jersey', 'maryland'],
  'florida': ['georgia', 'alabama'],
  'georgia': ['tennessee', 'north-carolina', 'south-carolina', 'florida', 'alabama'],
  'hawaii': [],
  'idaho': ['montana', 'wyoming', 'utah', 'nevada', 'oregon', 'washington'],
  'illinois': ['wisconsin', 'iowa', 'missouri', 'kentucky', 'indiana'],
  'indiana': ['michigan', 'ohio', 'kentucky', 'illinois'],
  'iowa': ['minnesota', 'wisconsin', 'illinois', 'missouri', 'nebraska', 'south-dakota'],
  'kansas': ['nebraska', 'missouri', 'oklahoma', 'colorado'],
  'kentucky': ['indiana', 'ohio', 'west-virginia', 'virginia', 'tennessee', 'missouri', 'illinois'],
  'louisiana': ['arkansas', 'mississippi', 'texas'],
  'maine': ['new-hampshire'],
  'maryland': ['pennsylvania', 'delaware', 'virginia', 'west-virginia', 'washington-dc'],
  'massachusetts': ['new-hampshire', 'vermont', 'new-york', 'connecticut', 'rhode-island'],
  'michigan': ['ohio', 'indiana', 'wisconsin'],
  'minnesota': ['wisconsin', 'iowa', 'south-dakota', 'north-dakota'],
  'mississippi': ['tennessee', 'alabama', 'louisiana', 'arkansas'],
  'missouri': ['iowa', 'illinois', 'kentucky', 'tennessee', 'arkansas', 'oklahoma', 'kansas', 'nebraska'],
  'montana': ['north-dakota', 'south-dakota', 'wyoming', 'idaho'],
  'nebraska': ['south-dakota', 'iowa', 'missouri', 'kansas', 'colorado', 'wyoming'],
  'nevada': ['oregon', 'idaho', 'utah', 'arizona', 'california'],
  'new-hampshire': ['maine', 'vermont', 'massachusetts'],
  'new-jersey': ['new-york', 'pennsylvania', 'delaware'],
  'new-mexico': ['colorado', 'oklahoma', 'texas', 'arizona', 'utah'],
  'new-york': ['vermont', 'massachusetts', 'connecticut', 'new-jersey', 'pennsylvania'],
  'north-carolina': ['virginia', 'tennessee', 'georgia', 'south-carolina'],
  'north-dakota': ['minnesota', 'south-dakota', 'montana'],
  'ohio': ['michigan', 'pennsylvania', 'west-virginia', 'kentucky', 'indiana'],
  'oklahoma': ['kansas', 'missouri', 'arkansas', 'texas', 'new-mexico', 'colorado'],
  'oregon': ['washington', 'idaho', 'nevada', 'california'],
  'pennsylvania': ['new-york', 'new-jersey', 'delaware', 'maryland', 'west-virginia', 'ohio'],
  'rhode-island': ['massachusetts', 'connecticut'],
  'south-carolina': ['north-carolina', 'georgia'],
  'south-dakota': ['north-dakota', 'minnesota', 'iowa', 'nebraska', 'wyoming', 'montana'],
  'tennessee': ['kentucky', 'virginia', 'north-carolina', 'georgia', 'alabama', 'mississippi', 'arkansas', 'missouri'],
  'texas': ['oklahoma', 'arkansas', 'louisiana', 'new-mexico'],
  'utah': ['idaho', 'wyoming', 'colorado', 'new-mexico', 'arizona', 'nevada'],
  'vermont': ['new-hampshire', 'massachusetts', 'new-york'],
  'virginia': ['maryland', 'west-virginia', 'kentucky', 'tennessee', 'north-carolina', 'washington-dc'],
  'washington': ['oregon', 'idaho'],
  'west-virginia': ['pennsylvania', 'maryland', 'virginia', 'kentucky', 'ohio'],
  'wisconsin': ['michigan', 'minnesota', 'iowa', 'illinois'],
  'wyoming': ['montana', 'south-dakota', 'nebraska', 'colorado', 'utah', 'idaho'],
  'washington-dc': ['maryland', 'virginia'],
};

// State-specific SEO content
function getStateContent(stateName: string, stateAbbr: string) {
  return {
    intro: `Looking for quality dental care in ${stateName}? Our comprehensive directory helps you find trusted dentists, orthodontists, oral surgeons, and dental specialists throughout ${stateAbbr}. Whether you need a routine cleaning, emergency dental care, or specialized treatment, we connect you with experienced dental professionals in your area.`,
    whyChoose: `${stateName} is home to thousands of licensed dental professionals committed to providing excellent oral healthcare. From major metropolitan areas to smaller communities, you'll find dentists offering a full range of services including preventive care, cosmetic dentistry, orthodontics, and emergency treatments. Many ${stateName} dentists accept major insurance plans and offer flexible payment options.`,
    tips: [
      `Check if the dentist is licensed to practice in ${stateName}`,
      'Read patient reviews and ratings before scheduling',
      'Verify they accept your dental insurance plan',
      'Consider the office location and hours of operation',
      'Ask about their experience with your specific dental needs',
      'Inquire about emergency services availability',
    ],
  };
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
    title: `Dentists in ${state.name} - Find Dental Care in ${state.abbr} | DentistNearMeNow`,
    description: `Find dentists, dental clinics, and orthodontists in ${state.name}. Browse by city, read reviews, and find the best dental care near you in ${state.abbr}. Emergency dentists available.`,
    openGraph: {
      title: `Dentists in ${state.name} - ${state.abbr} Dental Directory`,
      description: `Find quality dental care in ${state.name}. Browse dentists by city and specialty. Emergency dental services available.`,
    },
    alternates: {
      canonical: `https://dentistnearmenow.com/state/${state.slug}`,
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
  const emergencyDentists = await getEmergencyDentists(undefined, state.abbr);
  const stateContent = getStateContent(state.name, state.abbr);

  // Get top cities by number of dentists
  const cityDentistCounts: Record<string, number> = {};
  dentists.forEach(d => {
    if (d.city) {
      cityDentistCounts[d.city] = (cityDentistCounts[d.city] || 0) + 1;
    }
  });
  const topCities = Object.entries(cityDentistCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 12);

  // Count dentists by type
  const typeBreakdown: Record<string, number> = {};
  DENTIST_TYPES.forEach(type => {
    const count = dentists.filter(d => {
      const bt = d.businessType?.toLowerCase() || '';
      return type.searchTerms.some(term => bt.includes(term.toLowerCase()));
    }).length;
    if (count > 0) {
      typeBreakdown[type.slug] = count;
    }
  });

  // Get adjacent states
  const neighboringStates = (adjacentStates[stateSlug] || [])
    .map(slug => US_STATES.find(s => s.slug === slug))
    .filter((s): s is NonNullable<typeof s> => s !== undefined);

  // Get states in the same region
  const regionalStates = US_STATES
    .filter(s => s.region === state.region && s.slug !== stateSlug)
    .slice(0, 6);

  // Group cities alphabetically for sidebar
  const cityGroups = cities.reduce((acc, city) => {
    const letter = city.charAt(0).toUpperCase();
    if (!acc[letter]) acc[letter] = [];
    acc[letter].push(city);
    return acc;
  }, {} as Record<string, string[]>);

  // Calculate average rating
  const dentistsWithRating = dentists.filter(d => d.rating);
  const avgRating = dentistsWithRating.length > 0
    ? (dentistsWithRating.reduce((sum, d) => sum + (d.rating || 0), 0) / dentistsWithRating.length).toFixed(1)
    : null;

  return (
    <div className="bg-background">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary to-primary/80 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl">
            <nav className="flex items-center gap-2 text-white/80 mb-4 text-sm flex-wrap">
              <Link href="/" className="hover:text-white">Home</Link>
              <ChevronRight className="w-4 h-4" />
              <Link href="/state" className="hover:text-white">States</Link>
              <ChevronRight className="w-4 h-4" />
              <span className="text-white">{state.name}</span>
            </nav>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Dentists in {state.name}
            </h1>
            <p className="text-xl text-white/90 mb-6 max-w-3xl">
              Find trusted dental care providers across {state.name}. Browse by city,
              specialty, or find emergency dental services in {state.abbr}.
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
              {emergencyDentists.length > 0 && (
                <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-lg">
                  <AlertCircle className="w-4 h-4" />
                  <span>{emergencyDentists.length} Emergency Dentists</span>
                </div>
              )}
              {avgRating && (
                <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-lg">
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  <span>{avgRating} Avg Rating</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Emergency Dentist CTA Banner */}
      {emergencyDentists.length > 0 && (
        <section className="bg-red-50 border-b border-red-100">
          <div className="container mx-auto px-4 py-6">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                  <AlertCircle className="w-6 h-6 text-red-600" />
                </div>
                <div>
                  <h2 className="font-semibold text-red-800">Need Emergency Dental Care in {state.name}?</h2>
                  <p className="text-sm text-red-700">
                    {emergencyDentists.length} emergency dentists available for urgent dental needs
                  </p>
                </div>
              </div>
              <Link href={`/search?state=${state.abbr}&emergency=true`}>
                <Button className="bg-red-600 hover:bg-red-700 text-white">
                  <Phone className="w-4 h-4 mr-2" />
                  Find Emergency Dentist
                </Button>
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Top Cities Section */}
      {topCities.length > 0 && (
        <section className="py-12 border-b">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold">Top Cities in {state.name}</h2>
              <Link href={`/search?state=${state.abbr}`} className="text-primary hover:underline text-sm flex items-center gap-1">
                View all cities <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {topCities.map(([city, count]) => (
                <Link
                  key={city}
                  href={`/city/${city.toLowerCase().replace(/\s+/g, '-')}-${state.abbr.toLowerCase()}`}
                  className="bg-white border rounded-xl p-4 hover:border-primary hover:shadow-md transition-all group"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-semibold group-hover:text-primary transition-colors">{city}</h3>
                      <p className="text-sm text-muted-foreground">{count} dentists</p>
                    </div>
                    <MapPin className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Popular Services Section */}
      {Object.keys(typeBreakdown).length > 0 && (
        <section className="py-12 bg-gray-50 border-b">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-bold mb-6">Popular Dental Services in {state.name}</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {DENTIST_TYPES.filter(type => typeBreakdown[type.slug]).map((type) => (
                <Link
                  key={type.slug}
                  href={`/search?state=${state.abbr}&type=${type.slug}`}
                  className="bg-white border rounded-xl p-4 hover:border-primary hover:shadow-md transition-all group"
                >
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                      <Stethoscope className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-sm group-hover:text-primary transition-colors">{type.name}</h3>
                      <p className="text-xs text-muted-foreground">{typeBreakdown[type.slug]} in {state.abbr}</p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
            <div className="mt-6 text-center">
              <Link href="/services">
                <Button variant="outline">
                  View All Dental Services
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </div>
          </div>
        </section>
      )}

      <div className="container mx-auto px-4 py-12">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar - Cities */}
          <aside className="lg:col-span-1">
            <div className="sticky top-24 space-y-6">
              {/* Browse by City */}
              <div className="bg-white rounded-xl border p-6">
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

              {/* Nearby States */}
              {neighboringStates.length > 0 && (
                <div className="bg-white rounded-xl border p-6">
                  <h2 className="font-semibold text-lg mb-4">Nearby States</h2>
                  <ul className="space-y-2">
                    {neighboringStates.map((neighborState) => (
                      <li key={neighborState.slug}>
                        <Link
                          href={`/state/${neighborState.slug}`}
                          className="flex items-center justify-between text-sm text-muted-foreground hover:text-primary group"
                        >
                          <span>{neighborState.name}</span>
                          <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Quick Links */}
              <div className="bg-white rounded-xl border p-6">
                <h2 className="font-semibold text-lg mb-4">Quick Links</h2>
                <ul className="space-y-2">
                  <li>
                    <Link
                      href={`/search?state=${state.abbr}&emergency=true`}
                      className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary"
                    >
                      <AlertCircle className="w-4 h-4" />
                      Emergency Dentists in {state.abbr}
                    </Link>
                  </li>
                  <li>
                    <Link
                      href={`/search?state=${state.abbr}`}
                      className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary"
                    >
                      <Stethoscope className="w-4 h-4" />
                      All Dentists in {state.abbr}
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/guides/finding-right-dentist"
                      className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary"
                    >
                      <Building2 className="w-4 h-4" />
                      How to Find the Right Dentist
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/guides/dental-insurance"
                      className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary"
                    >
                      <Clock className="w-4 h-4" />
                      Dental Insurance Guide
                    </Link>
                  </li>
                </ul>
              </div>
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
                {dentists.slice(0, 20).map((dentist) => (
                  <DentistCard key={dentist.id} dentist={dentist} />
                ))}
                {dentists.length > 20 && (
                  <div className="text-center py-6">
                    <Link href={`/search?state=${state.abbr}`}>
                      <Button variant="outline" size="lg">
                        View All {dentists.length} Dentists in {state.name}
                        <ChevronRight className="w-4 h-4 ml-2" />
                      </Button>
                    </Link>
                  </div>
                )}
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

      {/* State Info Section - SEO Content */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto prose prose-lg">
            <h2>Finding Dental Care in {state.name}</h2>
            <p>{stateContent.intro}</p>

            <h3>Why Choose a {state.name} Dentist?</h3>
            <p>{stateContent.whyChoose}</p>

            <h3>Tips for Finding the Right Dentist in {state.abbr}</h3>
            <ul>
              {stateContent.tips.map((tip, index) => (
                <li key={index}>{tip}</li>
              ))}
            </ul>

            <h3>Emergency Dental Care in {state.name}</h3>
            <p>
              If you need urgent dental care, many dentists in {state.name} offer emergency services.
              Look for practices that offer same-day appointments or 24-hour emergency lines for
              issues like severe toothaches, broken teeth, or dental infections. Our directory
              includes {emergencyDentists.length} emergency dental providers across {state.abbr}.
            </p>
            <p>
              <Link href={`/search?state=${state.abbr}&emergency=true`} className="text-primary hover:underline">
                Find an emergency dentist in {state.name}
              </Link>
            </p>

            <h3>Dental Specialties Available in {state.name}</h3>
            <p>
              Beyond general dentistry, {state.name} offers a wide range of dental specialists including:
            </p>
            <ul>
              <li><Link href={`/search?state=${state.abbr}&type=orthodontist`}>Orthodontists</Link> - For braces and teeth alignment</li>
              <li><Link href={`/search?state=${state.abbr}&type=pediatric-dentist`}>Pediatric Dentists</Link> - Specialized care for children</li>
              <li><Link href={`/search?state=${state.abbr}&type=oral-surgeon`}>Oral Surgeons</Link> - For extractions and implants</li>
              <li><Link href={`/search?state=${state.abbr}&type=cosmetic-dentist`}>Cosmetic Dentists</Link> - For smile makeovers</li>
              <li><Link href={`/search?state=${state.abbr}&type=periodontist`}>Periodontists</Link> - For gum disease treatment</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Regional States Section */}
      {regionalStates.length > 0 && (
        <section className="py-12 border-t">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-bold mb-6">More States in the {state.region}</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {regionalStates.map((regionalState) => (
                <Link
                  key={regionalState.slug}
                  href={`/state/${regionalState.slug}`}
                  className="bg-white border rounded-xl p-4 text-center hover:border-primary hover:shadow-md transition-all group"
                >
                  <p className="font-semibold group-hover:text-primary transition-colors">{regionalState.name}</p>
                  <p className="text-xs text-muted-foreground">{regionalState.abbr}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Helpful Resources Section */}
      <section className="py-12 bg-primary/5">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold mb-6 text-center">Helpful Dental Resources</h2>
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <Link
              href="/guides/finding-right-dentist"
              className="bg-white rounded-xl p-6 border hover:border-primary hover:shadow-md transition-all"
            >
              <h3 className="font-semibold mb-2">Finding the Right Dentist</h3>
              <p className="text-sm text-muted-foreground">
                Learn what to look for when choosing a dental provider in {state.name}.
              </p>
            </Link>
            <Link
              href="/guides/dental-emergencies"
              className="bg-white rounded-xl p-6 border hover:border-primary hover:shadow-md transition-all"
            >
              <h3 className="font-semibold mb-2">Dental Emergency Guide</h3>
              <p className="text-sm text-muted-foreground">
                Know when to seek emergency dental care and what to do while waiting.
              </p>
            </Link>
            <Link
              href="/guides/dental-insurance"
              className="bg-white rounded-xl p-6 border hover:border-primary hover:shadow-md transition-all"
            >
              <h3 className="font-semibold mb-2">Dental Insurance 101</h3>
              <p className="text-sm text-muted-foreground">
                Understanding your dental insurance options and coverage in {state.abbr}.
              </p>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
