'use client';

import { Suspense, useState, useEffect, useCallback } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Search, MapPin, Filter, X, ChevronRight, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import DentistCard from '@/components/DentistCard';
import type { Dentist } from '@/lib/dentist-data';

function SearchContent() {
  const searchParams = useSearchParams();
  const [query, setQuery] = useState(searchParams.get('q') || '');
  const [state, setState] = useState(searchParams.get('state') || '');
  const [type, setType] = useState(searchParams.get('type') || '');
  const [emergency, setEmergency] = useState(searchParams.get('emergency') === 'true');
  const [results, setResults] = useState<Dentist[]>([]);
  const [loading, setLoading] = useState(false);
  const [showFilters, setShowFilters] = useState(false);

  const performSearch = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (query) params.set('q', query);
      if (state) params.set('state', state);
      if (type) params.set('type', type);
      if (emergency) params.set('emergency', 'true');

      const response = await fetch(`/api/search?${params.toString()}`);
      if (response.ok) {
        const data = await response.json();
        setResults(data.dentists || []);
      }
    } catch (error) {
      console.error('Search error:', error);
    } finally {
      setLoading(false);
    }
  }, [query, state, type, emergency]);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (query || state || type || emergency) {
        performSearch();
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [query, state, type, emergency, performSearch]);

  const clearFilters = () => {
    setQuery('');
    setState('');
    setType('');
    setEmergency(false);
  };

  const hasActiveFilters = query || state || type || emergency;

  return (
    <>
      {/* Search Header */}
      <section className="bg-gradient-to-br from-primary to-primary/80 text-white py-12">
        <div className="container mx-auto px-4">
          <nav className="flex items-center gap-2 text-white/80 mb-4 text-sm">
            <Link href="/" className="hover:text-white">Home</Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-white">Search</span>
          </nav>
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            Find a Dentist
          </h1>
          <p className="text-white/90 mb-6">
            Search for dentists by name, city, state, or specialty
          </p>

          {/* Search Box */}
          <div className="max-w-3xl">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search by name, city, or specialty..."
                  className="w-full pl-12 pr-4 py-3 rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-white/50"
                />
              </div>
              <Button
                variant="secondary"
                className="md:hidden"
                onClick={() => setShowFilters(!showFilters)}
              >
                <Filter className="w-4 h-4 mr-2" />
                Filters
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          <aside className={`lg:col-span-1 ${showFilters ? 'block' : 'hidden lg:block'}`}>
            <div className="bg-white rounded-xl border p-6 sticky top-24">
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-semibold text-lg">Filters</h2>
                {hasActiveFilters && (
                  <button
                    onClick={clearFilters}
                    className="text-sm text-primary hover:underline"
                  >
                    Clear all
                  </button>
                )}
              </div>

              {/* State Filter */}
              <div className="mb-6">
                <label className="block text-sm font-medium mb-2">State</label>
                <select
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                  className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
                >
                  <option value="">All States</option>
                  <option value="AL">Alabama</option>
                  <option value="AK">Alaska</option>
                  <option value="AZ">Arizona</option>
                  <option value="CA">California</option>
                  <option value="CO">Colorado</option>
                  <option value="FL">Florida</option>
                  <option value="GA">Georgia</option>
                  <option value="IL">Illinois</option>
                  <option value="NY">New York</option>
                  <option value="TX">Texas</option>
                  {/* Add more states as needed */}
                </select>
              </div>

              {/* Type Filter */}
              <div className="mb-6">
                <label className="block text-sm font-medium mb-2">Specialty</label>
                <select
                  value={type}
                  onChange={(e) => setType(e.target.value)}
                  className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
                >
                  <option value="">All Types</option>
                  <option value="general">General Dentist</option>
                  <option value="cosmetic">Cosmetic Dentist</option>
                  <option value="orthodontist">Orthodontist</option>
                  <option value="pediatric">Pediatric Dentist</option>
                  <option value="oral-surgeon">Oral Surgeon</option>
                  <option value="endodontist">Endodontist</option>
                  <option value="periodontist">Periodontist</option>
                </select>
              </div>

              {/* Emergency Filter */}
              <div className="mb-6">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={emergency}
                    onChange={(e) => setEmergency(e.target.checked)}
                    className="w-4 h-4 rounded border-gray-300 text-primary focus:ring-primary/20"
                  />
                  <span className="text-sm font-medium">Emergency Services Only</span>
                </label>
              </div>

              {/* Close Button (Mobile) */}
              <Button
                variant="outline"
                className="w-full lg:hidden"
                onClick={() => setShowFilters(false)}
              >
                Apply Filters
              </Button>
            </div>
          </aside>

          {/* Results */}
          <main className="lg:col-span-3">
            {/* Results Header */}
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-xl font-bold">
                  {loading ? 'Searching...' : `${results.length} Results`}
                </h2>
                {hasActiveFilters && (
                  <div className="flex flex-wrap gap-2 mt-2">
                    {query && (
                      <span className="inline-flex items-center gap-1 text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">
                        &ldquo;{query}&rdquo;
                        <button onClick={() => setQuery('')}>
                          <X className="w-3 h-3" />
                        </button>
                      </span>
                    )}
                    {state && (
                      <span className="inline-flex items-center gap-1 text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">
                        {state}
                        <button onClick={() => setState('')}>
                          <X className="w-3 h-3" />
                        </button>
                      </span>
                    )}
                    {type && (
                      <span className="inline-flex items-center gap-1 text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">
                        {type}
                        <button onClick={() => setType('')}>
                          <X className="w-3 h-3" />
                        </button>
                      </span>
                    )}
                    {emergency && (
                      <span className="inline-flex items-center gap-1 text-xs bg-red-100 text-red-600 px-2 py-1 rounded-full">
                        Emergency
                        <button onClick={() => setEmergency(false)}>
                          <X className="w-3 h-3" />
                        </button>
                      </span>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Results List */}
            {loading ? (
              <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="bg-white rounded-xl border p-6 animate-pulse">
                    <div className="flex gap-4">
                      <div className="w-48 h-32 bg-gray-200 rounded-lg" />
                      <div className="flex-1 space-y-3">
                        <div className="h-6 bg-gray-200 rounded w-3/4" />
                        <div className="h-4 bg-gray-200 rounded w-1/2" />
                        <div className="h-4 bg-gray-200 rounded w-2/3" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : results.length > 0 ? (
              <div className="space-y-4">
                {results.map((dentist) => (
                  <DentistCard key={dentist.id} dentist={dentist} />
                ))}
              </div>
            ) : hasActiveFilters ? (
              <div className="bg-gray-50 rounded-xl p-12 text-center">
                <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
                  <MapPin className="w-8 h-8 text-gray-400" />
                </div>
                <h3 className="text-xl font-semibold mb-2">No Results Found</h3>
                <p className="text-muted-foreground max-w-md mx-auto mb-4">
                  We couldn&apos;t find any dentists matching your search criteria.
                  Try adjusting your filters or search terms.
                </p>
                <Button variant="outline" onClick={clearFilters}>
                  Clear Filters
                </Button>
              </div>
            ) : (
              <div className="bg-gray-50 rounded-xl p-12 text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Search className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Start Your Search</h3>
                <p className="text-muted-foreground max-w-md mx-auto">
                  Enter a city, zip code, or dentist name to find dental care near you.
                </p>
              </div>
            )}
          </main>
        </div>
      </div>
    </>
  );
}

function SearchLoading() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <Loader2 className="w-8 h-8 animate-spin text-primary" />
    </div>
  );
}

export default function SearchPage() {
  return (
    <div className="bg-background min-h-screen">
      <Suspense fallback={<SearchLoading />}>
        <SearchContent />
      </Suspense>
    </div>
  );
}
