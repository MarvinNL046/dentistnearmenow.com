import { Metadata } from 'next';
import Link from 'next/link';
import { ChevronRight, Stethoscope, Baby, Sparkles, SmilePlus, Wrench, Heart, AlertCircle, Crown, HelpCircle, BookOpen, MapPin, CheckCircle2, Users } from 'lucide-react';

const services = [
  {
    slug: 'general-dentist',
    name: 'General Dentist',
    description: 'Provides routine dental care including cleanings, fillings, exams, and preventive treatments for the whole family.',
    icon: Stethoscope,
    color: 'bg-blue-500',
    popularCities: ['New York', 'Los Angeles', 'Chicago', 'Houston', 'Phoenix'],
  },
  {
    slug: 'pediatric-dentist',
    name: 'Pediatric Dentist',
    description: 'Specializes in dental care for children and adolescents, creating a comfortable environment for young patients.',
    icon: Baby,
    color: 'bg-pink-500',
    popularCities: ['Dallas', 'San Antonio', 'San Diego', 'Austin', 'Jacksonville'],
  },
  {
    slug: 'cosmetic-dentist',
    name: 'Cosmetic Dentist',
    description: 'Focuses on improving the appearance of teeth through whitening, veneers, bonding, and smile makeovers.',
    icon: Sparkles,
    color: 'bg-purple-500',
    popularCities: ['Miami', 'San Francisco', 'Denver', 'Seattle', 'Boston'],
  },
  {
    slug: 'orthodontist',
    name: 'Orthodontist',
    description: 'Specializes in correcting teeth alignment and bite issues using braces, Invisalign, and other appliances.',
    icon: SmilePlus,
    color: 'bg-teal-500',
    popularCities: ['Atlanta', 'Washington DC', 'Nashville', 'Portland', 'Las Vegas'],
  },
  {
    slug: 'oral-surgeon',
    name: 'Oral Surgeon',
    description: 'Performs surgical procedures including wisdom teeth removal, dental implants, and corrective jaw surgery.',
    icon: Wrench,
    color: 'bg-orange-500',
    popularCities: ['Philadelphia', 'San Jose', 'Columbus', 'Charlotte', 'Indianapolis'],
  },
  {
    slug: 'endodontist',
    name: 'Endodontist',
    description: 'Specializes in root canal treatments and diagnosing and treating dental pulp diseases.',
    icon: Heart,
    color: 'bg-red-500',
    popularCities: ['Fort Worth', 'Detroit', 'Memphis', 'Baltimore', 'Milwaukee'],
  },
  {
    slug: 'periodontist',
    name: 'Periodontist',
    description: 'Focuses on prevention, diagnosis, and treatment of gum disease, and dental implant placement.',
    icon: Crown,
    color: 'bg-green-500',
    popularCities: ['Oklahoma City', 'Louisville', 'Tucson', 'Albuquerque', 'Sacramento'],
  },
  {
    slug: 'emergency-dentist',
    name: 'Emergency Dentist',
    description: 'Provides urgent dental care for toothaches, broken teeth, lost fillings, and other dental emergencies.',
    icon: AlertCircle,
    color: 'bg-red-600',
    popularCities: ['Kansas City', 'Raleigh', 'Cleveland', 'Tampa', 'Orlando'],
  },
];

const faqs = [
  {
    question: 'What is the difference between a general dentist and a specialist?',
    answer: 'A general dentist is your primary dental care provider who handles routine care like cleanings, fillings, and basic treatments. Specialists like orthodontists, periodontists, and endodontists complete 2-4 years of additional training beyond dental school to focus on specific areas. General dentists can refer you to specialists when you need advanced care in a particular area.',
  },
  {
    question: 'How often should I visit the dentist?',
    answer: 'The American Dental Association recommends visiting your dentist at least once every six months for a routine checkup and professional cleaning. However, your dentist may recommend more frequent visits based on your individual oral health needs. People with gum disease, a history of cavities, or other dental issues may need to visit every 3-4 months.',
  },
  {
    question: 'What should I do in a dental emergency?',
    answer: 'In a dental emergency, contact an emergency dentist immediately. For a knocked-out tooth, handle it by the crown only, rinse gently if dirty, and try to reinsert it or keep it moist in milk. For severe tooth pain, rinse with warm salt water and apply a cold compress. For broken teeth, save any pieces and rinse your mouth. If you experience uncontrolled bleeding or facial swelling, seek emergency medical care.',
  },
  {
    question: 'What is the difference between a pediatric dentist and a regular dentist?',
    answer: 'Pediatric dentists complete 2-3 years of specialized training after dental school to focus on treating children from infancy through adolescence. They are experts in child psychology, behavior management, and treating developing teeth. Their offices are designed to be child-friendly and welcoming. While general dentists can treat children, pediatric dentists specialize in making dental visits comfortable for young patients, especially those with dental anxiety or special needs.',
  },
  {
    question: 'Does dental insurance cover specialist visits?',
    answer: 'Most dental insurance plans do cover specialist visits, but coverage levels may vary. Preventive care with general dentists typically has the highest coverage (often 80-100%), while specialist procedures may be covered at 50-80% depending on your plan. Some plans require a referral from your general dentist before seeing a specialist. Always verify coverage with your insurance provider before scheduling appointments.',
  },
  {
    question: 'When should I see an orthodontist?',
    answer: 'The American Association of Orthodontists recommends that children have their first orthodontic evaluation by age 7, when early intervention can prevent more serious problems. Adults can see an orthodontist at any age for teeth alignment issues. Common signs you may need orthodontic care include crooked or crowded teeth, difficulty biting or chewing, mouth breathing, or jaw pain. Many orthodontists offer free initial consultations.',
  },
  {
    question: 'What procedures does a cosmetic dentist perform?',
    answer: 'Cosmetic dentists specialize in improving the appearance of your smile through various procedures including teeth whitening, porcelain veneers, dental bonding, gum contouring, smile makeovers, and tooth reshaping. Many cosmetic dentists also offer Invisalign clear aligners for teeth straightening. Some procedures are purely aesthetic while others, like dental crowns, serve both functional and cosmetic purposes.',
  },
];

