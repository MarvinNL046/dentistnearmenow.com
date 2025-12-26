'use client';

import { useState } from 'react';

interface DentistImageProps {
  src: string | undefined;
  alt: string;
  className?: string;
  placeholderClassName?: string;
}

// Placeholder component for dentist image
function DentistPlaceholder({ className }: { className?: string }) {
  return (
    <div className={`w-full h-full flex items-center justify-center bg-gradient-to-br from-primary/10 to-accent/10 ${className || ''}`}>
      <svg className="w-20 h-20 text-primary/30" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2C9.5 2 7.5 3 6.5 4.5C5.5 6 5 8 5 10C5 12 5.5 14 6 16C6.5 18 7 20 8 21.5C8.5 22.5 9.5 22 10 21C10.5 20 11 18 11 16C11 15 11.5 14 12 14C12.5 14 13 15 13 16C13 18 13.5 20 14 21C14.5 22 15.5 22.5 16 21.5C17 20 17.5 18 18 16C18.5 14 19 12 19 10C19 8 18.5 6 17.5 4.5C16.5 3 14.5 2 12 2Z" />
      </svg>
    </div>
  );
}

export default function DentistImage({ src, alt, className, placeholderClassName }: DentistImageProps) {
  const [imageError, setImageError] = useState(false);

  if (!src || imageError) {
    return <DentistPlaceholder className={placeholderClassName} />;
  }

  return (
    <img
      src={src}
      alt={alt}
      className={className || 'w-full h-full object-cover'}
      onError={() => setImageError(true)}
      loading="lazy"
    />
  );
}
