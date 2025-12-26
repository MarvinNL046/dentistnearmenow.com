import { Metadata } from 'next';
import Link from 'next/link';
import { ChevronRight, FileText, Mail } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Terms of Service | DentistNearMeNow.com',
  description: 'Read the terms and conditions for using DentistNearMeNow.com, your directory for finding dentists.',
};

export default function TermsPage() {
  return (
    <div className="bg-background min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary to-primary/80 text-white py-12">
        <div className="container mx-auto px-4">
          <nav className="flex items-center gap-2 text-white/80 mb-4 text-sm">
            <Link href="/" className="hover:text-white">Home</Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-white">Terms of Service</span>
          </nav>
          <div className="flex items-center gap-3">
            <FileText className="w-10 h-10" />
            <h1 className="text-3xl md:text-4xl font-bold">
              Terms of Service
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
                <h2 className="text-2xl font-bold text-foreground mb-4">1. Acceptance of Terms</h2>
                <p className="text-muted-foreground leading-relaxed">
                  By accessing and using DentistNearMeNow.com (&quot;the Website&quot;), you accept and agree to be bound
                  by these Terms of Service. If you do not agree to these terms, please do not use our Website.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-foreground mb-4">2. Description of Service</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  DentistNearMeNow.com is a dental provider directory that helps users find dentists and dental
                  practices in their area. We provide information about dental professionals, including contact
                  details, services offered, and user reviews.
                </p>
                <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                  <p className="text-amber-800 font-medium">
                    <strong>Important:</strong> We are a directory service only. We do not provide dental services,
                    medical advice, or endorse any particular dental provider.
                  </p>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-foreground mb-4">3. User Responsibilities</h2>

                <h3 className="text-xl font-semibold text-foreground mb-3">3.1 Accurate Information</h3>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  You agree to provide accurate and complete information when using our services, including
                  when submitting reviews or contacting dental providers.
                </p>

                <h3 className="text-xl font-semibold text-foreground mb-3">3.2 Prohibited Conduct</h3>
                <p className="text-muted-foreground leading-relaxed mb-3">You agree not to:</p>
                <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4">
                  <li>Use the Website for any unlawful purpose</li>
                  <li>Submit false or misleading information</li>
                  <li>Impersonate any person or entity</li>
                  <li>Interfere with the operation of the Website</li>
                  <li>Attempt to gain unauthorized access to our systems</li>
                  <li>Scrape or collect data without permission</li>
                  <li>Submit spam or unsolicited communications</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-foreground mb-4">4. Information Disclaimer</h2>

                <h3 className="text-xl font-semibold text-foreground mb-3">4.1 No Medical Advice</h3>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  The information on this Website is for general informational purposes only. It is not
                  intended to be a substitute for professional dental or medical advice, diagnosis, or treatment.
                </p>

                <h3 className="text-xl font-semibold text-foreground mb-3">4.2 Provider Information</h3>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  While we strive to provide accurate and up-to-date information about dental providers,
                  we cannot guarantee the accuracy, completeness, or reliability of any information displayed.
                  We recommend contacting providers directly to verify details.
                </p>

                <h3 className="text-xl font-semibold text-foreground mb-3">4.3 Reviews and Ratings</h3>
                <p className="text-muted-foreground leading-relaxed">
                  User reviews and ratings represent the opinions of individual users and do not reflect
                  the views of DentistNearMeNow.com. We do not verify the accuracy of user-submitted reviews.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-foreground mb-4">5. Intellectual Property</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  All content on this Website, including text, graphics, logos, and software, is the property
                  of DentistNearMeNow.com or its content suppliers and is protected by copyright and other
                  intellectual property laws.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  You may not reproduce, distribute, modify, or create derivative works from any content
                  without our express written permission.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-foreground mb-4">6. Third-Party Links</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Our Website may contain links to third-party websites. These links are provided for your
                  convenience only. We have no control over the content of these sites and accept no
                  responsibility for them or for any loss or damage that may arise from your use of them.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-foreground mb-4">7. Limitation of Liability</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  To the fullest extent permitted by law, DentistNearMeNow.com shall not be liable for any
                  indirect, incidental, special, consequential, or punitive damages arising out of your
                  use of the Website.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  We are not responsible for any decisions you make based on information found on our Website,
                  including your choice of dental provider.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-foreground mb-4">8. Indemnification</h2>
                <p className="text-muted-foreground leading-relaxed">
                  You agree to indemnify and hold harmless DentistNearMeNow.com, its officers, directors,
                  employees, and agents from any claims, damages, losses, or expenses arising from your
                  use of the Website or violation of these Terms.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-foreground mb-4">9. For Dental Providers</h2>

                <h3 className="text-xl font-semibold text-foreground mb-3">9.1 Listing Information</h3>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  If you are a dental provider listed on our Website, you may request to update your listing
                  information or remove your listing by contacting us.
                </p>

                <h3 className="text-xl font-semibold text-foreground mb-3">9.2 No Endorsement</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Inclusion in our directory does not constitute an endorsement by DentistNearMeNow.com.
                  We do not verify the credentials, qualifications, or quality of care of listed providers.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-foreground mb-4">10. Changes to Terms</h2>
                <p className="text-muted-foreground leading-relaxed">
                  We reserve the right to modify these Terms of Service at any time. Changes will be effective
                  immediately upon posting on the Website. Your continued use of the Website after any changes
                  constitutes acceptance of the new Terms.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-foreground mb-4">11. Termination</h2>
                <p className="text-muted-foreground leading-relaxed">
                  We may terminate or suspend your access to the Website at any time, without prior notice,
                  for any reason, including violation of these Terms.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-foreground mb-4">12. Governing Law</h2>
                <p className="text-muted-foreground leading-relaxed">
                  These Terms shall be governed by and construed in accordance with the laws of the United States,
                  without regard to its conflict of law provisions.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-foreground mb-4">13. Contact Information</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  If you have any questions about these Terms of Service, please contact us at:
                </p>
                <div className="bg-gray-50 rounded-xl p-6 border">
                  <div className="flex items-center gap-3 mb-3">
                    <Mail className="w-5 h-5 text-primary" />
                    <a href="mailto:legal@dentistnearmenow.com" className="text-primary hover:underline">
                      legal@dentistnearmenow.com
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
                  <Link href="/privacy" className="text-primary hover:underline">
                    Privacy Policy
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
