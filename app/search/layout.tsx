import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Find a Dentist | Search Dental Care Providers',
  description: 'Search for dentists by name, city, state, or specialty. Find the right dental care provider near you.',
  robots: {
    index: false,
    follow: true,
  },
};

export default function SearchLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
