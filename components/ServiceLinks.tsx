import Link from 'next/link';
import { Stethoscope, ChevronRight } from 'lucide-react';

interface ServiceLinksProps {
  services?: string[];
  specialties?: string[];
  emergencyServices?: boolean;
  limit?: number;
  variant?: 'sidebar' | 'inline' | 'badges';
}

// Map common service/specialty terms to our service page slugs
const serviceMapping: Record<string, { slug: string; name: string }> = {
  // General
  'dentist': { slug: 'general-dentistry', name: 'General Dentistry' },
  'dental office': { slug: 'general-dentistry', name: 'General Dentistry' },
  'dental clinic': { slug: 'general-dentistry', name: 'General Dentistry' },
  'family dentist': { slug: 'general-dentistry', name: 'General Dentistry' },
  'general dentist': { slug: 'general-dentistry', name: 'General Dentistry' },

  // Cosmetic
  'cosmetic dentist': { slug: 'cosmetic-dentistry', name: 'Cosmetic Dentistry' },
  'cosmetic dentistry': { slug: 'cosmetic-dentistry', name: 'Cosmetic Dentistry' },
  'teeth whitening': { slug: 'teeth-whitening', name: 'Teeth Whitening' },
  'teeth whitening service': { slug: 'teeth-whitening', name: 'Teeth Whitening' },
  'veneers': { slug: 'cosmetic-dentistry', name: 'Cosmetic Dentistry' },

  // Orthodontics
  'orthodontist': { slug: 'orthodontics', name: 'Orthodontics' },
  'orthodontics': { slug: 'orthodontics', name: 'Orthodontics' },
  'braces': { slug: 'orthodontics', name: 'Orthodontics' },
  'invisalign': { slug: 'orthodontics', name: 'Orthodontics' },

  // Implants
  'dental implants': { slug: 'dental-implants', name: 'Dental Implants' },
  'dental implants provider': { slug: 'dental-implants', name: 'Dental Implants' },
  'implant dentist': { slug: 'dental-implants', name: 'Dental Implants' },

  // Oral Surgery
  'oral surgeon': { slug: 'oral-surgery', name: 'Oral Surgery' },
  'oral surgery': { slug: 'oral-surgery', name: 'Oral Surgery' },
  'tooth extraction': { slug: 'oral-surgery', name: 'Oral Surgery' },
  'wisdom teeth': { slug: 'oral-surgery', name: 'Oral Surgery' },

  // Pediatric
  'pediatric dentist': { slug: 'pediatric-dentistry', name: 'Pediatric Dentistry' },
  'pediatric dentistry': { slug: 'pediatric-dentistry', name: 'Pediatric Dentistry' },
  'pediatric care': { slug: 'pediatric-dentistry', name: 'Pediatric Dentistry' },
  'children dentist': { slug: 'pediatric-dentistry', name: 'Pediatric Dentistry' },

  // Endodontics
  'endodontist': { slug: 'endodontist', name: 'Endodontics' },
  'endodontics': { slug: 'endodontist', name: 'Endodontics' },
  'root canal': { slug: 'endodontist', name: 'Endodontics' },

  // Periodontics
  'periodontist': { slug: 'periodontist', name: 'Periodontics' },
  'periodontics': { slug: 'periodontist', name: 'Periodontics' },
  'gum disease': { slug: 'periodontist', name: 'Periodontics' },
  'gum treatment': { slug: 'periodontist', name: 'Periodontics' },

  // Prosthodontics
  'prosthodontist': { slug: 'prosthodontist', name: 'Prosthodontics' },
  'prosthodontics': { slug: 'prosthodontist', name: 'Prosthodontics' },
  'dentures': { slug: 'prosthodontist', name: 'Prosthodontics' },
  'crowns': { slug: 'prosthodontist', name: 'Prosthodontics' },

  // Sedation
  'sedation dentistry': { slug: 'sedation-dentistry', name: 'Sedation Dentistry' },
  'sleep dentistry': { slug: 'sedation-dentistry', name: 'Sedation Dentistry' },
};

