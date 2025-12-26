import { Metadata } from 'next';
import Link from 'next/link';
import {
  MapPin,
  ChevronRight,
  Users,
  Building2,
  AlertCircle,
  Stethoscope,
  Baby,
  Sparkles,
  SmilePlus,
  Star,
  Phone,
  Clock,
  Shield,
  BookOpen
} from 'lucide-react';
import { US_STATES, getAllDentists, getStats } from '@/lib/dentist-data';

export const metadata: Metadata = {
  title: 'Find Dentist by State - All 50 US States Directory | Dentist Near Me Now',
  description: 'Find a dentist in any US state. Browse our comprehensive dental directory covering all 50 states. Locate general dentists, specialists, and emergency dental care by state.',
  keywords: 'find dentist by state, dentist directory, dentists by state, dental care by state, US dentist finder, state dental directory',
  openGraph: {
    title: 'Find Dentist by State - Complete US Dental Directory',
    description: 'Browse dentists across all 50 US states. Find general dentists, orthodontists, oral surgeons, and emergency dental care in your state.',
    type: 'website',
  },
};

// Group states by region with improved organization
const regions = {
  Northeast: {
    abbrs: ['CT', 'DE', 'ME', 'MD', 'MA', 'NH', 'NJ', 'NY', 'PA', 'RI', 'VT', 'DC'],
    description: 'From the historic streets of Boston to the bustling boroughs of New York City',
    topCities: ['New York City, NY', 'Philadelphia, PA', 'Boston, MA', 'Newark, NJ', 'Baltimore, MD'],
    color: 'bg-blue-500',
  },
  Southeast: {
    abbrs: ['AL', 'FL', 'GA', 'KY', 'NC', 'SC', 'TN', 'VA', 'WV'],
    description: 'Warm hospitality and quality dental care across the Southeast',
    topCities: ['Miami, FL', 'Atlanta, GA', 'Charlotte, NC', 'Nashville, TN', 'Jacksonville, FL'],
    color: 'bg-green-500',
  },
  Midwest: {
    abbrs: ['IL', 'IN', 'IA', 'KS', 'MI', 'MN', 'MO', 'NE', 'ND', 'OH', 'SD', 'WI'],
    description: 'Heartland dental professionals serving families across the Midwest',
    topCities: ['Chicago, IL', 'Detroit, MI', 'Columbus, OH', 'Indianapolis, IN', 'Milwaukee, WI'],
    color: 'bg-amber-500',
  },
  Southwest: {
    abbrs: ['AZ', 'NM', 'OK', 'TX'],
    description: 'Modern dental facilities in the rapidly growing Southwest',
    topCities: ['Houston, TX', 'Dallas, TX', 'Phoenix, AZ', 'San Antonio, TX', 'Austin, TX'],
    color: 'bg-orange-500',
  },
  West: {
    abbrs: ['AK', 'CA', 'CO', 'HI', 'ID', 'MT', 'NV', 'OR', 'UT', 'WA', 'WY'],
    description: 'Innovative dental care from the Pacific Coast to the Rocky Mountains',
    topCities: ['Los Angeles, CA', 'San Francisco, CA', 'Seattle, WA', 'Denver, CO', 'Las Vegas, NV'],
    color: 'bg-purple-500',
  },
  South: {
    abbrs: ['AR', 'LA', 'MS'],
    description: 'Southern charm meets professional dental excellence',
    topCities: ['New Orleans, LA', 'Little Rock, AR', 'Baton Rouge, LA', 'Jackson, MS', 'Shreveport, LA'],
    color: 'bg-teal-500',
  },
};

// Popular dental services for quick links
const popularServices = [
  { name: 'General Dentist', slug: 'general-dentist', icon: Stethoscope, description: 'Routine care and checkups' },
  { name: 'Pediatric Dentist', slug: 'pediatric-dentist', icon: Baby, description: 'Care for children' },
  { name: 'Cosmetic Dentist', slug: 'cosmetic-dentist', icon: Sparkles, description: 'Smile makeovers' },
  { name: 'Orthodontist', slug: 'orthodontist', icon: SmilePlus, description: 'Braces and aligners' },
  { name: 'Emergency Dentist', slug: 'emergency-dentist', icon: AlertCircle, description: '24/7 urgent care' },
];

