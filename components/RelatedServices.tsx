import Link from 'next/link';
import { ChevronRight, Stethoscope, Baby, Sparkles, SmilePlus, Wrench, Heart, AlertCircle, Crown, Smile } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

interface Service {
  slug: string;
  name: string;
  description: string;
  icon: LucideIcon;
  color: string;
  contexts: string[]; // Related contexts for filtering
}

const services: Service[] = [
  {
    slug: 'general-dentist',
    name: 'General Dentist',
    description: 'Routine dental care including cleanings, fillings, and preventive treatments.',
    icon: Stethoscope,
    color: 'bg-blue-500',
    contexts: ['general', 'checkup', 'cleaning', 'preventive'],
  },
  {
    slug: 'pediatric-dentist',
    name: 'Pediatric Dentist',
    description: 'Specialized dental care for children and adolescents.',
    icon: Baby,
    color: 'bg-pink-500',
    contexts: ['pediatric', 'children', 'kids', 'family'],
  },
  {
    slug: 'cosmetic-dentist',
    name: 'Cosmetic Dentist',
    description: 'Teeth whitening, veneers, and smile makeovers.',
    icon: Sparkles,
    color: 'bg-purple-500',
    contexts: ['cosmetic', 'whitening', 'veneers', 'smile'],
  },
  {
    slug: 'orthodontist',
    name: 'Orthodontist',
    description: 'Braces, Invisalign, and teeth alignment solutions.',
    icon: SmilePlus,
    color: 'bg-teal-500',
    contexts: ['orthodontic', 'braces', 'invisalign', 'alignment'],
  },
  {
    slug: 'oral-surgeon',
    name: 'Oral Surgeon',
    description: 'Wisdom teeth removal, implants, and jaw surgery.',
    icon: Wrench,
    color: 'bg-orange-500',
    contexts: ['surgery', 'extraction', 'implants', 'wisdom'],
  },
  {
    slug: 'endodontist',
    name: 'Endodontist',
    description: 'Root canal treatments and dental pulp care.',
    icon: Heart,
    color: 'bg-red-500',
    contexts: ['root-canal', 'endodontic', 'pulp', 'pain'],
  },
  {
    slug: 'periodontist',
    name: 'Periodontist',
    description: 'Gum disease treatment and dental implant placement.',
    icon: Crown,
    color: 'bg-green-500',
    contexts: ['gum', 'periodontal', 'implants', 'disease'],
  },
  {
    slug: 'emergency-dentist',
    name: 'Emergency Dentist',
    description: 'Urgent care for toothaches and dental emergencies.',
    icon: AlertCircle,
    color: 'bg-red-600',
    contexts: ['emergency', 'urgent', 'pain', 'broken'],
  },
  {
    slug: 'prosthodontist',
    name: 'Prosthodontist',
    description: 'Dentures, bridges, and tooth replacement solutions.',
    icon: Smile,
    color: 'bg-indigo-500',
    contexts: ['dentures', 'bridges', 'replacement', 'missing'],
  },
];

interface RelatedServicesProps {
  currentContext?: string;
  limit?: number;
  variant?: 'sidebar' | 'grid' | 'inline';
  excludeSlug?: string;
}

export default function RelatedServices({
  currentContext,
  limit = 4,
  variant = 'grid',
  excludeSlug,
}: RelatedServicesProps) {
  // Filter and sort services based on context relevance
  let filteredServices = services.filter(s => s.slug !== excludeSlug);

  if (currentContext) {
    const contextLower = currentContext.toLowerCase();
    // Sort by relevance - services matching context come first
    filteredServices = filteredServices.sort((a, b) => {
      const aRelevant = a.contexts.some(c => c.includes(contextLower) || contextLower.includes(c));
      const bRelevant = b.contexts.some(c => c.includes(contextLower) || contextLower.includes(c));
      if (aRelevant && !bRelevant) return -1;
      if (!aRelevant && bRelevant) return 1;
      return 0;
    });
  }

  const displayServices = filteredServices.slice(0, limit);

  if (variant === 'sidebar') {
    return (
      <div className="bg-gray-50 rounded-xl p-6">
        <h3 className="text-lg font-semibold mb-4">Related Services</h3>
        <ul className="space-y-3">
          {displayServices.map((service) => {
            const Icon = service.icon;
            return (
              <li key={service.slug}>
                <Link
                  href={`/services/${service.slug}`}
                  className="flex items-center gap-3 text-sm text-muted-foreground hover:text-primary transition-colors group"
                >
                  <div className={`w-8 h-8 ${service.color} rounded-lg flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform`}>
                    <Icon className="w-4 h-4 text-white" />
                  </div>
                  <span className="group-hover:text-primary">{service.name}</span>
                  <ChevronRight className="w-4 h-4 ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              </li>
            );
          })}
        </ul>
        <Link
          href="/services"
          className="mt-4 inline-flex items-center gap-1 text-sm text-primary font-medium hover:underline"
        >
          View all services
          <ChevronRight className="w-4 h-4" />
        </Link>
      </div>
    );
  }

  if (variant === 'inline') {
    return (
      <div className="flex flex-wrap gap-2">
        {displayServices.map((service) => {
          const Icon = service.icon;
          return (
            <Link
              key={service.slug}
              href={`/services/${service.slug}`}
              className="inline-flex items-center gap-2 px-3 py-2 bg-white border rounded-lg text-sm hover:border-primary hover:shadow-sm transition-all"
            >
              <div className={`w-6 h-6 ${service.color} rounded flex items-center justify-center`}>
                <Icon className="w-3 h-3 text-white" />
              </div>
              <span>{service.name}</span>
            </Link>
          );
        })}
      </div>
    );
  }

  // Default: grid variant
  return (
    <div className="space-y-4">
      <h3 className="text-xl font-semibold">Related Dental Services</h3>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {displayServices.map((service) => {
          const Icon = service.icon;
          return (
            <Link
              key={service.slug}
              href={`/services/${service.slug}`}
              className="group bg-white rounded-xl border p-4 hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
            >
              <div className={`w-12 h-12 ${service.color} rounded-xl flex items-center justify-center mb-3 group-hover:scale-110 transition-transform`}>
                <Icon className="w-6 h-6 text-white" />
              </div>
              <h4 className="font-semibold mb-1 group-hover:text-primary transition-colors">
                {service.name}
              </h4>
              <p className="text-sm text-muted-foreground line-clamp-2">
                {service.description}
              </p>
              <div className="mt-3 flex items-center gap-1 text-primary text-sm font-medium">
                Learn more
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
