import { Metadata } from 'next';
import { AlertTriangle } from 'lucide-react';

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

function MedicalDisclaimer() {
  return (
    <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 my-8">
      <div className="flex items-start gap-3">
        <AlertTriangle className="h-5 w-5 text-amber-600 flex-shrink-0 mt-0.5" />
        <div className="text-sm text-amber-800">
          <p className="font-semibold mb-1">Medical Disclaimer</p>
          <p>
            The information provided on this website is for general informational purposes only.
            It is not intended as, and should not be considered, professional dental advice.
            Always consult with a qualified dental professional for diagnosis and treatment of dental conditions.
          </p>
        </div>
      </div>
    </div>
  );
}

export default function GuidesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {children}
      <div className="container mx-auto px-4 max-w-4xl">
        <MedicalDisclaimer />
      </div>
    </>
  );
}
