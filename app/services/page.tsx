import Link from 'next/link';
import { ChevronRight, Stethoscope, Baby, Sparkles, SmilePlus, Wrench, Heart, AlertCircle, Crown } from 'lucide-react';

const services = [
  {
    slug: 'general-dentist',
    name: 'General Dentist',
    description: 'Provides routine dental care including cleanings, fillings, exams, and preventive treatments for the whole family.',
    icon: Stethoscope,
    color: 'bg-blue-500',
  },
  {
    slug: 'pediatric-dentist',
    name: 'Pediatric Dentist',
    description: 'Specializes in dental care for children and adolescents, creating a comfortable environment for young patients.',
    icon: Baby,
    color: 'bg-pink-500',
  },
  {
    slug: 'cosmetic-dentist',
    name: 'Cosmetic Dentist',
    description: 'Focuses on improving the appearance of teeth through whitening, veneers, bonding, and smile makeovers.',
    icon: Sparkles,
    color: 'bg-purple-500',
  },
  {
    slug: 'orthodontist',
    name: 'Orthodontist',
    description: 'Specializes in correcting teeth alignment and bite issues using braces, Invisalign, and other appliances.',
    icon: SmilePlus,
    color: 'bg-teal-500',
  },
  {
    slug: 'oral-surgeon',
    name: 'Oral Surgeon',
    description: 'Performs surgical procedures including wisdom teeth removal, dental implants, and corrective jaw surgery.',
    icon: Wrench,
    color: 'bg-orange-500',
  },
  {
    slug: 'endodontist',
    name: 'Endodontist',
    description: 'Specializes in root canal treatments and diagnosing and treating dental pulp diseases.',
    icon: Heart,
    color: 'bg-red-500',
  },
  {
    slug: 'periodontist',
    name: 'Periodontist',
    description: 'Focuses on prevention, diagnosis, and treatment of gum disease, and dental implant placement.',
    icon: Crown,
    color: 'bg-green-500',
  },
  {
    slug: 'emergency-dentist',
    name: 'Emergency Dentist',
    description: 'Provides urgent dental care for toothaches, broken teeth, lost fillings, and other dental emergencies.',
    icon: AlertCircle,
    color: 'bg-red-600',
  },
];

export const metadata = {
  title: 'Dental Services | Find the Right Dentist for Your Needs',
  description: 'Browse different types of dental services including general dentistry, orthodontics, oral surgery, pediatric dentistry, and more.',
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
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            Dental Services
          </h1>
          <p className="text-white/90 text-lg max-w-2xl">
            Find the right type of dental care for your needs. From routine checkups
            to specialized treatments, we&apos;ll help you connect with the right provider.
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {services.map((service) => {
              const Icon = service.icon;
              return (
                <Link
                  key={service.slug}
                  href={`/search?type=${service.slug}`}
                  className="group bg-white rounded-xl border p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
                >
                  <div className={`w-14 h-14 ${service.color} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                    <Icon className="w-7 h-7 text-white" />
                  </div>
                  <h2 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                    {service.name}
                  </h2>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {service.description}
                  </p>
                  <div className="mt-4 flex items-center gap-1 text-primary text-sm font-medium">
                    Find {service.name}s
                    <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            Not Sure What You Need?
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto mb-6">
            Start with a general dentist for routine care and checkups.
            They can refer you to a specialist if needed.
          </p>
          <Link
            href="/search"
            className="inline-flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-lg font-medium hover:bg-primary/90 transition-colors"
          >
            Search All Dentists
            <ChevronRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </div>
  );
}
