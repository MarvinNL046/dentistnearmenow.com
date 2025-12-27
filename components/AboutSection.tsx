'use client';

import { useState } from 'react';
import { ChevronDown, ChevronUp, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface AboutSectionProps {
  name: string;
  description: string;
  maxLength?: number;
}

export default function AboutSection({ name, description, maxLength = 300 }: AboutSectionProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const shouldTruncate = description.length > maxLength;
  const displayText = isExpanded || !shouldTruncate
    ? description
    : description.slice(0, maxLength).trim() + '...';

  return (
    <div className="bg-white rounded-xl border p-6">
      {/* Header with icon */}
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
          <Info className="w-5 h-5 text-primary" />
        </div>
        <h2 className="text-xl font-semibold">About {name}</h2>
      </div>

      {/* Description with nice typography */}
      <div className="relative">
        <p className="text-muted-foreground leading-relaxed text-[15px]">
          {displayText}
        </p>

        {/* Gradient fade effect when truncated */}
        {shouldTruncate && !isExpanded && (
          <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-white to-transparent pointer-events-none" />
        )}
      </div>

      {/* Read more/less button */}
      {shouldTruncate && (
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setIsExpanded(!isExpanded)}
          className="mt-3 text-primary hover:text-primary/80 hover:bg-primary/5 -ml-2"
        >
          {isExpanded ? (
            <>
              <ChevronUp className="w-4 h-4 mr-1" />
              Show less
            </>
          ) : (
            <>
              <ChevronDown className="w-4 h-4 mr-1" />
              Read more
            </>
          )}
        </Button>
      )}
    </div>
  );
}
