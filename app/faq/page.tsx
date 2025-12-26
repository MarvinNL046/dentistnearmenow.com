import { Metadata } from 'next';
import Link from 'next/link';
import { ChevronRight, HelpCircle, Search, Users, CreditCard, Shield, Phone } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Frequently Asked Questions - DentistNearMeNow.com',
  description: 'Find answers to common questions about finding a dentist, using our directory, dental insurance, and more.',
};

const faqCategories = [
  {
    title: 'Using Our Directory',
    icon: Search,
    faqs: [
      {
        q: 'How do I find a dentist near me?',
        a: 'Use our search feature at the top of the page to search by city, state, or zip code. You can also browse dentists by state from our homepage or states page. Our directory includes general dentists, specialists, and emergency dental providers across all 50 states.',
      },
      {
        q: 'Is DentistNearMeNow.com free to use?',
        a: 'Yes, our dentist directory is completely free for patients. You can search for dentists, view their profiles, read reviews, and get contact information at no cost.',
      },
      {
        q: 'How do I know if a dentist is accepting new patients?',
        a: 'Many dentist profiles on our site indicate whether they are currently accepting new patients. However, we recommend calling the dental office directly to confirm availability and schedule an appointment.',
      },
      {
        q: 'How accurate is the information on your site?',
        a: 'We strive to maintain accurate, up-to-date information for all listings. Our data is regularly updated, but we recommend verifying important details like office hours and contact information directly with the dental practice.',
      },
    ],
  },
  {
    title: 'For Dental Professionals',
    icon: Users,
    faqs: [
      {
        q: 'How can I add or claim my dental practice listing?',
        a: 'Dental professionals can claim their listing by visiting our "For Dentists" page and completing the verification process. This allows you to update your practice information, add photos, and respond to reviews.',
      },
      {
        q: 'How do I update incorrect information on my listing?',
        a: 'If you\'re a verified practice owner, you can update your information through your dashboard. If you haven\'t claimed your listing yet, please contact us and we\'ll assist you with the update.',
      },
      {
        q: 'Is there a fee for dentists to be listed?',
        a: 'Basic listings are free. We offer premium features for dental practices that want enhanced visibility and additional profile features. Contact us for more information about premium listing options.',
      },
    ],
  },
  {
    title: 'Dental Insurance',
    icon: CreditCard,
    faqs: [
      {
        q: 'Do you show which insurance plans dentists accept?',
        a: 'Yes, when available, we display the insurance plans accepted by each dental practice on their profile page. However, insurance acceptance can change, so we recommend confirming with the dental office before your visit.',
      },
      {
        q: 'Can I search for dentists that accept my insurance?',
        a: 'Currently, you can view insurance information on individual dentist profiles. We\'re working on adding an insurance filter to our search functionality for easier matching.',
      },
    ],
  },
  {
    title: 'Emergency Dental Care',
    icon: Phone,
    faqs: [
      {
        q: 'How do I find an emergency dentist?',
        a: 'Visit our Emergency Dentist page to find dental providers offering emergency services in your area. You can also call 1-800-DENTIST for immediate assistance in locating emergency dental care.',
      },
      {
        q: 'What qualifies as a dental emergency?',
        a: 'Dental emergencies include severe toothaches, knocked-out teeth, broken or cracked teeth, dental abscesses (infections), uncontrolled bleeding, and any facial swelling that affects breathing or swallowing.',
      },
      {
        q: 'Do all dentists offer emergency services?',
        a: 'No, not all dentists offer emergency services. Our Emergency Dentist page specifically lists dental providers who offer urgent care and may have extended hours or on-call services.',
      },
    ],
  },
  {
    title: 'Privacy & Security',
    icon: Shield,
    faqs: [
      {
        q: 'How do you protect my privacy?',
        a: 'We take your privacy seriously. We don\'t share your personal information with third parties without your consent. Please review our Privacy Policy for complete details on how we handle your data.',
      },
      {
        q: 'Do I need to create an account to use the site?',
        a: 'No, you can search for dentists and view listings without creating an account. An account is only needed if you want to save favorites, write reviews, or claim a dental practice listing.',
      },
    ],
  },
];

export default function FAQPage() {
  return (
    <div className="bg-background">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary to-primary/80 text-white py-16">
        <div className="container mx-auto px-4">
          <nav className="flex items-center gap-2 text-white/80 mb-4 text-sm">
            <Link href="/" className="hover:text-white">Home</Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-white">FAQ</span>
          </nav>
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Frequently Asked Questions
            </h1>
            <p className="text-xl text-white/90">
              Find answers to common questions about finding a dentist, using our directory,
              and more.
            </p>
          </div>
        </div>
      </section>

      {/* Quick Links */}
      <section className="py-8 border-b">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap gap-4 justify-center">
            {faqCategories.map((category) => {
              const Icon = category.icon;
              return (
                <a
                  key={category.title}
                  href={`#${category.title.toLowerCase().replace(/\s+/g, '-')}`}
                  className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  <Icon className="w-4 h-4 text-primary" />
                  <span className="text-sm font-medium">{category.title}</span>
                </a>
              );
            })}
          </div>
        </div>
      </section>

      {/* FAQ Content */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {faqCategories.map((category) => {
              const Icon = category.icon;
              return (
                <div
                  key={category.title}
                  id={category.title.toLowerCase().replace(/\s+/g, '-')}
                  className="mb-12"
                >
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                      <Icon className="w-5 h-5 text-primary" />
                    </div>
                    <h2 className="text-2xl font-bold">{category.title}</h2>
                  </div>

                  <div className="space-y-4">
                    {category.faqs.map((faq, i) => (
                      <div key={i} className="bg-white p-6 rounded-xl border">
                        <h3 className="font-semibold mb-2 flex items-start gap-2">
                          <HelpCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                          {faq.q}
                        </h3>
                        <p className="text-muted-foreground pl-7">{faq.a}</p>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Still Have Questions */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold mb-4">Still Have Questions?</h2>
          <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
            Can&apos;t find the answer you&apos;re looking for? Our team is here to help.
          </p>
          <Link href="/contact">
            <button className="px-6 py-3 bg-primary text-white rounded-lg font-medium hover:bg-primary/90 transition-colors">
              Contact Us
            </button>
          </Link>
        </div>
      </section>
    </div>
  );
}
