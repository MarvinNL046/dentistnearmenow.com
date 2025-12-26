import Link from 'next/link';
import { Metadata } from 'next';
import { Search, MapPin, Clock, Phone, Star, Shield, CheckCircle, Users, Award, AlertTriangle, ChevronRight, Heart, Stethoscope } from 'lucide-react';
import { US_STATES } from '@/lib/dentist-data';
import { Button } from '@/components/ui/button';

const dentalServices = [
  { slug: 'general-dentist', name: 'General Dentistry', icon: '🦷', description: 'Routine checkups, cleanings, and preventive care' },
  { slug: 'cosmetic-dentist', name: 'Cosmetic Dentistry', icon: '✨', description: 'Teeth whitening, veneers, and smile makeovers' },
  { slug: 'orthodontist', name: 'Orthodontics', icon: '😁', description: 'Braces, Invisalign, and teeth alignment' },
  { slug: 'emergency-dentist', name: 'Emergency Care', icon: '🚨', description: '24/7 emergency dental services' },
  { slug: 'pediatric-dentist', name: 'Pediatric Dentistry', icon: '👶', description: 'Specialized care for children' },
  { slug: 'oral-surgeon', name: 'Oral Surgery', icon: '🏥', description: 'Extractions, implants, and surgical procedures' },
  { slug: 'periodontist', name: 'Periodontics', icon: '🩺', description: 'Gum disease treatment and prevention' },
  { slug: 'endodontist', name: 'Endodontics', icon: '💉', description: 'Root canals and dental pain relief' },
];

export const metadata: Metadata = {
  title: 'Find a Dentist Near You - DentistNearMeNow.com',
  description: 'Search thousands of trusted dentists, dental clinics, and specialists across all 50 US states. Find reviews, contact information, and book appointments today.',
  keywords: 'dentist near me, find a dentist, dental clinic, emergency dentist, dental care, dental directory',
  openGraph: {
    title: 'Find a Dentist Near You - DentistNearMeNow.com',
    description: 'Search thousands of trusted dentists across all 50 US states. Find reviews, contact info, and book appointments.',
    type: 'website',
  },
};

const popularCities = [
  { name: 'New York', state: 'NY', slug: 'new-york-ny' },
  { name: 'Los Angeles', state: 'CA', slug: 'los-angeles-ca' },
  { name: 'Chicago', state: 'IL', slug: 'chicago-il' },
  { name: 'Houston', state: 'TX', slug: 'houston-tx' },
  { name: 'Phoenix', state: 'AZ', slug: 'phoenix-az' },
  { name: 'Philadelphia', state: 'PA', slug: 'philadelphia-pa' },
  { name: 'San Antonio', state: 'TX', slug: 'san-antonio-tx' },
  { name: 'San Diego', state: 'CA', slug: 'san-diego-ca' },
  { name: 'Dallas', state: 'TX', slug: 'dallas-tx' },
  { name: 'San Jose', state: 'CA', slug: 'san-jose-ca' },
  { name: 'Austin', state: 'TX', slug: 'austin-tx' },
  { name: 'Jacksonville', state: 'FL', slug: 'jacksonville-fl' },
];

const trustIndicators = [
  { icon: Shield, title: 'Verified Listings', description: 'All dentists are verified and licensed professionals' },
  { icon: Star, title: 'Real Reviews', description: 'Authentic patient reviews and ratings from Google' },
  { icon: Clock, title: 'Updated Info', description: 'Contact details and hours regularly verified' },
  { icon: CheckCircle, title: 'Free to Use', description: 'Search and contact dentists at no cost' },
];

