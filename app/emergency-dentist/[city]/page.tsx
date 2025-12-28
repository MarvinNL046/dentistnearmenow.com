import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Phone, AlertTriangle, MapPin, ChevronRight, Clock } from 'lucide-react';

// ISR: Revalidate every 24 hours
export const revalidate = 86400;
import { Button } from '@/components/ui/button';
import { getEmergencyDentists, getDentistsByCity, getStateByAbbr, getAllDentists } from '@/lib/dentist-data';
import DentistCard from '@/components/DentistCard';

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
    return { title: 'Emergency Dentist' };
  }

  return {
    title: `Emergency Dentist in ${parsed.city}, ${parsed.stateAbbr} - 24 Hour Dental Care`,
    description: `Find emergency dentists in ${parsed.city}, ${parsed.stateAbbr} available 24/7. Get immediate care for toothaches, broken teeth, and dental emergencies. Same-day appointments available.`,
    keywords: `emergency dentist ${parsed.city}, 24 hour dentist ${parsed.city}, urgent dental care ${parsed.stateAbbr}`,
  };
}

// Only pre-generate top 30 cities with emergency dentists
// Rest will be generated on-demand via ISR
export async function generateStaticParams() {
  const dentists = await getAllDentists();
  const cityCounts = new Map<string, number>();

  dentists
    .filter(d => d.emergencyServices)
    .forEach((d) => {
      if (d.city && d.stateAbbr) {
        const slug = `${d.city.toLowerCase().replace(/\s+/g, '-')}-${d.stateAbbr.toLowerCase()}`;
        cityCounts.set(slug, (cityCounts.get(slug) || 0) + 1);
      }
    });

  // Sort by emergency dentist count and take top 30
  const topCities = Array.from(cityCounts.entries())
    .sort((a, b) => b[1] - a[1])
    .slice(0, 30)
    .map(([city]) => ({ city }));

  return topCities;
}

