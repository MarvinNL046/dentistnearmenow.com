import { Metadata } from 'next';
import Link from 'next/link';
import { ChevronRight, Smile, Sparkles, DollarSign, CheckCircle2, Info } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Guide to Cosmetic Dentistry - Procedures, Costs & Results',
  description: 'Complete guide to cosmetic dentistry including teeth whitening, veneers, bonding, and smile makeovers. Learn about procedures, costs, and what to expect.',
  keywords: 'cosmetic dentistry, teeth whitening, veneers, dental bonding, smile makeover, tooth reshaping',
};

export default function CosmeticDentistryGuide() {
  return (
    <div className="bg-background">
      <section className="bg-gray-50 py-4">
        <div className="container mx-auto px-4">
          <nav className="flex items-center gap-2 text-sm text-muted-foreground">
            <Link href="/" className="hover:text-primary">Home</Link>
            <ChevronRight className="w-4 h-4" />
            <Link href="/guides" className="hover:text-primary">Guides</Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-foreground">Guide to Cosmetic Dentistry</span>
          </nav>
        </div>
      </section>

      <article className="py-12">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="mb-8">
            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
              <span className="px-3 py-1 bg-primary/10 text-primary rounded-full font-medium">Treatments</span>
              <span>•</span>
              <span>10 min read</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Complete Guide to Cosmetic Dentistry
            </h1>
            <p className="text-xl text-muted-foreground">
              Transform your smile with modern cosmetic dentistry. Learn about popular procedures, costs, candidacy requirements, and realistic expectations.
            </p>
          </div>

          <div className="prose prose-lg max-w-none">
            <h2 className="text-3xl font-bold mt-8 mb-6 flex items-center gap-3">
              <Smile className="w-8 h-8 text-primary" />
              Understanding Cosmetic Dentistry
            </h2>
            <p className="text-lg leading-relaxed mb-6">
              Cosmetic dentistry focuses on improving the appearance of your teeth, gums, and smile. While traditional dentistry addresses oral health issues, cosmetic procedures primarily enhance aesthetics. According to the American Academy of Cosmetic Dentistry (AACD), over 99% of adults believe a smile is an important social asset, and 74% feel an unattractive smile can hurt career success.
            </p>

            <div className="bg-blue-50 border-l-4 border-blue-500 p-6 my-6">
              <p className="font-semibold text-blue-900 mb-2">Important Note</p>
              <p className="text-blue-800">
                Many cosmetic procedures also provide functional benefits. For example, dental crowns protect damaged teeth while improving appearance. Always consult with a qualified dentist to determine the best approach for your specific situation.
              </p>
            </div>

            <h2 className="text-3xl font-bold mt-12 mb-6 flex items-center gap-3">
              <Sparkles className="w-8 h-8 text-primary" />
              Popular Cosmetic Dental Procedures
            </h2>

            <div className="space-y-8 mb-8">
              <div className="border rounded-lg p-6">
                <h3 className="text-2xl font-semibold mb-4">1. Teeth Whitening</h3>
                <p className="mb-4">The most popular and affordable cosmetic procedure, removing stains and discoloration to brighten your smile.</p>
                
                <div className="grid md:grid-cols-2 gap-4 mb-4">
                  <div className="bg-gray-50 p-4 rounded">
                    <h4 className="font-semibold mb-2">In-Office Whitening</h4>
                    <ul className="text-sm space-y-1">
                      <li>• Professional-grade bleaching agents</li>
                      <li>• Immediate results (teeth 3-8 shades lighter)</li>
                      <li>• Single 60-90 minute session</li>
                      <li>• Cost: $300-$1,000 per session</li>
                      <li>• Results last 1-3 years with maintenance</li>
                    </ul>
                  </div>
                  <div className="bg-gray-50 p-4 rounded">
                    <h4 className="font-semibold mb-2">At-Home Whitening</h4>
                    <ul className="text-sm space-y-1">
                      <li>• Custom trays from your dentist</li>
                      <li>• Gradual whitening over 2-4 weeks</li>
                      <li>• More affordable option</li>
                      <li>• Cost: $200-$500 for custom trays</li>
                      <li>• Over-the-counter: $20-$100</li>
                    </ul>
                  </div>
                </div>

                <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 mt-4">
                  <p className="text-sm"><strong>Best Candidates:</strong> Those with healthy teeth and gums, extrinsic staining from coffee, tea, wine, or tobacco. Not effective on intrinsic stains or dental work (crowns, veneers).</p>
                </div>
              </div>

              <div className="border rounded-lg p-6">
                <h3 className="text-2xl font-semibold mb-4">2. Porcelain Veneers</h3>
                <p className="mb-4">Thin shells of porcelain bonded to front teeth, transforming shape, color, size, and alignment.</p>
                
                <div className="space-y-3 mb-4">
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                    <div>
                      <strong>Benefits:</strong> Natural appearance, stain-resistant, durable (10-15 years), versatile solution for multiple cosmetic issues
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Info className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
                    <div>
                      <strong>Process:</strong> 2-3 visits over 2-4 weeks. Teeth are prepared (small amount of enamel removed), impressions taken, temporary veneers placed, then permanent veneers bonded
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <DollarSign className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                    <div>
                      <strong>Cost:</strong> $925-$2,500 per tooth (average $1,500). Full smile makeover (6-10 teeth): $10,000-$25,000
                    </div>
                  </div>
                </div>

                <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 mt-4">
                  <p className="text-sm"><strong>Best Candidates:</strong> Patients with discolored, worn, chipped, misaligned, or irregularly shaped teeth. Requires good oral health and sufficient enamel. Irreversible procedure.</p>
                </div>
              </div>

              <div className="border rounded-lg p-6">
                <h3 className="text-2xl font-semibold mb-4">3. Dental Bonding</h3>
                <p className="mb-4">Tooth-colored composite resin applied to repair chips, close gaps, or improve appearance.</p>
                
                <div className="grid md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <h4 className="font-semibold mb-2 text-green-700">Advantages</h4>
                    <ul className="text-sm space-y-1">
                      <li>• Single appointment (30-60 min per tooth)</li>
                      <li>• Most affordable cosmetic option</li>
                      <li>• Minimal tooth preparation</li>
                      <li>• Easily repaired if damaged</li>
                      <li>• Reversible procedure</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2 text-red-700">Limitations</h4>
                    <ul className="text-sm space-y-1">
                      <li>• Less durable than veneers (3-10 years)</li>
                      <li>• More prone to staining</li>
                      <li>• Not as translucent as veneers</li>
                      <li>• Can chip more easily</li>
                    </ul>
                  </div>
                </div>

                <p className="text-sm mb-2"><strong>Cost:</strong> $300-$600 per tooth</p>
                <p className="text-sm"><strong>Best For:</strong> Minor cosmetic improvements, small chips, gaps less than 2mm, temporary cosmetic fixes, or those on a budget.</p>
              </div>

              <div className="border rounded-lg p-6">
                <h3 className="text-2xl font-semibold mb-4">4. Dental Crowns (Caps)</h3>
                <p className="mb-4">Full coverage restoration that encases entire visible portion of tooth, combining cosmetic and functional benefits.</p>
                
                <div className="bg-gray-50 p-4 rounded mb-4">
                  <h4 className="font-semibold mb-2">Material Options</h4>
                  <ul className="space-y-2 text-sm">
                    <li>• <strong>Porcelain/Ceramic:</strong> Most natural appearance, ideal for front teeth ($800-$3,000)</li>
                    <li>• <strong>Porcelain-fused-to-metal:</strong> Strong with good aesthetics ($500-$1,500)</li>
                    <li>• <strong>Gold alloys:</strong> Most durable, best for back teeth, less aesthetic ($600-$2,500)</li>
                    <li>• <strong>Zirconia:</strong> Strong and aesthetic, newer option ($1,000-$2,500)</li>
                  </ul>
                </div>

                <p className="text-sm mb-2"><strong>Process:</strong> 2 visits over 2-3 weeks. Tooth prepared, temporary crown placed, permanent crown crafted and cemented. CEREC same-day crowns available at some offices.</p>
                <p className="text-sm"><strong>Lifespan:</strong> 5-15 years with proper care. Some last 25+ years.</p>
              </div>

              <div className="border rounded-lg p-6">
                <h3 className="text-2xl font-semibold mb-4">5. Invisalign & Clear Aligners</h3>
                <p className="mb-4">Clear, removable aligners that gradually straighten teeth without traditional metal braces.</p>
                
                <ul className="space-y-3 mb-4">
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                    <div><strong>Virtually invisible:</strong> Clear plastic, most people won't notice</div>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                    <div><strong>Removable:</strong> Eat and drink normally, easier oral hygiene</div>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                    <div><strong>Comfortable:</strong> No metal brackets or wires to irritate mouth</div>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                    <div><strong>Predictable:</strong> 3D treatment plan shows expected results upfront</div>
                  </li>
                </ul>

                <p className="text-sm mb-2"><strong>Treatment Time:</strong> 6-18 months for most cases (traditional braces: 18-36 months)</p>
                <p className="text-sm mb-2"><strong>Cost:</strong> $3,000-$8,000 (comparable to traditional braces)</p>
                <p className="text-sm"><strong>Best For:</strong> Mild to moderate misalignment, gaps, crowding, crossbite. Not suitable for severe orthodontic issues.</p>
              </div>

              <div className="border rounded-lg p-6">
                <h3 className="text-2xl font-semibold mb-4">6. Gum Contouring</h3>
                <p className="mb-4">Reshaping gumline to improve smile aesthetics, often called "gum lift" or "gingivectomy."</p>
                
                <p className="mb-3 text-sm"><strong>Addresses:</strong> "Gummy smile" (excessive gum tissue), uneven gumline, teeth appearing too short</p>
                <p className="mb-3 text-sm"><strong>Procedure:</strong> Soft tissue laser or scalpel removes excess gum tissue. Often done under local anesthesia in single visit. Modern laser techniques minimize bleeding and healing time.</p>
                <p className="mb-2 text-sm"><strong>Recovery:</strong> 1-2 weeks for complete healing. Mild discomfort managed with over-the-counter pain relievers.</p>
                <p className="text-sm"><strong>Cost:</strong> $300-$3,000 depending on extent of reshaping needed</p>
              </div>
            </div>

            <h2 className="text-3xl font-bold mt-12 mb-6 flex items-center gap-3">
              <DollarSign className="w-8 h-8 text-primary" />
              Costs and Insurance Coverage
            </h2>
            <p className="text-lg leading-relaxed mb-6">
              Cosmetic dentistry is generally not covered by insurance as it's considered elective. However, procedures with both cosmetic and functional benefits may qualify for partial coverage.
            </p>

            <div className="bg-blue-50 border-l-4 border-blue-500 p-6 mb-6">
              <h3 className="font-semibold mb-3">Potentially Covered Procedures</h3>
              <ul className="space-y-2 text-sm">
                <li>• Crowns for damaged or decayed teeth (functional restoration)</li>
                <li>• Bonding to repair tooth damage from injury</li>
                <li>• Orthodontics if medically necessary for bite problems</li>
                <li>• Gum contouring for periodontal health reasons</li>
              </ul>
            </div>

            <h3 className="text-2xl font-semibold mt-8 mb-4">Financing Options</h3>
            <ul className="space-y-3 mb-6">
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                <div><strong>Payment Plans:</strong> Many practices offer in-house financing with monthly payments, often interest-free for 6-12 months</div>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                <div><strong>Third-Party Financing:</strong> Companies like CareCredit offer healthcare-specific credit cards with promotional financing</div>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                <div><strong>Health Savings Accounts:</strong> If you have an HSA or FSA, cosmetic procedures may qualify if deemed medically necessary</div>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                <div><strong>Dental Schools:</strong> Supervised student work at 30-50% discount, though appointments take longer</div>
              </li>
            </ul>

            <h2 className="text-3xl font-bold mt-12 mb-6">Choosing a Cosmetic Dentist</h2>
            <p className="text-lg leading-relaxed mb-6">
              While all dentists receive basic cosmetic training, additional education and experience matter significantly for optimal results.
            </p>

            <div className="space-y-4 mb-8">
              <div className="border-l-4 border-primary pl-4">
                <h3 className="font-semibold mb-2">Check Credentials</h3>
                <p className="text-muted-foreground text-sm">
                  Look for membership in the American Academy of Cosmetic Dentistry (AACD) or completion of accredited cosmetic dentistry programs. Accreditation through AACD indicates advanced training and expertise.
                </p>
              </div>
              <div className="border-l-4 border-primary pl-4">
                <h3 className="font-semibold mb-2">Review Before/After Photos</h3>
                <p className="text-muted-foreground text-sm">
                  Ask to see portfolio of actual patient results (not stock photos). Look for cases similar to yours and consistent quality across multiple patients.
                </p>
              </div>
              <div className="border-l-4 border-primary pl-4">
                <h3 className="font-semibold mb-2">Technology and Techniques</h3>
                <p className="text-muted-foreground text-sm">
                  Modern tools like digital smile design, CAD/CAM systems, and laser dentistry enhance precision and results. Ask about technology used during your consultation.
                </p>
              </div>
              <div className="border-l-4 border-primary pl-4">
                <h3 className="font-semibold mb-2">Schedule Consultation</h3>
                <p className="text-muted-foreground text-sm">
                  Most cosmetic dentists offer free consultations. Use this to assess communication style, discuss treatment options, see the facility, and determine if you feel comfortable.
                </p>
              </div>
            </div>

            <h2 className="text-3xl font-bold mt-12 mb-6">Setting Realistic Expectations</h2>
            <p className="text-lg leading-relaxed mb-6">
              While cosmetic dentistry can dramatically improve your smile, understanding limitations ensures satisfaction with results.
            </p>

            <div className="bg-yellow-50 border-l-4 border-yellow-500 p-6 mb-6">
              <h3 className="font-semibold text-yellow-900 mb-3">Important Considerations</h3>
              <ul className="space-y-2 text-yellow-800 text-sm">
                <li>• Results depend on your starting condition, oral health, and chosen procedure</li>
                <li>• Some procedures require ongoing maintenance or replacement over time</li>
                <li>• Whitening effectiveness varies based on type and cause of discoloration</li>
                <li>• Perfect symmetry isn't achievable - natural-looking results are the goal</li>
                <li>• Existing dental work (crowns, bridges) won't change color with whitening</li>
                <li>• Good oral health must be maintained to preserve cosmetic results</li>
                <li>• Recovery time varies - some procedures have temporary sensitivity or restrictions</li>
              </ul>
            </div>

            <h2 className="text-3xl font-bold mt-12 mb-6">Maintaining Your New Smile</h2>
            <p className="text-lg leading-relaxed mb-6">
              Proper care extends the life of cosmetic dental work and protects your investment.
            </p>

            <ul className="space-y-3 mb-8">
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                <div><strong>Excellent Oral Hygiene:</strong> Brush twice daily, floss daily, use mouthwash. Essential for all cosmetic work.</div>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                <div><strong>Regular Dental Visits:</strong> Professional cleanings every 6 months, or as recommended by your dentist.</div>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                <div><strong>Avoid Staining Foods:</strong> Limit coffee, tea, red wine, berries. Rinse or brush after consuming.</div>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                <div><strong>Protect from Damage:</strong> Wear mouthguard for sports, night guard if you grind teeth, don't use teeth as tools.</div>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                <div><strong>Touch-Up Treatments:</strong> Whitening may need refreshing every 1-2 years to maintain brightness.</div>
              </li>
            </ul>

            <div className="bg-primary/10 rounded-lg p-6 mt-8">
              <h3 className="font-semibold text-lg mb-3">Ready for Your Smile Transformation?</h3>
              <p className="mb-4">
                Find experienced cosmetic dentists in your area and schedule a consultation to discuss your smile goals.
              </p>
              <Link
                href="/search"
                className="inline-flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-lg font-medium hover:bg-primary/90 transition-colors"
              >
                Find Cosmetic Dentists
                <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          <div className="mt-12 pt-8 border-t">
            <h3 className="text-2xl font-bold mb-6">Related Guides</h3>
            <div className="grid md:grid-cols-3 gap-4">
              <Link href="/guides/finding-right-dentist" className="border rounded-lg p-4 hover:border-primary transition-colors">
                <h4 className="font-semibold mb-2">Choosing a Dentist</h4>
                <p className="text-sm text-muted-foreground">Find qualified cosmetic dentists</p>
              </Link>
              <Link href="/guides/dental-insurance" className="border rounded-lg p-4 hover:border-primary transition-colors">
                <h4 className="font-semibold mb-2">Dental Insurance Guide</h4>
                <p className="text-sm text-muted-foreground">Understanding coverage for procedures</p>
              </Link>
              <Link href="/guides/dental-procedures" className="border rounded-lg p-4 hover:border-primary transition-colors">
                <h4 className="font-semibold mb-2">Common Dental Procedures</h4>
                <p className="text-sm text-muted-foreground">Learn about restorative treatments</p>
              </Link>
            </div>
          </div>

          <div className="mt-12 pt-8 border-t text-sm text-muted-foreground">
            <p>
              <strong>Sources:</strong> American Academy of Cosmetic Dentistry (AACD), American Dental Association, Journal of Cosmetic Dentistry, Consumer Guide to Dentistry.
            </p>
          </div>
        </div>
      </article>
    </div>
  );
}
