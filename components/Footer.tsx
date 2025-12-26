'use client';

import Link from 'next/link';
import { Mail, Facebook, Twitter, Linkedin, Phone } from 'lucide-react';
import Logo from '@/components/Logo';
import { Button } from '@/components/ui/button';
import { useState } from 'react';

const popularStates = [
  { href: '/state/california', label: 'California' },
  { href: '/state/texas', label: 'Texas' },
  { href: '/state/florida', label: 'Florida' },
  { href: '/state/new-york', label: 'New York' },
  { href: '/state/pennsylvania', label: 'Pennsylvania' },
  { href: '/state/ohio', label: 'Ohio' },
];

const dentalServices = [
  { href: '/services/general-dentistry', label: 'General Dentistry' },
  { href: '/services/cosmetic-dentistry', label: 'Cosmetic Dentistry' },
  { href: '/services/orthodontics', label: 'Orthodontics' },
  { href: '/services/oral-surgery', label: 'Oral Surgery' },
  { href: '/services/pediatric-dentistry', label: 'Pediatric Dentistry' },
  { href: '/emergency-dentist', label: 'Emergency Dentist' },
];

const resources = [
  { href: '/guides', label: 'Dental Guides' },
  { href: '/guides/dental-insurance', label: 'Dental Insurance' },
  { href: '/guides/finding-right-dentist', label: 'Choosing a Dentist' },
  { href: '/guides/dental-health-tips', label: 'Dental Health Tips' },
  { href: '/faq', label: 'FAQs' },
];

const information = [
  { href: '/about', label: 'About Us' },
  { href: '/contact', label: 'Contact' },
  { href: '/for-dentists', label: 'For Dentists' },
  { href: '/privacy', label: 'Privacy Policy' },
  { href: '/terms', label: 'Terms of Service' },
];

export default function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement newsletter subscription
    setSubscribed(true);
    setEmail('');
  };

  return (
    <footer className="bg-primary text-primary-foreground">
      {/* Emergency CTA Section */}
      <div className="bg-red-600 py-6">
        <div className="container mx-auto px-4 text-center">
          <h3 className="text-xl font-semibold text-white mb-2">
            Need Emergency Dental Care?
          </h3>
          <p className="text-white/90 mb-4">
            Find an emergency dentist near you available 24/7
          </p>
          <Link href="/emergency-dentist">
            <Button variant="secondary" size="lg" className="bg-white text-red-600 hover:bg-gray-100">
              <Phone className="w-5 h-5" />
              Find Emergency Dentist
            </Button>
          </Link>
        </div>
      </div>

      {/* Newsletter Section */}
      <div className="border-b border-white/10">
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-2xl mx-auto text-center">
            <h3 className="font-serif text-2xl font-semibold mb-3">
              Dental Health Tips
            </h3>
            <p className="text-primary-foreground/80 mb-6">
              Get practical dental care tips and find the best dentists in your area.
            </p>
            {subscribed ? (
              <p className="text-teal-300 font-medium">
                Thank you for subscribing!
              </p>
            ) : (
              <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your email address"
                  required
                  className="flex-1 px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-accent"
                />
                <Button variant="secondary" type="submit" size="lg" className="bg-accent hover:bg-accent/90">
                  Subscribe
                </Button>
              </form>
            )}
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-6">
          {/* Logo & Description */}
          <div className="lg:col-span-2">
            <Logo variant="light" size="md" className="mb-4" />
            <p className="text-primary-foreground/70 mb-6 max-w-sm">
              Your trusted resource for finding quality dental care across the United States.
              Compare dentists, read reviews, and book appointments with ease.
            </p>
            {/* Social icons - min 44x44px touch targets */}
            <div className="flex items-center gap-3">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-11 h-11 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-11 h-11 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="w-5 h-5" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-11 h-11 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Popular States */}
          <div>
            <h4 className="font-semibold mb-4 text-teal-300">Popular States</h4>
            <ul className="space-y-1">
              {popularStates.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="block py-1.5 text-primary-foreground/70 hover:text-white transition-colors text-sm sm:text-base"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Dental Services */}
          <div>
            <h4 className="font-semibold mb-4 text-teal-300">Dental Services</h4>
            <ul className="space-y-1">
              {dentalServices.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="block py-1.5 text-primary-foreground/70 hover:text-white transition-colors text-sm sm:text-base"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="font-semibold mb-4 text-teal-300">Resources</h4>
            <ul className="space-y-1">
              {resources.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="block py-1.5 text-primary-foreground/70 hover:text-white transition-colors text-sm sm:text-base"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Information & Contact */}
          <div>
            <h4 className="font-semibold mb-4 text-teal-300">Information</h4>
            <ul className="space-y-1 mb-6">
              {information.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="block py-1.5 text-primary-foreground/70 hover:text-white transition-colors text-sm sm:text-base"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
            <h4 className="font-semibold mb-3 text-teal-300">Contact</h4>
            <ul className="space-y-1">
              <li>
                <a
                  href="mailto:info@dentistnearmenow.com"
                  className="flex items-center gap-2 py-1.5 text-primary-foreground/70 hover:text-white transition-colors text-sm sm:text-base"
                >
                  <Mail className="w-4 h-4 flex-shrink-0" />
                  <span className="break-all">info@dentistnearmenow.com</span>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-primary-foreground/60">
            <p>&copy; {new Date().getFullYear()} DentistNearMeNow.com. All rights reserved.</p>
            <div className="flex items-center gap-6">
              <Link href="/privacy" className="hover:text-white transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" className="hover:text-white transition-colors">
                Terms of Service
              </Link>
              <Link href="/sitemap.xml" className="hover:text-white transition-colors">
                Sitemap
              </Link>
            </div>
          </div>
          {/* Disclaimer */}
          <p className="mt-4 text-xs text-primary-foreground/50 text-center md:text-left">
            Disclaimer: The information provided on this website is for general informational purposes only.
            It is not intended as, and should not be considered, professional dental advice.
            Always consult with a qualified dental professional for diagnosis and treatment of dental conditions.
          </p>
        </div>
      </div>
    </footer>
  );
}
