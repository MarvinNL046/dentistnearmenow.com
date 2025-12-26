import { Metadata } from 'next';
import Link from 'next/link';
import { ChevronRight, MapPin, Stethoscope, BookOpen, AlertCircle, Building2 } from 'lucide-react';
import { US_STATES, DENTIST_TYPES } from '@/lib/dentist-data';

export const metadata: Metadata = {
  title: 'Sitemap | Dentist Near Me Now',
  description: 'Browse all pages on Dentist Near Me Now. Find dentists by state, explore dental services, read guides, and more.',
};

const guides = [
  { slug: 'finding-right-dentist', title: 'How to Choose the Right Dentist' },
  { slug: 'dental-insurance', title: 'Understanding Dental Insurance' },
  { slug: 'dental-health-tips', title: 'Daily Dental Care Tips' },
  { slug: 'dental-anxiety', title: 'Overcoming Dental Anxiety' },
  { slug: 'cosmetic-dentistry', title: 'Guide to Cosmetic Dentistry' },
  { slug: 'pediatric-dental-care', title: 'Dental Care for Children' },
  { slug: 'dental-emergencies', title: 'Handling Dental Emergencies' },
  { slug: 'oral-health-conditions', title: 'Common Oral Health Conditions' },
  { slug: 'dental-procedures', title: 'Common Dental Procedures Explained' },
];

export default function SitemapPage() {
  return (
    <div className="bg-background min-h-screen">
      {/* Header */}
      <section className="bg-gradient-to-br from-primary to-primary/80 text-white py-12">
        <div className="container mx-auto px-4">
          <nav className="flex items-center gap-2 text-sm text-white/80 mb-4">
            <Link href="/" className="hover:text-white">Home</Link>
            <ChevronRight className="h-4 w-4" />
            <span className="text-white">Sitemap</span>
          </nav>
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Sitemap</h1>
          <p className="text-lg text-white/90 max-w-2xl">
            Browse all pages on Dentist Near Me Now. Find the information you need quickly.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

            {/* Main Pages */}
            <div className="bg-white rounded-xl shadow-sm border p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <Building2 className="h-5 w-5 text-primary" />
                </div>
                <h2 className="text-xl font-semibold">Main Pages</h2>
              </div>
              <ul className="space-y-2">
                <li>
                  <Link href="/" className="text-muted-foreground hover:text-primary flex items-center gap-2">
                    <ChevronRight className="h-4 w-4" /> Home
                  </Link>
                </li>
                <li>
                  <Link href="/search" className="text-muted-foreground hover:text-primary flex items-center gap-2">
                    <ChevronRight className="h-4 w-4" /> Search Dentists
                  </Link>
                </li>
                <li>
                  <Link href="/emergency-dentist" className="text-muted-foreground hover:text-primary flex items-center gap-2">
                    <ChevronRight className="h-4 w-4" /> Emergency Dentist
                  </Link>
                </li>
                <li>
                  <Link href="/about" className="text-muted-foreground hover:text-primary flex items-center gap-2">
                    <ChevronRight className="h-4 w-4" /> About Us
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="text-muted-foreground hover:text-primary flex items-center gap-2">
                    <ChevronRight className="h-4 w-4" /> Contact
                  </Link>
                </li>
                <li>
                  <Link href="/faq" className="text-muted-foreground hover:text-primary flex items-center gap-2">
                    <ChevronRight className="h-4 w-4" /> FAQ
                  </Link>
                </li>
                <li>
                  <Link href="/for-dentists" className="text-muted-foreground hover:text-primary flex items-center gap-2">
                    <ChevronRight className="h-4 w-4" /> For Dentists
                  </Link>
                </li>
                <li>
                  <Link href="/privacy" className="text-muted-foreground hover:text-primary flex items-center gap-2">
                    <ChevronRight className="h-4 w-4" /> Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="/terms" className="text-muted-foreground hover:text-primary flex items-center gap-2">
                    <ChevronRight className="h-4 w-4" /> Terms of Service
                  </Link>
                </li>
              </ul>
            </div>

            {/* Dental Services */}
            <div className="bg-white rounded-xl shadow-sm border p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Stethoscope className="h-5 w-5 text-blue-600" />
                </div>
                <h2 className="text-xl font-semibold">Dental Services</h2>
              </div>
              <ul className="space-y-2">
                <li>
                  <Link href="/services" className="text-muted-foreground hover:text-primary flex items-center gap-2 font-medium">
                    <ChevronRight className="h-4 w-4" /> All Services
                  </Link>
                </li>
                {DENTIST_TYPES.map((type) => (
                  <li key={type.slug}>
                    <Link
                      href={`/services/${type.slug}`}
                      className="text-muted-foreground hover:text-primary flex items-center gap-2"
                    >
                      <ChevronRight className="h-4 w-4" /> {type.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Dental Guides */}
            <div className="bg-white rounded-xl shadow-sm border p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-green-100 rounded-lg">
                  <BookOpen className="h-5 w-5 text-green-600" />
                </div>
                <h2 className="text-xl font-semibold">Dental Guides</h2>
              </div>
              <ul className="space-y-2">
                <li>
                  <Link href="/guides" className="text-muted-foreground hover:text-primary flex items-center gap-2 font-medium">
                    <ChevronRight className="h-4 w-4" /> All Guides
                  </Link>
                </li>
                {guides.map((guide) => (
                  <li key={guide.slug}>
                    <Link
                      href={`/guides/${guide.slug}`}
                      className="text-muted-foreground hover:text-primary flex items-center gap-2"
                    >
                      <ChevronRight className="h-4 w-4" /> {guide.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Browse by State - Full Width */}
            <div className="bg-white rounded-xl shadow-sm border p-6 md:col-span-2 lg:col-span-3">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-amber-100 rounded-lg">
                  <MapPin className="h-5 w-5 text-amber-600" />
                </div>
                <h2 className="text-xl font-semibold">Browse by State</h2>
              </div>
              <div className="mb-4">
                <Link href="/state" className="text-primary hover:underline font-medium">
                  View All States →
                </Link>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2">
                {US_STATES.map((state) => (
                  <Link
                    key={state.abbr}
                    href={`/state/${state.slug}`}
                    className="text-sm text-muted-foreground hover:text-primary"
                  >
                    {state.name}
                  </Link>
                ))}
              </div>
            </div>

            {/* Emergency */}
            <div className="bg-white rounded-xl shadow-sm border p-6 lg:col-span-3">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-red-100 rounded-lg">
                  <AlertCircle className="h-5 w-5 text-red-600" />
                </div>
                <h2 className="text-xl font-semibold">Emergency Dental Care</h2>
              </div>
              <p className="text-muted-foreground mb-4">
                Need immediate dental care? Find emergency dentists available 24/7 in your area.
              </p>
              <Link
                href="/emergency-dentist"
                className="inline-flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
              >
                Find Emergency Dentist <ChevronRight className="h-4 w-4" />
              </Link>
            </div>

          </div>

          {/* XML Sitemap Link */}
          <div className="mt-8 text-center text-sm text-muted-foreground">
            <p>
              Looking for the XML sitemap for search engines?{' '}
              <a href="/sitemap.xml" className="text-primary hover:underline">
                View sitemap.xml
              </a>
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