export default async function StatesPage() {
  // Get stats for the page
  const stats = await getStats();
  const allDentists = await getAllDentists();

  // Calculate dentists per state
  const dentistsByState: Record<string, number> = {};
  allDentists.forEach(d => {
    if (d.stateAbbr) {
      dentistsByState[d.stateAbbr] = (dentistsByState[d.stateAbbr] || 0) + 1;
    }
  });

  const statesByRegion = Object.entries(regions).map(([region, data]) => ({
    region,
    ...data,
    states: US_STATES.filter(s => data.abbrs.includes(s.abbr)),
  }));

  return (
    <div className="bg-background">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary to-primary/80 text-white py-16 md:py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl">
            <div className="flex items-center gap-2 text-white/80 mb-4">
              <Link href="/" className="hover:text-white transition-colors">Home</Link>
              <ChevronRight className="w-4 h-4" />
              <span>States</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Find Dentists by State
            </h1>
            <p className="text-xl md:text-2xl text-white/90 mb-8 leading-relaxed">
              Your comprehensive guide to finding quality dental care across all 50 US states.
              Browse by state to discover dentists, orthodontists, oral surgeons, and emergency
              dental providers in your area.
            </p>

            {/* Stats Bar */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                <div className="flex items-center gap-2 mb-1">
                  <Users className="w-5 h-5" />
                  <span className="text-2xl font-bold">{stats.totalDentists.toLocaleString()}+</span>
                </div>
                <p className="text-white/80 text-sm">Dental Providers</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                <div className="flex items-center gap-2 mb-1">
                  <MapPin className="w-5 h-5" />
                  <span className="text-2xl font-bold">50</span>
                </div>
                <p className="text-white/80 text-sm">States Covered</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                <div className="flex items-center gap-2 mb-1">
                  <Building2 className="w-5 h-5" />
                  <span className="text-2xl font-bold">{stats.citiesWithDentists.toLocaleString()}+</span>
                </div>
                <p className="text-white/80 text-sm">Cities</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                <div className="flex items-center gap-2 mb-1">
                  <AlertCircle className="w-5 h-5" />
                  <span className="text-2xl font-bold">{stats.emergencyDentists}+</span>
                </div>
                <p className="text-white/80 text-sm">Emergency Dentists</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Emergency Dentist CTA Section */}
      <section className="bg-red-600 text-white py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-white/20 rounded-full flex items-center justify-center">
                <AlertCircle className="w-7 h-7" />
              </div>
              <div>
                <h2 className="text-xl md:text-2xl font-bold">Need Emergency Dental Care?</h2>
                <p className="text-white/90">Find 24/7 emergency dentists in your state</p>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <Link
                href="/emergency-dentist"
                className="inline-flex items-center justify-center gap-2 bg-white text-red-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
              >
                <Phone className="w-5 h-5" />
                Find Emergency Dentist
              </Link>
              <Link
                href="/search?emergency=true"
                className="inline-flex items-center justify-center gap-2 border border-white px-6 py-3 rounded-lg font-semibold hover:bg-white/10 transition-colors"
              >
                <Clock className="w-5 h-5" />
                24/7 Care Near Me
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Popular Services Quick Links */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold mb-2 text-center">Find Dentists by Specialty</h2>
          <p className="text-muted-foreground text-center mb-8">
            Browse by dental specialty to find the right provider for your needs
          </p>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {popularServices.map((service) => {
              const Icon = service.icon;
              return (
                <Link
                  key={service.slug}
                  href={`/search?type=${service.slug}`}
                  className="group bg-white rounded-xl p-4 border hover:border-primary hover:shadow-lg transition-all text-center"
                >
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3 group-hover:bg-primary/20 transition-colors">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="font-semibold text-sm group-hover:text-primary transition-colors">
                    {service.name}
                  </h3>
                  <p className="text-xs text-muted-foreground mt-1">{service.description}</p>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* States Grid by Region */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Browse Dentists by Region</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Select your state below to find dental care providers. Each state page includes
              city directories, provider listings, and helpful resources.
            </p>
          </div>

          {statesByRegion.map(({ region, states, description, topCities, color }) => (
            <div key={region} className="mb-16">
              {/* Region Header */}
              <div className="flex flex-col md:flex-row md:items-center gap-4 mb-6">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 ${color} rounded-lg flex items-center justify-center`}>
                    <MapPin className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold">{region}</h3>
                    <p className="text-muted-foreground text-sm">{states.length} states</p>
                  </div>
                </div>
                <p className="text-muted-foreground md:ml-auto md:text-right max-w-md">
                  {description}
                </p>
              </div>

              {/* States Grid */}
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4 mb-6">
                {states.map((state) => {
                  const count = dentistsByState[state.abbr] || 0;
                  return (
                    <Link
                      key={state.abbr}
                      href={`/state/${state.slug}`}
                      className="group p-4 bg-white rounded-xl border hover:border-primary hover:shadow-lg transition-all"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <p className="font-semibold text-foreground group-hover:text-primary transition-colors">
                          {state.name}
                        </p>
                        <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-muted-foreground bg-gray-100 px-2 py-0.5 rounded">
                          {state.abbr}
                        </span>
                        {count > 0 && (
                          <span className="text-xs text-primary font-medium">
                            {count} dentists
                          </span>
                        )}
                      </div>
                    </Link>
                  );
                })}
              </div>

              {/* Popular Cities in Region */}
              <div className="bg-gray-50 rounded-xl p-4">
                <p className="text-sm text-muted-foreground mb-2">
                  <span className="font-medium text-foreground">Popular cities:</span>
                </p>
                <div className="flex flex-wrap gap-2">
                  {topCities.map((city) => (
                    <span
                      key={city}
                      className="text-sm bg-white px-3 py-1 rounded-full border"
                    >
                      {city}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">How to Find the Right Dentist</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Follow these simple steps to find quality dental care in your state
            </p>
          </div>
          <div className="grid md:grid-cols-4 gap-8 max-w-5xl mx-auto">
            {[
              { step: '1', title: 'Select Your State', desc: 'Choose your state from the directory above' },
              { step: '2', title: 'Browse Providers', desc: 'View dentists by city, specialty, or services' },
              { step: '3', title: 'Read Reviews', desc: 'Check ratings and patient experiences' },
              { step: '4', title: 'Book an Appointment', desc: 'Contact the dentist directly to schedule' },
            ].map((item) => (
              <div key={item.step} className="text-center">
                <div className="w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                  {item.step}
                </div>
                <h3 className="font-semibold mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quick Links Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            {/* Emergency Care */}
            <div className="bg-red-50 rounded-xl p-6 border border-red-100">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                  <AlertCircle className="w-5 h-5 text-red-600" />
                </div>
                <h3 className="font-semibold text-lg">Emergency Dental Care</h3>
              </div>
              <p className="text-muted-foreground text-sm mb-4">
                Find 24/7 emergency dentists for urgent dental issues like severe toothaches,
                broken teeth, or dental trauma.
              </p>
              <Link
                href="/emergency-dentist"
                className="inline-flex items-center gap-1 text-red-600 font-medium text-sm hover:gap-2 transition-all"
              >
                Find Emergency Dentist <ChevronRight className="w-4 h-4" />
              </Link>
            </div>

            {/* Dental Anxiety */}
            <div className="bg-purple-50 rounded-xl p-6 border border-purple-100">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                  <Shield className="w-5 h-5 text-purple-600" />
                </div>
                <h3 className="font-semibold text-lg">Dental Anxiety Help</h3>
              </div>
              <p className="text-muted-foreground text-sm mb-4">
                Nervous about visiting the dentist? Learn about sedation options and find
                dentists who specialize in anxious patients.
              </p>
              <Link
                href="/guides/dental-anxiety"
                className="inline-flex items-center gap-1 text-purple-600 font-medium text-sm hover:gap-2 transition-all"
              >
                Read Anxiety Guide <ChevronRight className="w-4 h-4" />
              </Link>
            </div>

            {/* Helpful Guides */}
            <div className="bg-blue-50 rounded-xl p-6 border border-blue-100">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                  <BookOpen className="w-5 h-5 text-blue-600" />
                </div>
                <h3 className="font-semibold text-lg">Dental Guides</h3>
              </div>
              <p className="text-muted-foreground text-sm mb-4">
                Explore our comprehensive guides on dental insurance, procedures,
                and tips for maintaining great oral health.
              </p>
              <Link
                href="/guides"
                className="inline-flex items-center gap-1 text-blue-600 font-medium text-sm hover:gap-2 transition-all"
              >
                Browse All Guides <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* SEO Content - Extended */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto prose prose-lg">
            <h2>Finding Quality Dental Care Across the United States</h2>

            <p>
              Finding the right dentist can feel overwhelming, especially when you&apos;re new to an area or
              haven&apos;t visited a dental office in years. Our comprehensive state-by-state dental directory
              makes it easy to locate trusted dental professionals wherever you are in the United States.
              Whether you need a routine cleaning, specialized orthodontic care, or emergency dental treatment,
              our directory connects you with qualified providers in all 50 states.
            </p>

            <h3>Understanding Different Types of Dental Providers</h3>

            <p>
              The dental profession includes various specialists, each with unique training and expertise.
              Understanding these differences helps you choose the right provider for your specific needs:
            </p>

            <ul>
              <li>
                <strong><Link href="/search?type=general-dentist">General Dentists</Link></strong> - Your primary
                dental care provider for routine cleanings, fillings, crowns, and preventive treatments. They
                can identify issues early and refer you to specialists when needed.
              </li>
              <li>
                <strong><Link href="/search?type=orthodontist">Orthodontists</Link></strong> - Specialists in
                teeth alignment who provide braces, Invisalign, and other appliances to correct bite issues
                and straighten teeth for patients of all ages.
              </li>
              <li>
                <strong><Link href="/search?type=oral-surgeon">Oral Surgeons</Link></strong> - Perform complex
                procedures including wisdom teeth extraction, dental implant placement, jaw surgery, and
                treatment of facial injuries.
              </li>
              <li>
                <strong><Link href="/search?type=pediatric-dentist">Pediatric Dentists</Link></strong> - Specialize
                in dental care for infants, children, and adolescents, creating a comfortable environment
                for young patients.
              </li>
              <li>
                <strong><Link href="/search?type=periodontist">Periodontists</Link></strong> - Focus on gum
                health, treating gum disease and performing procedures like gum grafts and dental implants.
              </li>
              <li>
                <strong><Link href="/search?type=endodontist">Endodontists</Link></strong> - Root canal
                specialists who save damaged teeth by treating the tooth&apos;s interior pulp and nerve tissue.
              </li>
              <li>
                <strong><Link href="/search?type=cosmetic-dentist">Cosmetic Dentists</Link></strong> - Focus
                on improving the appearance of your smile through treatments like veneers, whitening, bonding,
                and smile makeovers.
              </li>
              <li>
                <strong><Link href="/emergency-dentist">Emergency Dentists</Link></strong> - Provide urgent
                care for dental emergencies including severe toothaches, knocked-out teeth, broken teeth,
                and dental infections requiring immediate attention.
              </li>
            </ul>

            <h3>What to Consider When Choosing a Dentist</h3>

            <p>
              Selecting a dental provider is an important decision that impacts your long-term oral health.
              Here are key factors to evaluate when browsing our state directories:
            </p>

            <ul>
              <li>
                <strong>Location and Convenience</strong> - Consider proximity to your home or workplace,
                available parking, and public transportation access. A conveniently located dentist makes
                it easier to keep regular appointments.
              </li>
              <li>
                <strong>Office Hours</strong> - Many people need evening or weekend appointments to fit
                their schedules. Check if the practice offers flexible hours that work for you.
              </li>
              <li>
                <strong>Insurance and Payment Options</strong> - Verify that the dentist accepts your
                dental insurance plan. If you&apos;re uninsured, ask about payment plans, discount programs,
                or sliding scale fees.
              </li>
              <li>
                <strong>Patient Reviews and Ratings</strong> - Read reviews from other patients to
                understand their experiences with the dentist&apos;s bedside manner, wait times, and
                treatment outcomes.
              </li>
              <li>
                <strong>Services Offered</strong> - Ensure the practice provides the specific treatments
                you need. Some offices focus on general dentistry while others offer comprehensive services
                including cosmetic and specialty care.
              </li>
              <li>
                <strong>Technology and Facilities</strong> - Modern dental technology can mean more
                comfortable treatments and better outcomes. Look for practices with digital X-rays,
                laser dentistry, or same-day crown technology.
              </li>
              <li>
                <strong>Emergency Care Availability</strong> - Ask about after-hours emergency protocols.
                Knowing your dentist can help in a dental emergency provides peace of mind.
              </li>
            </ul>

            <h3>Regional Dental Care Considerations</h3>

            <p>
              Dental care availability and costs can vary significantly by region. Urban areas typically
              have more dental providers and specialists to choose from, while rural communities may have
              fewer options. However, many dentists in less populated areas offer a broader range of
              services to serve their communities comprehensively.
            </p>

            <p>
              States in the <Link href="/state/california">West</Link> and{' '}
              <Link href="/state/new-york">Northeast</Link> often have higher dental care costs but also
              more specialists. <Link href="/state/texas">Southern</Link> and{' '}
              <Link href="/state/ohio">Midwestern</Link> states frequently offer more affordable care
              while maintaining high quality standards.
            </p>

            <h3>Dental Insurance and Affordability</h3>

            <p>
              Understanding your dental insurance coverage is crucial for managing dental care costs. Most
              dental plans cover preventive care like cleanings and exams at 100%, basic procedures like
              fillings at 70-80%, and major work like crowns at 50%. If you don&apos;t have dental insurance,
              many dentists offer membership plans, payment arrangements, or accept dental discount programs.
            </p>

            <p>
              Learn more about navigating dental coverage in our{' '}
              <Link href="/guides/dental-insurance">comprehensive dental insurance guide</Link>.
            </p>

            <h3>Maintaining Your Oral Health</h3>

            <p>
              Regular dental visits are just one component of good oral health. The American Dental
              Association recommends visiting your dentist at least twice a year for checkups and cleanings.
              Between visits, maintain a consistent home care routine that includes brushing twice daily,
              flossing once daily, and using mouthwash as recommended by your dentist.
            </p>

            <p>
              For more tips on keeping your smile healthy, explore our{' '}
              <Link href="/guides/dental-health-tips">dental health tips guide</Link>.
            </p>

            <h3>Start Your Search Today</h3>

            <p>
              Finding quality dental care starts with selecting your state above. Each state page provides
              a detailed directory of dental providers organized by city, making it easy to find care close
              to home. Whether you&apos;re looking for a family dentist, need specialized care, or require
              emergency treatment, our directory helps you connect with the right dental professional.
            </p>

            <p>
              Need help deciding? Start with a <Link href="/search?type=general-dentist">general dentist</Link>{' '}
              for a comprehensive exam. They can assess your oral health needs and recommend specialists
              if necessary. For urgent dental issues, visit our{' '}
              <Link href="/emergency-dentist">emergency dentist</Link> page for immediate assistance.
            </p>
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-16 bg-primary text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Find Your Dentist?
          </h2>
          <p className="text-white/90 text-lg mb-8 max-w-2xl mx-auto">
            Search our comprehensive directory to find the perfect dental provider in your area.
            Compare ratings, read reviews, and book your appointment today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/search"
              className="inline-flex items-center justify-center gap-2 bg-white text-primary px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              <MapPin className="w-5 h-5" />
              Search All Dentists
            </Link>
            <Link
              href="/services"
              className="inline-flex items-center justify-center gap-2 border-2 border-white px-8 py-4 rounded-lg font-semibold hover:bg-white/10 transition-colors"
            >
              <Star className="w-5 h-5" />
              Browse by Service
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
