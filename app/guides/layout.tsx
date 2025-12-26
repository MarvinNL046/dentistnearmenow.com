import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Dental Guides - Expert Tips for Oral Health | Dentist Near Me Now',
  description: 'Comprehensive dental health guides written by experts. Learn about choosing a dentist, dental insurance, oral care tips, cosmetic dentistry, and more. Your trusted source for dental health information.',
  keywords: ['dental health guide', 'oral care tips', 'dental advice', 'tooth care', 'dental insurance guide', 'how to choose a dentist', 'dental anxiety help', 'oral hygiene tips'],
  openGraph: {
    title: 'Dental Guides - Expert Tips for Oral Health',
    description: 'Comprehensive dental health guides written by experts. Your trusted source for dental health information.',
    type: 'website',
  },
};

export default function GuidesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
