import { Metadata } from 'next';
import Link from 'next/link';
import { MapPin, ChevronRight } from 'lucide-react';
import { US_STATES } from '@/lib/dentist-data';

export const metadata: Metadata = {
  title: 'Find Dentists by State - All 50 US States',
  description: 'Browse dentists in all 50 US states. Find dental clinics, orthodontists, and dental specialists near you. Select your state to find local dental care.',
};

// Group states by region
const regions = {
  Northeast: ['CT', 'DE', 'ME', 'MD', 'MA', 'NH', 'NJ', 'NY', 'PA', 'RI', 'VT', 'DC'],
  Southeast: ['AL', 'FL', 'GA', 'KY', 'NC', 'SC', 'TN', 'VA', 'WV'],
  Midwest: ['IL', 'IN', 'IA', 'KS', 'MI', 'MN', 'MO', 'NE', 'ND', 'OH', 'SD', 'WI'],
  Southwest: ['AZ', 'NM', 'OK', 'TX'],
  West: ['AK', 'CA', 'CO', 'HI', 'ID', 'MT', 'NV', 'OR', 'UT', 'WA', 'WY'],
  South: ['AR', 'LA', 'MS'],
};

export default function StatesPage() {
  const statesByRegion = Object.entries(regions).map(([region, abbrs]) => ({
    region,
    states: US_STATES.filter(s => abbrs.includes(s.abbr)),
  }));

  return (
    <div className="bg-background">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary to-primary/80 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            <div className="flex items-center gap-2 text-white/80 mb-4">
              <Link href="/" className="hover:text-white">Home</Link>
              <ChevronRight className="w-4 h-4" />
              <span>States</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Find Dentists by State
            </h1>
            <p className="text-xl text-white/90">
              Browse dental professionals across all 50 US states. Select your state below to find
              dentists, orthodontists, and dental specialists in your area.
            </p>
          </div>
        </div>
      </section>

      {/* States Grid by Region */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          {statesByRegion.map(({ region, states }) => (
            <div key={region} className="mb-12">
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <MapPin className="w-6 h-6 text-primary" />
                {region}
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                {states.map((state) => (
                  <Link
                    key={state.abbr}
                    href={`/state/${state.slug}`}
                    className="group p-4 bg-white rounded-xl border hover:border-primary hover:shadow-lg transition-all"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-semibold text-foreground group-hover:text-primary transition-colors">
                          {state.name}
                        </p>
                        <p className="text-sm text-muted-foreground">{state.abbr}</p>
                      </div>
                      <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SEO Content */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto prose prose-lg">
            <h2>Finding Dental Care Across the United States</h2>
            <p>
              Whether you&apos;re looking for a family dentist, cosmetic dentist, orthodontist, or emergency
              dental care, our comprehensive directory helps you find trusted dental professionals
              in every state across America.
            </p>
            <h3>Types of Dental Professionals</h3>
            <ul>
              <li><strong>General Dentists</strong> - Provide routine dental care including cleanings, fillings, and preventive treatments.</li>
              <li><strong>Orthodontists</strong> - Specialize in teeth alignment, braces, and Invisalign treatments.</li>
              <li><strong>Oral Surgeons</strong> - Perform extractions, dental implants, and jaw surgery.</li>
              <li><strong>Pediatric Dentists</strong> - Provide specialized care for children and adolescents.</li>
              <li><strong>Periodontists</strong> - Focus on gum disease treatment and dental implants.</li>
              <li><strong>Endodontists</strong> - Specialize in root canal treatments.</li>
            </ul>
            <h3>How to Choose the Right Dentist</h3>
            <p>
              When selecting a dentist, consider factors such as location, office hours, accepted insurance,
              patient reviews, and the specific services offered. Many dental offices now offer extended
              hours and weekend appointments to accommodate busy schedules.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
