import { Metadata } from 'next';
import Link from 'next/link';
import { ChevronRight, BookOpen, Clock, DollarSign, Info, CheckCircle2, AlertCircle } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Common Dental Procedures Explained - What to Expect',
  description: 'Comprehensive guide to common dental procedures including fillings, root canals, crowns, extractions, and more. Learn about processes, costs, and recovery.',
  keywords: 'dental procedures, fillings, root canal, dental crown, tooth extraction, dental implants, teeth cleaning',
};

export default function DentalProceduresGuide() {
  return (
    <div className="bg-background">
      <section className="bg-gray-50 py-4">
        <div className="container mx-auto px-4">
          <nav className="flex items-center gap-2 text-sm text-muted-foreground">
            <Link href="/" className="hover:text-primary">Home</Link>
            <ChevronRight className="w-4 h-4" />
            <Link href="/guides" className="hover:text-primary">Guides</Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-foreground">Common Dental Procedures</span>
          </nav>
        </div>
      </section>

      <article className="py-12">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="mb-8">
            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
              <span className="px-3 py-1 bg-primary/10 text-primary rounded-full font-medium">Treatments</span>
              <span>•</span>
              <span>14 min read</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Common Dental Procedures: What to Expect
            </h1>
            <p className="text-xl text-muted-foreground">
              Understanding dental procedures reduces anxiety and helps you make informed decisions. Learn about the most common treatments, their purposes, processes, and what to expect.
            </p>
          </div>

          <div className="prose prose-lg max-w-none">
            <h2 className="text-3xl font-bold mt-8 mb-6 flex items-center gap-3">
              <BookOpen className="w-8 h-8 text-primary" />
              1. Professional Dental Cleaning (Prophylaxis)
            </h2>
            <p className="text-lg leading-relaxed mb-6">
              The foundation of preventive dentistry. The American Dental Association recommends cleanings every 6 months for most patients.
            </p>

            <div className="bg-blue-50 border-l-4 border-blue-500 p-6 mb-6">
              <h3 className="font-semibold mb-3">What Happens During a Cleaning</h3>
              <ol className="space-y-2 text-sm">
                <li>1. <strong>Examination</strong> - Visual inspection of teeth, gums, and oral tissues</li>
                <li>2. <strong>Scaling</strong> - Removal of plaque and tartar with ultrasonic or manual tools</li>
                <li>3. <strong>Polishing</strong> - Gritty toothpaste buffs away surface stains</li>
                <li>4. <strong>Flossing</strong> - Professional flossing removes debris between teeth</li>
                <li>5. <strong>Fluoride treatment</strong> - Optional strengthening treatment (often included)</li>
              </ol>
            </div>

            <div className="grid md:grid-cols-3 gap-4 mb-6">
              <div className="border rounded-lg p-4">
                <Clock className="w-6 h-6 text-primary mb-2" />
                <h4 className="font-semibold mb-2">Duration</h4>
                <p className="text-sm">30-60 minutes</p>
              </div>
              <div className="border rounded-lg p-4">
                <DollarSign className="w-6 h-6 text-primary mb-2" />
                <h4 className="font-semibold mb-2">Cost</h4>
                <p className="text-sm">$75-$200 (often fully covered by insurance)</p>
              </div>
              <div className="border rounded-lg p-4">
                <Info className="w-6 h-6 text-primary mb-2" />
                <h4 className="font-semibold mb-2">Recovery</h4>
                <p className="text-sm">None - resume normal activities immediately</p>
              </div>
            </div>

            <h2 className="text-3xl font-bold mt-12 mb-6">2. Dental Fillings</h2>
            <p className="text-lg leading-relaxed mb-6">
              Most common restorative procedure, used to repair teeth damaged by decay. The CDC reports 92% of adults have had at least one cavity.
            </p>

            <h3 className="text-2xl font-semibold mt-8 mb-4">Filling Materials</h3>
            <div className="space-y-4 mb-6">
              <div className="border rounded-lg p-4">
                <h4 className="font-semibold mb-2">Composite Resin (Tooth-Colored)</h4>
                <ul className="text-sm space-y-1 mb-3">
                  <li>• <strong>Pros:</strong> Natural appearance, bonds to tooth, versatile for small-medium fillings</li>
                  <li>• <strong>Cons:</strong> Less durable than amalgam (5-10 years), higher cost, may stain over time</li>
                  <li>• <strong>Cost:</strong> $150-$450 per filling</li>
                  <li>• <strong>Best for:</strong> Front teeth, visible areas, small to medium cavities</li>
                </ul>
              </div>

              <div className="border rounded-lg p-4">
                <h4 className="font-semibold mb-2">Silver Amalgam</h4>
                <ul className="text-sm space-y-1 mb-3">
                  <li>• <strong>Pros:</strong> Very durable (10-15+ years), less expensive, strong for back teeth</li>
                  <li>• <strong>Cons:</strong> Silver color, may expand/contract with temperature, mercury concerns (FDA says safe)</li>
                  <li>• <strong>Cost:</strong> $50-$300 per filling</li>
                  <li>• <strong>Best for:</strong> Back teeth, large cavities, patients on budget</li>
                </ul>
              </div>

              <div className="border rounded-lg p-4">
                <h4 className="font-semibold mb-2">Gold & Ceramic (Indirect Fillings)</h4>
                <ul className="text-sm space-y-1 mb-3">
                  <li>• <strong>Pros:</strong> Most durable (15-30 years), biocompatible, excellent fit</li>
                  <li>• <strong>Cons:</strong> Expensive, requires 2 visits, gold is very visible</li>
                  <li>• <strong>Cost:</strong> $250-$4,500 depending on material and size</li>
                  <li>• <strong>Best for:</strong> Large restorations, patients who grind teeth</li>
                </ul>
              </div>
            </div>

            <h3 className="text-2xl font-semibold mt-8 mb-4">The Filling Process</h3>
            <div className="bg-gray-50 rounded-lg p-6 mb-6">
              <ol className="space-y-3 text-sm">
                <li><strong>1. Numbing</strong> - Local anesthetic injected near the affected tooth (takes 5-10 minutes to take effect)</li>
                <li><strong>2. Decay removal</strong> - Dentist uses drill or laser to remove decayed portion of tooth</li>
                <li><strong>3. Preparation</strong> - Tooth is cleaned and prepared for filling material</li>
                <li><strong>4. Filling placement</strong> - Material applied in layers (composite) or as single piece (amalgam)</li>
                <li><strong>5. Shaping & polishing</strong> - Filling shaped to match bite, polished smooth</li>
              </ol>
              <p className="text-sm mt-4"><strong>Duration:</strong> 20-60 minutes depending on size and location</p>
            </div>

            <div className="bg-yellow-50 border-l-4 border-yellow-500 p-6 mb-6">
              <h4 className="font-semibold mb-2">After Your Filling</h4>
              <ul className="text-sm space-y-1">
                <li>• Numbness wears off in 1-3 hours - avoid hot beverages and chewing during this time</li>
                <li>• Mild sensitivity normal for a few days, especially with composite fillings</li>
                <li>• Contact dentist if pain persists beyond a week or bite feels uneven</li>
                <li>• Composite fillings are fully set immediately; amalgam sets within 24 hours</li>
              </ul>
            </div>

            <h2 className="text-3xl font-bold mt-12 mb-6">3. Root Canal Treatment (Endodontic Therapy)</h2>
            <p className="text-lg leading-relaxed mb-6">
              Despite its reputation, root canal treatment relieves pain rather than causing it. Over 15 million root canals are performed annually in the US, with a 95% success rate.
            </p>

            <h3 className="text-2xl font-semibold mt-8 mb-4">When Is It Needed?</h3>
            <ul className="space-y-2 mb-6 text-sm">
              <li>• Deep decay reaching the tooth pulp (nerve and blood vessels)</li>
              <li>• Crack or fracture allowing bacteria to enter pulp</li>
              <li>• Trauma to tooth damaging pulp</li>
              <li>• Repeated dental procedures on same tooth</li>
              <li>• Large filling compromising structural integrity</li>
            </ul>

            <div className="bg-red-50 border-l-4 border-red-500 p-6 mb-6">
              <h4 className="font-semibold text-red-900 mb-2">Warning Signs You May Need a Root Canal</h4>
              <ul className="text-sm text-red-800 space-y-1">
                <li>• Severe toothache when chewing or applying pressure</li>
                <li>• Prolonged sensitivity to hot/cold (lingers after stimulus removed)</li>
                <li>• Darkening or discoloration of tooth</li>
                <li>• Swelling and tenderness in nearby gums</li>
                <li>• Persistent or recurring pimple on gums</li>
              </ul>
            </div>

            <h3 className="text-2xl font-semibold mt-8 mb-4">The Root Canal Process</h3>
            <div className="bg-blue-50 rounded-lg p-6 mb-6">
              <h4 className="font-semibold mb-3">Visit 1 (60-90 minutes)</h4>
              <ol className="space-y-2 text-sm mb-4">
                <li>1. X-ray to assess infection extent</li>
                <li>2. Local anesthetic (same as filling - you won't feel pain during procedure)</li>
                <li>3. Rubber dam placed to isolate tooth and keep it dry</li>
                <li>4. Access hole drilled in top of tooth</li>
                <li>5. Infected pulp removed, root canals cleaned and shaped</li>
                <li>6. Canals filled with rubber-like material (gutta-percha)</li>
                <li>7. Temporary filling placed to seal opening</li>
              </ol>

              <h4 className="font-semibold mb-3">Visit 2 (2-3 weeks later, 30-60 minutes)</h4>
              <ul className="text-sm space-y-1">
                <li>• Temporary filling removed</li>
                <li>• Permanent filling or crown placed</li>
                <li>• Crown typically recommended for structural support (especially back teeth)</li>
              </ul>
            </div>

            <div className="grid md:grid-cols-2 gap-4 mb-6">
              <div className="border rounded-lg p-4">
                <h4 className="font-semibold mb-2">Cost</h4>
                <ul className="text-sm space-y-1">
                  <li>• Front tooth: $700-$1,100</li>
                  <li>• Bicuspid: $800-$1,200</li>
                  <li>• Molar: $1,200-$1,800</li>
                  <li>• Crown additional: $1,000-$3,000</li>
                  <li>• Insurance typically covers 50-80%</li>
                </ul>
              </div>
              <div className="border rounded-lg p-4">
                <h4 className="font-semibold mb-2">Recovery</h4>
                <ul className="text-sm space-y-1">
                  <li>• Mild discomfort 2-3 days (OTC pain relievers sufficient)</li>
                  <li>• Avoid chewing on that side until permanent restoration</li>
                  <li>• Brush and floss normally</li>
                  <li>• Contact dentist if severe pain or swelling develops</li>
                </ul>
              </div>
            </div>

            <h2 className="text-3xl font-bold mt-12 mb-6">4. Dental Crowns (Caps)</h2>
            <p className="text-lg leading-relaxed mb-6">
              A crown covers the entire visible portion of a tooth, restoring its shape, size, strength, and appearance. Used when a tooth is too damaged for a filling.
            </p>

            <h3 className="text-2xl font-semibold mt-8 mb-4">Common Reasons for Crowns</h3>
            <ul className="space-y-2 mb-6">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                <span className="text-sm">Protect weak tooth from breaking (after root canal or large filling)</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                <span className="text-sm">Restore broken or severely worn tooth</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                <span className="text-sm">Cover and support tooth with large filling when little structure remains</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                <span className="text-sm">Hold dental bridge in place</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                <span className="text-sm">Cover dental implant</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                <span className="text-sm">Improve appearance of misshapen or discolored tooth</span>
              </li>
            </ul>

            <h3 className="text-2xl font-semibold mt-8 mb-4">Traditional Crown Process (2 Visits)</h3>
            <div className="space-y-4 mb-6">
              <div className="bg-gray-50 p-4 rounded">
                <h4 className="font-semibold mb-2">Visit 1 (60-90 minutes)</h4>
                <ul className="text-sm space-y-1">
                  <li>• Tooth numbed and prepared (filed down to create space for crown)</li>
                  <li>• Impression or digital scan taken</li>
                  <li>• Shade selected to match surrounding teeth</li>
                  <li>• Temporary crown placed (plastic/metal, fragile)</li>
                  <li>• Crown sent to lab (2-3 weeks fabrication)</li>
                </ul>
              </div>

              <div className="bg-gray-50 p-4 rounded">
                <h4 className="font-semibold mb-2">Visit 2 (30-60 minutes)</h4>
                <ul className="text-sm space-y-1">
                  <li>• Temporary crown removed</li>
                  <li>• Permanent crown checked for fit and color</li>
                  <li>• Crown cemented in place</li>
                  <li>• Bite adjusted if needed</li>
                </ul>
              </div>
            </div>

            <div className="bg-blue-50 border-l-4 border-blue-500 p-6 mb-6">
              <h4 className="font-semibold mb-2">Same-Day Crowns (CEREC)</h4>
              <p className="text-sm mb-2">Some offices offer same-day crowns using CAD/CAM technology:</p>
              <ul className="text-sm space-y-1">
                <li>• Digital impressions instead of putty molds</li>
                <li>• Crown designed on computer</li>
                <li>• Milled from porcelain block in-office (90 minutes)</li>
                <li>• Placed same day - no temporary crown needed</li>
                <li>• Slightly more expensive but very convenient</li>
              </ul>
            </div>

            <h2 className="text-3xl font-bold mt-12 mb-6">5. Tooth Extraction</h2>
            <p className="text-lg leading-relaxed mb-6">
              Removal of a tooth from its socket in the bone. While dentists prefer to save teeth when possible, extraction is sometimes necessary.
            </p>

            <h3 className="text-2xl font-semibold mt-8 mb-4">Reasons for Extraction</h3>
            <ul className="space-y-2 mb-6 text-sm">
              <li>• Severe decay beyond repair</li>
              <li>• Advanced gum disease loosening tooth</li>
              <li>• Infection unresponsive to root canal</li>
              <li>• Crowding (orthodontic reasons)</li>
              <li>• Impacted wisdom teeth</li>
              <li>• Fractured tooth with root damage</li>
            </ul>

            <h3 className="text-2xl font-semibold mt-8 mb-4">Types of Extraction</h3>
            <div className="grid md:grid-cols-2 gap-4 mb-6">
              <div className="border rounded-lg p-4">
                <h4 className="font-semibold mb-2">Simple Extraction</h4>
                <p className="text-sm mb-2">Tooth is visible above gumline</p>
                <ul className="text-sm space-y-1">
                  <li>• Local anesthetic only</li>
                  <li>• Tooth loosened with elevator tool</li>
                  <li>• Removed with forceps</li>
                  <li>• 20-40 minutes</li>
                  <li>• Cost: $75-$300</li>
                </ul>
              </div>
              <div className="border rounded-lg p-4">
                <h4 className="font-semibold mb-2">Surgical Extraction</h4>
                <p className="text-sm mb-2">Tooth not easily accessible (broken, impacted)</p>
                <ul className="text-sm space-y-1">
                  <li>• IV sedation or general anesthesia option</li>
                  <li>• Gum incision may be needed</li>
                  <li>• Bone removal or tooth sectioning</li>
                  <li>• 30-90 minutes</li>
                  <li>• Cost: $225-$600+</li>
                </ul>
              </div>
            </div>

            <div className="bg-yellow-50 border-l-4 border-yellow-500 p-6 mb-6">
              <h4 className="font-semibold mb-3">Post-Extraction Care (Critical for Healing)</h4>
              <ul className="text-sm space-y-2">
                <li>• <strong>First 24 hours:</strong> Bite on gauze for 30-45 minutes, apply ice packs, avoid rinsing/spitting, no straws</li>
                <li>• <strong>Days 2-7:</strong> Gentle salt water rinses (after 24 hours), soft foods, sleep with head elevated</li>
                <li>• <strong>Avoid:</strong> Smoking (delays healing by days/weeks), alcohol, vigorous exercise for 48 hours</li>
                <li>• <strong>Pain management:</strong> Ibuprofen/acetaminophen as prescribed, prescription pain meds if needed</li>
                <li>• <strong>Dry socket warning:</strong> If severe pain develops 3-4 days post-extraction, call dentist immediately</li>
              </ul>
            </div>

            <h2 className="text-3xl font-bold mt-12 mb-6">6. Dental Implants</h2>
            <p className="text-lg leading-relaxed mb-6">
              The gold standard for tooth replacement. Titanium posts surgically placed in jawbone serve as artificial tooth roots. Success rate exceeds 95% over 10 years.
            </p>

            <h3 className="text-2xl font-semibold mt-8 mb-4">The Implant Process (3-6 Months Total)</h3>
            <div className="space-y-4 mb-6">
              <div className="bg-gray-50 p-4 rounded">
                <h4 className="font-semibold mb-2">Stage 1: Implant Placement</h4>
                <ul className="text-sm space-y-1">
                  <li>• Surgical procedure under local anesthesia (sedation available)</li>
                  <li>• Titanium post placed into jawbone</li>
                  <li>• Healing cap or temporary crown may be placed</li>
                  <li>• Duration: 1-2 hours per implant</li>
                </ul>
              </div>

              <div className="bg-gray-50 p-4 rounded">
                <h4 className="font-semibold mb-2">Stage 2: Osseointegration (3-6 Months)</h4>
                <ul className="text-sm space-y-1">
                  <li>• Bone grows around implant, fusing with it</li>
                  <li>• Critical for implant stability</li>
                  <li>• No appointments during this phase</li>
                  <li>• Temporary tooth replacement options available</li>
                </ul>
              </div>

              <div className="bg-gray-50 p-4 rounded">
                <h4 className="font-semibold mb-2">Stage 3: Abutment & Crown Placement</h4>
                <ul className="text-sm space-y-1">
                  <li>• Abutment (connector piece) attached to implant</li>
                  <li>• Custom crown fabricated and placed</li>
                  <li>• Functions and looks like natural tooth</li>
                  <li>• No special maintenance beyond normal brushing/flossing</li>
                </ul>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4 mb-6">
              <div className="border rounded-lg p-4">
                <h4 className="font-semibold mb-2">Advantages</h4>
                <ul className="text-sm space-y-1">
                  <li>• Permanent solution (can last lifetime)</li>
                  <li>• Prevents bone loss in jaw</li>
                  <li>• Doesn't affect adjacent teeth</li>
                  <li>• Looks, feels, functions like natural tooth</li>
                  <li>• 99% chewing efficiency of natural tooth</li>
                </ul>
              </div>
              <div className="border rounded-lg p-4">
                <h4 className="font-semibold mb-2">Cost & Considerations</h4>
                <ul className="text-sm space-y-1">
                  <li>• Single implant: $3,000-$4,500</li>
                  <li>• Insurance rarely covers (cosmetic)</li>
                  <li>• Requires adequate bone (grafting may be needed)</li>
                  <li>• Not ideal for smokers (failure rate 2x higher)</li>
                  <li>• Requires good oral hygiene</li>
                </ul>
              </div>
            </div>

            <h2 className="text-3xl font-bold mt-12 mb-6">Other Common Procedures</h2>

            <div className="space-y-6 mb-8">
              <div className="border-l-4 border-primary pl-4">
                <h3 className="font-semibold mb-2">Dental Bridges</h3>
                <p className="text-sm text-muted-foreground mb-2">Replace missing teeth using adjacent teeth as anchors. Less expensive than implants ($700-$1,500 per tooth) but requires modifying healthy adjacent teeth. Lasts 5-15 years.</p>
              </div>

              <div className="border-l-4 border-primary pl-4">
                <h3 className="font-semibold mb-2">Dentures</h3>
                <p className="text-sm text-muted-foreground mb-2">Removable appliances replacing missing teeth. Partial dentures replace some teeth ($300-$5,000), complete dentures replace all teeth in arch ($600-$8,000). Require adjustment period and regular maintenance.</p>
              </div>

              <div className="border-l-4 border-primary pl-4">
                <h3 className="font-semibold mb-2">Teeth Whitening (Professional)</h3>
                <p className="text-sm text-muted-foreground mb-2">In-office whitening produces dramatic results in single visit ($300-$1,000). Custom take-home trays provide gradual whitening over 2-4 weeks ($200-$500). Results last 1-3 years with proper maintenance.</p>
              </div>

              <div className="border-l-4 border-primary pl-4">
                <h3 className="font-semibold mb-2">Scaling & Root Planing (Deep Cleaning)</h3>
                <p className="text-sm text-muted-foreground mb-2">Non-surgical treatment for gum disease. Removes plaque and tartar from below gumline and smooths root surfaces. Usually done in 2-4 quadrant visits. Cost: $200-$400 per quadrant. May be fully/partially covered by insurance.</p>
              </div>
            </div>

            <div className="bg-blue-50 border-l-4 border-blue-500 p-6 mb-8">
              <h3 className="font-semibold mb-3">Questions to Ask Before Any Procedure</h3>
              <ul className="text-sm space-y-2">
                <li>• Why is this procedure necessary? What happens if I wait?</li>
                <li>• What are my treatment options and their pros/cons?</li>
                <li>• What is the total cost and what will insurance cover?</li>
                <li>• How long will the procedure take and what is recovery like?</li>
                <li>• What are the risks and success rates?</li>
                <li>• What experience do you have with this procedure?</li>
                <li>• Are payment plans available?</li>
              </ul>
            </div>

            <div className="bg-primary/10 rounded-lg p-6 mt-8">
              <h3 className="font-semibold text-lg mb-3">Find Experienced Dental Professionals</h3>
              <p className="mb-4">
                Locate qualified dentists in your area who perform these procedures. Read reviews and compare credentials to make informed decisions about your dental care.
              </p>
              <Link
                href="/search"
                className="inline-flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-lg font-medium hover:bg-primary/90 transition-colors"
              >
                Search for Dentists
                <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          <div className="mt-12 pt-8 border-t">
            <h3 className="text-2xl font-bold mb-6">Related Guides</h3>
            <div className="grid md:grid-cols-3 gap-4">
              <Link href="/guides/dental-insurance" className="border rounded-lg p-4 hover:border-primary transition-colors">
                <h4 className="font-semibold mb-2">Understanding Dental Insurance</h4>
                <p className="text-sm text-muted-foreground">Learn what procedures are covered</p>
              </Link>
              <Link href="/guides/oral-health-conditions" className="border rounded-lg p-4 hover:border-primary transition-colors">
                <h4 className="font-semibold mb-2">Oral Health Conditions</h4>
                <p className="text-sm text-muted-foreground">Conditions that require these procedures</p>
              </Link>
              <Link href="/guides/finding-right-dentist" className="border rounded-lg p-4 hover:border-primary transition-colors">
                <h4 className="font-semibold mb-2">Choosing the Right Dentist</h4>
                <p className="text-sm text-muted-foreground">Find qualified professionals</p>
              </Link>
            </div>
          </div>

          <div className="mt-12 pt-8 border-t text-sm text-muted-foreground">
            <p>
              <strong>Disclaimer:</strong> Treatment recommendations vary based on individual circumstances. Always consult with a licensed dentist for personalized diagnosis and treatment planning. Costs are estimates and vary by location, dentist experience, and case complexity.
            </p>
            <p className="mt-3">
              <strong>Sources:</strong> American Dental Association, American Association of Endodontists, American Academy of Implant Dentistry, Journal of the American Dental Association.
            </p>
          </div>
        </div>
      </article>
    </div>
  );
}
