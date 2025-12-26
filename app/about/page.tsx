import { Metadata } from 'next';
import Link from 'next/link';
import { ChevronRight, Users, Shield, Heart, Award, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const metadata: Metadata = {
  title: 'About Us - DentistNearMeNow.com',
  description: 'Learn about DentistNearMeNow.com, your trusted resource for finding quality dental care across the United States. Our mission is to help everyone find the right dentist.',
};

export default function AboutPage() {
  return (
    <div className="bg-background">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary to-primary/80 text-white py-16">
        <div className="container mx-auto px-4">
          <nav className="flex items-center gap-2 text-white/80 mb-4 text-sm">
            <Link href="/" className="hover:text-white">Home</Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-white">About Us</span>
          </nav>
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              About DentistNearMeNow
            </h1>
            <p className="text-xl text-white/90">
              Helping Americans find quality dental care since 2024. Our mission is to make
              finding the right dentist simple, fast, and reliable.
            </p>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold mb-4">Our Mission</h2>
                <p className="text-muted-foreground mb-6">
                  We believe everyone deserves access to quality dental care. Our platform
                  connects patients with trusted dental professionals across all 50 states,
                  making it easier than ever to find the right dentist for your needs.
                </p>
                <p className="text-muted-foreground">
                  Whether you need a routine cleaning, emergency dental care, or specialized
                  treatment, we&apos;re here to help you find a dentist you can trust.
                </p>
              </div>
              <div className="bg-primary/5 rounded-2xl p-8">
                <div className="grid grid-cols-2 gap-6">
                  <div className="text-center">
                    <div className="text-4xl font-bold text-primary mb-2">50</div>
                    <div className="text-sm text-muted-foreground">States Covered</div>
                  </div>
                  <div className="text-center">
                    <div className="text-4xl font-bold text-primary mb-2">3K+</div>
                    <div className="text-sm text-muted-foreground">Cities</div>
                  </div>
                  <div className="text-center">
                    <div className="text-4xl font-bold text-primary mb-2">1000s</div>
                    <div className="text-sm text-muted-foreground">Dentists</div>
                  </div>
                  <div className="text-center">
                    <div className="text-4xl font-bold text-primary mb-2">Free</div>
                    <div className="text-sm text-muted-foreground">To Use</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">Our Values</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="w-8 h-8 text-primary" />
                </div>
                <h3 className="font-semibold text-lg mb-2">Patient First</h3>
                <p className="text-muted-foreground text-sm">
                  We prioritize patient needs, making it easy to find the right dental care
                  without hassle or confusion.
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Shield className="w-8 h-8 text-primary" />
                </div>
                <h3 className="font-semibold text-lg mb-2">Trusted Information</h3>
                <p className="text-muted-foreground text-sm">
                  We verify dental practice information and provide accurate, up-to-date
                  details you can rely on.
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Heart className="w-8 h-8 text-primary" />
                </div>
                <h3 className="font-semibold text-lg mb-2">Accessibility</h3>
                <p className="text-muted-foreground text-sm">
                  Quality dental care should be accessible to everyone. Our directory is
                  free to use and covers all 50 states.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What We Offer */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">What We Offer</h2>
            <div className="space-y-6">
              {[
                {
                  title: 'Comprehensive Dentist Directory',
                  description: 'Browse thousands of dental practices across the United States, from general dentists to specialists.',
                },
                {
                  title: 'Emergency Dental Care Finder',
                  description: 'Find 24-hour emergency dentists near you when you need urgent dental care.',
                },
                {
                  title: 'Verified Practice Information',
                  description: 'Get accurate contact details, office hours, and services for each dental practice.',
                },
                {
                  title: 'Patient Reviews & Ratings',
                  description: 'Read reviews from real patients to help you choose the right dentist.',
                },
                {
                  title: 'Educational Resources',
                  description: 'Access dental health guides and tips to help you maintain a healthy smile.',
                },
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-4 p-6 bg-white rounded-xl border">
                  <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-semibold mb-1">{item.title}</h3>
                    <p className="text-muted-foreground">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary text-white">
        <div className="container mx-auto px-4 text-center">
          <Award className="w-16 h-16 mx-auto mb-6 opacity-80" />
          <h2 className="text-3xl font-bold mb-4">Ready to Find Your Dentist?</h2>
          <p className="text-white/90 mb-8 max-w-2xl mx-auto">
            Start your search today and find trusted dental care in your area.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/search">
              <Button size="lg" className="bg-white text-primary hover:bg-gray-100">
                Find a Dentist
              </Button>
            </Link>
            <Link href="/contact">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                Contact Us
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
