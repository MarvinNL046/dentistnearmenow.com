'use client';

import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { getFaqCemeteriesAnswer } from '@/lib/stats-config';

interface FAQItem {
  question: string;
  answer: string;
}

const faqItems: FAQItem[] = [
  {
    question: "How many cemeteries are there in the United States?",
    answer: getFaqCemeteriesAnswer()
  },
  {
    question: "What is the average cost of a burial in the US?",
    answer: "The average cost of a traditional burial in the US ranges from $7,000 to $12,000. This includes the casket, funeral services, burial plot, and headstone. Cremation is typically more affordable, averaging $4,000 to $7,000."
  },
  {
    question: "What's the difference between a cemetery and a memorial park?",
    answer: "A traditional cemetery typically has upright headstones and monuments, while a memorial park features flat, lawn-level markers for a more uniform appearance. Memorial parks often include landscaped gardens and communal areas."
  },
  {
    question: "Can I buy a burial plot in any cemetery?",
    answer: "Yes, in most cases you can purchase a burial plot at any public or private cemetery. Some cemeteries may have residency requirements or religious affiliations. National cemeteries are reserved for veterans and eligible family members."
  },
  {
    question: "What are green or natural burial cemeteries?",
    answer: "Green burial cemeteries focus on environmentally friendly practices. Bodies are not embalmed, biodegradable caskets or shrouds are used, and grave markers are often natural stones or trees. These cemeteries preserve natural habitats."
  },
  {
    question: "How long do burial rights last?",
    answer: "Most cemetery plots are sold in perpetuity, meaning the burial rights last forever. However, some cemeteries offer term leases of 25, 50, or 99 years. Maintenance fees may be required annually or as a one-time perpetual care payment."
  }
];

export default function FAQSection() {
  const [openItems, setOpenItems] = useState<number[]>([]);

  const toggleItem = (index: number) => {
    setOpenItems(prev =>
      prev.includes(index)
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };

  // JSON-LD structured data for FAQ
  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqItems.map(item => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  };

  return (
    <section className="py-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-bold text-center mb-8">Frequently Asked Questions</h2>
        <div className="max-w-3xl mx-auto space-y-4">
          {faqItems.map((item, index) => (
            <Card key={index} className="overflow-hidden">
              <button
                onClick={() => toggleItem(index)}
                className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-50 transition-colors"
              >
                <span className="font-medium">{item.question}</span>
                {openItems.includes(index) ? (
                  <ChevronUp className="w-5 h-5 text-gray-500" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-gray-500" />
                )}
              </button>
              {openItems.includes(index) && (
                <div className="px-6 pb-4 pt-0">
                  <p className="text-gray-600">{item.answer}</p>
                </div>
              )}
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