const relatedGuides = [
  {
    slug: 'finding-right-dentist',
    title: 'How to Choose the Right Dentist',
    description: 'Learn what to look for when selecting a dentist, from credentials to patient reviews.',
    category: 'Getting Started',
  },
  {
    slug: 'dental-procedures',
    title: 'Common Dental Procedures Explained',
    description: 'Understand what to expect during fillings, root canals, crowns, and other procedures.',
    category: 'Treatments',
  },
  {
    slug: 'dental-insurance',
    title: 'Understanding Dental Insurance',
    description: 'A complete guide to dental insurance plans, coverage options, and maximizing your benefits.',
    category: 'Insurance',
  },
  {
    slug: 'dental-emergencies',
    title: 'Handling Dental Emergencies',
    description: 'Know when to seek immediate dental care and what to do in an emergency.',
    category: 'Emergency',
  },
  {
    slug: 'dental-anxiety',
    title: 'Overcoming Dental Anxiety',
    description: 'Tips and techniques to manage fear of the dentist and make your visits more comfortable.',
    category: 'Patient Care',
  },
  {
    slug: 'pediatric-dental-care',
    title: 'Dental Care for Children',
    description: 'Everything parents need to know about children\'s dental health from infancy to teens.',
    category: 'Family',
  },
];

export const metadata: Metadata = {
  title: 'Dental Services Guide | Types of Dentists & Specialists Explained',
  description: 'Comprehensive guide to dental services and types of dentists. Learn about general dentistry, orthodontics, oral surgery, pediatric dentistry, cosmetic dentistry, and when to see each specialist.',
  keywords: 'dental services, types of dentists, dental specialists, general dentist, orthodontist, oral surgeon, pediatric dentist, cosmetic dentist, endodontist, periodontist, emergency dentist',
  openGraph: {
    title: 'Dental Services Guide | Types of Dentists & Specialists Explained',
    description: 'Find the right type of dental care for your needs. Comprehensive guide to dental services and specialists.',
    type: 'website',
  },
};

