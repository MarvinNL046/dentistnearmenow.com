import Link from 'next/link';
import { MapPin, Star, ChevronRight, Users } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import type { Dentist } from '@/lib/dentist-data';

interface RelatedDentistsProps {
  dentists: Dentist[];
  currentSlug: string;
  city: string;
  stateAbbr: string;
  title?: string;
  limit?: number;
  variant?: 'cards' | 'compact' | 'list';
}

export default function RelatedDentists({
  dentists,
  currentSlug,
  city,
  stateAbbr,
  title,
  limit = 3,
  variant = 'cards',
}: RelatedDentistsProps) {
  // Filter out current dentist and limit
  const relatedDentists = dentists
    .filter(d => d.slug !== currentSlug)
    .slice(0, limit);

  if (relatedDentists.length === 0) {
    return null;
  }

  const citySlug = `${city.toLowerCase().replace(/\s+/g, '-')}-${stateAbbr.toLowerCase()}`;
  const displayTitle = title || `More Dentists in ${city}`;

  if (variant === 'compact') {
    return (
      <div className="space-y-3">
        <h3 className="text-lg font-semibold flex items-center gap-2">
          <Users className="w-5 h-5 text-primary" />
          {displayTitle}
        </h3>
        <div className="space-y-2">
          {relatedDentists.map((dentist) => (
            <Link
              key={dentist.slug}
              href={`/dentist/${dentist.slug}`}
              className="flex items-center justify-between py-2 px-3 rounded-lg hover:bg-gray-50 transition-colors group"
            >
              <div className="flex-1 min-w-0">
                <p className="font-medium text-sm truncate group-hover:text-primary transition-colors">
                  {dentist.name}
                </p>
                {dentist.businessType && (
                  <p className="text-xs text-muted-foreground capitalize">
                    {dentist.businessType}
                  </p>
                )}
              </div>
              {dentist.rating && (
                <div className="flex items-center gap-1 text-sm">
                  <Star className="w-3 h-3 text-amber-500 fill-amber-500" />
                  <span className="font-medium">{dentist.rating}</span>
                </div>
              )}
            </Link>
          ))}
        </div>
        <Link
          href={`/city/${citySlug}`}
          className="inline-flex items-center gap-1 text-sm text-primary font-medium hover:underline"
        >
          View all dentists in {city}
          <ChevronRight className="w-4 h-4" />
        </Link>
      </div>
    );
  }

  if (variant === 'list') {
    return (
      <div className="bg-gray-50 rounded-xl p-6">
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <Users className="w-5 h-5 text-primary" />
          {displayTitle}
        </h3>
        <ul className="space-y-3">
          {relatedDentists.map((dentist) => (
            <li key={dentist.slug}>
              <Link
                href={`/dentist/${dentist.slug}`}
                className="flex items-start gap-3 p-3 bg-white rounded-lg border hover:border-primary hover:shadow-sm transition-all group"
              >
                <div className="w-12 h-12 bg-gray-100 rounded-lg flex-shrink-0 flex items-center justify-center overflow-hidden">
                  {dentist.photo ? (
                    <img
                      src={dentist.photo}
                      alt={dentist.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <svg className="w-6 h-6 text-gray-300" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2C9.5 2 7.5 3 6.5 4.5C5.5 6 5 8 5 10C5 12 5.5 14 6 16C6.5 18 7 20 8 21.5C8.5 22.5 9.5 22 10 21C10.5 20 11 18 11 16C11 15 11.5 14 12 14C12.5 14 13 15 13 16C13 18 13.5 20 14 21C14.5 22 15.5 22.5 16 21.5C17 20 17.5 18 18 16C18.5 14 19 12 19 10C19 8 18.5 6 17.5 4.5C16.5 3 14.5 2 12 2Z" />
                    </svg>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium group-hover:text-primary transition-colors truncate">
                    {dentist.name}
                  </p>
                  <div className="flex items-center gap-2 mt-1">
                    {dentist.rating && (
                      <div className="flex items-center gap-1 text-sm">
                        <Star className="w-3 h-3 text-amber-500 fill-amber-500" />
                        <span>{dentist.rating}</span>
                      </div>
                    )}
                    {dentist.businessType && (
                      <span className="text-xs text-muted-foreground capitalize">
                        {dentist.businessType}
                      </span>
                    )}
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors flex-shrink-0 mt-1" />
              </Link>
            </li>
          ))}
        </ul>
        <Link
          href={`/city/${citySlug}`}
          className="mt-4 inline-flex items-center gap-1 text-sm text-primary font-medium hover:underline"
        >
          View all dentists in {city}
          <ChevronRight className="w-4 h-4" />
        </Link>
      </div>
    );
  }

  // Default: cards variant
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-semibold flex items-center gap-2">
          <Users className="w-5 h-5 text-primary" />
          {displayTitle}
        </h3>
        <Link
          href={`/city/${citySlug}`}
          className="text-sm text-primary font-medium hover:underline flex items-center gap-1"
        >
          View all
          <ChevronRight className="w-4 h-4" />
        </Link>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {relatedDentists.map((dentist) => (
          <Link
            key={dentist.slug}
            href={`/dentist/${dentist.slug}`}
            className="group bg-white border rounded-xl p-4 hover:border-primary hover:shadow-md transition-all"
          >
            <div className="flex items-start gap-3">
              <div className="w-14 h-14 bg-gray-100 rounded-lg flex-shrink-0 flex items-center justify-center overflow-hidden">
                {dentist.photo ? (
                  <img
                    src={dentist.photo}
                    alt={dentist.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <svg className="w-8 h-8 text-gray-300" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2C9.5 2 7.5 3 6.5 4.5C5.5 6 5 8 5 10C5 12 5.5 14 6 16C6.5 18 7 20 8 21.5C8.5 22.5 9.5 22 10 21C10.5 20 11 18 11 16C11 15 11.5 14 12 14C12.5 14 13 15 13 16C13 18 13.5 20 14 21C14.5 22 15.5 22.5 16 21.5C17 20 17.5 18 18 16C18.5 14 19 12 19 10C19 8 18.5 6 17.5 4.5C16.5 3 14.5 2 12 2Z" />
                  </svg>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-semibold group-hover:text-primary transition-colors line-clamp-1">
                  {dentist.name}
                </p>
                {dentist.businessType && (
                  <p className="text-sm text-muted-foreground capitalize mt-0.5">
                    {dentist.businessType}
                  </p>
                )}
                <div className="flex items-center gap-2 mt-2">
                  {dentist.rating && (
                    <div className="flex items-center gap-1 bg-amber-50 px-2 py-0.5 rounded text-sm">
                      <Star className="w-3 h-3 text-amber-500 fill-amber-500" />
                      <span className="font-medium text-amber-700">{dentist.rating}</span>
                    </div>
                  )}
                  {dentist.acceptingNewPatients && (
                    <Badge variant="secondary" className="text-xs">
                      New Patients
                    </Badge>
                  )}
                </div>
              </div>
            </div>
            {dentist.address && (
              <div className="flex items-center gap-1 mt-3 text-xs text-muted-foreground">
                <MapPin className="w-3 h-3" />
                <span className="truncate">{dentist.address}</span>
              </div>
            )}
          </Link>
        ))}
      </div>
    </div>
  );
}