export default function HomePage() {
  // Group states by region for display
  const featuredStates = US_STATES.slice(0, 12);

  return (
    <div className="bg-background">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary via-primary to-primary/80 text-white py-16 lg:py-24">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />
        <div className="container mx-auto px-4 relative">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-white/10 rounded-full px-4 py-2 mb-6">
              <Stethoscope className="w-4 h-4" />
              <span className="text-sm font-medium">Trusted by thousands of patients nationwide</span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              Find a <span className="text-accent">Dentist</span> Near You
            </h1>
            <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-2xl mx-auto">
              Search thousands of dentists, dental clinics, and specialists across all 50 states.
              Read reviews and find the perfect dental care provider.
            </p>

            {/* Search Box */}
            <form action="/search" method="GET" className="max-w-2xl mx-auto">
              <div className="bg-white rounded-2xl p-2 shadow-2xl">
                <div className="flex flex-col md:flex-row gap-2">
                  <div className="relative flex-1">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      name="q"
                      placeholder="Search by city, state, or dentist name..."
                      className="w-full pl-12 pr-4 py-4 text-gray-800 rounded-xl border-0 focus:ring-2 focus:ring-primary/20 outline-none text-lg"
                    />
                  </div>
                  <Button type="submit" size="lg" className="bg-accent hover:bg-accent/90 text-white px-8 py-4 rounded-xl font-semibold text-lg">
                    Find Dentists
                  </Button>
                </div>
              </div>
            </form>

            {/* Quick Links */}
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Link href="/emergency-dentist" className="inline-flex items-center gap-2 bg-red-500/20 hover:bg-red-500/30 text-white px-4 py-2 rounded-full transition-colors">
                <AlertTriangle className="w-4 h-4" />
                <span>Emergency Dentist</span>
              </Link>
              <Link href="/state" className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-full transition-colors">
                <MapPin className="w-4 h-4" />
                <span>Browse by State</span>
              </Link>
              <Link href="/guides" className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-full transition-colors">
                <Heart className="w-4 h-4" />
                <span>Dental Guides</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-secondary border-b">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-primary mb-2">50</div>
              <div className="text-muted-foreground">States Covered</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-primary mb-2">3,200+</div>
              <div className="text-muted-foreground">Cities</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-primary mb-2">1000s</div>
              <div className="text-muted-foreground">Dentists</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-primary mb-2">Free</div>
              <div className="text-muted-foreground">To Use</div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Indicators */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {trustIndicators.map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.title} className="flex items-start gap-4 p-6 bg-white rounded-xl border">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">{item.title}</h3>
                    <p className="text-muted-foreground text-sm">{item.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Dental Services */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Find the Right Dental Care</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Whether you need a routine cleaning or specialized treatment, we help you find the perfect dentist for your needs.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {dentalServices.map((service) => (
              <Link
                key={service.slug}
                href={`/search?type=${service.slug}`}
                className="group bg-white p-6 rounded-xl border hover:shadow-lg hover:border-primary transition-all"
              >
                <div className="text-4xl mb-4">{service.icon}</div>
                <h3 className="font-semibold text-lg mb-2 group-hover:text-primary transition-colors">
                  {service.name}
                </h3>
                <p className="text-muted-foreground text-sm">{service.description}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Emergency CTA */}
      <section className="py-12 bg-red-50 border-y border-red-100">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-red-500 rounded-full flex items-center justify-center flex-shrink-0">
                <Phone className="w-7 h-7 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-red-900">Dental Emergency?</h3>
                <p className="text-red-700">Find 24/7 emergency dental care near you right now</p>
              </div>
            </div>
            <Link href="/emergency-dentist">
              <Button size="lg" className="bg-red-500 hover:bg-red-600 text-white">
                <AlertTriangle className="w-5 h-5 mr-2" />
                Find Emergency Dentist
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Browse by State */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold mb-2">Browse Dentists by State</h2>
              <p className="text-muted-foreground">Find dental care providers in your state</p>
            </div>
            <Link href="/state" className="hidden md:flex items-center gap-2 text-primary hover:underline">
              View All States <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
            {featuredStates.map((state) => (
              <Link
                key={state.slug}
                href={`/state/${state.slug}`}
                className="p-4 bg-white rounded-lg border hover:border-primary hover:shadow-md transition-all group"
              >
                <div className="flex items-center gap-3">
                  <MapPin className="w-5 h-5 text-primary" />
                  <div>
                    <div className="font-medium group-hover:text-primary transition-colors">{state.name}</div>
                    <div className="text-xs text-muted-foreground">{state.abbr}</div>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <div className="mt-6 text-center md:hidden">
            <Link href="/state" className="inline-flex items-center gap-2 text-primary hover:underline">
              View All 50 States <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Popular Cities */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Popular Cities</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Explore dental care providers in the most searched cities across America
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {popularCities.map((city) => (
              <Link
                key={city.slug}
                href={`/city/${city.slug}`}
                className="flex items-center justify-between p-4 bg-white rounded-lg border hover:border-primary hover:shadow-md transition-all group"
              >
                <div>
                  <div className="font-medium group-hover:text-primary transition-colors">{city.name}</div>
                  <div className="text-sm text-muted-foreground">{city.state}</div>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-primary transition-colors" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us - EEAT Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Why Choose DentistNearMeNow?</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                We&apos;re committed to helping you find trusted dental care providers in your community
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="flex gap-4">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <CheckCircle className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">Comprehensive Directory</h3>
                  <p className="text-muted-foreground">
                    Access thousands of dental professionals across all 50 states, from general dentists to specialists.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Users className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">Real Patient Reviews</h3>
                  <p className="text-muted-foreground">
                    Read authentic reviews from real patients to make informed decisions about your dental care.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Award className="w-6 h-6 text-purple-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">Verified Information</h3>
                  <p className="text-muted-foreground">
                    All listings include verified contact details, office hours, and services offered.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Clock className="w-6 h-6 text-orange-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">24/7 Emergency Access</h3>
                  <p className="text-muted-foreground">
                    Find emergency dental care when you need it most, with our dedicated emergency dentist finder.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Dental Guides Preview */}
      <section className="py-16 bg-secondary">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold mb-2">Dental Health Guides</h2>
              <p className="text-muted-foreground">Expert advice for maintaining a healthy smile</p>
            </div>
            <Link href="/guides" className="hidden md:flex items-center gap-2 text-primary hover:underline">
              View All Guides <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <Link href="/guides/finding-right-dentist" className="group bg-white p-6 rounded-xl border hover:shadow-lg transition-all">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <Users className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-semibold text-lg mb-2 group-hover:text-primary transition-colors">
                How to Choose the Right Dentist
              </h3>
              <p className="text-muted-foreground text-sm">
                Learn what to look for when selecting a dentist, from credentials to patient reviews.
              </p>
            </Link>

            <Link href="/guides/dental-emergencies" className="group bg-white p-6 rounded-xl border hover:shadow-lg transition-all">
              <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mb-4">
                <AlertTriangle className="w-6 h-6 text-red-600" />
              </div>
              <h3 className="font-semibold text-lg mb-2 group-hover:text-primary transition-colors">
                Handling Dental Emergencies
              </h3>
              <p className="text-muted-foreground text-sm">
                What to do in common dental emergencies and when to seek immediate care.
              </p>
            </Link>

            <Link href="/guides/dental-insurance" className="group bg-white p-6 rounded-xl border hover:shadow-lg transition-all">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                <Shield className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="font-semibold text-lg mb-2 group-hover:text-primary transition-colors">
                Understanding Dental Insurance
              </h3>
              <p className="text-muted-foreground text-sm">
                A complete guide to dental insurance plans, coverage options, and maximizing benefits.
              </p>
            </Link>
          </div>

          <div className="mt-6 text-center md:hidden">
            <Link href="/guides" className="inline-flex items-center gap-2 text-primary hover:underline">
              View All Guides <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 bg-gradient-to-br from-primary to-primary/80 text-white">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto">
            <Stethoscope className="w-16 h-16 mx-auto mb-6 opacity-80" />
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to Find Your Perfect Dentist?
            </h2>
            <p className="text-white/90 mb-8 text-lg max-w-2xl mx-auto">
              Join thousands of patients who have found trusted dental care through our directory.
              Start your search today and take the first step toward a healthier smile.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/search">
                <Button size="lg" className="bg-white text-primary hover:bg-gray-100 w-full sm:w-auto">
                  <Search className="w-5 h-5 mr-2" />
                  Search Dentists
                </Button>
              </Link>
              <Link href="/state">
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 w-full sm:w-auto">
                  <MapPin className="w-5 h-5 mr-2" />
                  Browse by State
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* SEO Content Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto prose prose-gray">
            <h2 className="text-2xl font-bold mb-6">About DentistNearMeNow.com</h2>
            <p className="text-muted-foreground mb-4">
              DentistNearMeNow.com is your comprehensive resource for finding quality dental care across the United States.
              Our directory features thousands of dental professionals, from general dentists to specialists including
              orthodontists, periodontists, endodontists, and oral surgeons.
            </p>
            <p className="text-muted-foreground mb-4">
              Finding the right dentist is essential for maintaining good oral health. Whether you need a routine cleaning,
              cosmetic dentistry, emergency dental care, or specialized treatment, our platform helps you connect with
              trusted dental professionals in your area. We provide detailed information including patient reviews,
              office hours, accepted insurance plans, and contact details to help you make an informed decision.
            </p>
            <p className="text-muted-foreground">
              Regular dental visits are crucial for preventing cavities, gum disease, and other oral health issues.
              The American Dental Association recommends visiting your dentist at least twice a year for check-ups
              and cleanings. Use our directory to find a dentist near you and prioritize your dental health today.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