export default function ServicesPage() {
  return (
    <div className="bg-background min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary to-primary/80 text-white py-16">
        <div className="container mx-auto px-4">
          <nav className="flex items-center gap-2 text-white/80 mb-4 text-sm">
            <Link href="/" className="hover:text-white">Home</Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-white">Services</span>
          </nav>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            Dental Services & Types of Dentists
          </h1>
          <p className="text-white/90 text-lg md:text-xl max-w-3xl">
            Your complete guide to understanding dental services and finding the right specialist
            for your oral health needs. From routine checkups to specialized treatments.
          </p>
        </div>
      </section>

      {/* Comprehensive Introduction Section */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto prose prose-lg">
            <h2 className="text-3xl font-bold mb-6">Understanding Dental Services: A Complete Guide</h2>

            <p className="text-lg leading-relaxed mb-6">
              Dental care encompasses far more than just the biannual cleaning many people are familiar with. The field of dentistry has evolved significantly, with specialized practitioners focusing on everything from routine preventive care to complex surgical procedures. Understanding the different types of dental services available and knowing when to see each type of specialist can make a significant difference in your oral health outcomes.
            </p>

            <p className="text-lg leading-relaxed mb-6">
              According to the American Dental Association, regular dental visits are essential not just for maintaining healthy teeth and gums, but for detecting early signs of systemic health issues. Research has shown connections between oral health and conditions such as heart disease, diabetes, and even certain cancers. This makes choosing the right dental care provider even more critical for your overall wellbeing.
            </p>

            <h3 className="text-2xl font-semibold mt-8 mb-4">The Foundation: General Dentistry</h3>
            <p className="text-lg leading-relaxed mb-6">
              For most people, a general dentist serves as the cornerstone of their dental care team. These primary care dental providers are trained to diagnose, treat, and manage your overall oral health needs. From performing routine cleanings and filling cavities to providing crowns, bridges, and even root canals, general dentists handle the majority of dental procedures patients require throughout their lives.
            </p>

            <p className="text-lg leading-relaxed mb-6">
              General dentists also play a crucial role in preventive care, identifying potential problems before they become serious and referring patients to specialists when needed. They understand the full scope of dental and oral health, making them ideal partners in maintaining your smile for life. Most experts recommend visiting your general dentist at least twice a year for checkups and professional cleanings.
            </p>

            <h3 className="text-2xl font-semibold mt-8 mb-4">When Specialized Care is Needed</h3>
            <p className="text-lg leading-relaxed mb-6">
              While general dentists are highly capable professionals, certain conditions require the expertise of dental specialists. These practitioners have completed additional years of training beyond dental school, focusing intensively on specific areas of oral health. Understanding when to see a specialist can ensure you receive the most effective treatment for your particular needs.
            </p>

            <p className="text-lg leading-relaxed mb-6">
              <strong>Orthodontists</strong> specialize in straightening teeth and correcting bite issues. If you or your child has crooked teeth, crowded teeth, or problems with how the upper and lower jaws fit together, an orthodontist can create a treatment plan using braces, clear aligners like Invisalign, or other corrective appliances. The American Association of Orthodontists recommends that children receive their first orthodontic evaluation by age 7.
            </p>

            <p className="text-lg leading-relaxed mb-6">
              <strong>Oral surgeons</strong> handle complex surgical procedures that go beyond what a general dentist typically performs. This includes wisdom teeth extraction, dental implant placement, corrective jaw surgery, and treatment of facial injuries. Oral surgeons complete 4-6 years of hospital-based surgical training after dental school, making them experts in both dental and medical procedures.
            </p>

            <p className="text-lg leading-relaxed mb-6">
              <strong>Periodontists</strong> focus exclusively on the structures that support your teeth: the gums, bone, and connective tissues. If you have gum disease, receding gums, or need dental implants, a periodontist has specialized training in treating these conditions. They can perform scaling and root planing, gum grafts, and bone regeneration procedures to restore your oral health.
            </p>

            <h3 className="text-2xl font-semibold mt-8 mb-4">Specialized Care for Specific Needs</h3>
            <p className="text-lg leading-relaxed mb-6">
              <strong>Endodontists</strong> are the tooth-saving specialists. When you need a root canal or have problems with the dental pulp (the soft tissue inside your tooth), an endodontist&apos;s advanced training and specialized equipment can often save teeth that might otherwise need to be extracted. They typically complete 2-3 additional years of training focused specifically on diagnosing and treating tooth pain.
            </p>

            <p className="text-lg leading-relaxed mb-6">
              <strong>Pediatric dentists</strong> specialize in treating children from infancy through the teenage years. Their offices are designed to be welcoming and non-threatening to young patients, and they have extensive training in child psychology and behavior management. This makes them especially valuable for children with dental anxiety or special needs who may find regular dental offices overwhelming.
            </p>

            <p className="text-lg leading-relaxed mb-6">
              <strong>Cosmetic dentists</strong> focus on the aesthetic aspects of your smile. While many general dentists offer cosmetic services, dedicated cosmetic dentists have additional training and experience in procedures like teeth whitening, veneers, dental bonding, and complete smile makeovers. If improving the appearance of your smile is a priority, consulting with a cosmetic dentist can help you understand your options.
            </p>

            <div className="bg-blue-50 border-l-4 border-blue-500 p-6 my-8 not-prose">
              <p className="font-semibold text-blue-900 mb-2">Expert Tip</p>
              <p className="text-blue-800">
                Your general dentist is often the best starting point for any dental concern. They can evaluate your situation and provide a referral to the appropriate specialist if needed. This ensures you receive coordinated care and don&apos;t waste time or money seeing the wrong type of provider.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold mb-4">Browse All Dental Services</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Explore each type of dental service to learn more about what they offer
              and find providers near you.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {services.map((service) => {
              const Icon = service.icon;
              return (
                <Link
                  key={service.slug}
                  href={`/services/${service.slug}`}
                  className="group bg-white rounded-xl border p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
                >
                  <div className={`w-14 h-14 ${service.color} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                    <Icon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                    {service.name}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                    {service.description}
                  </p>
                  <div className="flex items-center gap-1 text-primary text-sm font-medium">
                    Learn More
                    <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Popular Cities by Service */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold mb-4">Find Dentists in Popular Cities</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Browse dental services by location to find providers near you.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.slice(0, 4).map((service) => {
              const Icon = service.icon;
              return (
                <div key={service.slug} className="bg-white rounded-xl border p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className={`w-10 h-10 ${service.color} rounded-lg flex items-center justify-center`}>
                      <Icon className="w-5 h-5 text-white" />
                    </div>
                    <h3 className="font-semibold">{service.name}s</h3>
                  </div>
                  <ul className="space-y-2">
                    {service.popularCities.map((city) => (
                      <li key={city}>
                        <Link
                          href={`/search?type=${service.slug}&city=${encodeURIComponent(city)}`}
                          className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
                        >
                          <MapPin className="w-4 h-4" />
                          {service.name} in {city}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
            {services.slice(4).map((service) => {
              const Icon = service.icon;
              return (
                <div key={service.slug} className="bg-white rounded-xl border p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className={`w-10 h-10 ${service.color} rounded-lg flex items-center justify-center`}>
                      <Icon className="w-5 h-5 text-white" />
                    </div>
                    <h3 className="font-semibold">{service.name}s</h3>
                  </div>
                  <ul className="space-y-2">
                    {service.popularCities.map((city) => (
                      <li key={city}>
                        <Link
                          href={`/search?type=${service.slug}&city=${encodeURIComponent(city)}`}
                          className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
                        >
                          <MapPin className="w-4 h-4" />
                          {service.name} in {city}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-12 md:py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-10">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <HelpCircle className="w-8 h-8 text-primary" />
              </div>
              <h2 className="text-3xl font-bold mb-4">Frequently Asked Questions About Dental Services</h2>
              <p className="text-muted-foreground">
                Common questions answered by dental professionals.
              </p>
            </div>

            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <div key={index} className="bg-white rounded-xl border p-6">
                  <h3 className="text-lg font-semibold mb-3 flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-primary flex-shrink-0 mt-0.5" />
                    {faq.question}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed pl-9">
                    {faq.answer}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Related Guides Section */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <BookOpen className="w-8 h-8 text-primary" />
            </div>
            <h2 className="text-3xl font-bold mb-4">Related Dental Guides</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Explore our comprehensive guides to learn more about dental care,
              finding the right dentist, and maintaining your oral health.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {relatedGuides.map((guide) => (
              <Link
                key={guide.slug}
                href={`/guides/${guide.slug}`}
                className="group bg-white rounded-xl border p-6 hover:shadow-lg hover:border-primary transition-all"
              >
                <span className="text-xs font-medium text-primary bg-primary/10 px-2 py-1 rounded">
                  {guide.category}
                </span>
                <h3 className="text-lg font-semibold mt-3 mb-2 group-hover:text-primary transition-colors">
                  {guide.title}
                </h3>
                <p className="text-muted-foreground text-sm">
                  {guide.description}
                </p>
                <div className="mt-4 flex items-center gap-1 text-primary text-sm font-medium">
                  Read Guide
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Emergency CTA */}
      <section className="py-12 bg-red-50 border-y border-red-100">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <AlertCircle className="w-8 h-8 text-red-600" />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold mb-4 text-red-900">
              Having a Dental Emergency?
            </h2>
            <p className="text-red-700 mb-6 max-w-xl mx-auto">
              Don&apos;t wait if you&apos;re experiencing severe tooth pain, a knocked-out tooth,
              or other urgent dental issues. Find emergency dental care near you now.
            </p>
            <Link
              href="/services/emergency-dentist"
              className="inline-flex items-center gap-2 bg-red-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-red-700 transition-colors"
            >
              Find Emergency Dentist
              <ChevronRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-2xl mx-auto">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Users className="w-8 h-8 text-primary" />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              Not Sure What You Need?
            </h2>
            <p className="text-muted-foreground mb-6">
              Start with a general dentist for routine care and checkups.
              They can evaluate your oral health and refer you to a specialist if needed.
              Most dental issues can be addressed by a skilled general dentist.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/search"
                className="inline-flex items-center justify-center gap-2 bg-primary text-white px-6 py-3 rounded-lg font-medium hover:bg-primary/90 transition-colors"
              >
                Search All Dentists
                <ChevronRight className="w-5 h-5" />
              </Link>
              <Link
                href="/guides/finding-right-dentist"
                className="inline-flex items-center justify-center gap-2 border border-primary text-primary px-6 py-3 rounded-lg font-medium hover:bg-primary/5 transition-colors"
              >
                Read Our Guide
                <BookOpen className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
