import { Metadata } from 'next';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';

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
          <h1 className="text-3xl md:text-4xl font-bold">
            Privacy Policy
          </h1>
        </div>
      </section>

      {/* Content */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto prose prose-lg">
            <p className="text-muted-foreground">
              Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
            </p>

            <h2>1. Introduction</h2>
            <p>
              Welcome to DentistNearMeNow.com (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;). We respect your privacy and are
              committed to protecting your personal information. This Privacy Policy explains how we collect,
              use, disclose, and safeguard your information when you visit our website.
            </p>

            <h2>2. Information We Collect</h2>
            <h3>2.1 Information You Provide</h3>
            <p>We may collect information you provide directly to us, such as:</p>
            <ul>
              <li>Contact information (name, email address, phone number)</li>
              <li>Search queries and preferences</li>
              <li>Communications you send to us</li>
            </ul>

            <h3>2.2 Automatically Collected Information</h3>
            <p>When you visit our website, we automatically collect certain information:</p>
            <ul>
              <li>Device information (browser type, operating system)</li>
              <li>IP address and location data</li>
              <li>Pages visited and time spent on our site</li>
              <li>Referring website addresses</li>
            </ul>

            <h3>2.3 Cookies and Tracking Technologies</h3>
            <p>
              We use cookies and similar technologies to enhance your experience, analyze site traffic,
              and for advertising purposes. You can control cookies through your browser settings.
            </p>

            <h2>3. How We Use Your Information</h2>
            <p>We use the information we collect to:</p>
            <ul>
              <li>Provide and improve our services</li>
              <li>Personalize your experience</li>
              <li>Respond to your inquiries</li>
              <li>Send promotional communications (with your consent)</li>
              <li>Analyze usage patterns and improve our website</li>
              <li>Comply with legal obligations</li>
            </ul>

            <h2>4. Information Sharing</h2>
            <p>We may share your information with:</p>
            <ul>
              <li><strong>Service Providers:</strong> Third parties who perform services on our behalf</li>
              <li><strong>Dental Practices:</strong> When you request to contact a dentist through our platform</li>
              <li><strong>Advertising Partners:</strong> For targeted advertising purposes</li>
              <li><strong>Legal Requirements:</strong> When required by law or to protect our rights</li>
            </ul>

            <h2>5. Third-Party Services</h2>
            <p>
              Our website may contain links to third-party websites and services. We are not responsible
              for the privacy practices of these third parties. We encourage you to review their privacy
              policies before providing any personal information.
            </p>

            <h3>5.1 Google Services</h3>
            <p>
              We use various Google services including Google Analytics and Google AdSense. These services
              may collect information about your use of our website. For more information, please visit{' '}
              <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer">
                Google&apos;s Privacy Policy
              </a>.
            </p>

            <h2>6. Data Security</h2>
            <p>
              We implement reasonable security measures to protect your personal information. However,
              no method of transmission over the Internet is 100% secure, and we cannot guarantee absolute security.
            </p>

            <h2>7. Your Rights and Choices</h2>
            <p>Depending on your location, you may have the right to:</p>
            <ul>
              <li>Access the personal information we hold about you</li>
              <li>Request correction of inaccurate information</li>
              <li>Request deletion of your personal information</li>
              <li>Opt-out of marketing communications</li>
              <li>Disable cookies through your browser settings</li>
            </ul>

            <h2>8. Children&apos;s Privacy</h2>
            <p>
              Our website is not intended for children under 13 years of age. We do not knowingly collect
              personal information from children under 13. If you believe we have collected information
              from a child under 13, please contact us immediately.
            </p>

            <h2>9. California Privacy Rights</h2>
            <p>
              California residents may have additional rights under the California Consumer Privacy Act (CCPA),
              including the right to know what personal information is collected, request deletion, and opt-out
              of the sale of personal information.
            </p>

            <h2>10. Changes to This Policy</h2>
            <p>
              We may update this Privacy Policy from time to time. We will notify you of any changes by
              posting the new Privacy Policy on this page and updating the &quot;Last updated&quot; date.
            </p>

            <h2>11. Contact Us</h2>
            <p>
              If you have any questions about this Privacy Policy, please contact us at:
            </p>
            <ul>
              <li>Email: privacy@dentistnearmenow.com</li>
              <li>Website: <Link href="/contact">Contact Form</Link></li>
            </ul>

            <div className="mt-8 p-6 bg-gray-50 rounded-xl not-prose">
              <h3 className="font-semibold mb-2">Related Pages</h3>
              <div className="flex flex-wrap gap-4">
                <Link href="/terms" className="text-primary hover:underline">
                  Terms of Service
                </Link>
                <Link href="/contact" className="text-primary hover:underline">
                  Contact Us
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
