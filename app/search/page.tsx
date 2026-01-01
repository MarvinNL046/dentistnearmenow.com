'use client';

import { Suspense, useState, useEffect, useCallback } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { Search, MapPin, Filter, X, ChevronRight, Loader2, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import DentistCard from '@/components/DentistCard';
import type { Dentist } from '@/lib/dentist-data';

const ITEMS_PER_PAGE = 12;

const dentistTypes = [
  { value: 'general-dentist', label: 'General Dentist' },
  { value: 'pediatric-dentist', label: 'Pediatric Dentist' },
  { value: 'cosmetic-dentist', label: 'Cosmetic Dentist' },
  { value: 'orthodontist', label: 'Orthodontist' },
  { value: 'oral-surgeon', label: 'Oral Surgeon' },
  { value: 'endodontist', label: 'Endodontist' },
  { value: 'periodontist', label: 'Periodontist' },
  { value: 'prosthodontist', label: 'Prosthodontist' },
  { value: 'emergency-dentist', label: 'Emergency Dentist' },
];

const usStates = [
  { value: 'AL', label: 'Alabama' },
  { value: 'AK', label: 'Alaska' },
  { value: 'AZ', label: 'Arizona' },
  { value: 'AR', label: 'Arkansas' },
  { value: 'CA', label: 'California' },
  { value: 'CO', label: 'Colorado' },
  { value: 'CT', label: 'Connecticut' },
  { value: 'DE', label: 'Delaware' },
  { value: 'FL', label: 'Florida' },
  { value: 'GA', label: 'Georgia' },
  { value: 'HI', label: 'Hawaii' },
  { value: 'ID', label: 'Idaho' },
  { value: 'IL', label: 'Illinois' },
  { value: 'IN', label: 'Indiana' },
  { value: 'IA', label: 'Iowa' },
  { value: 'KS', label: 'Kansas' },
  { value: 'KY', label: 'Kentucky' },
  { value: 'LA', label: 'Louisiana' },
  { value: 'ME', label: 'Maine' },
  { value: 'MD', label: 'Maryland' },
  { value: 'MA', label: 'Massachusetts' },
  { value: 'MI', label: 'Michigan' },
  { value: 'MN', label: 'Minnesota' },
  { value: 'MS', label: 'Mississippi' },
  { value: 'MO', label: 'Missouri' },
  { value: 'MT', label: 'Montana' },
  { value: 'NE', label: 'Nebraska' },
  { value: 'NV', label: 'Nevada' },
  { value: 'NH', label: 'New Hampshire' },
  { value: 'NJ', label: 'New Jersey' },
  { value: 'NM', label: 'New Mexico' },
  { value: 'NY', label: 'New York' },
  { value: 'NC', label: 'North Carolina' },
  { value: 'ND', label: 'North Dakota' },
  { value: 'OH', label: 'Ohio' },
  { value: 'OK', label: 'Oklahoma' },
  { value: 'OR', label: 'Oregon' },
  { value: 'PA', label: 'Pennsylvania' },
  { value: 'RI', label: 'Rhode Island' },
  { value: 'SC', label: 'South Carolina' },
  { value: 'SD', label: 'South Dakota' },
  { value: 'TN', label: 'Tennessee' },
  { value: 'TX', label: 'Texas' },
  { value: 'UT', label: 'Utah' },
  { value: 'VT', label: 'Vermont' },
  { value: 'VA', label: 'Virginia' },
  { value: 'WA', label: 'Washington' },
  { value: 'WV', label: 'West Virginia' },
  { value: 'WI', label: 'Wisconsin' },
  { value: 'WY', label: 'Wyoming' },
  { value: 'DC', label: 'District of Columbia' },
];

function SearchContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [query, setQuery] = useState(searchParams.get('q') || '');
  const [state, setState] = useState(searchParams.get('state') || '');
  const [type, setType] = useState(searchParams.get('type') || '');
  const [emergency, setEmergency] = useState(searchParams.get('emergency') === 'true');
  const [sedation, setSedation] = useState(searchParams.get('sedation') === 'true');
  const [allResults, setAllResults] = useState<Dentist[]>([]);
  const [displayedResults, setDisplayedResults] = useState<Dentist[]>([]);
  const [loading, setLoading] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [page, setPage] = useState(1);

  // Update URL with current filters
  const updateUrl = useCallback(() => {
    const params = new URLSearchParams();
    if (query) params.set('q', query);
    if (state) params.set('state', state);
    if (type) params.set('type', type);
    if (emergency) params.set('emergency', 'true');
    if (sedation) params.set('sedation', 'true');

    const newUrl = params.toString() ? `/search?${params.toString()}` : '/search';
    router.push(newUrl, { scroll: false });
  }, [query, state, type, emergency, sedation, router]);

  const performSearch = useCallback(async () => {
    setLoading(true);
    setPage(1);
    try {
      const params = new URLSearchParams();
      if (query) params.set('q', query);
      if (state) params.set('state', state);
      if (type) params.set('type', type);
      if (emergency) params.set('emergency', 'true');
      if (sedation) params.set('sedation', 'true');

      const response = await fetch(`/api/search?${params.toString()}`);
      if (response.ok) {
        const data = await response.json();
        const results = data.dentists || [];
        setAllResults(results);
        setDisplayedResults(results.slice(0, ITEMS_PER_PAGE));
      }
    } catch (error) {
    } finally {
      setLoading(false);
    }
  }, [query, state, type, emergency, sedation]);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (query || state || type || emergency || sedation) {
        performSearch();
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [query, state, type, emergency, sedation, performSearch]);

  const loadMore = () => {
    setLoadingMore(true);
    const nextPage = page + 1;
    const startIndex = 0;
    const endIndex = nextPage * ITEMS_PER_PAGE;

    setTimeout(() => {
      setDisplayedResults(allResults.slice(startIndex, endIndex));
      setPage(nextPage);
      setLoadingMore(false);
    }, 300);
  };

  const hasMore = displayedResults.length < allResults.length;

  const clearFilters = () => {
    setQuery('');
    setState('');
    setType('');
    setEmergency(false);
    setSedation(false);
    // Also clear the URL
    router.push('/search', { scroll: false });
  };

  const hasActiveFilters = query || state || type || emergency || sedation;

  const getTypeLabel = (value: string) => {
    const found = dentistTypes.find(t => t.value === value);
    return found?.label || value;
  };

  const getStateLabel = (value: string) => {
    const found = usStates.find(s => s.value === value);
    return found?.label || value;
  };

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
                  {usStates.map((s) => (
                    <option key={s.value} value={s.value}>{s.label}</option>
                  ))}
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
                  {dentistTypes.map((t) => (
                    <option key={t.value} value={t.value}>{t.label}</option>
                  ))}
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

              {/* Sedation/Anxiety-Friendly Filter */}
              <div className="mb-6">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={sedation}
                    onChange={(e) => setSedation(e.target.checked)}
                    className="w-4 h-4 rounded border-gray-300 text-primary focus:ring-primary/20"
                  />
                  <span className="text-sm font-medium">Anxiety-Friendly / Sedation Available</span>
                </label>
              </div>

              {/* Apply Filters Button */}
              <Button
                variant="default"
                className="w-full"
                onClick={() => {
                  updateUrl();
                  setShowFilters(false);
                }}
              >
                <Filter className="w-4 h-4 mr-2" />
                Apply Filters
              </Button>

              {/* Close Button (Mobile) - without applying */}
              <Button
                variant="ghost"
                className="w-full mt-2 lg:hidden"
                onClick={() => setShowFilters(false)}
              >
                Cancel
              </Button>
            </div>
          </aside>

          {/* Results */}
          <main className="lg:col-span-3">
            {/* Results Header */}
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-xl font-bold">
                  {loading ? 'Searching...' : `${allResults.length} Results`}
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
                        {getStateLabel(state)}
                        <button onClick={() => setState('')}>
                          <X className="w-3 h-3" />
                        </button>
                      </span>
                    )}
                    {type && (
                      <span className="inline-flex items-center gap-1 text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">
                        {getTypeLabel(type)}
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
                    {sedation && (
                      <span className="inline-flex items-center gap-1 text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded-full">
                        Anxiety-Friendly
                        <button onClick={() => setSedation(false)}>
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
            ) : displayedResults.length > 0 ? (
              <>
                <div className="space-y-4">
                  {displayedResults.map((dentist) => (
                    <DentistCard key={dentist.id} dentist={dentist} />
                  ))}
                </div>

                {/* Load More Button */}
                {hasMore && (
                  <div className="mt-8 text-center">
                    <Button
                      variant="outline"
                      size="lg"
                      onClick={loadMore}
                      disabled={loadingMore}
                      className="min-w-[200px]"
                    >
                      {loadingMore ? (
                        <>
                          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                          Loading...
                        </>
                      ) : (
                        <>
                          <ChevronDown className="w-4 h-4 mr-2" />
                          Load More ({allResults.length - displayedResults.length} remaining)
                        </>
                      )}
                    </Button>
                  </div>
                )}

                {/* Results count */}
                <p className="text-center text-sm text-muted-foreground mt-4">
                  Showing {displayedResults.length} of {allResults.length} results
                </p>
              </>
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
