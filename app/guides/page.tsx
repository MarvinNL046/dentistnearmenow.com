import { Metadata } from 'next';
import Link from 'next/link';
import { ChevronRight, BookOpen, Shield, CreditCard, Smile, Baby, Clock, Users, Heart, Brain } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Dental Guides - Expert Tips for Oral Health',
  description: 'Comprehensive guides on dental health, choosing a dentist, dental insurance, cosmetic dentistry, and more. Expert advice to help you maintain a healthy smile.',
};

const guides = [
  {
    slug: 'finding-right-dentist',
    title: 'How to Choose the Right Dentist',
    description: 'Learn what to look for when selecting a dentist, from credentials to patient reviews.',
    icon: Users,
    readTime: '8 min read',
    category: 'Getting Started',
  },
  {
    slug: 'dental-anxiety',
    title: 'Overcoming Dental Anxiety',
    description: 'A complete guide to managing dental fear, including sedation options and tips to make your visits comfortable.',
    icon: Brain,
    readTime: '10 min read',
    category: 'Patient Care',
  },
  {
    slug: 'dental-insurance',
    title: 'Understanding Dental Insurance',
    description: 'A complete guide to dental insurance plans, coverage options, and maximizing your benefits.',
    icon: CreditCard,
    readTime: '12 min read',
    category: 'Insurance',
  },
  {
    slug: 'dental-health-tips',
    title: 'Daily Dental Care Tips',
    description: 'Expert tips for maintaining healthy teeth and gums through proper daily care.',
    icon: Heart,
    readTime: '6 min read',
    category: 'Prevention',
  },
  {
    slug: 'cosmetic-dentistry',
    title: 'Guide to Cosmetic Dentistry',
    description: 'Explore teeth whitening, veneers, bonding, and other cosmetic dental procedures.',
    icon: Smile,
    readTime: '10 min read',
    category: 'Treatments',
  },
  {
    slug: 'pediatric-dental-care',
    title: 'Dental Care for Children',
    description: 'Everything parents need to know about children\'s dental health from infancy to teens.',
    icon: Baby,
    readTime: '9 min read',
    category: 'Family',
  },
  {
    slug: 'dental-emergencies',
    title: 'Handling Dental Emergencies',
    description: 'What to do in common dental emergencies and when to seek immediate care.',
    icon: Clock,
    readTime: '7 min read',
    category: 'Emergency',
  },
  {
    slug: 'oral-health-conditions',
    title: 'Common Oral Health Conditions',
    description: 'Learn about cavities, gum disease, tooth sensitivity, and other common dental issues.',
    icon: Shield,
    readTime: '11 min read',
    category: 'Education',
  },
  {
    slug: 'dental-procedures',
    title: 'Common Dental Procedures Explained',
    description: 'Understand what to expect during fillings, root canals, crowns, and other procedures.',
    icon: BookOpen,
    readTime: '14 min read',
    category: 'Treatments',
  },
];

const categories = ['All', 'Getting Started', 'Patient Care', 'Insurance', 'Prevention', 'Treatments', 'Family', 'Emergency', 'Education'];

export default function GuidesPage() {
  return (
    <div className="bg-background">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary to-primary/80 text-white py-16">
        <div className="container mx-auto px-4">
          <nav className="flex items-center gap-2 text-white/80 mb-4 text-sm">
            <Link href="/" className="hover:text-white">Home</Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-white">Dental Guides</span>
          </nav>
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Dental Guides & Resources
            </h1>
            <p className="text-xl text-white/90">
              Expert advice and comprehensive guides to help you understand dental health,
              choose the right care, and maintain a healthy smile.
            </p>
          </div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="py-8 border-b">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  category === 'All'
                    ? 'bg-primary text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Guides Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {guides.map((guide) => {
              const Icon = guide.icon;
              return (
                <Link
                  key={guide.slug}
                  href={`/guides/${guide.slug}`}
                  className="group bg-white rounded-xl border p-6 hover:shadow-lg hover:border-primary transition-all"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-colors">
                      <Icon className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <span className="text-xs font-medium text-primary bg-primary/10 px-2 py-1 rounded">
                        {guide.category}
                      </span>
                      <h2 className="text-lg font-semibold mt-2 mb-2 group-hover:text-primary transition-colors">
                        {guide.title}
                      </h2>
                      <p className="text-muted-foreground text-sm mb-3">
                        {guide.description}
                      </p>
                      <span className="text-xs text-muted-foreground">
                        {guide.readTime}
                      </span>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-2xl font-bold mb-4">
              Stay Updated on Dental Health
            </h2>
            <p className="text-muted-foreground mb-6">
              Get the latest dental health tips and guides delivered to your inbox.
            </p>
            <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-primary/20"
              />
              <button
                type="submit"
                className="px-6 py-3 bg-primary text-white rounded-lg font-medium hover:bg-primary/90 transition-colors"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}
