'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  ChevronRight,
  BookOpen,
  Shield,
  CreditCard,
  Smile,
  Baby,
  Clock,
  Users,
  Heart,
  Brain,
  Star,
  AlertTriangle,
  Award,
  CheckCircle,
  ArrowRight,
  Sparkles,
  Stethoscope
} from 'lucide-react';

const guides = [
  {
    slug: 'finding-right-dentist',
    title: 'How to Choose the Right Dentist',
    description: 'Learn what to look for when selecting a dentist, from credentials to patient reviews.',
    icon: Users,
    readTime: '8 min read',
    category: 'Getting Started',
    featured: true,
    popular: true,
  },
  {
    slug: 'dental-anxiety',
    title: 'Overcoming Dental Anxiety',
    description: 'A complete guide to managing dental fear, including sedation options and tips to make your visits comfortable.',
    icon: Brain,
    readTime: '10 min read',
    category: 'Patient Care',
    featured: true,
    popular: true,
  },
  {
    slug: 'dental-insurance',
    title: 'Understanding Dental Insurance',
    description: 'A complete guide to dental insurance plans, coverage options, and maximizing your benefits.',
    icon: CreditCard,
    readTime: '12 min read',
    category: 'Insurance',
    featured: false,
    popular: true,
  },
  {
    slug: 'dental-health-tips',
    title: 'Daily Dental Care Tips',
    description: 'Expert tips for maintaining healthy teeth and gums through proper daily care.',
    icon: Heart,
    readTime: '6 min read',
    category: 'Prevention',
    featured: true,
    popular: false,
  },
  {
    slug: 'cosmetic-dentistry',
    title: 'Guide to Cosmetic Dentistry',
    description: 'Explore teeth whitening, veneers, bonding, and other cosmetic dental procedures.',
    icon: Smile,
    readTime: '10 min read',
    category: 'Treatments',
    featured: false,
    popular: false,
  },
  {
    slug: 'pediatric-dental-care',
    title: 'Dental Care for Children',
    description: 'Everything parents need to know about children\'s dental health from infancy to teens.',
    icon: Baby,
    readTime: '9 min read',
    category: 'Family',
    featured: false,
    popular: true,
  },
  {
    slug: 'dental-emergencies',
    title: 'Handling Dental Emergencies',
    description: 'What to do in common dental emergencies and when to seek immediate care.',
    icon: Clock,
    readTime: '7 min read',
    category: 'Emergency',
    featured: true,
    popular: false,
  },
  {
    slug: 'oral-health-conditions',
    title: 'Common Oral Health Conditions',
    description: 'Learn about cavities, gum disease, tooth sensitivity, and other common dental issues.',
    icon: Shield,
    readTime: '11 min read',
    category: 'Education',
    featured: false,
    popular: false,
  },
  {
    slug: 'dental-procedures',
    title: 'Common Dental Procedures Explained',
    description: 'Understand what to expect during fillings, root canals, crowns, and other procedures.',
    icon: BookOpen,
    readTime: '14 min read',
    category: 'Treatments',
    featured: false,
    popular: true,
  },
];

const categories = ['All', 'Getting Started', 'Patient Care', 'Insurance', 'Prevention', 'Treatments', 'Family', 'Emergency', 'Education'];

// Related services for internal linking
const relatedServices = [
  { slug: 'general-dentistry', name: 'General Dentistry', icon: Stethoscope },
  { slug: 'cosmetic-dentistry', name: 'Cosmetic Dentistry', icon: Sparkles },
  { slug: 'pediatric-dentistry', name: 'Pediatric Dentistry', icon: Baby },
  { slug: 'emergency-dentist', name: 'Emergency Dentist', icon: AlertTriangle },
];

// Beginner path guides
const beginnerPath = [
  { slug: 'finding-right-dentist', step: 1, title: 'Find Your Dentist', description: 'Learn how to choose the right dental provider' },
  { slug: 'dental-insurance', step: 2, title: 'Understand Insurance', description: 'Navigate dental insurance and coverage options' },
  { slug: 'dental-health-tips', step: 3, title: 'Master Daily Care', description: 'Build habits for lasting oral health' },
];

