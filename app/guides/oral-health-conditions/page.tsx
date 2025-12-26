import { Metadata } from 'next';
import Link from 'next/link';
import { ChevronRight, AlertCircle, Heart, Shield, Info, CheckCircle2 } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Common Oral Health Conditions - Complete Guide',
  description: 'Learn about cavities, gum disease, tooth sensitivity, and other common dental conditions. Understand symptoms, causes, treatments, and prevention.',
  keywords: 'cavities, gum disease, gingivitis, periodontitis, tooth decay, oral health, dental conditions',
};

export default function OralHealthConditionsGuide() {
  return (
    <div className="bg-background">
      <section className="bg-gray-50 py-4">
        <div className="container mx-auto px-4">
          <nav className="flex items-center gap-2 text-sm text-muted-foreground">
            <Link href="/" className="hover:text-primary">Home</Link>
            <ChevronRight className="w-4 h-4" />
            <Link href="/guides" className="hover:text-primary">Guides</Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-foreground">Common Oral Health Conditions</span>
          </nav>
        </div>
      </section>

      <article className="py-12">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="mb-8">
            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
              <span className="px-3 py-1 bg-primary/10 text-primary rounded-full font-medium">Education</span>
              <span>•</span>
              <span>11 min read</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Common Oral Health Conditions: Understanding & Prevention
            </h1>
            <p className="text-xl text-muted-foreground">
              Comprehensive guide to the most common dental conditions, their causes, symptoms, treatments, and evidence-based prevention strategies.
            </p>
          </div>

          <div className="prose prose-lg max-w-none">
            <h2 className="text-3xl font-bold mt-8 mb-6 flex items-center gap-3">
              <AlertCircle className="w-8 h-8 text-primary" />
              1. Tooth Decay (Dental Caries/Cavities)
            </h2>
            <p className="text-lg leading-relaxed mb-6">
              Tooth decay is the most common chronic disease worldwide. According to the CDC, 1 in 4 adults has untreated cavities. Decay occurs when bacteria produce acid that erodes tooth enamel.
            </p>

            <div className="bg-blue-50 border-l-4 border-blue-500 p-6 mb-6">
              <h3 className="font-semibold mb-3">How Cavities Form</h3>
              <ol className="space-y-2 text-sm">
                <li>1. <strong>Bacteria feed on sugars/starches</strong> from food and drinks</li>
                <li>2. <strong>Acid is produced</strong> that attacks tooth enamel</li>
                <li>3. <strong>Enamel weakens</strong> creating microscopic holes</li>
                <li>4. <strong>Decay progresses</strong> through enamel into dentin (inner layer)</li>
                <li>5. <strong>Cavity forms</strong> requiring professional treatment</li>
              </ol>
            </div>

            <h3 className="text-2xl font-semibold mt-8 mb-4">Symptoms & Stages</h3>
            <div className="space-y-4 mb-6">
              <div className="border-l-4 border-gray-300 pl-4">
                <h4 className="font-semibold mb-2">Early Stage (Reversible)</h4>
                <p className="text-sm text-muted-foreground">White spots on teeth, no pain. Can be reversed with fluoride treatment and improved oral hygiene.</p>
              </div>
              <div className="border-l-4 border-yellow-500 pl-4">
                <h4 className="font-semibold mb-2">Moderate Stage</h4>
                <p className="text-sm text-muted-foreground">Sensitivity to sweets, temperature. Brown/black spots. Requires filling.</p>
              </div>
              <div className="border-l-4 border-red-500 pl-4">
                <h4 className="font-semibold mb-2">Advanced Stage</h4>
                <p className="text-sm text-muted-foreground">Visible hole, severe pain, potential infection. May need crown, root canal, or extraction.</p>
              </div>
            </div>

            <h3 className="text-2xl font-semibold mt-8 mb-4">Prevention Strategies</h3>
            <ul className="space-y-3 mb-6">
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                <div><strong>Brush twice daily with fluoride toothpaste</strong> - Fluoride strengthens enamel and reverses early decay</div>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                <div><strong>Floss daily</strong> - Removes plaque from between teeth where 40% of decay starts</div>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                <div><strong>Limit sugary/acidic foods and drinks</strong> - Especially between meals when saliva can't neutralize acids</div>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                <div><strong>Drink fluoridated water</strong> - Reduces cavities by 25% in children and adults</div>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                <div><strong>Get dental sealants</strong> - Especially for children, prevents 80% of cavities in back teeth</div>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                <div><strong>Regular dental checkups</strong> - Early detection allows simpler, less expensive treatment</div>
              </li>
            </ul>

            <h2 className="text-3xl font-bold mt-12 mb-6 flex items-center gap-3">
              <Heart className="w-8 h-8 text-primary" />
              2. Gum Disease (Periodontal Disease)
            </h2>
            <p className="text-lg leading-relaxed mb-6">
              Gum disease affects nearly half of American adults over 30, according to the CDC. It's the leading cause of tooth loss in adults and is linked to heart disease, diabetes, and other systemic conditions.
            </p>

            <div className="space-y-6 mb-8">
              <div className="bg-yellow-50 border rounded-lg p-6">
                <h3 className="text-xl font-semibold mb-4">Stage 1: Gingivitis (Reversible)</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-semibold mb-2 text-sm">Symptoms:</h4>
                    <ul className="text-sm space-y-1">
                      <li>• Red, swollen gums</li>
                      <li>• Bleeding when brushing/flossing</li>
                      <li>• Bad breath</li>
                      <li>• No pain (usually)</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2 text-sm">Treatment:</h4>
                    <ul className="text-sm space-y-1">
                      <li>• Improved oral hygiene</li>
                      <li>• Professional cleaning</li>
                      <li>• Antimicrobial mouthwash</li>
                      <li>• Fully reversible with care</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-red-50 border rounded-lg p-6">
                <h3 className="text-xl font-semibold mb-4 text-red-900">Stage 2-4: Periodontitis (Irreversible)</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-semibold mb-2 text-sm">Symptoms:</h4>
                    <ul className="text-sm space-y-1">
                      <li>• Receding gums</li>
                      <li>• Loose or shifting teeth</li>
                      <li>• Persistent bad breath</li>
                      <li>• Pus between teeth/gums</li>
                      <li>• Changes in bite</li>
                      <li>• Tooth loss (advanced)</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2 text-sm">Treatment:</h4>
                    <ul className="text-sm space-y-1">
                      <li>• Deep cleaning (scaling/root planing)</li>
                      <li>• Antibiotics</li>
                      <li>• Gum surgery if severe</li>
                      <li>• Bone/tissue grafts</li>
                      <li>• Implants for lost teeth</li>
                      <li>• Ongoing maintenance cleanings</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <h3 className="text-2xl font-semibold mt-8 mb-4">Risk Factors</h3>
            <div className="bg-gray-50 rounded-lg p-6 mb-6">
              <ul className="grid md:grid-cols-2 gap-3 text-sm">
                <li>• Poor oral hygiene</li>
                <li>• Smoking/tobacco use (6x higher risk)</li>
                <li>• Diabetes (3x higher risk)</li>
                <li>• Genetics/family history</li>
                <li>• Stress (weakens immune system)</li>
                <li>• Medications causing dry mouth</li>
                <li>• Hormonal changes (pregnancy, menopause)</li>
                <li>• Poor nutrition/vitamin deficiencies</li>
              </ul>
            </div>

            <h2 className="text-3xl font-bold mt-12 mb-6">3. Tooth Sensitivity</h2>
            <p className="text-lg leading-relaxed mb-6">
              Affects 1 in 8 adults. Sharp, temporary pain when teeth are exposed to hot, cold, sweet, or acidic substances, or when breathing cold air.
            </p>

            <h3 className="text-2xl font-semibold mt-8 mb-4">Common Causes</h3>
            <ul className="space-y-3 mb-6">
              <li className="flex items-start gap-3">
                <Info className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
                <div><strong>Enamel erosion</strong> from acidic foods/drinks, aggressive brushing, or acid reflux exposes sensitive dentin layer</div>
              </li>
              <li className="flex items-start gap-3">
                <Info className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
                <div><strong>Gum recession</strong> exposes tooth roots which lack protective enamel coating</div>
              </li>
              <li className="flex items-start gap-3">
                <Info className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
                <div><strong>Tooth decay or damage</strong> creates pathways to nerve</div>
              </li>
              <li className="flex items-start gap-3">
                <Info className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
                <div><strong>Teeth grinding</strong> wears down enamel over time</div>
              </li>
              <li className="flex items-start gap-3">
                <Info className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
                <div><strong>Recent dental work</strong> - Temporary sensitivity after fillings, crowns, or whitening (usually resolves in days/weeks)</div>
              </li>
            </ul>

            <h3 className="text-2xl font-semibold mt-8 mb-4">Treatment Options</h3>
            <div className="grid md:grid-cols-2 gap-4 mb-6">
              <div className="border rounded-lg p-4">
                <h4 className="font-semibold mb-2">At-Home Solutions</h4>
                <ul className="text-sm space-y-2">
                  <li>• Desensitizing toothpaste (blocks pain signals)</li>
                  <li>• Soft-bristled toothbrush</li>
                  <li>• Fluoride rinse</li>
                  <li>• Avoid acidic foods/drinks</li>
                  <li>• Don't brush immediately after acidic exposure</li>
                </ul>
              </div>
              <div className="border rounded-lg p-4">
                <h4 className="font-semibold mb-2">Professional Treatments</h4>
                <ul className="text-sm space-y-2">
                  <li>• Fluoride varnish/gel</li>
                  <li>• Bonding to cover exposed roots</li>
                  <li>• Gum graft for severe recession</li>
                  <li>• Root canal if nerve damage</li>
                  <li>• Night guard for grinding</li>
                </ul>
              </div>
            </div>

            <h2 className="text-3xl font-bold mt-12 mb-6">4. Bad Breath (Halitosis)</h2>
            <p className="text-lg leading-relaxed mb-6">
              Chronic bad breath affects 25% of people globally. While occasional bad breath is normal, persistent halitosis often indicates an underlying dental or medical issue.
            </p>

            <h3 className="text-2xl font-semibold mt-8 mb-4">Dental Causes (90% of cases)</h3>
            <ul className="space-y-2 mb-6 text-sm">
              <li>• Poor oral hygiene - bacteria on tongue, teeth, gums produce sulfur compounds</li>
              <li>• Gum disease - infected pockets harbor odor-causing bacteria</li>
              <li>• Dry mouth - lack of saliva allows bacteria to multiply</li>
              <li>• Food trapped in teeth/dental work</li>
              <li>• Tongue coating - bacteria and debris on tongue surface</li>
              <li>• Smoking/tobacco use</li>
              <li>• Dentures not cleaned properly</li>
            </ul>

            <h3 className="text-2xl font-semibold mt-8 mb-4">Medical Causes (10% of cases)</h3>
            <div className="bg-yellow-50 border-l-4 border-yellow-500 p-6 mb-6">
              <p className="text-sm mb-3">If dental causes ruled out, see a doctor about:</p>
              <ul className="text-sm space-y-1">
                <li>• Sinus infections or postnasal drip</li>
                <li>• Respiratory infections (bronchitis, pneumonia)</li>
                <li>• Acid reflux (GERD)</li>
                <li>• Diabetes (fruity odor)</li>
                <li>• Kidney disease (ammonia-like odor)</li>
                <li>• Liver disease</li>
              </ul>
            </div>

            <h2 className="text-3xl font-bold mt-12 mb-6 flex items-center gap-3">
              <Shield className="w-8 h-8 text-primary" />
              5. Tooth Erosion
            </h2>
            <p className="text-lg leading-relaxed mb-6">
              Progressive loss of tooth enamel from acid exposure (not bacteria). Affects appearance, function, and increases cavity risk.
            </p>

            <h3 className="text-2xl font-semibold mt-8 mb-4">Primary Causes</h3>
            <div className="grid md:grid-cols-2 gap-4 mb-6">
              <div className="bg-red-50 p-4 rounded">
                <h4 className="font-semibold mb-2">Dietary Acids</h4>
                <ul className="text-sm space-y-1">
                  <li>• Soda (pH 2.5, very acidic)</li>
                  <li>• Energy/sports drinks</li>
                  <li>• Fruit juices (especially citrus)</li>
                  <li>• Wine (especially white)</li>
                  <li>• Citrus fruits</li>
                  <li>• Pickled foods, vinegar</li>
                </ul>
              </div>
              <div className="bg-orange-50 p-4 rounded">
                <h4 className="font-semibold mb-2">Medical Conditions</h4>
                <ul className="text-sm space-y-1">
                  <li>• Acid reflux/GERD</li>
                  <li>• Bulimia/frequent vomiting</li>
                  <li>• Chronic alcoholism</li>
                  <li>• Dry mouth conditions</li>
                  <li>• Certain medications</li>
                  <li>• Excessive vitamin C</li>
                </ul>
              </div>
            </div>

            <h3 className="text-2xl font-semibold mt-8 mb-4">Signs of Erosion</h3>
            <ul className="space-y-2 mb-6 text-sm">
              <li>• Increased sensitivity to temperature and sweets</li>
              <li>• Teeth appear yellow (dentin shows through thin enamel)</li>
              <li>• Rounded, smooth tooth surfaces</li>
              <li>• Transparent edges on front teeth</li>
              <li>• Cupping (small dents) on chewing surfaces</li>
              <li>• Cracks or roughness on teeth</li>
            </ul>

            <h3 className="text-2xl font-semibold mt-8 mb-4">Protection Strategies</h3>
            <ul className="space-y-3 mb-6">
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                <div><strong>Limit acidic foods/drinks</strong> - Consume with meals when saliva production is highest</div>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                <div><strong>Use a straw</strong> for acidic beverages to minimize contact with teeth</div>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                <div><strong>Rinse with water</strong> after acidic exposure to neutralize pH</div>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                <div><strong>Wait to brush</strong> 30-60 minutes after acid exposure (enamel is temporarily soft)</div>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                <div><strong>Chew sugar-free gum</strong> to stimulate protective saliva flow</div>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                <div><strong>Use fluoride toothpaste</strong> and consider prescription-strength fluoride if erosion is significant</div>
              </li>
            </ul>

            <h2 className="text-3xl font-bold mt-12 mb-6">6. Teeth Grinding (Bruxism)</h2>
            <p className="text-lg leading-relaxed mb-6">
              Involuntary clenching or grinding of teeth, typically during sleep. Affects 8-31% of the population and can cause significant dental damage over time.
            </p>

            <div className="bg-blue-50 border-l-4 border-blue-500 p-6 mb-6">
              <h3 className="font-semibold mb-3">Common Triggers</h3>
              <ul className="space-y-2 text-sm">
                <li>• <strong>Stress and anxiety</strong> - Most common cause</li>
                <li>• <strong>Sleep disorders</strong> - Sleep apnea increases risk 3x</li>
                <li>• <strong>Misaligned bite</strong> - Abnormal contact between upper/lower teeth</li>
                <li>• <strong>Medications</strong> - Some antidepressants (SSRIs) can trigger grinding</li>
                <li>• <strong>Lifestyle factors</strong> - Caffeine, alcohol, smoking, recreational drugs</li>
                <li>• <strong>Genetics</strong> - Often runs in families</li>
              </ul>
            </div>

            <h3 className="text-2xl font-semibold mt-8 mb-4">Symptoms & Complications</h3>
            <div className="grid md:grid-cols-2 gap-4 mb-6">
              <div className="border rounded-lg p-4">
                <h4 className="font-semibold mb-2">Signs You May Grind</h4>
                <ul className="text-sm space-y-1">
                  <li>• Worn, flattened, or chipped teeth</li>
                  <li>• Increased tooth sensitivity</li>
                  <li>• Jaw pain or tightness</li>
                  <li>• Dull headaches (especially morning)</li>
                  <li>• Earache-like pain</li>
                  <li>• Partner reports grinding sounds</li>
                </ul>
              </div>
              <div className="border rounded-lg p-4">
                <h4 className="font-semibold mb-2">Long-term Damage</h4>
                <ul className="text-sm space-y-1">
                  <li>• Fractured or loose teeth</li>
                  <li>• Loss of tooth enamel</li>
                  <li>• TMJ disorders</li>
                  <li>• Chronic facial pain</li>
                  <li>• Need for crowns, bridges, implants</li>
                  <li>• Changes in facial appearance</li>
                </ul>
              </div>
            </div>

            <h3 className="text-2xl font-semibold mt-8 mb-4">Treatment Approach</h3>
            <ul className="space-y-3 mb-6">
              <li className="flex items-start gap-3">
                <Shield className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                <div><strong>Night guard (most common)</strong> - Custom-fitted appliance protects teeth from grinding damage ($300-700)</div>
              </li>
              <li className="flex items-start gap-3">
                <Shield className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                <div><strong>Stress management</strong> - Meditation, therapy, exercise, relaxation techniques</div>
              </li>
              <li className="flex items-start gap-3">
                <Shield className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                <div><strong>Sleep hygiene</strong> - Regular schedule, avoid stimulants before bed, treat sleep apnea if present</div>
              </li>
              <li className="flex items-start gap-3">
                <Shield className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                <div><strong>Orthodontic treatment</strong> - If caused by misaligned bite</div>
              </li>
              <li className="flex items-start gap-3">
                <Shield className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                <div><strong>Muscle relaxants or Botox</strong> - In severe cases, to reduce grinding force</div>
              </li>
            </ul>

            <div className="bg-primary/10 rounded-lg p-6 mt-8">
              <h3 className="font-semibold text-lg mb-3">Get Professional Diagnosis</h3>
              <p className="mb-4">
                If you recognize symptoms of any of these conditions, schedule a dental examination. Early detection and treatment prevent complications and save money.
              </p>
              <Link
                href="/search"
                className="inline-flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-lg font-medium hover:bg-primary/90 transition-colors"
              >
                Find a Dentist Near You
                <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          <div className="mt-12 pt-8 border-t">
            <h3 className="text-2xl font-bold mb-6">Related Guides</h3>
            <div className="grid md:grid-cols-3 gap-4">
              <Link href="/guides/dental-health-tips" className="border rounded-lg p-4 hover:border-primary transition-colors">
                <h4 className="font-semibold mb-2">Daily Dental Care Tips</h4>
                <p className="text-sm text-muted-foreground">Prevention strategies for optimal oral health</p>
              </Link>
              <Link href="/guides/dental-procedures" className="border rounded-lg p-4 hover:border-primary transition-colors">
                <h4 className="font-semibold mb-2">Common Dental Procedures</h4>
                <p className="text-sm text-muted-foreground">Treatments for these conditions</p>
              </Link>
              <Link href="/guides/finding-right-dentist" className="border rounded-lg p-4 hover:border-primary transition-colors">
                <h4 className="font-semibold mb-2">Choosing a Dentist</h4>
                <p className="text-sm text-muted-foreground">Find qualified dental professionals</p>
              </Link>
            </div>
          </div>

          <div className="mt-12 pt-8 border-t text-sm text-muted-foreground">
            <p>
              <strong>Sources:</strong> American Dental Association, CDC, National Institute of Dental and Craniofacial Research, Journal of the American Dental Association, International Journal of Dentistry.
            </p>
          </div>
        </div>
      </article>
    </div>
  );
}
