import { Metadata } from 'next';
import Link from 'next/link';
import { ChevronRight, Baby, Heart, Smile, AlertTriangle, CheckCircle2 } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Dental Care for Children - Complete Parent Guide 2024',
  description: 'Comprehensive guide to children dental health from infancy through teens. Learn about first dental visits, cavity prevention, thumb sucking, and more.',
  keywords: 'pediatric dentistry, children teeth, baby teeth, dental care kids, first dentist visit, cavity prevention',
};

export default function PediatricDentalCareGuide() {
  return (
    <div className="bg-background">
      <section className="bg-gray-50 py-4">
        <div className="container mx-auto px-4">
          <nav className="flex items-center gap-2 text-sm text-muted-foreground">
            <Link href="/" className="hover:text-primary">Home</Link>
            <ChevronRight className="w-4 h-4" />
            <Link href="/guides" className="hover:text-primary">Guides</Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-foreground">Dental Care for Children</span>
          </nav>
        </div>
      </section>

      <article className="py-12">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="mb-8">
            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
              <span className="px-3 py-1 bg-primary/10 text-primary rounded-full font-medium">Family</span>
              <span>•</span>
              <span>9 min read</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Dental Care for Children: A Complete Parent Guide
            </h1>
            <p className="text-xl text-muted-foreground">
              Everything parents need to know about children's dental health from infancy through teenage years. Build healthy habits that last a lifetime.
            </p>
          </div>

          <div className="prose prose-lg max-w-none">
            <h2 className="text-3xl font-bold mt-8 mb-6 flex items-center gap-3">
              <Baby className="w-8 h-8 text-primary" />
              Infant Dental Care (0-12 Months)
            </h2>
            <p className="text-lg leading-relaxed mb-6">
              Dental care begins before the first tooth appears. The American Academy of Pediatric Dentistry (AAPD) recommends establishing good oral hygiene habits from birth.
            </p>

            <div className="bg-blue-50 border-l-4 border-blue-500 p-6 mb-6">
              <h3 className="font-semibold mb-3">Before Teeth Emerge</h3>
              <ul className="space-y-2">
                <li>• Wipe gums with clean, damp cloth after feeding</li>
                <li>• Avoid putting baby to bed with bottle (causes baby bottle tooth decay)</li>
                <li>• Never share spoons or clean pacifiers with your mouth (transmits cavity-causing bacteria)</li>
                <li>• Start dental visits by first birthday or when first tooth erupts</li>
              </ul>
            </div>

            <h3 className="text-2xl font-semibold mt-8 mb-4">First Teeth (6-12 Months)</h3>
            <p className="mb-4">Most babies get their first tooth around 6 months, though timing varies from 3-12 months.</p>
            <ul className="space-y-3 mb-6">
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                <div><strong>Brush twice daily</strong> with soft infant toothbrush and rice-sized smear of fluoride toothpaste</div>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                <div><strong>Teething relief:</strong> Clean teething rings, cold washcloth, or gentle gum massage (avoid teething gels with benzocaine)</div>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                <div><strong>Schedule first dental visit</strong> within 6 months of first tooth or by first birthday</div>
              </li>
            </ul>

            <h2 className="text-3xl font-bold mt-12 mb-6">Toddler Years (1-3 Years)</h2>
            <p className="text-lg leading-relaxed mb-6">
              By age 3, most children have all 20 primary (baby) teeth. This is a critical period for establishing lifelong habits.
            </p>

            <div className="grid md:grid-cols-2 gap-4 mb-6">
              <div className="border rounded-lg p-4">
                <h3 className="font-semibold mb-3">Daily Care Routine</h3>
                <ul className="text-sm space-y-2">
                  <li>• Brush twice daily for 2 minutes</li>
                  <li>• Use pea-sized amount of fluoride toothpaste</li>
                  <li>• Parent should brush or supervise brushing</li>
                  <li>• Start flossing when teeth touch</li>
                  <li>• Encourage spitting, not rinsing (keeps fluoride on teeth)</li>
                </ul>
              </div>
              <div className="border rounded-lg p-4">
                <h3 className="font-semibold mb-3">Dietary Guidelines</h3>
                <ul className="text-sm space-y-2">
                  <li>• Limit juice to 4 oz daily (or avoid entirely)</li>
                  <li>• No sippy cups with sugary drinks between meals</li>
                  <li>• Offer water between meals</li>
                  <li>• Limit sticky, sugary snacks</li>
                  <li>• Choose cheese, yogurt, fruits, vegetables</li>
                </ul>
              </div>
            </div>

            <div className="bg-yellow-50 border-l-4 border-yellow-500 p-6 mb-6">
              <h3 className="font-semibold text-yellow-900 mb-2">Thumb Sucking & Pacifiers</h3>
              <p className="text-yellow-800 mb-3">
                Most children naturally stop thumb sucking or pacifier use by age 2-4. If habit continues past age 4-5, it may affect tooth alignment and bite development.
              </p>
              <p className="text-sm text-yellow-800">
                <strong>Tips to stop:</strong> Positive reinforcement, address underlying anxiety, gradual reduction, consult dentist if concerns about dental development.
              </p>
            </div>

            <h2 className="text-3xl font-bold mt-12 mb-6">Preschool & Early School (3-8 Years)</h2>
            <p className="text-lg leading-relaxed mb-6">
              Children start losing baby teeth around age 6 and getting permanent teeth. This transitional period requires careful attention to prevent cavities in new permanent teeth.
            </p>

            <h3 className="text-2xl font-semibold mt-8 mb-4">Cavity Prevention Strategies</h3>
            <div className="space-y-4 mb-6">
              <div className="border-l-4 border-primary pl-4">
                <h4 className="font-semibold mb-2">Dental Sealants</h4>
                <p className="text-sm text-muted-foreground">
                  Thin protective coating applied to chewing surfaces of back teeth. Prevents 80% of cavities in molars for up to 2 years, and continues to protect against 50% of cavities for up to 4 years. Recommended for all children. Cost: $30-60 per tooth, often covered by insurance.
                </p>
              </div>
              <div className="border-l-4 border-primary pl-4">
                <h4 className="font-semibold mb-2">Fluoride Treatments</h4>
                <p className="text-sm text-muted-foreground">
                  Professional fluoride varnish applied at dental visits strengthens enamel and prevents decay. Especially beneficial for children at high risk for cavities. Safe and effective - reduces cavities by 43% in permanent teeth.
                </p>
              </div>
              <div className="border-l-4 border-primary pl-4">
                <h4 className="font-semibold mb-2">Regular Dental Visits</h4>
                <p className="text-sm text-muted-foreground">
                  Every 6 months for cleanings and exams. Some high-risk children may need quarterly visits. Early detection of cavities allows for less invasive treatment.
                </p>
              </div>
            </div>

            <h3 className="text-2xl font-semibold mt-8 mb-4">Losing Baby Teeth</h3>
            <div className="bg-blue-50 p-6 rounded-lg mb-6">
              <h4 className="font-semibold mb-3">What to Expect</h4>
              <ul className="space-y-2 text-sm">
                <li>• Most children lose first tooth around age 6 (range: 4-7 years)</li>
                <li>• Teeth typically fall out in order they came in (lower front first)</li>
                <li>• Process continues until age 12-13 when all baby teeth are replaced</li>
                <li>• Slight bleeding when tooth falls out is normal</li>
                <li>• If tooth knocked out by accident, see dentist immediately</li>
                <li>• New permanent teeth may appear yellow next to white baby teeth (normal)</li>
                <li>• Gaps between permanent front teeth often close naturally</li>
              </ul>
            </div>

            <h2 className="text-3xl font-bold mt-12 mb-6">Pre-Teen & Teen Years (9-18 Years)</h2>
            <p className="text-lg leading-relaxed mb-6">
              Teenagers have unique dental challenges including orthodontic treatment, wisdom teeth, and increased independence requiring self-motivation for oral care.
            </p>

            <h3 className="text-2xl font-semibold mt-8 mb-4">Common Teen Dental Issues</h3>
            <div className="space-y-6 mb-6">
              <div className="border rounded-lg p-6">
                <h4 className="font-semibold mb-2">Orthodontic Treatment</h4>
                <p className="mb-3 text-sm">Over 4 million Americans wear braces, most are children and teens. Best time for evaluation is age 7, though treatment typically begins 10-14.</p>
                <ul className="text-sm space-y-1">
                  <li>• <strong>Braces require extra care:</strong> Brush after every meal, use proxy brush, avoid hard/sticky foods</li>
                  <li>• <strong>Clear aligners:</strong> Must wear 20-22 hours daily, remove for eating, easier oral hygiene</li>
                  <li>• <strong>Treatment duration:</strong> 12-36 months depending on case complexity</li>
                  <li>• <strong>Retainers essential:</strong> Prevent teeth from shifting back after treatment</li>
                </ul>
              </div>

              <div className="border rounded-lg p-6">
                <h4 className="font-semibold mb-2">Wisdom Teeth</h4>
                <p className="mb-3 text-sm">Third molars typically emerge 17-25. About 85% need removal due to impaction or crowding.</p>
                <ul className="text-sm space-y-1">
                  <li>• <strong>Signs of problems:</strong> Pain, swelling, infection, difficulty opening mouth</li>
                  <li>• <strong>Removal timing:</strong> Late teens/early 20s when roots not fully developed (easier recovery)</li>
                  <li>• <strong>Recovery:</strong> 3-7 days, soft foods, ice packs, pain management</li>
                </ul>
              </div>

              <div className="border rounded-lg p-6">
                <h4 className="font-semibold mb-2">Sports & Mouthguards</h4>
                <p className="mb-3 text-sm">Dental injuries account for 13-39% of all sports injuries. Mouthguards reduce risk by 60 times.</p>
                <ul className="text-sm space-y-1">
                  <li>• <strong>Custom-fitted:</strong> Most protective, comfortable (from dentist, $150-300)</li>
                  <li>• <strong>Boil-and-bite:</strong> Affordable alternative ($20-50)</li>
                  <li>• <strong>Required for:</strong> Football, hockey, boxing, martial arts</li>
                  <li>• <strong>Recommended for:</strong> Basketball, soccer, skateboarding, gymnastics</li>
                </ul>
              </div>
            </div>

            <div className="bg-red-50 border-l-4 border-red-500 p-6 mb-6">
              <h3 className="font-semibold text-red-900 mb-2 flex items-center gap-2">
                <AlertTriangle className="w-5 h-5" />
                Teen-Specific Risk Factors
              </h3>
              <ul className="space-y-2 text-red-800">
                <li>• <strong>Energy drinks & soda:</strong> High acidity erodes enamel, high sugar causes cavities</li>
                <li>• <strong>Oral piercings:</strong> Risk of chipped teeth, infection, gum damage, speech problems</li>
                <li>• <strong>Tobacco/vaping:</strong> Causes gum disease, staining, bad breath, oral cancer risk</li>
                <li>• <strong>Eating disorders:</strong> Stomach acid from vomiting erodes enamel, malnutrition affects gums</li>
                <li>• <strong>Poor hygiene:</strong> Increased independence may lead to skipped brushing/flossing</li>
              </ul>
            </div>

            <h2 className="text-3xl font-bold mt-12 mb-6 flex items-center gap-3">
              <Heart className="w-8 h-8 text-primary" />
              Making Dental Visits Positive Experiences
            </h2>
            <p className="text-lg leading-relaxed mb-6">
              Dental anxiety often begins in childhood. Creating positive associations helps establish comfort with dental care for life.
            </p>

            <div className="space-y-4 mb-6">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                <div>
                  <strong>Start early:</strong> First visit by age 1 when nothing is wrong establishes familiarity
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                <div>
                  <strong>Use positive language:</strong> Avoid words like "pain," "hurt," "shot." Say "check," "clean," "special tooth counter"
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                <div>
                  <strong>Read dental books:</strong> Age-appropriate books about dentist visits reduce fear through familiarity
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                <div>
                  <strong>Morning appointments:</strong> Children are typically more cooperative and rested
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                <div>
                  <strong>Pediatric specialist:</strong> Office designed for children, staff trained in child psychology, gentle techniques
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                <div>
                  <strong>Praise cooperation:</strong> Reward bravery (not just perfect behavior) with praise or small non-food treats
                </div>
              </div>
            </div>

            <h2 className="text-3xl font-bold mt-12 mb-6">Quick Reference: Age-by-Age Guide</h2>
            
            <div className="space-y-4 mb-8">
              <div className="bg-white border rounded-lg p-4">
                <h3 className="font-semibold mb-2">Birth - 12 Months</h3>
                <p className="text-sm">Clean gums, brush first teeth, first dental visit by age 1</p>
              </div>
              <div className="bg-white border rounded-lg p-4">
                <h3 className="font-semibold mb-2">1-3 Years</h3>
                <p className="text-sm">Brush twice daily, limit juice, start flossing when teeth touch, dental visits every 6 months</p>
              </div>
              <div className="bg-white border rounded-lg p-4">
                <h3 className="font-semibold mb-2">3-6 Years</h3>
                <p className="text-sm">Supervised brushing, consider sealants on baby molars, address thumb sucking if continuing</p>
              </div>
              <div className="bg-white border rounded-lg p-4">
                <h3 className="font-semibold mb-2">6-12 Years</h3>
                <p className="text-sm">Lose baby teeth, sealants on permanent molars, orthodontic evaluation at age 7, transition to independent brushing</p>
              </div>
              <div className="bg-white border rounded-lg p-4">
                <h3 className="font-semibold mb-2">13-18 Years</h3>
                <p className="text-sm">Orthodontic treatment if needed, wisdom teeth monitoring, mouthguards for sports, address risk behaviors</p>
              </div>
            </div>

            <div className="bg-primary/10 rounded-lg p-6 mt-8">
              <h3 className="font-semibold text-lg mb-3">Find a Pediatric Dentist</h3>
              <p className="mb-4">
                Locate experienced pediatric dentists in your area who specialize in making dental visits fun and stress-free for children.
              </p>
              <Link
                href="/search"
                className="inline-flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-lg font-medium hover:bg-primary/90 transition-colors"
              >
                Search Pediatric Dentists
                <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          <div className="mt-12 pt-8 border-t">
            <h3 className="text-2xl font-bold mb-6">Related Guides</h3>
            <div className="grid md:grid-cols-3 gap-4">
              <Link href="/guides/dental-health-tips" className="border rounded-lg p-4 hover:border-primary transition-colors">
                <h4 className="font-semibold mb-2">Daily Dental Care Tips</h4>
                <p className="text-sm text-muted-foreground">Proper brushing and flossing techniques</p>
              </Link>
              <Link href="/guides/dental-emergencies" className="border rounded-lg p-4 hover:border-primary transition-colors">
                <h4 className="font-semibold mb-2">Dental Emergencies</h4>
                <p className="text-sm text-muted-foreground">What to do when accidents happen</p>
              </Link>
              <Link href="/guides/finding-right-dentist" className="border rounded-lg p-4 hover:border-primary transition-colors">
                <h4 className="font-semibold mb-2">Choosing a Dentist</h4>
                <p className="text-sm text-muted-foreground">Find the right pediatric dentist</p>
              </Link>
            </div>
          </div>

          <div className="mt-12 pt-8 border-t text-sm text-muted-foreground">
            <p>
              <strong>Sources:</strong> American Academy of Pediatric Dentistry (AAPD), American Dental Association, Centers for Disease Control and Prevention, Pediatrics Journal.
            </p>
          </div>
        </div>
      </article>
    </div>
  );
}
