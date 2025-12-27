import Link from 'next/link';
import { BookOpen, ChevronRight } from 'lucide-react';

interface QuickGuidesProps {
  context?: 'general' | 'emergency' | 'cosmetic' | 'pediatric' | 'insurance';
  limit?: number;
}

interface Guide {
  slug: string;
  title: string;
  shortTitle: string;
}

const allGuides: Guide[] = [
  { slug: 'finding-right-dentist', title: 'How to Choose the Right Dentist', shortTitle: 'Choosing a Dentist' },
  { slug: 'dental-insurance', title: 'Understanding Dental Insurance', shortTitle: 'Dental Insurance' },
  { slug: 'dental-emergencies', title: 'Handling Dental Emergencies', shortTitle: 'Dental Emergencies' },
  { slug: 'dental-anxiety', title: 'Overcoming Dental Anxiety', shortTitle: 'Dental Anxiety' },
  { slug: 'dental-health-tips', title: 'Daily Dental Health Tips', shortTitle: 'Health Tips' },
  { slug: 'cosmetic-dentistry', title: 'Guide to Cosmetic Dentistry', shortTitle: 'Cosmetic Dentistry' },
  { slug: 'pediatric-dental-care', title: 'Pediatric Dental Care Guide', shortTitle: 'Kids Dental Care' },
  { slug: 'dental-procedures', title: 'Common Dental Procedures', shortTitle: 'Dental Procedures' },
  { slug: 'oral-health-conditions', title: 'Oral Health Conditions', shortTitle: 'Oral Health' },
];

const guidesByContext: Record<string, string[]> = {
  general: ['finding-right-dentist', 'dental-insurance', 'dental-health-tips'],
  emergency: ['dental-emergencies', 'finding-right-dentist', 'dental-insurance'],
  cosmetic: ['cosmetic-dentistry', 'finding-right-dentist', 'dental-anxiety'],
  pediatric: ['pediatric-dental-care', 'finding-right-dentist', 'dental-anxiety'],
  insurance: ['dental-insurance', 'finding-right-dentist', 'dental-procedures'],
};

export default function QuickGuides({ context = 'general', limit = 3 }: QuickGuidesProps) {
  const guideSlugs = guidesByContext[context] || guidesByContext.general;
  const guides = guideSlugs
    .map(slug => allGuides.find(g => g.slug === slug))
    .filter((g): g is Guide => g !== undefined)
    .slice(0, limit);

  return (
    <div className="space-y-3">
      <h3 className="text-lg font-semibold flex items-center gap-2">
        <BookOpen className="w-5 h-5 text-primary" />
        Helpful Guides
      </h3>
      <ul className="space-y-2">
        {guides.map((guide) => (
          <li key={guide.slug}>
            <Link
              href={`/guides/${guide.slug}`}
              className="text-sm text-muted-foreground hover:text-primary transition-colors flex items-center gap-1 group"
            >
              <ChevronRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
              {guide.shortTitle}
            </Link>
          </li>
        ))}
      </ul>
      <Link
        href="/guides"
        className="text-sm text-primary hover:underline flex items-center gap-1"
      >
        View all guides
        <ChevronRight className="w-3 h-3" />
      </Link>
    </div>
  );
}
