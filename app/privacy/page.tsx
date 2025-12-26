import { Metadata } from 'next';
import Link from 'next/link';
import { ChevronRight, Shield, Mail } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Privacy Policy | DentistNearMeNow.com',
  description: 'Learn about how DentistNearMeNow.com collects, uses, and protects your personal information.',
};

export default function PrivacyPage() {
  return (
    <div className="bg-background min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary to-primary/80 text-white py-12">
        <div className="container mx-auto px-4">
          <nav className="flex items-center gap-2 text-white/80 mb-4 text-sm">
            <Link href="/" className="hover:text-white">Home</Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-white">Privacy Policy</span>
          </nav>
          <div className="flex items-center gap-3">
            <Shield className="w-10 h-10" />
            <h1 className="text-3xl md:text-4xl font-bold">
              Privacy Policy
            </h1>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <p className="text-muted-foreground mb-8">
              Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
            </p>

            <div className="space-y-8">
              <section>
                <h2 className="text-2xl font-bold text-foreground mb-4">1. Introduction</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Welcome to DentistNearMeNow.com (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;). We respect your privacy and are
                  committed to protecting your personal information. This Privacy Policy explains how we collect,
                  use, disclose, and safeguard your information when you visit our website.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-foreground mb-4">2. Information We Collect</h2>

                <h3 className="text-xl font-semibold text-foreground mb-3">2.1 Information You Provide</h3>
                <p className="text-muted-foreground leading-relaxed mb-3">We may collect information you provide directly to us, such as:</p>
                <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4 mb-6">
                  <li>Contact information (name, email address, phone number)</li>
                  <li>Search queries and preferences</li>
                  <li>Communications you send to us</li>
                </ul>

                <h3 className="text-xl font-semibold text-foreground mb-3">2.2 Automatically Collected Information</h3>
                <p className="text-muted-foreground leading-relaxed mb-3">When you visit our website, we automatically collect certain information:</p>
                <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4 mb-6">
                  <li>Device information (browser type, operating system)</li>
                  <li>IP address and location data</li>
                  <li>Pages visited and time spent on our site</li>
                  <li>Referring website addresses</li>
                </ul>

                <h3 className="text-xl font-semibold text-foreground mb-3">2.3 Cookies and Tracking Technologies</h3>
                <p className="text-muted-foreground leading-relaxed">
                  We use cookies and similar technologies to enhance your experience, analyze site traffic,
                  and for advertising purposes. You can control cookies through your browser settings.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-foreground mb-4">3. How We Use Your Information</h2>
                <p className="text-muted-foreground leading-relaxed mb-3">We use the information we collect to:</p>
                <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4">
                  <li>Provide and improve our services</li>
                  <li>Personalize your experience</li>
                  <li>Respond to your inquiries</li>
                  <li>Send promotional communications (with your consent)</li>
                  <li>Analyze usage patterns and improve our website</li>
                  <li>Comply with legal obligations</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-foreground mb-4">4. Information Sharing</h2>
                <p className="text-muted-foreground leading-relaxed mb-3">We may share your information with:</p>
                <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4">
                  <li><strong className="text-foreground">Service Providers:</strong> Third parties who perform services on our behalf</li>
                  <li><strong className="text-foreground">Dental Practices:</strong> When you request to contact a dentist through our platform</li>
                  <li><strong className="text-foreground">Advertising Partners:</strong> For targeted advertising purposes</li>
                  <li><strong className="text-foreground">Legal Requirements:</strong> When required by law or to protect our rights</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-foreground mb-4">5. Third-Party Services</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Our website may contain links to third-party websites and services. We are not responsible
                  for the privacy practices of these third parties. We encourage you to review their privacy
                  policies before providing any personal information.
                </p>

                <h3 className="text-xl font-semibold text-foreground mb-3">5.1 Google Services</h3>
                <p className="text-muted-foreground leading-relaxed">
                  We use various Google services including Google Analytics and Google AdSense. These services
                  may collect information about your use of our website. For more information, please visit{' '}
                  <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                    Google&apos;s Privacy Policy
                  </a>.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-foreground mb-4">6. Data Security</h2>
                <p className="text-muted-foreground leading-relaxed">
                  We implement reasonable security measures to protect your personal information. However,
                  no method of transmission over the Internet is 100% secure, and we cannot guarantee absolute security.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-foreground mb-4">7. Your Rights and Choices</h2>
                <p className="text-muted-foreground leading-relaxed mb-3">Depending on your location, you may have the right to:</p>
                <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4">
                  <li>Access the personal information we hold about you</li>
                  <li>Request correction of inaccurate information</li>
                  <li>Request deletion of your personal information</li>
                  <li>Opt-out of marketing communications</li>
                  <li>Disable cookies through your browser settings</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-foreground mb-4">8. Children&apos;s Privacy</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Our website is not intended for children under 13 years of age. We do not knowingly collect
                  personal information from children under 13. If you believe we have collected information
                  from a child under 13, please contact us immediately.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-foreground mb-4">9. California Privacy Rights</h2>
                <p className="text-muted-foreground leading-relaxed">
                  California residents may have additional rights under the California Consumer Privacy Act (CCPA),
                  including the right to know what personal information is collected, request deletion, and opt-out
                  of the sale of personal information.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-foreground mb-4">10. Changes to This Policy</h2>
                <p className="text-muted-foreground leading-relaxed">
                  We may update this Privacy Policy from time to time. We will notify you of any changes by
                  posting the new Privacy Policy on this page and updating the &quot;Last updated&quot; date.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-foreground mb-4">11. Contact Us</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  If you have any questions about this Privacy Policy, please contact us at:
                </p>
                <div className="bg-gray-50 rounded-xl p-6 border">
                  <div className="flex items-center gap-3 mb-3">
                    <Mail className="w-5 h-5 text-primary" />
                    <a href="mailto:privacy@dentistnearmenow.com" className="text-primary hover:underline">
                      privacy@dentistnearmenow.com
                    </a>
                  </div>
                  <p className="text-muted-foreground">
                    Or use our <Link href="/contact" className="text-primary hover:underline">Contact Form</Link>
                  </p>
                </div>
              </section>

              <div className="mt-12 p-6 bg-gray-50 rounded-xl border">
                <h3 className="font-semibold text-foreground mb-3">Related Pages</h3>
                <div className="flex flex-wrap gap-4">
                  <Link href="/terms" className="text-primary hover:underline">
                    Terms of Service
                  </Link>
                  <Link href="/contact" className="text-primary hover:underline">
                    Contact Us
                  </Link>
                  <Link href="/for-dentists" className="text-primary hover:underline">
                    For Dentists
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
