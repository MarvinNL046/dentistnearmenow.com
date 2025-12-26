import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ChevronRight, Tag, Shield, Clock, AlertCircle, CreditCard, Baby, Smile, Users, Heart, Sparkles, Languages } from 'lucide-react';
import { getAllDentists, US_STATES, DENTIST_TYPES } from '@/lib/dentist-data';
import DentistCard from '@/components/DentistCard';
import { Button } from '@/components/ui/button';
import type { Dentist } from '@/lib/dentist-data';

// ISR: Revalidate every 24 hours
export const revalidate = 86400;

// Tag definitions with filter functions
interface TagDefinition {
  title: string;
  description: string;
  longDescription: string;
  icon: typeof Tag;
  color: string;
  bgColor: string;
  filter: (d: Dentist) => boolean;
  relatedTags: string[];
}

const tagDefinitions: Record<string, TagDefinition> = {
  'accepts-insurance': {
    title: 'Dentists That Accept Insurance',
    description: 'Find dentists that accept dental insurance plans near you.',
    longDescription: 'Looking for a dentist who accepts your dental insurance? Browse our directory of dental care providers who work with various insurance plans. Many dentists accept major insurance providers including Delta Dental, Cigna, MetLife, Aetna, and more.',
    icon: CreditCard,
    color: 'text-green-600',
    bgColor: 'bg-green-500',
    filter: (d: Dentist) =>
      Boolean(
        (d.insuranceAccepted && d.insuranceAccepted.length > 0) ||
        d.services?.some(s => s.toLowerCase().includes('insurance')) ||
        d.specialties?.some(s => s.toLowerCase().includes('insurance'))
      ),
    relatedTags: ['accepts-new-patients', 'weekend-hours', 'family-friendly'],
  },
  'weekend-hours': {
    title: 'Dentists with Weekend Hours',
    description: 'Find dentists open on weekends for convenient dental care.',
    longDescription: 'Need to see a dentist on Saturday or Sunday? Find dental offices with weekend hours that fit your busy schedule. Weekend dental appointments are perfect for those who cannot take time off during the workweek.',
    icon: Clock,
    color: 'text-blue-600',
    bgColor: 'bg-blue-500',
    filter: (d: Dentist) => {
      if (!d.openingHours) return false;
      const hours = d.openingHours.toLowerCase();
      return hours.includes('saturday') || hours.includes('sunday') || hours.includes('weekend');
    },
    relatedTags: ['emergency-available', 'accepts-new-patients', 'evening-hours'],
  },
  'evening-hours': {
    title: 'Dentists with Evening Hours',
    description: 'Find dentists open in the evening for after-work appointments.',
    longDescription: 'Looking for a dentist open after 5 PM? Many dental offices offer evening appointments to accommodate your work schedule. Find dentists with late hours near you.',
    icon: Clock,
    color: 'text-indigo-600',
    bgColor: 'bg-indigo-500',
    filter: (d: Dentist) => {
      if (!d.openingHours) return false;
      const hours = d.openingHours.toLowerCase();
      // Check for evening hours (after 5pm, 6pm, 7pm, 8pm)
      return hours.includes('pm') && (
        hours.includes('6:') || hours.includes('7:') || hours.includes('8:') ||
        hours.includes('evening') || hours.includes('late')
      );
    },
    relatedTags: ['weekend-hours', 'accepts-new-patients', 'emergency-available'],
  },
  'emergency-available': {
    title: 'Emergency Dentists Available',
    description: 'Find emergency dental care providers for urgent dental needs.',
    longDescription: 'Dental emergencies can happen at any time. Find dentists who offer emergency dental services including same-day appointments for toothaches, broken teeth, lost fillings, and other urgent dental issues.',
    icon: AlertCircle,
    color: 'text-red-600',
    bgColor: 'bg-red-500',
    filter: (d: Dentist) =>
      Boolean(
        d.emergencyServices === true ||
        d.businessType?.toLowerCase().includes('emergency') ||
        d.services?.some(s => s.toLowerCase().includes('emergency')) ||
        d.specialties?.some(s => s.toLowerCase().includes('emergency'))
      ),
    relatedTags: ['weekend-hours', 'same-day-appointments', 'walk-ins-welcome'],
  },
  'accepts-new-patients': {
    title: 'Dentists Accepting New Patients',
    description: 'Find dentists who are currently accepting new patients.',
    longDescription: 'Looking for a new dentist? Browse dental practices that are actively accepting new patients. Whether you are new to the area or looking to switch providers, find a dentist ready to welcome you.',
    icon: Users,
    color: 'text-purple-600',
    bgColor: 'bg-purple-500',
    filter: (d: Dentist) =>
      Boolean(
        d.acceptingNewPatients === true ||
        d.services?.some(s => s.toLowerCase().includes('new patient'))
      ),
    relatedTags: ['accepts-insurance', 'family-friendly', 'weekend-hours'],
  },
  'family-friendly': {
    title: 'Family-Friendly Dentists',
    description: 'Find dentists who welcome patients of all ages.',
    longDescription: 'Looking for a dentist for the whole family? Find family-friendly dental practices that treat patients of all ages, from toddlers to seniors. One convenient location for your entire family\'s dental care.',
    icon: Heart,
    color: 'text-pink-600',
    bgColor: 'bg-pink-500',
    filter: (d: Dentist) =>
      Boolean(
        d.businessType?.toLowerCase().includes('family') ||
        d.services?.some(s =>
          s.toLowerCase().includes('family') ||
          s.toLowerCase().includes('pediatric') ||
          s.toLowerCase().includes('children')
        ) ||
        d.specialties?.some(s =>
          s.toLowerCase().includes('family') ||
          s.toLowerCase().includes('general')
        )
      ),
    relatedTags: ['pediatric-dentistry', 'accepts-new-patients', 'accepts-insurance'],
  },
  'pediatric-dentistry': {
    title: 'Pediatric Dentists for Children',
    description: 'Find specialized dentists for children and adolescents.',
    longDescription: 'Pediatric dentists specialize in caring for children\'s unique dental needs. Find kid-friendly dental offices with a welcoming environment designed to make dental visits fun and stress-free for young patients.',
    icon: Baby,
    color: 'text-orange-600',
    bgColor: 'bg-orange-500',
    filter: (d: Dentist) =>
      Boolean(
        d.businessType?.toLowerCase().includes('pediatric') ||
        d.businessType?.toLowerCase().includes('children') ||
        d.services?.some(s =>
          s.toLowerCase().includes('pediatric') ||
          s.toLowerCase().includes('children') ||
          s.toLowerCase().includes('kids')
        ) ||
        d.specialties?.some(s =>
          s.toLowerCase().includes('pediatric')
        )
      ),
    relatedTags: ['family-friendly', 'anxiety-friendly', 'accepts-new-patients'],
  },
  'anxiety-friendly': {
    title: 'Anxiety-Friendly Dentists',
    description: 'Find dentists who specialize in treating anxious patients.',
    longDescription: 'Dental anxiety is common, but it should not prevent you from getting the care you need. Find compassionate dentists who offer sedation options, gentle techniques, and a calming environment for nervous patients.',
    icon: Heart,
    color: 'text-teal-600',
    bgColor: 'bg-teal-500',
    filter: (d: Dentist) => {
      const anxietyKeywords = ['sedation', 'anxiety', 'nervous', 'anxious', 'gentle', 'comfort', 'relaxation', 'nitrous', 'laughing gas', 'iv sedation', 'oral sedation'];
      const services = d.services?.map(s => s.toLowerCase()) || [];
      const specialties = d.specialties?.map(s => s.toLowerCase()) || [];
      return anxietyKeywords.some(keyword =>
        services.some(s => s.includes(keyword)) ||
        specialties.some(s => s.includes(keyword))
      );
    },
    relatedTags: ['sedation-dentistry', 'family-friendly', 'pediatric-dentistry'],
  },
  'sedation-dentistry': {
    title: 'Sedation Dentistry Options',
    description: 'Find dentists offering sedation for comfortable dental care.',
    longDescription: 'Sedation dentistry helps patients relax during dental procedures. Find dentists who offer various sedation options including nitrous oxide (laughing gas), oral sedation, and IV sedation for a comfortable dental experience.',
    icon: Sparkles,
    color: 'text-cyan-600',
    bgColor: 'bg-cyan-500',
    filter: (d: Dentist) => {
      const sedationKeywords = ['sedation', 'nitrous', 'laughing gas', 'iv sedation', 'oral sedation', 'conscious sedation', 'sleep dentistry'];
      const services = d.services?.map(s => s.toLowerCase()) || [];
      const specialties = d.specialties?.map(s => s.toLowerCase()) || [];
      return sedationKeywords.some(keyword =>
        services.some(s => s.includes(keyword)) ||
        specialties.some(s => s.includes(keyword))
      );
    },
    relatedTags: ['anxiety-friendly', 'cosmetic-dentistry', 'oral-surgery'],
  },
  'cosmetic-dentistry': {
    title: 'Cosmetic Dentistry Services',
    description: 'Find dentists offering cosmetic dental treatments.',
    longDescription: 'Transform your smile with cosmetic dentistry. Find dentists offering teeth whitening, veneers, dental bonding, smile makeovers, and other aesthetic dental treatments to give you the smile you have always wanted.',
    icon: Smile,
    color: 'text-violet-600',
    bgColor: 'bg-violet-500',
    filter: (d: Dentist) =>
      Boolean(
        d.businessType?.toLowerCase().includes('cosmetic') ||
        d.services?.some(s =>
          s.toLowerCase().includes('cosmetic') ||
          s.toLowerCase().includes('whitening') ||
          s.toLowerCase().includes('veneer') ||
          s.toLowerCase().includes('bonding') ||
          s.toLowerCase().includes('smile makeover')
        ) ||
        d.specialties?.some(s =>
          s.toLowerCase().includes('cosmetic')
        )
      ),
    relatedTags: ['teeth-whitening', 'veneers', 'invisalign'],
  },
  'teeth-whitening': {
    title: 'Teeth Whitening Services',
    description: 'Find dentists offering professional teeth whitening.',
    longDescription: 'Get a brighter, whiter smile with professional teeth whitening. Find dentists who offer in-office whitening treatments and take-home whitening kits for effective, lasting results.',
    icon: Sparkles,
    color: 'text-yellow-600',
    bgColor: 'bg-yellow-500',
    filter: (d: Dentist) =>
      Boolean(
        d.services?.some(s =>
          s.toLowerCase().includes('whitening') ||
          s.toLowerCase().includes('bleaching')
        ) ||
        d.specialties?.some(s =>
          s.toLowerCase().includes('whitening')
        )
      ),
    relatedTags: ['cosmetic-dentistry', 'veneers', 'smile-makeover'],
  },
  'spanish-speaking': {
    title: 'Spanish-Speaking Dentists',
    description: 'Find dentists who speak Spanish for better communication.',
    longDescription: 'Find dental care providers who speak Spanish fluently. Communicate comfortably about your dental health with Spanish-speaking dentists and staff who understand your language and cultural needs.',
    icon: Languages,
    color: 'text-amber-600',
    bgColor: 'bg-amber-500',
    filter: (d: Dentist) =>
      Boolean(
        d.languages?.some(l => l.toLowerCase().includes('spanish')) ||
        d.services?.some(s => s.toLowerCase().includes('spanish')) ||
        d.specialties?.some(s => s.toLowerCase().includes('spanish'))
      ),
    relatedTags: ['accepts-new-patients', 'family-friendly', 'accepts-insurance'],
  },
  'same-day-appointments': {
    title: 'Same-Day Dental Appointments',
    description: 'Find dentists offering same-day appointments for urgent care.',
    longDescription: 'Need to see a dentist today? Find dental practices that offer same-day appointments for urgent dental needs. Do not wait days for relief from tooth pain or other dental issues.',
    icon: Clock,
    color: 'text-emerald-600',
    bgColor: 'bg-emerald-500',
    filter: (d: Dentist) =>
      Boolean(
        d.services?.some(s =>
          s.toLowerCase().includes('same day') ||
          s.toLowerCase().includes('same-day') ||
          s.toLowerCase().includes('walk-in') ||
          s.toLowerCase().includes('urgent')
        ) ||
        d.emergencyServices === true
      ),
    relatedTags: ['emergency-available', 'walk-ins-welcome', 'weekend-hours'],
  },
  'walk-ins-welcome': {
    title: 'Walk-In Dentists',
    description: 'Find dentists that accept walk-in patients without appointments.',
    longDescription: 'Some dental offices welcome walk-in patients for immediate care. Find dentists near you who accept patients without prior appointments for your convenience.',
    icon: Users,
    color: 'text-lime-600',
    bgColor: 'bg-lime-500',
    filter: (d: Dentist) =>
      Boolean(
        d.services?.some(s =>
          s.toLowerCase().includes('walk-in') ||
          s.toLowerCase().includes('walk in') ||
          s.toLowerCase().includes('no appointment')
        )
      ),
    relatedTags: ['same-day-appointments', 'emergency-available', 'accepts-new-patients'],
  },
  'wheelchair-accessible': {
    title: 'Wheelchair Accessible Dentists',
    description: 'Find dental offices with wheelchair accessibility.',
    longDescription: 'Find dental practices that are fully wheelchair accessible. These offices have ramps, accessible entrances, and facilities designed to accommodate patients with mobility challenges.',
    icon: Shield,
    color: 'text-sky-600',
    bgColor: 'bg-sky-500',
    filter: (d: Dentist) =>
      Boolean(
        d.wheelchairAccessible === true ||
        d.services?.some(s =>
          s.toLowerCase().includes('wheelchair') ||
          s.toLowerCase().includes('accessible') ||
          s.toLowerCase().includes('ada')
        )
      ),
    relatedTags: ['accepts-new-patients', 'family-friendly', 'accepts-insurance'],
  },
};

