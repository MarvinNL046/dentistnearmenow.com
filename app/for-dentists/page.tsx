import { Metadata } from 'next';
import Link from 'next/link';
import { ChevronRight, Bell, Mail, Users, TrendingUp, Star, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const metadata: Metadata = {
  title: 'For Dentists - Coming Soon | DentistNearMeNow.com',
  description: 'Soon you can claim your free listing on DentistNearMeNow.com. Reach more patients, showcase your expertise, and grow your dental practice.',
};

const upcomingFeatures = [
  {
    icon: Users,
    title: 'Claim Your Listing',
    description: 'Verify and manage your practice information.',
  },
  {
    icon: Star,
    title: 'Respond to Reviews',
    description: 'Engage with patient feedback directly.',
  },
  {
    icon: TrendingUp,
    title: 'Analytics Dashboard',
    description: 'Track how patients find your practice.',
  },
  {
    icon: Shield,
    title: 'Verified Badge',
    description: 'Build trust with a verified listing.',
  },
];

export default function ForDentistsPage() {
  return (
    <div className="bg-background min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary to-primary/80 text-white py-20">
        <div className="container mx-auto px-4">
          <nav className="flex items-center gap-2 text-white/80 mb-6 text-sm">
            <Link href="/" className="hover:text-white">Home</Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-white">For Dentists</span>
          </nav>

          <div className="max-w-3xl mx-auto text-center">
            {/* Coming Soon Badge */}
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 mb-8">
              <Bell className="w-4 h-4" />
              <span className="text-sm font-medium">Coming Soon</span>
            </div>

            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Dentist Portal Coming Soon
            </h1>
            <p className="text-xl text-white/90 mb-8">
              We&apos;re building tools to help dental professionals manage their listings,
              respond to reviews, and connect with more patients. Be the first to know when we launch.
            </p>

            {/* Email Signup */}
            <div className="max-w-md mx-auto">
              <form className="flex flex-col sm:flex-row gap-3">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-white/50"
                />
                <Button size="lg" className="bg-white text-primary hover:bg-gray-100">
                  <Mail className="w-4 h-4 mr-2" />
                  Notify Me
                </Button>
              </form>
              <p className="text-white/60 text-sm mt-3">
                We&apos;ll notify you when the dentist portal launches.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Upcoming Features */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">
              What&apos;s Coming
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              We&apos;re working on features to help you grow your practice.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {upcomingFeatures.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div key={index} className="bg-white rounded-xl border p-6 text-center">
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="font-semibold mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground text-sm">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Current Options */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-2xl font-bold mb-4">
              Already Listed?
            </h2>
            <p className="text-muted-foreground mb-8">
              Your practice may already be in our directory. Search for your practice
              to see your current listing.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/search">
                <Button size="lg">
                  Search Directory
                </Button>
              </Link>
              <a href="mailto:info@dentistnearmenow.com">
                <Button size="lg" variant="outline">
                  <Mail className="w-4 h-4 mr-2" />
                  Contact Us
                </Button>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section className="py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-xl font-bold mb-4">
            Questions?
          </h2>
          <p className="text-muted-foreground mb-4">
            Reach out to us at{' '}
            <a href="mailto:info@dentistnearmenow.com" className="text-primary hover:underline">
              info@dentistnearmenow.com
            </a>
          </p>
        </div>
      </section>
    </div>
  );
}
