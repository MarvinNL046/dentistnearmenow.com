import { Metadata } from 'next';
import Link from 'next/link';
import { ChevronRight, Mail, MessageSquare, Building, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const metadata: Metadata = {
  title: 'Contact Us - DentistNearMeNow.com',
  description: 'Get in touch with DentistNearMeNow.com. Contact us for questions, feedback, or business inquiries. We\'re here to help.',
};

export default function ContactPage() {
  return (
    <div className="bg-background">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary to-primary/80 text-white py-16">
        <div className="container mx-auto px-4">
          <nav className="flex items-center gap-2 text-white/80 mb-4 text-sm">
            <Link href="/" className="hover:text-white">Home</Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-white">Contact Us</span>
          </nav>
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Contact Us
            </h1>
            <p className="text-xl text-white/90">
              Have questions or feedback? We&apos;d love to hear from you. Get in touch with
              our team and we&apos;ll respond as soon as possible.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Options */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="grid md:grid-cols-3 gap-6 mb-16">
              <div className="bg-white p-6 rounded-xl border text-center">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Mail className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-semibold mb-2">Email Us</h3>
                <p className="text-muted-foreground text-sm mb-3">
                  For general inquiries and support
                </p>
                <a
                  href="mailto:info@dentistnearmenow.com"
                  className="text-primary hover:underline"
                >
                  info@dentistnearmenow.com
                </a>
              </div>

              <div className="bg-white p-6 rounded-xl border text-center">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Building className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-semibold mb-2">For Dentists</h3>
                <p className="text-muted-foreground text-sm mb-3">
                  Claim or update your listing
                </p>
                <Link
                  href="/for-dentists"
                  className="text-primary hover:underline"
                >
                  Learn More
                </Link>
              </div>

              <div className="bg-white p-6 rounded-xl border text-center">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Clock className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-semibold mb-2">Response Time</h3>
                <p className="text-muted-foreground text-sm mb-3">
                  We typically respond within
                </p>
                <span className="text-primary font-medium">24-48 hours</span>
              </div>
            </div>

            {/* Contact Form */}
            <div className="grid md:grid-cols-2 gap-12">
              <div>
                <h2 className="text-2xl font-bold mb-4">Send Us a Message</h2>
                <p className="text-muted-foreground mb-6">
                  Fill out the form below and we&apos;ll get back to you as soon as possible.
                </p>

                <form className="space-y-6">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        First Name *
                      </label>
                      <input
                        type="text"
                        required
                        className="w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-primary/20"
                        placeholder="John"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Last Name *
                      </label>
                      <input
                        type="text"
                        required
                        className="w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-primary/20"
                        placeholder="Doe"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      className="w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-primary/20"
                      placeholder="john@example.com"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Subject *
                    </label>
                    <select
                      required
                      className="w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-primary/20"
                    >
                      <option value="">Select a topic</option>
                      <option value="general">General Inquiry</option>
                      <option value="feedback">Website Feedback</option>
                      <option value="listing">Listing Issue</option>
                      <option value="dentist">I&apos;m a Dentist</option>
                      <option value="partnership">Business Partnership</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Message *
                    </label>
                    <textarea
                      required
                      rows={5}
                      className="w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-primary/20 resize-none"
                      placeholder="How can we help you?"
                    />
                  </div>

                  <Button type="submit" size="lg" className="w-full sm:w-auto">
                    <MessageSquare className="w-4 h-4 mr-2" />
                    Send Message
                  </Button>
                </form>
              </div>

              {/* FAQ Section */}
              <div>
                <h2 className="text-2xl font-bold mb-4">Common Questions</h2>
                <p className="text-muted-foreground mb-6">
                  Before reaching out, you might find your answer here.
                </p>

                <div className="space-y-4">
                  {[
                    {
                      q: 'How do I find a dentist in my area?',
                      a: 'Use our search feature to find dentists by city, state, or zip code. You can also browse by state from our homepage.',
                    },
                    {
                      q: 'Is DentistNearMeNow free to use?',
                      a: 'Yes! Our dentist directory is completely free for patients to use. Simply search, browse, and contact dentists directly.',
                    },
                    {
                      q: 'How can I update my dental practice listing?',
                      a: 'If you\'re a dentist, visit our "For Dentists" page to claim and update your practice listing.',
                    },
                    {
                      q: 'How do I report incorrect information?',
                      a: 'If you notice incorrect information on a listing, please use this contact form to let us know and we\'ll update it.',
                    },
                  ].map((faq, i) => (
                    <div key={i} className="bg-gray-50 p-4 rounded-lg">
                      <h3 className="font-semibold mb-2">{faq.q}</h3>
                      <p className="text-muted-foreground text-sm">{faq.a}</p>
                    </div>
                  ))}
                </div>

                <div className="mt-6">
                  <Link href="/faq" className="text-primary hover:underline">
                    View all FAQs
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