interface PageProps {
  params: Promise<{ tag: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { tag } = await params;
  const tagDef = tagDefinitions[tag];

  if (!tagDef) {
    return { title: 'Tag Not Found' };
  }

  return {
    title: `${tagDef.title} | DentistNearMeNow`,
    description: tagDef.description,
    robots: {
      index: false,  // NOINDEX
      follow: true,  // DOFOLLOW - links pass equity
    },
    openGraph: {
      title: tagDef.title,
      description: tagDef.description,
    },
  };
}

export function generateStaticParams() {
  return Object.keys(tagDefinitions).map((tag) => ({ tag }));
}

export default async function TagPage({ params }: PageProps) {
  const { tag } = await params;
  const tagDef = tagDefinitions[tag];

  if (!tagDef) {
    notFound();
  }

  // Get all dentists and filter by tag
  const allDentists = await getAllDentists();
  const filteredDentists = allDentists.filter(tagDef.filter);
  const Icon = tagDef.icon;

  // Get related tags that exist
  const relatedTagsData = tagDef.relatedTags
    .filter(t => tagDefinitions[t])
    .map(t => ({
      slug: t,
      ...tagDefinitions[t],
    }));

  // Get sample states and services for internal linking
  const statesWithDentists = [...new Set(filteredDentists.map(d => d.state).filter(Boolean))].slice(0, 8);
  const topServices = DENTIST_TYPES.slice(0, 6);

  return (
    <div className="bg-background min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary to-primary/80 text-white py-16">
        <div className="container mx-auto px-4">
          {/* Breadcrumbs */}
          <nav className="flex items-center gap-2 text-white/80 mb-6 text-sm flex-wrap">
            <Link href="/" className="hover:text-white">Home</Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-white">{tagDef.title}</span>
          </nav>

          <div className="flex items-start gap-6">
            <div className={`w-20 h-20 ${tagDef.bgColor} rounded-2xl flex items-center justify-center flex-shrink-0 hidden md:flex`}>
              <Icon className="w-10 h-10 text-white" />
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
                {tagDef.title}
              </h1>
              <p className="text-lg md:text-xl text-white/90 max-w-3xl">
                {tagDef.longDescription}
              </p>
              <div className="flex flex-wrap gap-4 mt-6">
                <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-lg">
                  <Users className="w-4 h-4" />
                  <span>{filteredDentists.length} Dentists Found</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <aside className="lg:col-span-1 space-y-6">
            {/* Related Tags */}
            {relatedTagsData.length > 0 && (
              <div className="bg-white rounded-xl border p-6">
                <h2 className="font-semibold text-lg mb-4">Related Searches</h2>
                <ul className="space-y-2">
                  {relatedTagsData.map((relatedTag) => {
                    const RelatedIcon = relatedTag.icon;
                    return (
                      <li key={relatedTag.slug}>
                        <Link
                          href={`/tag/${relatedTag.slug}`}
                          className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
                        >
                          <RelatedIcon className={`w-4 h-4 ${relatedTag.color}`} />
                          {relatedTag.title.replace(' Dentists', '').replace(' Dental', '')}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>
            )}

            {/* Browse by State */}
            {statesWithDentists.length > 0 && (
              <div className="bg-white rounded-xl border p-6">
                <h2 className="font-semibold text-lg mb-4">Browse by State</h2>
                <ul className="space-y-2">
                  {statesWithDentists.map((stateName) => {
                    const stateData = US_STATES.find(s => s.name === stateName);
                    if (!stateData) return null;
                    return (
                      <li key={stateName}>
                        <Link
                          href={`/state/${stateData.slug}`}
                          className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
                        >
                          <ChevronRight className="w-4 h-4" />
                          {stateName}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
                <Link href="/state" className="block mt-4">
                  <Button variant="outline" size="sm" className="w-full">
                    View All States
                  </Button>
                </Link>
              </div>
            )}

            {/* Browse by Service */}
            <div className="bg-white rounded-xl border p-6">
              <h2 className="font-semibold text-lg mb-4">Browse by Service</h2>
              <ul className="space-y-2">
                {topServices.map((service) => (
                  <li key={service.slug}>
                    <Link
                      href={`/services/${service.slug}`}
                      className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
                    >
                      <ChevronRight className="w-4 h-4" />
                      {service.name}
                    </Link>
                  </li>
                ))}
              </ul>
              <Link href="/services" className="block mt-4">
                <Button variant="outline" size="sm" className="w-full">
                  View All Services
                </Button>
              </Link>
            </div>

            {/* All Tags */}
            <div className="bg-white rounded-xl border p-6">
              <h2 className="font-semibold text-lg mb-4">All Tags</h2>
              <div className="flex flex-wrap gap-2">
                {Object.entries(tagDefinitions).map(([tagSlug, tagData]) => (
                  <Link
                    key={tagSlug}
                    href={`/tag/${tagSlug}`}
                    className={`text-xs px-2 py-1 rounded-full transition-colors ${
                      tagSlug === tag
                        ? `${tagData.bgColor} text-white`
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    {tagData.title.replace(' Dentists', '').replace(' Dental', '').split(' ').slice(0, 2).join(' ')}
                  </Link>
                ))}
              </div>
            </div>
          </aside>

          {/* Main Content - Dentist List */}
          <main className="lg:col-span-3">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold">
                Dentists
              </h2>
              <p className="text-muted-foreground">{filteredDentists.length} results</p>
            </div>

            {filteredDentists.length > 0 ? (
              <div className="space-y-4">
                {filteredDentists.slice(0, 24).map((dentist) => (
                  <DentistCard key={dentist.id} dentist={dentist} />
                ))}
                {filteredDentists.length > 24 && (
                  <div className="text-center py-6">
                    <Link href="/search">
                      <Button variant="outline" size="lg">
                        Search All Dentists
                        <ChevronRight className="w-4 h-4 ml-2" />
                      </Button>
                    </Link>
                  </div>
                )}
              </div>
            ) : (
              <div className="bg-gray-50 rounded-xl p-12 text-center">
                <div className={`w-16 h-16 ${tagDef.bgColor}/10 rounded-full flex items-center justify-center mx-auto mb-4`}>
                  <Icon className={`w-8 h-8 ${tagDef.color}`} />
                </div>
                <h3 className="text-xl font-semibold mb-2">No Dentists Found</h3>
                <p className="text-muted-foreground max-w-md mx-auto mb-6">
                  We could not find any dentists matching this criteria yet.
                  Try browsing by location or service type instead.
                </p>
                <div className="flex flex-wrap justify-center gap-4">
                  <Link href="/search">
                    <Button>Search All Dentists</Button>
                  </Link>
                  <Link href="/state">
                    <Button variant="outline">Browse by State</Button>
                  </Link>
                </div>
              </div>
            )}
          </main>
        </div>
      </div>

      {/* SEO Content Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto prose prose-lg">
            <h2>About {tagDef.title.replace('Dentists', 'Dental Care').replace('Dentistry', 'Dental Care')}</h2>
            <p>{tagDef.longDescription}</p>

            <h3>Why This Matters</h3>
            <p>
              Finding the right dentist involves more than just location. Whether you need
              specific services, scheduling flexibility, or special accommodations, our
              directory helps you find dentists who match your unique requirements.
            </p>

            <h3>How to Choose the Right Dentist</h3>
            <p>
              When selecting a dental provider, consider factors like their experience,
              patient reviews, accepted insurance plans, and office amenities. Reading
              reviews from other patients can provide valuable insights into the quality
              of care and overall patient experience.
            </p>

            <div className="not-prose mt-8 flex flex-wrap gap-4">
              <Link href="/search">
                <Button variant="outline" size="lg">
                  Search All Dentists
                  <ChevronRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
              <Link href="/guides">
                <Button variant="outline" size="lg">
                  Dental Care Guides
                  <ChevronRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
