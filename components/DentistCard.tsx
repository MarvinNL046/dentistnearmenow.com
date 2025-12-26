import Link from 'next/link';
import { MapPin, Phone, Star, Clock, CheckCircle } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import type { Dentist } from '@/lib/dentist-data';

interface DentistCardProps {
  dentist: Dentist;
  showDistance?: boolean;
  distance?: number;
}

export default function DentistCard({ dentist, showDistance, distance }: DentistCardProps) {
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      <CardContent className="p-0">
        <div className="flex flex-col sm:flex-row">
          {/* Image */}
          <div className="sm:w-48 h-40 sm:h-auto bg-gray-100 flex-shrink-0">
            {dentist.photo ? (
              <img
                src={dentist.photo}
                alt={dentist.name}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary/10 to-accent/10">
                <svg className="w-16 h-16 text-primary/30" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C9.5 2 7.5 3 6.5 4.5C5.5 6 5 8 5 10C5 12 5.5 14 6 16C6.5 18 7 20 8 21.5C8.5 22.5 9.5 22 10 21C10.5 20 11 18 11 16C11 15 11.5 14 12 14C12.5 14 13 15 13 16C13 18 13.5 20 14 21C14.5 22 15.5 22.5 16 21.5C17 20 17.5 18 18 16C18.5 14 19 12 19 10C19 8 18.5 6 17.5 4.5C16.5 3 14.5 2 12 2Z" />
                </svg>
              </div>
            )}
          </div>

          {/* Content */}
          <div className="flex-1 p-4">
            <div className="flex flex-wrap items-start justify-between gap-2 mb-2">
              <div>
                <Link
                  href={`/dentist/${dentist.slug}`}
                  className="text-lg font-semibold text-foreground hover:text-primary transition-colors line-clamp-1"
                >
                  {dentist.name}
                </Link>
                {dentist.businessType && (
                  <p className="text-sm text-muted-foreground capitalize">
                    {dentist.businessType}
                  </p>
                )}
              </div>

              {/* Rating */}
              {dentist.rating && (
                <div className="flex items-center gap-1 bg-amber-50 px-2 py-1 rounded-lg">
                  <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
                  <span className="font-medium text-amber-700">{dentist.rating}</span>
                  {dentist.reviewCount && (
                    <span className="text-xs text-amber-600">({dentist.reviewCount})</span>
                  )}
                </div>
              )}
            </div>

            {/* Address */}
            {(dentist.address || dentist.city) && (
              <div className="flex items-start gap-2 text-sm text-muted-foreground mb-2">
                <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <span className="line-clamp-1">
                  {dentist.address ? `${dentist.address}, ` : ''}{dentist.city}, {dentist.stateAbbr}
                </span>
              </div>
            )}

            {/* Phone */}
            {dentist.phone && (
              <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                <Phone className="w-4 h-4 flex-shrink-0" />
                <a href={`tel:${dentist.phone}`} className="hover:text-primary">
                  {dentist.phone}
                </a>
              </div>
            )}

            {/* Distance */}
            {showDistance && distance !== undefined && (
              <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                <Clock className="w-4 h-4 flex-shrink-0" />
                <span>{distance.toFixed(1)} miles away</span>
              </div>
            )}

            {/* Badges */}
            <div className="flex flex-wrap gap-2 mt-3">
              {dentist.acceptingNewPatients && (
                <Badge variant="secondary" className="text-xs">
                  <CheckCircle className="w-3 h-3 mr-1" />
                  Accepting New Patients
                </Badge>
              )}
              {dentist.emergencyServices && (
                <Badge variant="destructive" className="text-xs">
                  Emergency Services
                </Badge>
              )}
              {dentist.specialties?.slice(0, 2).map((specialty) => (
                <Badge key={specialty} variant="outline" className="text-xs">
                  {specialty}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