function getMatchingServices(
  services?: string[],
  specialties?: string[],
  emergencyServices?: boolean
): Array<{ slug: string; name: string }> {
  const matched = new Map<string, { slug: string; name: string }>();

  // Check services
  services?.forEach(service => {
    const key = service.toLowerCase();
    if (serviceMapping[key]) {
      matched.set(serviceMapping[key].slug, serviceMapping[key]);
    }
  });

  // Check specialties
  specialties?.forEach(specialty => {
    const key = specialty.toLowerCase();
    if (serviceMapping[key]) {
      matched.set(serviceMapping[key].slug, serviceMapping[key]);
    }
  });

  // Add emergency if applicable
  if (emergencyServices) {
    matched.set('emergency-dentist', { slug: 'emergency-dentist', name: 'Emergency Dentist' });
  }

  return Array.from(matched.values());
}

export default function ServiceLinks({
  services,
  specialties,
  emergencyServices,
  limit = 5,
  variant = 'sidebar',
}: ServiceLinksProps) {
  const matchedServices = getMatchingServices(services, specialties, emergencyServices).slice(0, limit);

  if (matchedServices.length === 0) {
    // Default services if nothing matches
    return (
      <div className="space-y-3">
        <h3 className="text-lg font-semibold flex items-center gap-2">
          <Stethoscope className="w-5 h-5 text-primary" />
          Dental Services
        </h3>
        <ul className="space-y-2">
          <li>
            <Link
              href="/services/general-dentistry"
              className="text-sm text-muted-foreground hover:text-primary transition-colors flex items-center gap-1"
            >
              <ChevronRight className="w-3 h-3" />
              General Dentistry
            </Link>
          </li>
          <li>
            <Link
              href="/services"
              className="text-sm text-primary hover:underline flex items-center gap-1"
            >
              View all services
              <ChevronRight className="w-3 h-3" />
            </Link>
          </li>
        </ul>
      </div>
    );
  }

  if (variant === 'badges') {
    return (
      <div className="flex flex-wrap gap-2">
        {matchedServices.map((service) => (
          <Link
            key={service.slug}
            href={service.slug === 'emergency-dentist' ? '/emergency-dentist' : `/services/${service.slug}`}
            className="text-xs bg-primary/10 text-primary px-3 py-1.5 rounded-full hover:bg-primary/20 transition-colors"
          >
            {service.name}
          </Link>
        ))}
      </div>
    );
  }

  if (variant === 'inline') {
    return (
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-sm text-muted-foreground">Services:</span>
        {matchedServices.map((service, index) => (
          <span key={service.slug}>
            <Link
              href={service.slug === 'emergency-dentist' ? '/emergency-dentist' : `/services/${service.slug}`}
              className="text-sm text-primary hover:underline"
            >
              {service.name}
            </Link>
            {index < matchedServices.length - 1 && <span className="text-muted-foreground">, </span>}
          </span>
        ))}
      </div>
    );
  }

  // Default: sidebar variant
  return (
    <div className="space-y-3">
      <h3 className="text-lg font-semibold flex items-center gap-2">
        <Stethoscope className="w-5 h-5 text-primary" />
        Related Services
      </h3>
      <ul className="space-y-2">
        {matchedServices.map((service) => (
          <li key={service.slug}>
            <Link
              href={service.slug === 'emergency-dentist' ? '/emergency-dentist' : `/services/${service.slug}`}
              className="text-sm text-muted-foreground hover:text-primary transition-colors flex items-center gap-1 group"
            >
              <ChevronRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
              {service.name}
            </Link>
          </li>
        ))}
      </ul>
      <Link
        href="/services"
        className="text-sm text-primary hover:underline flex items-center gap-1"
      >
        View all services
        <ChevronRight className="w-3 h-3" />
      </Link>
    </div>
  );
}
