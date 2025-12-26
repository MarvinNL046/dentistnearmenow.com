import Link from 'next/link';
import { ChevronRight, BookOpen, Shield, CreditCard, Smile, Baby, Clock, Users, Heart, Brain } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

interface Guide {
  slug: string;
  title: string;
  description: string;
  icon: LucideIcon;
  readTime: string;
  category: string;
}

const guides: Guide[] = [
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
    description: 'A complete guide to managing dental fear, including sedation options and tips.',
    icon: Brain,
    readTime: '10 min read',
    category: 'Patient Care',
  },
  {
    slug: 'dental-insurance',
    title: 'Understanding Dental Insurance',
    description: 'A complete guide to dental insurance plans, coverage options, and maximizing benefits.',
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
    description: 'Explore teeth whitening, veneers, bonding, and other cosmetic procedures.',
    icon: Smile,
    readTime: '10 min read',
    category: 'Treatments',
  },
  {
    slug: 'pediatric-dental-care',
    title: 'Dental Care for Children',
    description: "Everything parents need to know about children's dental health.",
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
    description: 'Learn about cavities, gum disease, tooth sensitivity, and other issues.',
    icon: Shield,
    readTime: '11 min read',
    category: 'Education',
  },
  {
    slug: 'dental-procedures',
    title: 'Common Dental Procedures Explained',
    description: 'Understand what to expect during fillings, root canals, crowns, and more.',
    icon: BookOpen,
    readTime: '14 min read',
    category: 'Treatments',
  },
];

interface RelatedGuidesProps {
  category?: string;
  currentSlug?: string;
  limit?: number;
  variant?: 'cards' | 'list' | 'compact';
}

export default function RelatedGuides({
  category,
  currentSlug,
  limit = 3,
  variant = 'cards',
}: RelatedGuidesProps) {
  // Filter guides
  let filteredGuides = guides.filter(g => g.slug !== currentSlug);

  if (category) {
    const categoryLower = category.toLowerCase();
    // Sort by category match - matching categories come first
    filteredGuides = filteredGuides.sort((a, b) => {
      const aMatch = a.category.toLowerCase() === categoryLower;
      const bMatch = b.category.toLowerCase() === categoryLower;
      if (aMatch && !bMatch) return -1;
      if (!aMatch && bMatch) return 1;
      return 0;
    });
  }

  const displayGuides = filteredGuides.slice(0, limit);

  if (displayGuides.length === 0) {
    return null;
  }

  if (variant === 'list') {
    return (
      <div className="bg-gray-50 rounded-xl p-6">
        <h3 className="text-lg font-semibold mb-4">Related Guides</h3>
        <ul className="space-y-4">
          {displayGuides.map((guide) => {
            const Icon = guide.icon;
            return (
              <li key={guide.slug}>
                <Link
                  href={`/guides/${guide.slug}`}
                  className="group block"
                >
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-colors">
                      <Icon className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-medium text-sm group-hover:text-primary transition-colors">
                        {guide.title}
                      </h4>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        {guide.readTime}
                      </p>
                    </div>
                  </div>
                </Link>
              </li>
            );
          })}
        </ul>
        <Link
          href="/guides"
          className="mt-4 inline-flex items-center gap-1 text-sm text-primary font-medium hover:underline"
        >
          View all guides
          <ChevronRight className="w-4 h-4" />
        </Link>
      </div>
    );
  }

  if (variant === 'compact') {
    return (
      <div className="space-y-3">
        <h3 className="text-lg font-semibold">Related Reading</h3>
        <div className="flex flex-wrap gap-2">
          {displayGuides.map((guide) => (
            <Link
              key={guide.slug}
              href={`/guides/${guide.slug}`}
              className="inline-flex items-center gap-2 px-3 py-2 bg-white border rounded-lg text-sm hover:border-primary hover:shadow-sm transition-all group"
            >
              <span className="text-xs font-medium text-primary bg-primary/10 px-2 py-0.5 rounded">
                {guide.category}
              </span>
              <span className="group-hover:text-primary transition-colors">{guide.title}</span>
              <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
            </Link>
          ))}
        </div>
      </div>
    );
  }

  // Default: cards variant
  return (
    <div className="space-y-4">
      <h3 className="text-xl font-semibold">Related Guides</h3>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {displayGuides.map((guide) => {
          const Icon = guide.icon;
          return (
            <Link
              key={guide.slug}
              href={`/guides/${guide.slug}`}
              className="group bg-white rounded-xl border p-5 hover:shadow-lg hover:border-primary transition-all"
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-colors">
                  <Icon className="w-6 h-6 text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <span className="text-xs font-medium text-primary bg-primary/10 px-2 py-1 rounded">
                    {guide.category}
                  </span>
                  <h4 className="text-base font-semibold mt-2 mb-1 group-hover:text-primary transition-colors line-clamp-2">
                    {guide.title}
                  </h4>
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {guide.description}
                  </p>
                  <div className="mt-3 flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">
                      {guide.readTime}
                    </span>
                    <span className="flex items-center gap-1 text-primary text-sm font-medium">
                      Read
                      <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
