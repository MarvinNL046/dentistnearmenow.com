'use client';

import { useEffect, useRef, useState } from 'react';

type AdFormat = 'display' | 'in-article' | 'in-feed' | 'multiplex';
type AdLayout = 'horizontal' | 'vertical' | 'rectangle';

// Ad slot IDs for tracking different placements
// These should be created in your AdSense dashboard
export const AD_SLOTS = {
  // High-visibility placements
  LEADERBOARD_TOP: '1234567890',      // Below header/hero
  LEADERBOARD_BOTTOM: '1234567891',   // Before footer

  // Content placements
  IN_ARTICLE: '1234567892',           // Within article content
  IN_FEED: '1234567893',              // Between list items

  // Sidebar placements
  SIDEBAR_TOP: '1234567894',          // Top of sidebar
  SIDEBAR_STICKY: '1234567895',       // Sticky sidebar

  // Page-specific
  DENTIST_SIDEBAR: '1234567896',      // Dentist detail page sidebar
  CITY_RESULTS: '1234567897',         // City search results

  // Auto ads (no specific slot)
  AUTO: undefined,
} as const;

interface AdUnitProps {
  slot?: string; // Ad slot ID (optional for auto ads)
  format?: AdFormat;
  layout?: AdLayout;
  className?: string;
  responsive?: boolean;
  style?: 'display' | 'in-article' | 'in-feed' | 'matched-content';
  testMode?: boolean; // Show placeholder in development
}

export default function AdUnit({
  slot,
  format = 'display',
  layout = 'horizontal',
  className = '',
  responsive = true,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  style = 'display'
}: AdUnitProps) {
  const adRef = useRef<HTMLDivElement>(null);
  const isAdLoaded = useRef(false);
  const [hasConsent, setHasConsent] = useState(false);

  // Check for advertising consent
  useEffect(() => {
    const checkConsent = () => {
      const savedConsent = localStorage.getItem('cookieConsent');
      if (savedConsent) {
        try {
          const parsed = JSON.parse(savedConsent);
          setHasConsent(parsed.advertising === true);
        } catch {
          setHasConsent(false);
        }
      }
    };

    checkConsent();

    // Listen for consent updates from CookieConsent component
    const handleConsentUpdate = (e: Event) => {
      const customEvent = e as CustomEvent;
      setHasConsent(customEvent.detail?.advertising === true);
    };

    window.addEventListener('cookieConsentUpdated', handleConsentUpdate);
    return () => {
      window.removeEventListener('cookieConsentUpdated', handleConsentUpdate);
    };
  }, []);

  useEffect(() => {
    // Only load ad if consent is given and not already loaded
    if (!hasConsent || isAdLoaded.current) return;

    try {
      // Check if adsbygoogle is available
      if (typeof window !== 'undefined' && (window as any).adsbygoogle) {
        ((window as any).adsbygoogle = (window as any).adsbygoogle || []).push({});
        isAdLoaded.current = true;
      }
    } catch (err) {
      console.error('AdSense error:', err);
    }
  }, [hasConsent]);

  // Get dimensions based on layout
  const getDimensions = () => {
    switch (layout) {
      case 'horizontal':
        return { minHeight: '90px' };
      case 'vertical':
        return { minHeight: '600px' };
      case 'rectangle':
        return { minHeight: '250px' };
      default:
        return { minHeight: '90px' };
    }
  };

  const dimensions = getDimensions();

  // Don't render ad container if no consent
  if (!hasConsent) {
    return null;
  }

  return (
    <div
      ref={adRef}
      className={`ad-container overflow-hidden ${className}`}
      style={{
        ...dimensions,
        display: 'block',
        width: '100%',
        textAlign: 'center'
      }}
    >
      <ins
        className="adsbygoogle"
        style={{
          display: 'block',
          width: '100%',
          height: '100%',
          minHeight: dimensions.minHeight
        }}
        data-ad-client="ca-pub-9667530069853985"
        data-ad-slot={slot}
        data-ad-format={responsive ? 'auto' : format}
        data-full-width-responsive={responsive ? 'true' : 'false'}
      />
    </div>
  );
}

// Specific ad components for easy use

// In-article ad - for within content sections
export function InArticleAd({ className = '' }: { className?: string }) {
  return (
    <div className={`my-8 ${className}`}>
      <p className="text-xs text-muted-foreground/50 text-center mb-2">Advertisement</p>
      <AdUnit slot={AD_SLOTS.IN_ARTICLE} format="in-article" layout="horizontal" style="in-article" />
    </div>
  );
}

// Sidebar ad - sticky rectangle for sidebars
export function SidebarAd({ className = '' }: { className?: string }) {
  return (
    <div className={`sticky top-24 ${className}`}>
      <p className="text-xs text-muted-foreground/50 text-center mb-2">Advertisement</p>
      <AdUnit slot={AD_SLOTS.SIDEBAR_STICKY} format="display" layout="rectangle" />
    </div>
  );
}

// In-feed ad - between list items (dentist cards, search results)
export function InFeedAd({ className = '' }: { className?: string }) {
  return (
    <div className={`${className} bg-white rounded-xl border p-4`}>
      <p className="text-xs text-muted-foreground/50 text-center mb-2">Sponsored</p>
      <AdUnit slot={AD_SLOTS.IN_FEED} format="in-feed" layout="horizontal" style="in-feed" />
    </div>
  );
}

// Leaderboard ad - full-width horizontal banner
export function LeaderboardAd({ className = '', position = 'top' }: { className?: string; position?: 'top' | 'bottom' }) {
  return (
    <div className={`py-4 bg-gray-50 ${className}`}>
      <div className="container mx-auto px-4">
        <p className="text-xs text-muted-foreground/50 text-center mb-2">Advertisement</p>
        <AdUnit
          slot={position === 'top' ? AD_SLOTS.LEADERBOARD_TOP : AD_SLOTS.LEADERBOARD_BOTTOM}
          format="display"
          layout="horizontal"
        />
      </div>
    </div>
  );
}

// Footer ad - before footer section
export function FooterAd({ className = '' }: { className?: string }) {
  return (
    <div className={`py-8 bg-muted/20 ${className}`}>
      <div className="container mx-auto px-4">
        <p className="text-xs text-muted-foreground/50 text-center mb-2">Advertisement</p>
        <AdUnit slot={AD_SLOTS.LEADERBOARD_BOTTOM} format="display" layout="horizontal" />
      </div>
    </div>
  );
}

// Multiplex ad - grid of recommended content-style ads
export function MultiplexAd({ className = '' }: { className?: string }) {
  return (
    <div className={`py-8 ${className}`}>
      <div className="container mx-auto px-4">
        <h3 className="text-lg font-semibold mb-4">You might also like</h3>
        <AdUnit format="multiplex" layout="horizontal" />
      </div>
    </div>
  );
}

// Mobile banner ad - optimized for mobile screens
export function MobileBannerAd({ className = '' }: { className?: string }) {
  return (
    <div className={`md:hidden py-4 ${className}`}>
      <p className="text-xs text-muted-foreground/50 text-center mb-1">Ad</p>
      <AdUnit format="display" layout="horizontal" responsive={true} />
    </div>
  );
}
