import { Metadata } from 'next';
import Link from 'next/link';
import { ChevronRight, Clock, AlertTriangle, Phone, Shield, CheckCircle2 } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Handling Dental Emergencies - Complete Emergency Guide',
  description: 'Know what to do in dental emergencies. Expert guide to handling knocked-out teeth, severe pain, broken teeth, and when to seek immediate care.',
  keywords: 'dental emergency, tooth knocked out, dental pain, broken tooth, emergency dentist, toothache',
};

export default function DentalEmergenciesGuide() {
  return (
    <div className="bg-background">
      <section className="bg-gray-50 py-4">
        <div className="container mx-auto px-4">
          <nav className="flex items-center gap-2 text-sm text-muted-foreground">
            <Link href="/" className="hover:text-primary">Home</Link>
            <ChevronRight className="w-4 h-4" />
            <Link href="/guides" className="hover:text-primary">Guides</Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-foreground">Handling Dental Emergencies</span>
          </nav>
        </div>
      </section>

      <article className="py-12">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="mb-8">
            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
              <span className="px-3 py-1 bg-primary/10 text-primary rounded-full font-medium">Emergency</span>
              <span>•</span>
              <span>7 min read</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Handling Dental Emergencies: What You Need to Know
            </h1>
            <p className="text-xl text-muted-foreground">
              Quick action during a dental emergency can save a tooth and prevent serious complications. Learn what to do in common dental emergencies.
            </p>
          </div>

          <div className="bg-red-50 border-l-4 border-red-500 p-6 mb-8">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-6 h-6 text-red-600 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold text-red-900 mb-2">When to Seek Immediate Care</h3>
                <p className="text-red-800 mb-3">Call a dentist or visit the ER immediately if you experience:</p>
                <ul className="text-sm text-red-800 space-y-1">
                  <li>• Tooth knocked out completely</li>
                  <li>• Severe, uncontrollable bleeding</li>
                  <li>• Jaw fracture or dislocation</li>
                  <li>• Difficulty breathing or swallowing</li>
                  <li>• Swelling that closes your eye or affects breathing</li>
                  <li>• Signs of infection with fever, chills, or malaise</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="prose prose-lg max-w-none">
            <h2 className="text-3xl font-bold mt-8 mb-6 flex items-center gap-3">
              <Clock className="w-8 h-8 text-primary" />
              Common Dental Emergencies & What to Do
            </h2>

            <div className="space-y-8 mb-8">
              <div className="border-l-4 border-red-500 bg-red-50 p-6 rounded-r-lg">
                <h3 className="text-2xl font-semibold mb-4 text-red-900">1. Knocked-Out Permanent Tooth (Avulsed Tooth)</h3>
                <p className="mb-4 text-red-800"><strong>Time is critical:</strong> You have 30-60 minutes to save the tooth. Success drops dramatically after 2 hours.</p>
                
                <div className="bg-white p-4 rounded mb-4">
                  <h4 className="font-semibold mb-3">Immediate Steps:</h4>
                  <ol className="space-y-2 text-sm">
                    <li>1. <strong>Find the tooth</strong> - Handle by crown (top) only, never touch the root</li>
                    <li>2. <strong>Rinse gently</strong> - If dirty, rinse briefly with milk or saline (10 seconds max)</li>
                    <li>3. <strong>Reinsert if possible</strong> - Place back in socket, bite down on gauze to hold</li>
                    <li>4. <strong>If can't reinsert</strong> - Store in cold milk or between cheek and gum</li>
                    <li>5. <strong>See dentist immediately</strong> - Call ahead, get there within 30 minutes</li>
                  </ol>
                </div>

                <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4">
                  <p className="text-sm text-yellow-900"><strong>Don't:</strong> Scrub the tooth, let it dry out, wrap in tissue/napkin, use tap water (damages root cells), delay seeking treatment</p>
                </div>

                <p className="mt-4 text-sm text-red-800"><strong>Baby teeth:</strong> Don't try to reinsert - could damage developing permanent tooth. See dentist to check for damage.</p>
              </div>

              <div className="border rounded-lg p-6">
                <h3 className="text-2xl font-semibold mb-4">2. Severe Toothache</h3>
                <p className="mb-4">Intense dental pain indicates infection, abscess, or nerve exposure requiring professional treatment.</p>
                
                <h4 className="font-semibold mb-3">Immediate Relief:</h4>
                <ul className="space-y-2 mb-4">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                    <span className="text-sm">Rinse with warm salt water (1/2 tsp salt in 8 oz water)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                    <span className="text-sm">Take over-the-counter pain reliever (ibuprofen or acetaminophen)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                    <span className="text-sm">Apply cold compress to outside of cheek (15 min on, 15 min off)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                    <span className="text-sm">Gently floss to remove any trapped food</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                    <span className="text-sm">Sleep with head elevated</span>
                  </li>
                </ul>

                <div className="bg-red-50 border-l-4 border-red-500 p-4">
                  <p className="text-sm text-red-800"><strong>Don't:</strong> Place aspirin directly on tooth/gums (causes burns), use heat (increases swelling), ignore persistent pain</p>
                </div>

                <p className="mt-4 text-sm"><strong>When to call:</strong> Immediately if pain is severe, accompanied by fever/swelling, or lasts more than 1-2 days</p>
              </div>

              <div className="border rounded-lg p-6">
                <h3 className="text-2xl font-semibold mb-4">3. Chipped or Broken Tooth</h3>
                <p className="mb-4">Severity ranges from minor cosmetic chips to fractures exposing the nerve.</p>
                
                <div className="grid md:grid-cols-2 gap-4 mb-4">
                  <div className="bg-gray-50 p-4 rounded">
                    <h4 className="font-semibold mb-2">Minor Chips</h4>
                    <ul className="text-sm space-y-1">
                      <li>• Rinse mouth with warm water</li>
                      <li>• Save any pieces if possible</li>
                      <li>• Smooth sharp edges with nail file</li>
                      <li>• Cover with dental wax if needed</li>
                      <li>• Schedule appointment within a week</li>
                    </ul>
                  </div>
                  <div className="bg-red-50 p-4 rounded">
                    <h4 className="font-semibold mb-2 text-red-900">Major Breaks</h4>
                    <ul className="text-sm space-y-1">
                      <li>• Rinse with warm salt water</li>
                      <li>• Control bleeding with gauze</li>
                      <li>• Save tooth fragments in milk</li>
                      <li>• Cold compress for swelling</li>
                      <li>• See dentist same day (nerve may be exposed)</li>
                    </ul>
                  </div>
                </div>

                <p className="text-sm"><strong>Treatment options:</strong> Dental bonding (minor), crown (moderate), root canal + crown (nerve exposed), extraction (severe damage)</p>
              </div>

              <div className="border rounded-lg p-6">
                <h3 className="text-2xl font-semibold mb-4">4. Lost Filling or Crown</h3>
                <p className="mb-4">Exposed tooth structure is vulnerable to damage and sensitivity.</p>
                
                <h4 className="font-semibold mb-3">Temporary Measures:</h4>
                <ul className="space-y-2 mb-4 text-sm">
                  <li>• Clean the crown/tooth gently</li>
                  <li>• Apply dental cement from pharmacy to reattach crown temporarily</li>
                  <li>• If crown swallowed/lost, cover exposed tooth with dental wax</li>
                  <li>• Avoid chewing on that side</li>
                  <li>• Avoid very hot, cold, or sweet foods</li>
                  <li>• Take ibuprofen if sensitive</li>
                </ul>

                <p className="text-sm"><strong>Timeline:</strong> See dentist within 1-2 days. Delay risks further damage or infection. Bring the crown if you have it.</p>
              </div>

              <div className="border rounded-lg p-6">
                <h3 className="text-2xl font-semibold mb-4">5. Dental Abscess</h3>
                <p className="mb-4">Pus-filled infection, typically at tooth root or between gum and tooth. Potentially life-threatening if untreated.</p>
                
                <div className="bg-red-50 p-4 rounded mb-4">
                  <h4 className="font-semibold mb-2 text-red-900">Symptoms:</h4>
                  <ul className="text-sm text-red-800 space-y-1">
                    <li>• Severe, persistent, throbbing toothache</li>
                    <li>• Sensitivity to hot/cold temperatures</li>
                    <li>• Fever and facial swelling</li>
                    <li>• Swollen, tender lymph nodes in neck</li>
                    <li>• Sudden rush of foul-tasting fluid (if abscess ruptures)</li>
                    <li>• Difficulty breathing or swallowing</li>
                  </ul>
                </div>

                <p className="text-sm mb-3"><strong>Immediate care:</strong> Rinse with salt water, take pain relievers, see dentist immediately (same day). May require antibiotics, drainage, root canal, or extraction.</p>
                
                <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4">
                  <p className="text-sm text-yellow-900"><strong>Warning:</strong> Don't ignore an abscess. Infection can spread to jaw, neck, brain, or bloodstream (sepsis). Seek emergency care if difficulty breathing/swallowing.</p>
                </div>
              </div>

              <div className="border rounded-lg p-6">
                <h3 className="text-2xl font-semibold mb-4">6. Soft Tissue Injuries</h3>
                <p className="mb-4">Cuts, punctures, or lacerations to tongue, cheeks, lips, or gums.</p>
                
                <h4 className="font-semibold mb-3">Treatment Steps:</h4>
                <ol className="space-y-2 text-sm mb-4">
                  <li>1. Rinse mouth with salt water solution</li>
                  <li>2. Apply pressure with clean gauze for 10-15 minutes</li>
                  <li>3. Use cold compress on outside to reduce swelling</li>
                  <li>4. If bleeding doesn't stop after 15 minutes, seek emergency care</li>
                  <li>5. See dentist if cut is deep or gaping</li>
                </ol>

                <p className="text-sm"><strong>Stitches needed if:</strong> Cut is deep, edges don't close together, bleeding won't stop, or injury is from dirty/rusty object (tetanus risk).</p>
              </div>
            </div>

            <h2 className="text-3xl font-bold mt-12 mb-6 flex items-center gap-3">
              <Shield className="w-8 h-8 text-primary" />
              Prevention: Avoiding Dental Emergencies
            </h2>

            <div className="space-y-4 mb-8">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                <div>
                  <strong>Wear mouthguards</strong> for contact sports and activities with fall risk (reduces injury risk 60x)
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                <div>
                  <strong>Avoid hard foods</strong> like ice, popcorn kernels, hard candy that can crack teeth
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                <div>
                  <strong>Don't use teeth as tools</strong> to open packages, bottles, or crack nuts
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                <div>
                  <strong>Regular dental checkups</strong> catch problems before they become emergencies
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                <div>
                  <strong>Address dental problems promptly</strong> - small cavities are easier to fix than abscesses
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                <div>
                  <strong>Treat teeth grinding</strong> with night guard to prevent fractures
                </div>
              </div>
            </div>

            <h2 className="text-3xl font-bold mt-12 mb-6">Dental Emergency Kit</h2>
            <p className="text-lg leading-relaxed mb-6">
              Keep these items at home for dental emergencies:
            </p>

            <div className="bg-gray-50 rounded-lg p-6 mb-8">
              <ul className="grid md:grid-cols-2 gap-3 text-sm">
                <li>• Dentist's emergency contact number</li>
                <li>• Ibuprofen or acetaminophen</li>
                <li>• Sterile gauze pads</li>
                <li>• Small container with lid (for knocked-out tooth)</li>
                <li>• Dental wax or temporary filling material</li>
                <li>• Dental floss and toothpicks</li>
                <li>• Cold compress or ice pack</li>
                <li>• Salt (for rinses)</li>
                <li>• Dental mirror and flashlight</li>
                <li>• Oral anesthetic gel (benzocaine)</li>
              </ul>
            </div>

            <div className="bg-primary/10 rounded-lg p-6 mt-8">
              <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
                <Phone className="w-6 h-6" />
                Find Emergency Dental Care
              </h3>
              <p className="mb-4">
                Locate dentists near you who offer emergency services and same-day appointments for urgent dental issues.
              </p>
              <Link
                href="/emergency-dentist"
                className="inline-flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-lg font-medium hover:bg-primary/90 transition-colors"
              >
                Find Emergency Dentists
                <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          <div className="mt-12 pt-8 border-t">
            <h3 className="text-2xl font-bold mb-6">Related Guides</h3>
            <div className="grid md:grid-cols-3 gap-4">
              <Link href="/guides/finding-right-dentist" className="border rounded-lg p-4 hover:border-primary transition-colors">
                <h4 className="font-semibold mb-2">Choosing a Dentist</h4>
                <p className="text-sm text-muted-foreground">Find dentists with emergency services</p>
              </Link>
              <Link href="/guides/pediatric-dental-care" className="border rounded-lg p-4 hover:border-primary transition-colors">
                <h4 className="font-semibold mb-2">Children's Dental Care</h4>
                <p className="text-sm text-muted-foreground">Handling kids' dental emergencies</p>
              </Link>
              <Link href="/guides/dental-procedures" className="border rounded-lg p-4 hover:border-primary transition-colors">
                <h4 className="font-semibold mb-2">Dental Procedures</h4>
                <p className="text-sm text-muted-foreground">Understanding emergency treatments</p>
              </Link>
            </div>
          </div>

          <div className="mt-12 pt-8 border-t text-sm text-muted-foreground">
            <p>
              <strong>Sources:</strong> American Dental Association, American Association of Endodontists, Journal of Dental Traumatology, Emergency Medicine Clinics of North America.
            </p>
          </div>
        </div>
      </article>
    </div>
  );
}
