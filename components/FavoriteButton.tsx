'use client';

import { useState, useEffect } from 'react';
import { Heart, Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface FavoriteButtonProps {
  cemeterySlug: string;
  cemeteryName: string;
  variant?: 'hero' | 'card' | 'icon';
  className?: string;
}

export default function FavoriteButton({
  cemeterySlug,
  cemeteryName,
  variant = 'hero',
  className = ''
}: FavoriteButtonProps) {
  const [isFavorite, setIsFavorite] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isToggling, setIsToggling] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);
  const router = useRouter();

  // Check if logged in and if already favorited
  useEffect(() => {
    async function checkStatus() {
      try {
        const response = await fetch(`/api/favorites?slug=${cemeterySlug}`);

        if (response.status === 401) {
          setIsLoggedIn(false);
          setIsLoading(false);
          return;
        }

        if (response.ok) {
          const data = await response.json();
          setIsFavorite(data.isFavorite);
          setIsLoggedIn(true);
        }
      } catch (error) {
        setIsLoggedIn(false);
      } finally {
        setIsLoading(false);
      }
    }

    checkStatus();
  }, [cemeterySlug]);

  const handleClick = async () => {
    // If not logged in, redirect to login with return URL
    if (!isLoggedIn) {
      const returnUrl = encodeURIComponent(window.location.pathname);
      router.push(`/login?redirect=${returnUrl}&action=favorite`);
      return;
    }

    setIsToggling(true);

    try {
      if (isFavorite) {
        // Remove from favorites
        const response = await fetch(`/api/favorites?slug=${cemeterySlug}`, {
          method: 'DELETE',
        });

        if (response.ok) {
          setIsFavorite(false);
        }
      } else {
        // Add to favorites
        const response = await fetch('/api/favorites', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            slug: cemeterySlug,
            name: cemeteryName,
          }),
        });

        if (response.ok) {
          setIsFavorite(true);
        }
      }
    } catch (error) {
    } finally {
      setIsToggling(false);
    }
  };

  // Hero variant (large button in hero section)
  if (variant === 'hero') {
    return (
      <button
        onClick={handleClick}
        disabled={isLoading || isToggling}
        className={`inline-flex items-center justify-center gap-2 px-6 py-3 font-semibold rounded-xl transition-colors border ${
          isFavorite
            ? 'bg-red-500 text-white border-red-400 hover:bg-red-600'
            : 'bg-emerald-600 text-white border-emerald-500 hover:bg-emerald-500'
        } disabled:opacity-50 ${className}`}
      >
        {isLoading || isToggling ? (
          <Loader2 className="w-5 h-5 animate-spin" />
        ) : (
          <Heart className={`w-5 h-5 ${isFavorite ? 'fill-current' : ''}`} />
        )}
        <span>
          {isLoading
            ? 'Loading...'
            : isFavorite
            ? 'Saved'
            : 'Save location'}
        </span>
      </button>
    );
  }

  // Card variant (smaller, for cemetery cards)
  if (variant === 'card') {
    return (
      <button
        onClick={handleClick}
        disabled={isLoading || isToggling}
        className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium rounded-lg transition-colors ${
          isFavorite
            ? 'bg-red-100 text-red-700 hover:bg-red-200'
            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
        } disabled:opacity-50 ${className}`}
      >
        {isToggling ? (
          <Loader2 className="w-4 h-4 animate-spin" />
        ) : (
          <Heart className={`w-4 h-4 ${isFavorite ? 'fill-current text-red-500' : ''}`} />
        )}
        <span>{isFavorite ? 'Saved' : 'Save'}</span>
      </button>
    );
  }

  // Icon variant (just the heart icon)
  return (
    <button
      onClick={handleClick}
      disabled={isLoading || isToggling}
      className={`p-2 rounded-full transition-colors ${
        isFavorite
          ? 'text-red-500 hover:bg-red-100'
          : 'text-gray-400 hover:bg-gray-100 hover:text-gray-600'
      } disabled:opacity-50 ${className}`}
      title={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
    >
      {isToggling ? (
        <Loader2 className="w-5 h-5 animate-spin" />
      ) : (
        <Heart className={`w-5 h-5 ${isFavorite ? 'fill-current' : ''}`} />
      )}
    </button>
  );
}