export default function GuidesPage() {
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredGuides = selectedCategory === 'All'
    ? guides
    : guides.filter(guide => guide.category === selectedCategory);

  const featuredGuides = guides.filter(guide => guide.featured);
  const popularGuides = guides.filter(guide => guide.popular);

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
          <div className="max-w-4xl">
            <div className="flex items-center gap-2 mb-4">
              <Award className="w-6 h-6 text-yellow-300" />
              <span className="text-sm font-medium text-white/90">Written by Dental Health Experts</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Your Complete Dental Health Guide
            </h1>
            <p className="text-xl text-white/90 mb-6 leading-relaxed">
              Welcome to our comprehensive dental health resource center. Whether you&apos;re searching for your first dentist,
              trying to understand your insurance options, or looking to improve your daily oral care routine, our expert guides
              have you covered. Each article is carefully researched and reviewed by dental professionals to ensure you receive
              accurate, up-to-date information you can trust.
            </p>
            <p className="text-lg text-white/80 leading-relaxed">
              Good oral health is the foundation of overall wellness. Studies show that dental health is connected to heart
              health, diabetes management, and even mental well-being. Our mission is to empower you with the knowledge you need
              to make informed decisions about your dental care, from choosing the right dentist to understanding complex
              procedures. Explore our guides below to take control of your oral health journey.
            </p>
          </div>
        </div>
      </section>

      {/* Author Expertise Banner */}
      <section className="bg-blue-50 border-b border-blue-100 py-4">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap items-center justify-center gap-6 text-sm">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-green-600" />
              <span className="text-gray-700">Expert-Reviewed Content</span>
            </div>
            <div className="flex items-center gap-2">
              <Award className="w-5 h-5 text-blue-600" />
              <span className="text-gray-700">Written by Dental Professionals</span>
            </div>
            <div className="flex items-center gap-2">
              <Star className="w-5 h-5 text-yellow-500" />
              <span className="text-gray-700">Trusted by Thousands of Readers</span>
            </div>
          </div>
        </div>
      </section>

      {/* Start Here - Beginner Path Section */}
      <section className="py-12 bg-gradient-to-b from-green-50 to-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <span className="inline-block bg-green-100 text-green-800 text-sm font-medium px-3 py-1 rounded-full mb-3">
                New to Dental Care?
              </span>
              <h2 className="text-3xl font-bold text-gray-900 mb-3">Start Here: Your 3-Step Path</h2>
              <p className="text-muted-foreground">
                Follow this recommended reading path to build a solid foundation for your dental health journey.
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              {beginnerPath.map((item) => (
                <Link
                  key={item.slug}
                  href={`/guides/${item.slug}`}
                  className="group relative bg-white rounded-xl border-2 border-green-200 p-6 hover:border-green-400 hover:shadow-lg transition-all"
                >
                  <div className="absolute -top-3 -left-3 w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center font-bold text-sm">
                    {item.step}
                  </div>
                  <h3 className="font-semibold text-lg mb-2 group-hover:text-green-600 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4">{item.description}</p>
                  <span className="text-green-600 text-sm font-medium flex items-center gap-1 group-hover:gap-2 transition-all">
                    Read Guide <ArrowRight className="w-4 h-4" />
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Featured Guides Section */}
      <section className="py-12 border-b">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Featured Guides</h2>
              <p className="text-muted-foreground mt-1">Our most comprehensive and helpful resources</p>
            </div>
            <Star className="w-6 h-6 text-yellow-500" />
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredGuides.map((guide) => {
              const Icon = guide.icon;
              return (
                <Link
                  key={guide.slug}
                  href={`/guides/${guide.slug}`}
                  className="group bg-gradient-to-br from-primary/5 to-primary/10 rounded-xl border border-primary/20 p-6 hover:shadow-lg hover:border-primary/40 transition-all"
                >
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                  <span className="text-xs font-medium text-primary bg-primary/10 px-2 py-1 rounded">
                    {guide.category}
                  </span>
                  <h3 className="text-lg font-semibold mt-3 mb-2 group-hover:text-primary transition-colors">
                    {guide.title}
                  </h3>
                  <p className="text-muted-foreground text-sm mb-3 line-clamp-2">
                    {guide.description}
                  </p>
                  <span className="text-xs text-muted-foreground">{guide.readTime}</span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="py-8 border-b sticky top-0 bg-white z-10 shadow-sm">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  category === selectedCategory
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

      {/* All Guides Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold">
              {selectedCategory === 'All' ? 'All Guides' : `${selectedCategory} Guides`}
            </h2>
            <span className="text-muted-foreground text-sm">
              {filteredGuides.length} {filteredGuides.length === 1 ? 'guide' : 'guides'}
            </span>
          </div>

          {filteredGuides.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredGuides.map((guide) => {
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
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-xs font-medium text-primary bg-primary/10 px-2 py-1 rounded">
                            {guide.category}
                          </span>
                          {guide.popular && (
                            <span className="text-xs font-medium text-yellow-700 bg-yellow-100 px-2 py-1 rounded flex items-center gap-1">
                              <Star className="w-3 h-3" /> Popular
                            </span>
                          )}
                        </div>
                        <h2 className="text-lg font-semibold mb-2 group-hover:text-primary transition-colors">
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
          ) : (
            <div className="text-center py-12 bg-gray-50 rounded-xl">
              <BookOpen className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-700 mb-2">No guides in this category yet</h3>
              <p className="text-muted-foreground mb-4">Check back soon for new content!</p>
              <button
                onClick={() => setSelectedCategory('All')}
                className="text-primary font-medium hover:underline"
              >
                View all guides
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Popular Guides Section */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-2 mb-8">
            <Star className="w-6 h-6 text-yellow-500" />
            <h2 className="text-2xl font-bold">Most Popular Guides</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {popularGuides.slice(0, 6).map((guide, index) => (
              <Link
                key={guide.slug}
                href={`/guides/${guide.slug}`}
                className="group flex items-start gap-4 bg-white rounded-xl border p-4 hover:shadow-md hover:border-primary/50 transition-all"
              >
                <div className="w-8 h-8 bg-yellow-100 text-yellow-700 rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0">
                  {index + 1}
                </div>
                <div>
                  <h3 className="font-semibold group-hover:text-primary transition-colors">
                    {guide.title}
                  </h3>
                  <p className="text-sm text-muted-foreground mt-1">{guide.readTime}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Related Services Section */}
      <section className="py-12 border-t">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold mb-4">Find Dental Care</h2>
          <p className="text-muted-foreground mb-8 max-w-2xl">
            Ready to put your knowledge into action? Find qualified dental professionals in your area.
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {relatedServices.map((service) => {
              const Icon = service.icon;
              return (
                <Link
                  key={service.slug}
                  href={`/services/${service.slug}`}
                  className="group flex items-center gap-3 bg-white rounded-xl border p-4 hover:border-primary hover:shadow-md transition-all"
                >
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                    <Icon className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium group-hover:text-primary transition-colors">
                      {service.name}
                    </h3>
                    <span className="text-xs text-muted-foreground">Find providers</span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-gray-400 ml-auto group-hover:text-primary transition-colors" />
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Emergency CTA */}
      <section className="py-8 bg-red-50 border-t border-red-100">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                <AlertTriangle className="w-6 h-6 text-red-600" />
              </div>
              <div>
                <h3 className="font-semibold text-red-900">Having a Dental Emergency?</h3>
                <p className="text-sm text-red-700">Get immediate help and find emergency dentists near you.</p>
              </div>
            </div>
            <div className="flex gap-3">
              <Link
                href="/guides/dental-emergencies"
                className="px-4 py-2 bg-white text-red-700 border border-red-200 rounded-lg font-medium hover:bg-red-50 transition-colors"
              >
                Read Emergency Guide
              </Link>
              <Link
                href="/emergency-dentist"
                className="px-4 py-2 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 transition-colors"
              >
                Find Emergency Dentist
              </Link>
            </div>
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

      {/* SEO Content Section */}
      <section className="py-12 border-t">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto prose prose-lg">
            <h2>Your Trusted Source for Dental Health Information</h2>
            <p>
              At Dentist Near Me Now, we believe that informed patients make better decisions about their oral health.
              Our comprehensive dental guides are designed to answer your most pressing questions about dental care,
              from the basics of daily brushing and flossing to understanding complex procedures like root canals and dental implants.
            </p>
            <p>
              Every guide in our resource library is written by experienced dental health writers and reviewed by licensed
              dental professionals. We follow strict editorial guidelines to ensure accuracy, clarity, and relevance.
              Our content is regularly updated to reflect the latest developments in dental science and best practices.
            </p>
            <h3>Why Trust Our Dental Guides?</h3>
            <p>
              Our team includes dental hygienists, dental assistants, and healthcare writers with years of experience
              in patient education. We collaborate with practicing dentists to verify medical accuracy and provide
              practical advice that you can apply to your daily life. Whether you&apos;re dealing with dental anxiety,
              searching for affordable care options, or helping your child develop good oral hygiene habits, our guides
              are here to help.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
