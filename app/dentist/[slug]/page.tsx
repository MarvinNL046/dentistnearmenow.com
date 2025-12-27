import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';

// ISR: Revalidate every 24 hours
export const revalidate = 86400;
import {
  ChevronRight,
  MapPin,
  Phone,
  Globe,
  Clock,
  Star,
  CheckCircle,
  Users,
  Shield,
  Calendar,
  Navigation
} from 'lucide-react';
import { getDentistBySlug, getAllDentists, getStateByAbbr, getDentistsByCity } from '@/lib/dentist-data';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import DentistImage from '@/components/DentistImage';
import AboutSection from '@/components/AboutSection';
import RelatedDentists from '@/components/RelatedDentists';
import ServiceLinks from '@/components/ServiceLinks';
import QuickGuides from '@/components/QuickGuides';
import NearbyLocations from '@/components/NearbyLocations';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const dentist = await getDentistBySlug(slug);

  if (!dentist) {
    return { title: 'Dentist Not Found' };
  }

  const title = `${dentist.name} - ${dentist.businessType || 'Dentist'} in ${dentist.city}, ${dentist.stateAbbr}`;
  const description = `${dentist.name} is a ${dentist.businessType || 'dental practice'} located in ${dentist.city}, ${dentist.stateAbbr}. ${dentist.rating ? `Rated ${dentist.rating}/5 stars.` : ''} ${dentist.phone ? `Call ${dentist.phone} to schedule an appointment.` : ''}`;

  return {
    title,
    description,
    openGraph: {
      title: dentist.name,
      description,
      type: 'website',
      images: dentist.photo ? [{ url: dentist.photo }] : undefined,
    },
  };
}

// Only pre-generate top 100 dentists by review count for fast initial load
// Rest will be generated on-demand via ISR
export async function generateStaticParams() {
  const dentists = await getAllDentists();

  // Sort by review count (popularity) and take top 100
  const topDentists = dentists
    .filter(d => d.reviewCount && d.reviewCount > 0)
    .sort((a, b) => (b.reviewCount || 0) - (a.reviewCount || 0))
    .slice(0, 100);

  return topDentists.map((dentist) => ({
    slug: dentist.slug,
  }));
}

// JSON-LD Schema for Dentist
function generateJsonLd(dentist: NonNullable<Awaited<ReturnType<typeof getDentistBySlug>>>) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Dentist',
    name: dentist.name,
    '@id': `https://www.dentistnearmenow.com/dentist/${dentist.slug}`,
    url: `https://www.dentistnearmenow.com/dentist/${dentist.slug}`,
    telephone: dentist.phone,
    address: {
      '@type': 'PostalAddress',
      streetAddress: dentist.address,
      addressLocality: dentist.city,
      addressRegion: dentist.stateAbbr,
      postalCode: dentist.zipCode,
      addressCountry: 'US',
    },
    geo: dentist.latitude && dentist.longitude ? {
      '@type': 'GeoCoordinates',
      latitude: dentist.latitude,
      longitude: dentist.longitude,
    } : undefined,
    aggregateRating: dentist.rating ? {
      '@type': 'AggregateRating',
      ratingValue: dentist.rating,
      reviewCount: dentist.reviewCount || 1,
      bestRating: 5,
      worstRating: 1,
    } : undefined,
    image: dentist.photo,
    priceRange: '$$',
    // openingHours is plain text like "Closed · Opens 8 AM", not JSON - skip for schema
    openingHoursSpecification: undefined,
    medicalSpecialty: dentist.specialties?.join(', '),
    availableService: dentist.services?.map(service => ({
      '@type': 'MedicalProcedure',
      name: service,
    })),
    isAcceptingNewPatients: dentist.acceptingNewPatients,
    paymentAccepted: dentist.insuranceAccepted?.join(', '),
    areaServed: {
      '@type': 'City',
      name: dentist.city,
    },
  };

  return JSON.stringify(schema);
}

