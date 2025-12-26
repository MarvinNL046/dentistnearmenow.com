import Link from 'next/link';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ExternalLink, Phone, FileText, Flower2 } from 'lucide-react';

interface AffiliatePartner {
  name: string;
  description: string;
  icon: React.ReactNode;
  ctaText: string;
  href: string;
  tag?: string;
}

const partners: AffiliatePartner[] = [
  {
    name: 'Compare Funeral Insurance',
    description: 'Easily compare funeral insurance plans and save on your premium',
    icon: <FileText className="w-6 h-6" />,
    ctaText: 'Compare plans',
    href: '#',
    tag: 'Partner'
  },
  {
    name: 'Local Funeral Homes',
    description: 'Find trusted funeral homes in your area',
    icon: <Phone className="w-6 h-6" />,
    ctaText: 'Request quote',
    href: '#',
    tag: 'Recommended'
  },
  {
    name: 'Order Flowers Online',
    description: 'Order sympathy flowers and wreaths for memorial services',
    icon: <Flower2 className="w-6 h-6" />,
    ctaText: 'Browse selection',
    href: '#',
  }
];

export default function AffiliateSection() {
  return (
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold mb-3">Helpful Services for Families</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            We partner with trusted providers to help you during difficult times.
            Discover services that can support you in planning a memorial service.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {partners.map((partner, index) => (
            <Card key={index} className="p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-start gap-4 mb-4">
                <div className="p-3 bg-primary/10 rounded-lg text-primary">
                  {partner.icon}
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold mb-1">{partner.name}</h3>
                  {partner.tag && (
                    <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded">
                      {partner.tag}
                    </span>
                  )}
                </div>
              </div>

              <p className="text-sm text-gray-600 mb-4">
                {partner.description}
              </p>

              <Button
                variant="outline"
                className="w-full group"
                asChild
              >
                <Link href={partner.href} target="_blank" rel="noopener noreferrer">
                  {partner.ctaText}
                  <ExternalLink className="w-4 h-4 ml-2 group-hover:translate-x-0.5 transition-transform" />
                </Link>
              </Button>
            </Card>
          ))}
        </div>

        <div className="text-center mt-8">
          <p className="text-xs text-gray-500">
            * Some links are affiliate links. We may receive a small commission for purchases made through these links.
          </p>
        </div>
      </div>
    </section>
  );
}
