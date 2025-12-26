import { Metadata } from 'next';
import Link from 'next/link';
import { ChevronRight, Award, MapPin, Clock, Star, Phone, Shield, Users, CheckCircle2 } from 'lucide-react';

export const metadata: Metadata = {
  title: 'How to Choose the Right Dentist - Complete Guide 2024',
  description: 'Expert guide on selecting the right dentist for you and your family. Learn about credentials, specializations, insurance, and what to look for in a dental practice.',
  keywords: 'choosing a dentist, find dentist, dental care, dentist qualifications, dental practice, family dentist',
  openGraph: {
    title: 'How to Choose the Right Dentist - Complete Guide 2024',
    description: 'Expert guide on selecting the right dentist for you and your family.',
    type: 'article',
  },
};

export default function FindingRightDentistGuide() {
  return (
    <div className="bg-background">
      {/* Breadcrumb */}
      <section className="bg-gray-50 py-4">
        <div className="container mx-auto px-4">
          <nav className="flex items-center gap-2 text-sm text-muted-foreground">
            <Link href="/" className="hover:text-primary">Home</Link>
            <ChevronRight className="w-4 h-4" />
            <Link href="/guides" className="hover:text-primary">Guides</Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-foreground">How to Choose the Right Dentist</span>
          </nav>
        </div>
      </section>

      {/* Article Header */}
      <article className="py-12">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="mb-8">
            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
              <span className="px-3 py-1 bg-primary/10 text-primary rounded-full font-medium">Getting Started</span>
              <span>•</span>
              <span>8 min read</span>
              <span>•</span>
              <span>Updated December 2024</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              How to Choose the Right Dentist: A Comprehensive Guide
            </h1>
            <p className="text-xl text-muted-foreground">
              Finding the right dentist is crucial for maintaining optimal oral health. This guide will help you make an informed decision based on credentials, experience, and your specific needs.
            </p>
          </div>

          {/* Author Info */}
          <div className="border-l-4 border-primary bg-gray-50 p-6 mb-8 rounded-r-lg">
            <div className="flex items-start gap-4">
              <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center flex-shrink-0">
                <Users className="w-8 h-8 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold mb-1">Expert Dental Health Team</h3>
                <p className="text-sm text-muted-foreground mb-2">
                  Reviewed by licensed dental professionals with over 20 years of combined experience in general dentistry, oral surgery, and patient care.
                </p>
                <p className="text-xs text-muted-foreground">
                  Last medically reviewed: December 2024 | Sources: American Dental Association, CDC
                </p>
              </div>
            </div>
          </div>

          {/* Table of Contents */}
          <div className="bg-gray-50 rounded-lg p-6 mb-8">
            <h2 className="text-lg font-semibold mb-4">Table of Contents</h2>
            <ul className="space-y-2 text-sm">
              <li><a href="#why-matters" className="text-primary hover:underline">Why Your Choice of Dentist Matters</a></li>
              <li><a href="#credentials" className="text-primary hover:underline">Check Credentials and Qualifications</a></li>
              <li><a href="#experience" className="text-primary hover:underline">Evaluate Experience and Specializations</a></li>
              <li><a href="#location" className="text-primary hover:underline">Consider Location and Accessibility</a></li>
              <li><a href="#technology" className="text-primary hover:underline">Assess Technology and Facilities</a></li>
              <li><a href="#insurance" className="text-primary hover:underline">Verify Insurance and Payment Options</a></li>
              <li><a href="#reviews" className="text-primary hover:underline">Read Patient Reviews and Testimonials</a></li>
              <li><a href="#first-visit" className="text-primary hover:underline">Questions to Ask During Your First Visit</a></li>
              <li><a href="#red-flags" className="text-primary hover:underline">Red Flags to Watch Out For</a></li>
            </ul>
          </div>

          {/* Article Content */}
          <div className="prose prose-lg max-w-none">
            <h2 id="why-matters" className="text-3xl font-bold mt-12 mb-6 flex items-center gap-3">
              <Shield className="w-8 h-8 text-primary" />
              Why Your Choice of Dentist Matters
            </h2>
            <p className="text-lg leading-relaxed mb-6">
              Selecting the right dentist is one of the most important healthcare decisions you'll make. According to the American Dental Association (ADA), regular dental care can prevent serious oral health issues and even detect early signs of systemic diseases like diabetes and heart disease.
            </p>
            <p className="text-lg leading-relaxed mb-6">
              The right dentist will not only provide excellent clinical care but also make you feel comfortable and informed about your treatment options. Studies show that patients who trust their dentist are more likely to maintain regular checkups and follow through with recommended treatments.
            </p>
            <div className="bg-blue-50 border-l-4 border-blue-500 p-6 my-8">
              <p className="font-semibold text-blue-900 mb-2">Did You Know?</p>
              <p className="text-blue-800">
                The CDC reports that nearly 1 in 4 adults has untreated tooth decay, often due to lack of access to or discomfort with dental care. Finding a dentist you trust can significantly improve your oral health outcomes.
              </p>
            </div>

            <h2 id="credentials" className="text-3xl font-bold mt-12 mb-6 flex items-center gap-3">
              <Award className="w-8 h-8 text-primary" />
              Check Credentials and Qualifications
            </h2>
            <p className="text-lg leading-relaxed mb-6">
              Before scheduling your first appointment, verify that the dentist has the proper credentials. All practicing dentists in the United States must hold a Doctor of Dental Surgery (DDS) or Doctor of Dental Medicine (DMD) degree from an accredited dental school.
            </p>

            <h3 className="text-2xl font-semibold mt-8 mb-4">Essential Qualifications to Verify:</h3>
            <ul className="space-y-3 mb-6">
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                <div>
                  <strong>State Licensure:</strong> Ensure the dentist is licensed to practice in your state. You can verify this through your state's dental board website.
                </div>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                <div>
                  <strong>Education:</strong> Check that they graduated from an ADA-accredited dental school. This ensures they received comprehensive training meeting national standards.
                </div>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                <div>
                  <strong>Board Certification:</strong> While not required, board certification demonstrates additional expertise and commitment to continuing education.
                </div>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                <div>
                  <strong>Continuing Education:</strong> Dentists are required to complete continuing education credits to maintain their license, showing they stay current with the latest techniques.
                </div>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                <div>
                  <strong>Professional Memberships:</strong> Membership in the ADA or state dental associations indicates commitment to professional standards and ethics.
                </div>
              </li>
            </ul>

            <h2 id="experience" className="text-3xl font-bold mt-12 mb-6 flex items-center gap-3">
              <Star className="w-8 h-8 text-primary" />
              Evaluate Experience and Specializations
            </h2>
            <p className="text-lg leading-relaxed mb-6">
              Experience matters in dentistry. A dentist who has been practicing for several years will have encountered a wide variety of cases and developed refined skills. However, newer dentists often bring knowledge of the latest techniques and technologies.
            </p>

            <h3 className="text-2xl font-semibold mt-8 mb-4">Common Dental Specializations:</h3>
            <div className="grid md:grid-cols-2 gap-4 mb-6">
              <div className="border rounded-lg p-4">
                <h4 className="font-semibold mb-2">General Dentistry</h4>
                <p className="text-sm text-muted-foreground">Routine checkups, cleanings, fillings, and preventive care for all ages.</p>
              </div>
              <div className="border rounded-lg p-4">
                <h4 className="font-semibold mb-2">Pediatric Dentistry</h4>
                <p className="text-sm text-muted-foreground">Specialized care for children from infancy through teenage years.</p>
              </div>
              <div className="border rounded-lg p-4">
                <h4 className="font-semibold mb-2">Orthodontics</h4>
                <p className="text-sm text-muted-foreground">Correction of misaligned teeth and jaws using braces or aligners.</p>
              </div>
              <div className="border rounded-lg p-4">
                <h4 className="font-semibold mb-2">Periodontics</h4>
                <p className="text-sm text-muted-foreground">Treatment of gum disease and placement of dental implants.</p>
              </div>
              <div className="border rounded-lg p-4">
                <h4 className="font-semibold mb-2">Endodontics</h4>
                <p className="text-sm text-muted-foreground">Root canal therapy and treatment of dental pulp issues.</p>
              </div>
              <div className="border rounded-lg p-4">
                <h4 className="font-semibold mb-2">Cosmetic Dentistry</h4>
                <p className="text-sm text-muted-foreground">Aesthetic improvements including whitening, veneers, and bonding.</p>
              </div>
            </div>
            <p className="text-lg leading-relaxed mb-6">
              Consider your specific needs when evaluating a dentist's experience. If you have children, a family dentist or pediatric specialist might be ideal. For complex restorative work, look for dentists with advanced training in that area.
            </p>

            <h2 id="location" className="text-3xl font-bold mt-12 mb-6 flex items-center gap-3">
              <MapPin className="w-8 h-8 text-primary" />
              Consider Location and Accessibility
            </h2>
            <p className="text-lg leading-relaxed mb-6">
              The convenience of your dentist's location can significantly impact your consistency with dental care. Research shows that patients are more likely to keep regular appointments when the dental office is within 10-15 minutes of their home or workplace.
            </p>

            <h3 className="text-2xl font-semibold mt-8 mb-4">Location Factors to Consider:</h3>
            <ul className="space-y-3 mb-6">
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
                <div>
                  <strong>Proximity to Home or Work:</strong> Choose a location that's convenient for your daily routine to make appointments easier to keep.
                </div>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
                <div>
                  <strong>Parking Availability:</strong> Easy parking or public transportation access reduces stress before appointments.
                </div>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
                <div>
                  <strong>Office Hours:</strong> Look for offices with flexible hours, including early morning, evening, or weekend appointments.
                </div>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
                <div>
                  <strong>Accessibility:</strong> Ensure the office is accessible if you or a family member has mobility concerns.
                </div>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
                <div>
                  <strong>Emergency Services:</strong> Ask about availability for dental emergencies outside regular hours.
                </div>
              </li>
            </ul>

            <h2 id="technology" className="text-3xl font-bold mt-12 mb-6 flex items-center gap-3">
              <Clock className="w-8 h-8 text-primary" />
              Assess Technology and Facilities
            </h2>
            <p className="text-lg leading-relaxed mb-6">
              Modern dental technology can make procedures more comfortable, accurate, and efficient. While not every practice needs the latest equipment, certain technologies are now considered standard of care.
            </p>

            <h3 className="text-2xl font-semibold mt-8 mb-4">Important Technologies to Look For:</h3>
            <div className="bg-gray-50 rounded-lg p-6 mb-6">
              <ul className="space-y-4">
                <li>
                  <strong className="text-primary">Digital X-rays:</strong> Reduce radiation exposure by up to 90% compared to traditional X-rays and provide instant images.
                </li>
                <li>
                  <strong className="text-primary">Intraoral Cameras:</strong> Allow you to see what the dentist sees, improving communication and understanding of your oral health.
                </li>
                <li>
                  <strong className="text-primary">CAD/CAM Technology:</strong> Enables same-day crowns and restorations, eliminating multiple visits.
                </li>
                <li>
                  <strong className="text-primary">Laser Dentistry:</strong> Provides less invasive treatment for gum disease and certain procedures with reduced pain and healing time.
                </li>
                <li>
                  <strong className="text-primary">Electronic Health Records:</strong> Ensure your dental history is accurately maintained and easily accessible.
                </li>
              </ul>
            </div>
            <p className="text-lg leading-relaxed mb-6">
              Beyond technology, observe the overall cleanliness and organization of the facility. A well-maintained office with sterile equipment indicates attention to infection control and patient safety.
            </p>

            <h2 id="insurance" className="text-3xl font-bold mt-12 mb-6 flex items-center gap-3">
              <Phone className="w-8 h-8 text-primary" />
              Verify Insurance and Payment Options
            </h2>
            <p className="text-lg leading-relaxed mb-6">
              Understanding the financial aspect of dental care upfront can prevent surprises later. According to the National Association of Dental Plans, about 77% of Americans have dental insurance, but coverage and out-of-pocket costs vary significantly.
            </p>

            <h3 className="text-2xl font-semibold mt-8 mb-4">Financial Questions to Ask:</h3>
            <ul className="space-y-3 mb-6">
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                <div>
                  <strong>Insurance Acceptance:</strong> Confirm they accept your dental insurance and are in-network to maximize benefits.
                </div>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                <div>
                  <strong>Payment Plans:</strong> Ask about payment plans or financing options for larger procedures.
                </div>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                <div>
                  <strong>Upfront Estimates:</strong> Ensure they provide written cost estimates before major procedures.
                </div>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                <div>
                  <strong>In-House Plans:</strong> Some offices offer membership plans for uninsured patients with discounted rates.
                </div>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                <div>
                  <strong>Billing Transparency:</strong> Look for practices that clearly explain costs and billing procedures.
                </div>
              </li>
            </ul>

            <h2 id="reviews" className="text-3xl font-bold mt-12 mb-6">Read Patient Reviews and Testimonials</h2>
            <p className="text-lg leading-relaxed mb-6">
              Patient reviews provide valuable insights into the patient experience, though they should be considered alongside other factors. A 2023 study found that 72% of patients use online reviews as their first step in finding a new healthcare provider.
            </p>

            <h3 className="text-2xl font-semibold mt-8 mb-4">What to Look for in Reviews:</h3>
            <div className="bg-yellow-50 border-l-4 border-yellow-500 p-6 mb-6">
              <ul className="space-y-2">
                <li><strong>Consistency:</strong> Look for patterns in reviews rather than focusing on individual comments.</li>
                <li><strong>Recent Feedback:</strong> Prioritize reviews from the last 6-12 months for current information.</li>
                <li><strong>Specific Details:</strong> Detailed reviews are often more reliable than vague positive or negative comments.</li>
                <li><strong>Staff Interaction:</strong> Note comments about front desk staff, hygienists, and overall office environment.</li>
                <li><strong>Treatment Outcomes:</strong> Pay attention to mentions of successful treatments and follow-up care.</li>
              </ul>
            </div>
            <p className="text-lg leading-relaxed mb-6">
              Remember that every practice will have some negative reviews. Focus on how the practice responds to concerns and whether the overall sentiment is positive.
            </p>

            <h2 id="first-visit" className="text-3xl font-bold mt-12 mb-6">Questions to Ask During Your First Visit</h2>
            <p className="text-lg leading-relaxed mb-6">
              Your initial consultation is an opportunity to assess whether the dentist and practice are the right fit for you. Come prepared with questions and pay attention to how thoroughly they're answered.
            </p>

            <h3 className="text-2xl font-semibold mt-8 mb-4">Important Questions:</h3>
            <div className="grid gap-4 mb-6">
              <div className="border-l-4 border-primary pl-4">
                <p className="font-semibold mb-2">About Treatment Philosophy:</p>
                <p className="text-muted-foreground">"What is your approach to preventive care? How do you help patients maintain good oral health between visits?"</p>
              </div>
              <div className="border-l-4 border-primary pl-4">
                <p className="font-semibold mb-2">About Communication:</p>
                <p className="text-muted-foreground">"How do you communicate treatment options? Will you explain the pros and cons of different approaches?"</p>
              </div>
              <div className="border-l-4 border-primary pl-4">
                <p className="font-semibold mb-2">About Emergencies:</p>
                <p className="text-muted-foreground">"How do you handle dental emergencies? Is there after-hours availability or an emergency contact?"</p>
              </div>
              <div className="border-l-4 border-primary pl-4">
                <p className="font-semibold mb-2">About Referrals:</p>
                <p className="text-muted-foreground">"Do you perform specialized procedures in-house, or do you refer to specialists? If so, whom do you recommend?"</p>
              </div>
              <div className="border-l-4 border-primary pl-4">
                <p className="font-semibold mb-2">About Comfort:</p>
                <p className="text-muted-foreground">"What options are available for patients who experience dental anxiety? Do you offer sedation dentistry?"</p>
              </div>
            </div>

            <h2 id="red-flags" className="text-3xl font-bold mt-12 mb-6">Red Flags to Watch Out For</h2>
            <p className="text-lg leading-relaxed mb-6">
              While most dental professionals are committed to providing excellent care, certain warning signs should prompt you to continue your search elsewhere.
            </p>

            <div className="bg-red-50 border-l-4 border-red-500 p-6 mb-6">
              <h3 className="font-semibold text-red-900 mb-4">Warning Signs:</h3>
              <ul className="space-y-3 text-red-800">
                <li>• Unclear or evasive answers about credentials, experience, or treatment costs</li>
                <li>• Pressure to undergo unnecessary or overly aggressive treatment</li>
                <li>• Lack of infection control procedures or visibly unclean facilities</li>
                <li>• Unwillingness to provide treatment alternatives or second opinions</li>
                <li>• Poor communication or dismissive attitude toward your questions or concerns</li>
                <li>• Consistently long wait times or difficulty scheduling appointments</li>
                <li>• No clear emergency protocol or after-hours contact information</li>
                <li>• Outdated technology when it impacts care quality (though this alone isn't always a dealbreaker)</li>
              </ul>
            </div>

            <h2 className="text-3xl font-bold mt-12 mb-6">Making Your Final Decision</h2>
            <p className="text-lg leading-relaxed mb-6">
              Choosing the right dentist is a personal decision that depends on your unique needs, preferences, and circumstances. Trust your instincts along with the objective criteria outlined in this guide.
            </p>
            <p className="text-lg leading-relaxed mb-6">
              Remember that you can always change dentists if your needs aren't being met. Your oral health is too important to compromise on quality care or a comfortable patient experience.
            </p>

            <div className="bg-primary/10 rounded-lg p-6 mt-8">
              <h3 className="font-semibold text-lg mb-3">Ready to Find Your Dentist?</h3>
              <p className="mb-4">
                Use our comprehensive directory to search for qualified dentists in your area. Filter by location, specialization, insurance accepted, and patient reviews.
              </p>
              <Link
                href="/search"
                className="inline-flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-lg font-medium hover:bg-primary/90 transition-colors"
              >
                Search for Dentists Near You
                <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Related Articles */}
          <div className="mt-12 pt-8 border-t">
            <h3 className="text-2xl font-bold mb-6">Related Guides</h3>
            <div className="grid md:grid-cols-3 gap-4">
              <Link href="/guides/dental-insurance" className="border rounded-lg p-4 hover:border-primary transition-colors">
                <h4 className="font-semibold mb-2">Understanding Dental Insurance</h4>
                <p className="text-sm text-muted-foreground">Learn about coverage options and maximizing benefits</p>
              </Link>
              <Link href="/guides/dental-emergencies" className="border rounded-lg p-4 hover:border-primary transition-colors">
                <h4 className="font-semibold mb-2">Handling Dental Emergencies</h4>
                <p className="text-sm text-muted-foreground">Know when to seek immediate dental care</p>
              </Link>
              <Link href="/guides/dental-health-tips" className="border rounded-lg p-4 hover:border-primary transition-colors">
                <h4 className="font-semibold mb-2">Daily Dental Care Tips</h4>
                <p className="text-sm text-muted-foreground">Expert tips for maintaining healthy teeth and gums</p>
              </Link>
            </div>
          </div>

          {/* Medical Disclaimer */}
          <div className="mt-12 pt-8 border-t text-sm text-muted-foreground">
            <p className="mb-4">
              <strong>Medical Disclaimer:</strong> This article is for informational purposes only and does not constitute medical advice. Always consult with a qualified healthcare provider or dentist for personalized medical guidance. The information provided is based on current dental practice standards and recommendations from the American Dental Association as of December 2024.
            </p>
            <p>
              <strong>Sources:</strong> American Dental Association (ADA), Centers for Disease Control and Prevention (CDC), National Association of Dental Plans, Journal of the American Dental Association.
            </p>
          </div>
        </div>
      </article>
    </div>
  );
}