export default async function DentistPage({ params }: PageProps) {
  const { slug } = await params;
  const dentist = await getDentistBySlug(slug);

  if (!dentist) {
    notFound();
  }

  const state = getStateByAbbr(dentist.stateAbbr);
  const citySlug = `${dentist.city.toLowerCase().replace(/\s+/g, '-')}-${dentist.stateAbbr.toLowerCase()}`;

  // Fetch related dentists from the same city
  const cityDentists = await getDentistsByCity(dentist.city, dentist.stateAbbr);

  // Determine guide context based on services
  const guideContext = dentist.emergencyServices ? 'emergency' :
    dentist.specialties?.some(s => s.toLowerCase().includes('cosmetic')) ? 'cosmetic' :
    dentist.specialties?.some(s => s.toLowerCase().includes('pediatric')) ? 'pediatric' : 'general';

  return (
    <>
      {/* JSON-LD Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: generateJsonLd(dentist) }}
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
              {state && (
                <>
                  <Link href={`/state/${state.slug}`} className="text-muted-foreground hover:text-primary">
                    {state.name}
                  </Link>
                  <ChevronRight className="w-4 h-4 text-muted-foreground" />
                </>
              )}
              <Link href={`/city/${citySlug}`} className="text-muted-foreground hover:text-primary">
                {dentist.city}
              </Link>
              <ChevronRight className="w-4 h-4 text-muted-foreground" />
              <span className="text-foreground">{dentist.name}</span>
            </nav>
          </div>
        </div>

        {/* Main Content */}
        <div className="container mx-auto px-4 py-8">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Left Column - Main Info */}
            <div className="lg:col-span-2 space-y-8">
              {/* Header */}
              <div className="bg-white rounded-xl border p-6">
                <div className="flex flex-col md:flex-row gap-6">
                  {/* Photo */}
                  <div className="w-full md:w-48 h-48 bg-gray-100 rounded-xl flex-shrink-0 overflow-hidden">
                    <DentistImage
                      src={dentist.photo}
                      alt={dentist.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Info */}
                  <div className="flex-1">
                    <div className="flex items-start justify-between gap-4 mb-2">
                      <div>
                        <h1 className="text-2xl md:text-3xl font-bold text-foreground">
                          {dentist.name}
                        </h1>
                        {dentist.businessType && (
                          <p className="text-muted-foreground capitalize mt-1">
                            {dentist.businessType}
                          </p>
                        )}
                      </div>
                      {dentist.isVerified && (
                        <Badge className="bg-green-100 text-green-800">
                          <Shield className="w-3 h-3 mr-1" />
                          Verified
                        </Badge>
                      )}
                    </div>

                    {/* Rating */}
                    {dentist.rating && (
                      <div className="flex items-center gap-2 mb-4">
                        <div className="flex items-center gap-1">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <Star
                              key={star}
                              className={`w-5 h-5 ${
                                star <= Math.round(dentist.rating!)
                                  ? 'text-amber-500 fill-amber-500'
                                  : 'text-gray-300'
                              }`}
                            />
                          ))}
                        </div>
                        <span className="font-semibold">{dentist.rating}</span>
                        {dentist.reviewCount && (
                          <span className="text-muted-foreground">
                            ({dentist.reviewCount} reviews)
                          </span>
                        )}
                      </div>
                    )}

                    {/* Quick Info */}
                    <div className="flex flex-wrap gap-2">
                      {dentist.acceptingNewPatients && (
                        <Badge variant="secondary">
                          <CheckCircle className="w-3 h-3 mr-1" />
                          Accepting New Patients
                        </Badge>
                      )}
                      {dentist.emergencyServices && (
                        <Badge variant="destructive">
                          Emergency Services
                        </Badge>
                      )}
                      {dentist.wheelchairAccessible && (
                        <Badge variant="outline">
                          Wheelchair Accessible
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* About Section */}
              {dentist.description && (
                <AboutSection
                  name={dentist.name}
                  description={dentist.description}
                  maxLength={350}
                />
              )}

              {/* Services */}
              {dentist.services && dentist.services.length > 0 && (
                <div className="bg-white rounded-xl border p-6">
                  <h2 className="text-xl font-semibold mb-4">Services Offered</h2>
                  <div className="grid sm:grid-cols-2 gap-3">
                    {dentist.services.map((service, index) => (
                      <div key={`${service}-${index}`} className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        <span>{service}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Specialties */}
              {dentist.specialties && dentist.specialties.length > 0 && (
                <div className="bg-white rounded-xl border p-6">
                  <h2 className="text-xl font-semibold mb-4">Specialties</h2>
                  <div className="flex flex-wrap gap-2">
                    {dentist.specialties.map((specialty) => (
                      <Badge key={specialty} variant="secondary" className="text-sm">
                        {specialty}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              {/* Insurance */}
              {dentist.insuranceAccepted && dentist.insuranceAccepted.length > 0 && (
                <div className="bg-white rounded-xl border p-6">
                  <h2 className="text-xl font-semibold mb-4">Insurance Accepted</h2>
                  <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-3">
                    {dentist.insuranceAccepted.map((insurance) => (
                      <div key={insurance} className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-primary" />
                        <span className="text-sm">{insurance}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Reviews Section */}
              {dentist.reviews && dentist.reviews.length > 0 && (
                <div className="bg-white rounded-xl border p-6">
                  <h2 className="text-xl font-semibold mb-4">
                    Patient Reviews ({dentist.reviews.length})
                  </h2>
                  <div className="space-y-4">
                    {dentist.reviews.map((review, index) => (
                      <div key={index} className="border-b pb-4 last:border-0 last:pb-0">
                        <div className="flex items-center gap-2 mb-2">
                          <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                            <span className="text-sm font-semibold text-gray-600">
                              {review.reviewerName.charAt(0)}
                            </span>
                          </div>
                          <div>
                            <p className="font-medium">{review.reviewerName}</p>
                            <div className="flex items-center gap-1">
                              {[1, 2, 3, 4, 5].map((star) => (
                                <Star
                                  key={star}
                                  className={`w-3 h-3 ${
                                    star <= review.rating
                                      ? 'text-amber-500 fill-amber-500'
                                      : 'text-gray-300'
                                  }`}
                                />
                              ))}
                              <span className="text-xs text-muted-foreground ml-1">
                                {review.reviewDate}
                              </span>
                            </div>
                          </div>
                        </div>
                        <p className="text-muted-foreground text-sm">{review.reviewText}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Right Column - Sidebar */}
            <div className="space-y-6">
              {/* Contact Card */}
              <div className="bg-white rounded-xl border p-6 sticky top-24">
                <h2 className="text-lg font-semibold mb-4">Contact Information</h2>

                {/* Address */}
                <div className="flex items-start gap-3 mb-4">
                  <MapPin className="w-5 h-5 text-primary mt-0.5" />
                  <div>
                    <p className="font-medium">Address</p>
                    <p className="text-sm text-muted-foreground">
                      {dentist.address && <>{dentist.address}<br /></>}
                      {dentist.city}, {dentist.stateAbbr} {dentist.zipCode}
                    </p>
                  </div>
                </div>

                {/* Phone */}
                {dentist.phone && (
                  <div className="flex items-start gap-3 mb-4">
                    <Phone className="w-5 h-5 text-primary mt-0.5" />
                    <div>
                      <p className="font-medium">Phone</p>
                      <a
                        href={`tel:${dentist.phone}`}
                        className="text-sm text-primary hover:underline"
                      >
                        {dentist.phone}
                      </a>
                    </div>
                  </div>
                )}

                {/* Website */}
                {dentist.website && (
                  <div className="flex items-start gap-3 mb-4">
                    <Globe className="w-5 h-5 text-primary mt-0.5" />
                    <div>
                      <p className="font-medium">Website</p>
                      <a
                        href={dentist.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-primary hover:underline break-all"
                      >
                        Visit Website
                      </a>
                    </div>
                  </div>
                )}

                {/* Hours */}
                {dentist.openingHours && (
                  <div className="flex items-start gap-3 mb-6">
                    <Clock className="w-5 h-5 text-primary mt-0.5" />
                    <div>
                      <p className="font-medium">Hours</p>
                      <p className="text-sm text-muted-foreground">
                        View hours on website
                      </p>
                    </div>
                  </div>
                )}

                {/* CTA Buttons */}
                <div className="space-y-3">
                  {dentist.phone && (
                    <a href={`tel:${dentist.phone}`} className="block">
                      <Button className="w-full" size="lg">
                        <Phone className="w-4 h-4 mr-2" />
                        Call Now
                      </Button>
                    </a>
                  )}
                  {dentist.latitude && dentist.longitude && (
                    <a
                      href={`https://www.google.com/maps/dir/?api=1&destination=${dentist.latitude},${dentist.longitude}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block"
                    >
                      <Button variant="outline" className="w-full" size="lg">
                        <Navigation className="w-4 h-4 mr-2" />
                        Get Directions
                      </Button>
                    </a>
                  )}
                  <Button variant="secondary" className="w-full" size="lg">
                    <Calendar className="w-4 h-4 mr-2" />
                    Request Appointment
                  </Button>
                </div>

                {/* Trust Signals */}
                <div className="mt-6 pt-6 border-t">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Users className="w-4 h-4" />
                    <span>Part of our verified directory</span>
                  </div>
                </div>
              </div>

              {/* Related Services */}
              <div className="bg-white rounded-xl border p-6">
                <ServiceLinks
                  services={dentist.services}
                  specialties={dentist.specialties}
                  emergencyServices={dentist.emergencyServices}
                />
              </div>

              {/* Helpful Guides */}
              <div className="bg-white rounded-xl border p-6">
                <QuickGuides context={guideContext} />
              </div>
            </div>
          </div>
        </div>

        {/* FAQ Section - EEAT */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl font-bold mb-8">Frequently Asked Questions</h2>
              <div className="space-y-4">
                <div className="bg-white rounded-lg p-6">
                  <h3 className="font-semibold mb-2">
                    Is {dentist.name} accepting new patients?
                  </h3>
                  <p className="text-muted-foreground">
                    {dentist.acceptingNewPatients
                      ? `Yes, ${dentist.name} is currently accepting new patients. Contact them directly to schedule your first appointment.`
                      : `Contact ${dentist.name} directly to inquire about new patient availability.`}
                  </p>
                </div>
                <div className="bg-white rounded-lg p-6">
                  <h3 className="font-semibold mb-2">
                    What services does {dentist.name} offer?
                  </h3>
                  <p className="text-muted-foreground">
                    {dentist.services && dentist.services.length > 0
                      ? `${dentist.name} offers ${dentist.services.slice(0, 3).join(', ')}${dentist.services.length > 3 ? ', and more' : ''}.`
                      : `Contact ${dentist.name} for a complete list of dental services offered.`}
                  </p>
                </div>
                <div className="bg-white rounded-lg p-6">
                  <h3 className="font-semibold mb-2">
                    Does {dentist.name} offer emergency dental services?
                  </h3>
                  <p className="text-muted-foreground">
                    {dentist.emergencyServices
                      ? `Yes, ${dentist.name} provides emergency dental services. Call them immediately if you have a dental emergency.`
                      : `Contact ${dentist.name} directly to inquire about emergency dental care availability.`}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Related Dentists in City */}
        {cityDentists.length > 1 && (
          <section className="py-12 bg-white">
            <div className="container mx-auto px-4">
              <RelatedDentists
                dentists={cityDentists}
                currentSlug={dentist.slug}
                city={dentist.city}
                stateAbbr={dentist.stateAbbr}
                limit={3}
              />
            </div>
          </section>
        )}

        {/* Explore State */}
        {state && (
          <section className="py-12 bg-gray-50">
            <div className="container mx-auto px-4">
              <NearbyLocations
                currentCity={dentist.city}
                state={dentist.stateAbbr}
                variant="grid"
                limit={6}
              />
            </div>
          </section>
        )}
      </div>
    </>
  );
}