export default async function EmergencyCityPage({ params }: PageProps) {
  const { city: citySlug } = await params;
  const parsed = parseCitySlug(citySlug);

  if (!parsed) {
    notFound();
  }

  const state = getStateByAbbr(parsed.stateAbbr);
  const allCityDentists = await getDentistsByCity(parsed.city, parsed.stateAbbr);
  const emergencyDentists = allCityDentists.filter(d => d.emergencyServices);
  const stateName = state?.name || parsed.stateAbbr;

  return (
    <div className="bg-background">
      {/* Hero Section */}
      <section className="bg-red-600 text-white py-16">
        <div className="container mx-auto px-4">
          <nav className="flex items-center gap-2 text-white/80 mb-6 text-sm flex-wrap">
            <Link href="/" className="hover:text-white">Home</Link>
            <ChevronRight className="w-4 h-4" />
            <Link href="/emergency-dentist" className="hover:text-white">Emergency Dentist</Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-white">{parsed.city}, {parsed.stateAbbr}</span>
          </nav>

          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-white/20 px-4 py-2 rounded-full mb-6">
              <AlertTriangle className="w-5 h-5" />
              <span className="font-medium">Emergency Dental Care</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Emergency Dentist in {parsed.city}, {parsed.stateAbbr}
            </h1>
            <p className="text-xl text-white/90 mb-8">
              Find emergency dental care in {parsed.city}, {stateName}. These dentists
              offer urgent care for toothaches, broken teeth, and dental emergencies.
            </p>
            <div className="flex flex-wrap gap-4">
              <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-lg">
                <Clock className="w-4 h-4" />
                <span>{emergencyDentists.length} Emergency Dentists</span>
              </div>
              <a href="tel:1-800-336-8478">
                <Button className="bg-white text-red-600 hover:bg-gray-100">
                  <Phone className="w-4 h-4 mr-2" />
                  Call 1-800-DENTIST
                </Button>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Emergency Dentists List */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          {emergencyDentists.length > 0 ? (
            <>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold">
                  Emergency Dentists in {parsed.city}
                </h2>
                <p className="text-muted-foreground">
                  {emergencyDentists.length} results
                </p>
              </div>
              <div className="space-y-4">
                {emergencyDentists.map((dentist) => (
                  <DentistCard key={dentist.id} dentist={dentist} />
                ))}
              </div>
            </>
          ) : (
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-8 text-center">
              <AlertTriangle className="w-12 h-12 text-amber-500 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-amber-900 mb-2">
                No Emergency Dentists Found
              </h3>
              <p className="text-amber-700 mb-6 max-w-md mx-auto">
                We don&apos;t have emergency dentists specifically listed for {parsed.city} yet.
                Try these alternatives:
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a href="tel:1-800-336-8478">
                  <Button variant="outline" className="border-amber-500 text-amber-700 hover:bg-amber-100">
                    <Phone className="w-4 h-4 mr-2" />
                    Call 1-800-DENTIST
                  </Button>
                </a>
                <Link href={`/city/${citySlug}`}>
                  <Button variant="outline">
                    <MapPin className="w-4 h-4 mr-2" />
                    View All Dentists in {parsed.city}
                  </Button>
                </Link>
              </div>
            </div>
          )}

          {/* Other Dentists in the Area */}
          {allCityDentists.length > emergencyDentists.length && (
            <div className="mt-12">
              <h2 className="text-xl font-bold mb-6">
                Other Dentists in {parsed.city} That May Help
              </h2>
              <div className="space-y-4">
                {allCityDentists
                  .filter(d => !d.emergencyServices)
                  .slice(0, 5)
                  .map((dentist) => (
                    <DentistCard key={dentist.id} dentist={dentist} />
                  ))}
              </div>
              {allCityDentists.length > emergencyDentists.length + 5 && (
                <div className="mt-6 text-center">
                  <Link href={`/city/${citySlug}`}>
                    <Button variant="outline">
                      View All {allCityDentists.length} Dentists in {parsed.city}
                      <ChevronRight className="w-4 h-4 ml-2" />
                    </Button>
                  </Link>
                </div>
              )}
            </div>
          )}
        </div>
      </section>

      {/* Emergency Tips */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold mb-8 text-center">
              While Waiting for Emergency Dental Care
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-xl border">
                <h3 className="font-semibold mb-3">For Toothaches</h3>
                <ul className="text-sm text-muted-foreground space-y-2">
                  <li>Rinse with warm salt water</li>
                  <li>Use over-the-counter pain relief</li>
                  <li>Apply a cold compress</li>
                  <li>Avoid very hot or cold foods</li>
                </ul>
              </div>
              <div className="bg-white p-6 rounded-xl border">
                <h3 className="font-semibold mb-3">For Knocked-Out Teeth</h3>
                <ul className="text-sm text-muted-foreground space-y-2">
                  <li>Handle tooth by the crown only</li>
                  <li>Keep tooth moist in milk or saliva</li>
                  <li>Do not scrub the tooth</li>
                  <li>See a dentist within 30 minutes</li>
                </ul>
              </div>
              <div className="bg-white p-6 rounded-xl border">
                <h3 className="font-semibold mb-3">For Broken Teeth</h3>
                <ul className="text-sm text-muted-foreground space-y-2">
                  <li>Rinse mouth with warm water</li>
                  <li>Apply gauze if bleeding</li>
                  <li>Use cold compress for swelling</li>
                  <li>Save any tooth fragments</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SEO Content */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto prose prose-lg">
            <h2>Emergency Dental Care in {parsed.city}, {stateName}</h2>
            <p>
              When you experience a dental emergency in {parsed.city}, time is critical.
              Whether you&apos;re dealing with a severe toothache, a knocked-out tooth, or a
              dental abscess, our directory helps you find emergency dental care quickly.
            </p>

            <h3>Common Dental Emergencies in {parsed.city}</h3>
            <p>
              Residents of {parsed.city} may experience various dental emergencies that
              require immediate attention:
            </p>
            <ul>
              <li><strong>Severe toothaches</strong> - Indicating possible infection or abscess</li>
              <li><strong>Chipped or broken teeth</strong> - From accidents or sports injuries</li>
              <li><strong>Knocked-out teeth</strong> - Requiring care within 30 minutes for best results</li>
              <li><strong>Lost fillings or crowns</strong> - Causing pain and sensitivity</li>
              <li><strong>Dental abscesses</strong> - Serious infections requiring immediate treatment</li>
            </ul>

            <h3>Finding 24-Hour Dental Care</h3>
            <p>
              Many emergency dentists in {parsed.city}, {parsed.stateAbbr} offer extended hours
              and weekend appointments. Some dental practices have on-call dentists available
              for after-hours emergencies. If you cannot find an available emergency dentist,
              consider calling our helpline at 1-800-DENTIST or visiting a hospital emergency
              room for severe cases.
            </p>

            <div className="not-prose mt-8">
              <Link href="/emergency-dentist">
                <Button variant="outline" size="lg">
                  <ChevronRight className="w-4 h-4 mr-2" />
                  Learn More About Dental Emergencies
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Disclaimer Section */}
      <section className="py-8 bg-gray-100 border-t">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h3 className="font-semibold text-sm text-gray-700 mb-2">Disclaimer</h3>
            <p className="text-xs text-gray-600 leading-relaxed">
              The information provided on this page is for general informational purposes only and is not intended
              as, nor should it be considered, professional medical or dental advice. Always seek the advice of a
              qualified dental professional for any questions regarding a dental emergency or medical condition.
              If you are experiencing a life-threatening emergency, call 911 immediately. 1-800-DENTIST is an
              independent third-party dental referral service and is not affiliated with DentistNearMeNow.com.
              We do not endorse or guarantee the services provided by any dentist or referral service. Response
              times and availability of emergency dental services may vary by location.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
