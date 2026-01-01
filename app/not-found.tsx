import Link from 'next/link';
import { Metadata } from 'next';
import { Home, Search, MapPin, AlertTriangle, ArrowLeft } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Page Not Found',
  description: 'The page you are looking for could not be found. Search for dentists near you or browse by state.',
  robots: {
    index: false,
    follow: true,
  },
};

const popularStates = [
  { name: 'California', slug: 'california' },
  { name: 'Texas', slug: 'texas' },
  { name: 'Florida', slug: 'florida' },
  { name: 'New York', slug: 'new-york' },
  { name: 'Pennsylvania', slug: 'pennsylvania' },
  { name: 'Illinois', slug: 'illinois' },
];

export default function NotFound() {
  return (
    <div className="min-h-[70vh] bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-2xl mx-auto text-center">
          {/* 404 Icon */}
          <div className="mb-8">
            <div className="inline-flex items-center justify-center w-24 h-24 bg-primary/10 rounded-full mb-6">
              <svg
                className="w-16 h-16 text-primary"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M12 2C9.5 2 7.5 3 6.5 4.5C5.5 6 5 8 5 10C5 12 5.5 14 6 16C6.5 18 7 20 8 21.5C8.5 22.5 9.5 22 10 21C10.5 20 11 18 11 16C11 15 11.5 14 12 14C12.5 14 13 15 13 16C13 18 13.5 20 14 21C14.5 22 15.5 22.5 16 21.5C17 20 17.5 18 18 16C18.5 14 19 12 19 10C19 8 18.5 6 17.5 4.5C16.5 3 14.5 2 12 2Z" />
              </svg>
            </div>
            <h1 className="text-6xl font-bold text-gray-900 mb-2">404</h1>
            <h2 className="text-2xl font-semibold text-gray-700 mb-4">Page Not Found</h2>
            <p className="text-muted-foreground text-lg max-w-md mx-auto">
              Oops! The page you&apos;re looking for seems to have gone missing.
              Let&apos;s help you find a dentist instead.
            </p>
          </div>

          {/* Search Box */}
          <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
            <p className="text-sm text-muted-foreground mb-4">Search for dentists in your area</p>
            <form action="/search" method="GET" className="flex gap-2">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  name="q"
                  placeholder="City, state, or dentist name..."
                  className="w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none"
                />
              </div>
              <button
                type="submit"
                className="px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 font-medium transition-colors"
              >
                Search
              </button>
            </form>
          </div>

          {/* Quick Actions */}
          <div className="grid sm:grid-cols-3 gap-4 mb-12">
            <Link
              href="/"
              className="flex items-center justify-center gap-2 p-4 bg-white border rounded-xl hover:border-primary hover:shadow-md transition-all group"
            >
              <Home className="w-5 h-5 text-primary" />
              <span className="font-medium group-hover:text-primary transition-colors">Home</span>
            </Link>
            <Link
              href="/state"
              className="flex items-center justify-center gap-2 p-4 bg-white border rounded-xl hover:border-primary hover:shadow-md transition-all group"
            >
              <MapPin className="w-5 h-5 text-primary" />
              <span className="font-medium group-hover:text-primary transition-colors">Browse States</span>
            </Link>
            <Link
              href="/emergency-dentist"
              className="flex items-center justify-center gap-2 p-4 bg-white border rounded-xl hover:border-primary hover:shadow-md transition-all group"
            >
              <AlertTriangle className="w-5 h-5 text-red-500" />
              <span className="font-medium group-hover:text-primary transition-colors">Emergency</span>
            </Link>
          </div>

          {/* Popular States */}
          <div className="text-left">
            <h3 className="text-lg font-semibold mb-4 text-center">Popular States</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {popularStates.map((state) => (
                <Link
                  key={state.slug}
                  href={`/state/${state.slug}`}
                  className="flex items-center gap-2 p-3 bg-white border rounded-lg hover:border-primary hover:shadow-sm transition-all group"
                >
                  <MapPin className="w-4 h-4 text-primary" />
                  <span className="text-sm font-medium group-hover:text-primary transition-colors">
                    {state.name}
                  </span>
                </Link>
              ))}
            </div>
          </div>

          {/* Back Button */}
          <div className="mt-12">
            <Link
              href="/"
              className="inline-flex items-center gap-2 px-4 py-2 border rounded-md hover:bg-gray-50 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Go Back Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
