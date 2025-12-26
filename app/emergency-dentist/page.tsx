import { Metadata } from 'next';
import Link from 'next/link';
import { Phone, Clock, AlertTriangle, MapPin, CheckCircle, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { US_STATES, getEmergencyDentists } from '@/lib/dentist-data';

export const metadata: Metadata = {
  title: 'Emergency Dentist Near Me - 24 Hour Dental Care',
  description: 'Find an emergency dentist near you available 24/7. Get immediate care for toothaches, broken teeth, dental infections, and other dental emergencies. Find urgent dental care in your area.',
  keywords: 'emergency dentist, 24 hour dentist, urgent dental care, dental emergency, toothache, broken tooth, dental pain',
};

const emergencySymptoms = [
  {
    title: 'Severe Toothache',
    description: 'Intense, persistent tooth pain that may indicate infection or abscess',
    urgent: true,
  },
  {
    title: 'Knocked-Out Tooth',
    description: 'A tooth that has been completely dislodged from its socket',
    urgent: true,
  },
  {
    title: 'Broken or Cracked Tooth',
    description: 'Visible damage to tooth structure from injury or biting hard objects',
    urgent: true,
  },
  {
    title: 'Dental Abscess',
    description: 'Swelling, fever, and pus indicating a serious bacterial infection',
    urgent: true,
  },
  {
    title: 'Lost Filling or Crown',
    description: 'Exposed tooth structure that may cause pain or sensitivity',
    urgent: false,
  },
  {
    title: 'Bleeding Gums',
    description: 'Excessive or prolonged bleeding that won\'t stop',
    urgent: false,
  },
];

const emergencyTips = [
  {
    title: 'For a Knocked-Out Tooth',
    tips: [
      'Pick up the tooth by the crown (top), not the root',
      'Rinse gently with water if dirty, but do not scrub',
      'Try to place the tooth back in the socket',
      'If not possible, store in milk or saliva',
      'See a dentist within 30 minutes for best results',
    ],
  },
  {
    title: 'For a Severe Toothache',
    tips: [
      'Rinse mouth with warm salt water',
      'Use dental floss to remove any trapped food',
      'Apply a cold compress to reduce swelling',
      'Take over-the-counter pain relievers as directed',
      'Do not apply aspirin directly to the tooth',
    ],
  },
  {
    title: 'For a Broken Tooth',
    tips: [
      'Rinse mouth with warm water',
      'Apply gauze to any bleeding area for 10 minutes',
      'Apply a cold pack to reduce swelling',
      'Save any tooth fragments if possible',
      'See a dentist as soon as possible',
    ],
  },
];

export default async function EmergencyDentistPage() {
  const emergencyDentists = await getEmergencyDentists();
  const dentistCount = emergencyDentists.length;

  // Group states by region for the directory
  const popularStates = US_STATES.filter(s =>
    ['CA', 'TX', 'FL', 'NY', 'PA', 'IL', 'OH', 'GA', 'NC', 'MI'].includes(s.abbr)
  );

  return (
    <div className="bg-background">
      {/* Hero Section */}
      <section className="bg-red-600 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-white/20 px-4 py-2 rounded-full mb-6">
              <AlertTriangle className="w-5 h-5" />
              <span className="font-medium">Dental Emergency?</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Find an Emergency Dentist Near You
            </h1>
            <p className="text-xl text-white/90 mb-8">
              Get immediate dental care for toothaches, broken teeth, and dental emergencies.
              Many dentists offer same-day emergency appointments.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="tel:1-800-DENTIST">
                <Button size="lg" className="bg-white text-red-600 hover:bg-gray-100">
                  <Phone className="w-5 h-5 mr-2" />
                  Call 1-800-DENTIST
                </Button>
              </a>
              <Link href="/search?emergency=true">
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                  <MapPin className="w-5 h-5 mr-2" />
                  Find Nearby Emergency Dentist
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="bg-red-700 text-white py-6">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-8 text-center">
            <div>
              <div className="text-3xl font-bold">{dentistCount}+</div>
              <div className="text-white/80 text-sm">Emergency Dentists</div>
            </div>
            <div>
              <div className="text-3xl font-bold">50</div>
              <div className="text-white/80 text-sm">States Covered</div>
            </div>
            <div>
              <div className="text-3xl font-bold">24/7</div>
              <div className="text-white/80 text-sm">Emergency Care</div>
            </div>
          </div>
        </div>
      </section>

      {/* What Qualifies as Emergency */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-4">
              What is a Dental Emergency?
            </h2>
            <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
              Not all dental problems require immediate care. Here are common situations
              that warrant emergency dental treatment.
            </p>

            <div className="grid md:grid-cols-2 gap-4">
              {emergencySymptoms.map((symptom) => (
                <div
                  key={symptom.title}
                  className={`p-6 rounded-xl border ${
                    symptom.urgent
                      ? 'border-red-200 bg-red-50'
                      : 'border-amber-200 bg-amber-50'
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                      symptom.urgent ? 'bg-red-100' : 'bg-amber-100'
                    }`}>
                      <AlertTriangle className={`w-5 h-5 ${
                        symptom.urgent ? 'text-red-600' : 'text-amber-600'
                      }`} />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">{symptom.title}</h3>
                      <p className={`text-sm ${
                        symptom.urgent ? 'text-red-700' : 'text-amber-700'
                      }`}>
                        {symptom.description}
                      </p>
                      {symptom.urgent && (
                        <span className="inline-block mt-2 text-xs font-medium text-red-600 bg-red-100 px-2 py-1 rounded">
                          Seek immediate care
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Emergency Tips */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-4">
              What To Do In a Dental Emergency
            </h2>
            <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
              While waiting to see a dentist, these first aid tips can help manage
              your dental emergency.
            </p>

            <div className="grid md:grid-cols-3 gap-6">
              {emergencyTips.map((tip) => (
                <div key={tip.title} className="bg-white p-6 rounded-xl border">
                  <h3 className="font-semibold text-lg mb-4">{tip.title}</h3>
                  <ul className="space-y-2">
                    {tip.tips.map((t, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                        <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                        <span>{t}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Find by State */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-4">
            Find Emergency Dentists by State
          </h2>
          <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
            Browse our directory of emergency dental providers across the United States.
          </p>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 max-w-4xl mx-auto mb-8">
            {popularStates.map((state) => (
              <Link
                key={state.abbr}
                href={`/state/${state.slug}`}
                className="p-4 bg-white rounded-xl border hover:border-primary hover:shadow-lg transition-all text-center group"
              >
                <p className="font-semibold group-hover:text-primary">{state.name}</p>
                <p className="text-sm text-muted-foreground">{state.abbr}</p>
              </Link>
            ))}
          </div>

          <div className="text-center">
            <Link href="/state">
              <Button variant="outline" size="lg">
                View All States
                <ChevronRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* When to Go to ER */}
      <section className="py-16 bg-red-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-start gap-4 mb-6">
              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0">
                <AlertTriangle className="w-6 h-6 text-red-600" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-red-900">
                  When to Go to the Emergency Room
                </h2>
                <p className="text-red-700 mt-2">
                  Some dental emergencies may require a visit to the hospital emergency room
                  instead of a dentist:
                </p>
              </div>
            </div>

            <ul className="grid md:grid-cols-2 gap-4">
              {[
                'Uncontrolled bleeding from the mouth',
                'Difficulty breathing or swallowing',
                'Facial swelling affecting your ability to breathe',
                'Trauma to the face or jaw with suspected fractures',
                'Signs of infection with fever over 101F',
                'Loss of consciousness after dental injury',
              ].map((item) => (
                <li key={item} className="flex items-center gap-3 bg-white p-4 rounded-lg">
                  <div className="w-2 h-2 bg-red-600 rounded-full" />
                  <span className="text-red-800">{item}</span>
                </li>
              ))}
            </ul>

            <div className="mt-8 p-4 bg-red-100 rounded-lg">
              <p className="text-red-800 font-medium text-center">
                If you experience any of these symptoms, call 911 or go to your nearest emergency room immediately.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">
              Frequently Asked Questions
            </h2>

            <div className="space-y-4">
              {[
                {
                  q: 'How do I find an emergency dentist near me?',
                  a: 'Use our search feature to find emergency dentists in your area. Many dental offices offer same-day emergency appointments. You can also call our helpline at 1-800-DENTIST for immediate assistance.'
                },
                {
                  q: 'What should I do if I have a toothache at night?',
                  a: 'Rinse your mouth with warm salt water, use over-the-counter pain relievers, and apply a cold compress to your cheek. Avoid placing aspirin directly on the tooth. Contact an emergency dentist first thing in the morning.'
                },
                {
                  q: 'How much does emergency dental care cost?',
                  a: 'Emergency dental care costs vary depending on the treatment needed. Many dentists offer payment plans, and some accept dental insurance. Call ahead to discuss costs and payment options.'
                },
                {
                  q: 'Can I wait until Monday to see a dentist?',
                  a: 'It depends on the severity. Severe pain, swelling, fever, or uncontrolled bleeding require immediate attention. If you can manage the pain and symptoms, you may be able to wait, but when in doubt, seek care.'
                },
              ].map((faq, i) => (
                <div key={i} className="bg-white p-6 rounded-xl border">
                  <h3 className="font-semibold mb-2">{faq.q}</h3>
                  <p className="text-muted-foreground">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-red-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Need Emergency Dental Care Now?
          </h2>
          <p className="text-white/90 mb-8 max-w-2xl mx-auto">
            Don&apos;t wait in pain. Find an emergency dentist near you or call our
            helpline for immediate assistance.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="tel:1-800-DENTIST">
              <Button size="lg" className="bg-white text-red-600 hover:bg-gray-100">
                <Phone className="w-5 h-5 mr-2" />
                Call 1-800-DENTIST
              </Button>
            </a>
            <Link href="/search?emergency=true">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                <MapPin className="w-5 h-5 mr-2" />
                Find Emergency Dentist
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
