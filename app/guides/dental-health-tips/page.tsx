import { Metadata } from 'next';
import Link from 'next/link';
import { ChevronRight, Heart, Sparkles, AlertCircle, CheckCircle2, Clock, Apple } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Daily Dental Care Tips - Expert Guide to Oral Health',
  description: 'Learn essential daily dental care habits from dental professionals. Expert tips for brushing, flossing, diet, and maintaining optimal oral health.',
  keywords: 'dental care, oral hygiene, brushing teeth, flossing, dental health tips, preventive care',
};

export default function DentalHealthTipsGuide() {
  return (
    <div className="bg-background">
      <section className="bg-gray-50 py-4">
        <div className="container mx-auto px-4">
          <nav className="flex items-center gap-2 text-sm text-muted-foreground">
            <Link href="/" className="hover:text-primary">Home</Link>
            <ChevronRight className="w-4 h-4" />
            <Link href="/guides" className="hover:text-primary">Guides</Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-foreground">Daily Dental Care Tips</span>
          </nav>
        </div>
      </section>

      <article className="py-12">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="mb-8">
            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
              <span className="px-3 py-1 bg-primary/10 text-primary rounded-full font-medium">Prevention</span>
              <span>•</span>
              <span>6 min read</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Daily Dental Care Tips: Your Complete Guide
            </h1>
            <p className="text-xl text-muted-foreground">
              Master the fundamentals of oral hygiene with expert-backed techniques for maintaining healthy teeth and gums throughout your life.
            </p>
          </div>

          <div className="prose prose-lg max-w-none">
            <h2 className="text-3xl font-bold mt-8 mb-6 flex items-center gap-3">
              <Sparkles className="w-8 h-8 text-primary" />
              The Foundation: Proper Brushing Technique
            </h2>
            <p className="text-lg leading-relaxed mb-6">
              The American Dental Association recommends brushing twice daily for two minutes each time. However, technique matters as much as frequency. Improper brushing can damage enamel and gums while missing harmful plaque.
            </p>

            <div className="bg-blue-50 border-l-4 border-blue-500 p-6 my-6">
              <h3 className="font-semibold mb-3">Step-by-Step Brushing Guide</h3>
              <ol className="space-y-2">
                <li>1. Position your toothbrush at a 45-degree angle to your gums</li>
                <li>2. Use gentle, circular motions - never saw back and forth</li>
                <li>3. Brush outer surfaces, inner surfaces, and chewing surfaces</li>
                <li>4. Tilt brush vertically for inside surfaces of front teeth</li>
                <li>5. Brush your tongue to remove bacteria and freshen breath</li>
                <li>6. Replace your toothbrush every 3-4 months or when bristles fray</li>
              </ol>
            </div>

            <h3 className="text-2xl font-semibold mt-8 mb-4">Choosing the Right Toothbrush</h3>
            <div className="grid md:grid-cols-2 gap-4 mb-6">
              <div className="border rounded-lg p-4">
                <h4 className="font-semibold mb-2">Manual Toothbrushes</h4>
                <ul className="text-sm space-y-2">
                  <li>• Soft bristles only (medium and hard damage gums)</li>
                  <li>• Small head for better reach</li>
                  <li>• Comfortable, non-slip grip</li>
                  <li>• ADA Seal of Acceptance</li>
                  <li>• Cost: $2-$5</li>
                </ul>
              </div>
              <div className="border rounded-lg p-4">
                <h4 className="font-semibold mb-2">Electric Toothbrushes</h4>
                <ul className="text-sm space-y-2">
                  <li>• More effective plaque removal (up to 21% more)</li>
                  <li>• Built-in timers ensure 2-minute brushing</li>
                  <li>• Ideal for those with limited dexterity</li>
                  <li>• Pressure sensors prevent over-brushing</li>
                  <li>• Cost: $25-$200</li>
                </ul>
              </div>
            </div>

            <h2 className="text-3xl font-bold mt-12 mb-6 flex items-center gap-3">
              <Heart className="w-8 h-8 text-primary" />
              Flossing: The Non-Negotiable Daily Habit
            </h2>
            <p className="text-lg leading-relaxed mb-6">
              Brushing alone cleans only 60% of tooth surfaces. Flossing reaches the 40% between teeth where cavities and gum disease most often start. The ADA recommends flossing at least once daily.
            </p>

            <div className="bg-green-50 border-l-4 border-green-500 p-6 my-6">
              <h3 className="font-semibold mb-3">Proper Flossing Technique</h3>
              <ol className="space-y-2">
                <li>1. Use 18 inches of floss, winding most around middle fingers</li>
                <li>2. Hold floss taut between thumbs and index fingers</li>
                <li>3. Slide gently between teeth using a zigzag motion</li>
                <li>4. Curve floss around each tooth in a C-shape</li>
                <li>5. Move floss up and down against tooth surface and under gumline</li>
                <li>6. Use clean sections of floss for each tooth</li>
              </ol>
            </div>

            <h3 className="text-2xl font-semibold mt-8 mb-4">Flossing Alternatives</h3>
            <ul className="space-y-3 mb-6">
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                <div>
                  <strong>Interdental Brushes:</strong> Small brushes for wider gaps, bridges, or braces. Excellent for those with dexterity issues.
                </div>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                <div>
                  <strong>Water Flossers:</strong> Use pressurized water to clean between teeth. Studies show 29% more effective than string floss for gum health.
                </div>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                <div>
                  <strong>Floss Picks:</strong> Convenient for on-the-go use, though less effective than traditional floss due to reusing same section.
                </div>
              </li>
            </ul>

            <h2 className="text-3xl font-bold mt-12 mb-6 flex items-center gap-3">
              <Apple className="w-8 h-8 text-primary" />
              Diet and Oral Health
            </h2>
            <p className="text-lg leading-relaxed mb-6">
              What you eat directly impacts your dental health. Certain foods strengthen teeth while others contribute to decay and erosion.
            </p>

            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div className="bg-green-50 rounded-lg p-6">
                <h3 className="font-semibold text-green-900 mb-4">Foods That Protect Teeth</h3>
                <ul className="space-y-2 text-sm">
                  <li>• <strong>Dairy products:</strong> Calcium and phosphates strengthen enamel</li>
                  <li>• <strong>Crunchy vegetables:</strong> Stimulate saliva, natural cleaning</li>
                  <li>• <strong>Nuts and seeds:</strong> Provide minerals, low in sugar</li>
                  <li>• <strong>Green tea:</strong> Contains compounds that fight bacteria</li>
                  <li>• <strong>Sugar-free gum:</strong> Increases saliva flow after meals</li>
                  <li>• <strong>Water:</strong> Rinses away food particles, fluoride strengthens teeth</li>
                </ul>
              </div>
              <div className="bg-red-50 rounded-lg p-6">
                <h3 className="font-semibold text-red-900 mb-4">Foods to Limit</h3>
                <ul className="space-y-2 text-sm">
                  <li>• <strong>Sugary drinks:</strong> Soda, sports drinks create acidic environment</li>
                  <li>• <strong>Sticky candy:</strong> Prolonged sugar exposure to teeth</li>
                  <li>• <strong>Citrus fruits:</strong> Acidic, can erode enamel over time</li>
                  <li>• <strong>Crackers/chips:</strong> Refined carbs stick to teeth</li>
                  <li>• <strong>Alcohol:</strong> Dries mouth, reduces protective saliva</li>
                  <li>• <strong>Coffee/tea:</strong> Can stain teeth (rinse after consuming)</li>
                </ul>
              </div>
            </div>

            <h2 className="text-3xl font-bold mt-12 mb-6 flex items-center gap-3">
              <Clock className="w-8 h-8 text-primary" />
              Timing Matters: When to Brush and Floss
            </h2>

            <div className="space-y-4 mb-8">
              <div className="border-l-4 border-primary pl-4">
                <h3 className="font-semibold mb-2">Morning Routine</h3>
                <p className="text-muted-foreground">Brush after breakfast to remove food particles and bacteria that accumulated overnight. If you can't brush after eating, rinse vigorously with water.</p>
              </div>
              <div className="border-l-4 border-primary pl-4">
                <h3 className="font-semibold mb-2">Evening Routine</h3>
                <p className="text-muted-foreground">Brush and floss before bed. This is your most important session - removes the day's accumulation and prevents bacteria from multiplying during sleep when saliva production decreases.</p>
              </div>
              <div className="border-l-4 border-primary pl-4">
                <h3 className="font-semibold mb-2">After Acidic Foods</h3>
                <p className="text-muted-foreground">Wait 30-60 minutes before brushing after consuming acidic foods or drinks. Acid temporarily softens enamel, and immediate brushing can cause damage. Rinse with water instead.</p>
              </div>
            </div>

            <h2 className="text-3xl font-bold mt-12 mb-6">Additional Preventive Measures</h2>

            <div className="space-y-6 mb-8">
              <div className="bg-white border rounded-lg p-6">
                <h3 className="font-semibold text-lg mb-3">Mouthwash: When and How to Use</h3>
                <p className="mb-3">Therapeutic mouthwash can reduce plaque, gingivitis, and cavities when used correctly.</p>
                <ul className="space-y-2 text-sm">
                  <li>• Choose ADA-approved antimicrobial or fluoride rinses</li>
                  <li>• Use after brushing and flossing, not as a replacement</li>
                  <li>• Swish for 30-60 seconds, don't rinse with water after</li>
                  <li>• Alcohol-free options available for sensitive mouths</li>
                  <li>• Children under 6 shouldn't use mouthwash (swallowing risk)</li>
                </ul>
              </div>

              <div className="bg-white border rounded-lg p-6">
                <h3 className="font-semibold text-lg mb-3">Protect Your Teeth During Activities</h3>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                    <span><strong>Sports:</strong> Wear a custom-fitted mouthguard during contact sports or activities with fall risk (30% of dental injuries are sports-related)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                    <span><strong>Grinding:</strong> If you grind teeth at night, ask your dentist about a night guard to prevent wear and jaw problems</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                    <span><strong>Tobacco:</strong> All forms of tobacco harm oral health - quitting reduces risk of gum disease, tooth loss, and oral cancer</span>
                  </li>
                </ul>
              </div>

              <div className="bg-white border rounded-lg p-6">
                <h3 className="font-semibold text-lg mb-3">Regular Professional Care</h3>
                <p className="mb-3">Home care is essential, but professional cleanings and exams are irreplaceable.</p>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                    <span>Visit your dentist every 6 months for cleanings and exams</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                    <span>Professional cleaning removes tartar that brushing can't</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                    <span>Exams detect problems early when they're easiest to treat</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                    <span>Screenings can detect oral cancer, diabetes, and other conditions</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="bg-yellow-50 border-l-4 border-yellow-500 p-6 my-8">
              <h3 className="font-semibold text-yellow-900 mb-3">Warning Signs to Never Ignore</h3>
              <p className="text-yellow-800 mb-3">Contact your dentist if you experience:</p>
              <ul className="space-y-1 text-yellow-800">
                <li>• Persistent bad breath despite good hygiene</li>
                <li>• Bleeding gums during brushing or flossing</li>
                <li>• Loose teeth or changes in bite alignment</li>
                <li>• Persistent tooth sensitivity to hot, cold, or sweets</li>
                <li>• Receding gums or teeth appearing longer</li>
                <li>• Sores or lumps in mouth that don't heal within 2 weeks</li>
                <li>• Pain when chewing or jaw clicking</li>
              </ul>
            </div>

            <h2 className="text-3xl font-bold mt-12 mb-6">Creating Your Daily Routine</h2>
            <p className="text-lg leading-relaxed mb-6">
              Consistency is key. Here's a proven daily routine that takes just 10 minutes to protect your oral health:
            </p>

            <div className="bg-primary/10 rounded-lg p-6 mb-8">
              <h3 className="font-semibold mb-4">Morning (5 minutes)</h3>
              <ul className="space-y-2">
                <li>1. Brush for 2 minutes after breakfast</li>
                <li>2. Rinse with water or mouthwash</li>
                <li>3. Floss if you didn't the night before (optional)</li>
              </ul>

              <h3 className="font-semibold mt-6 mb-4">Evening (5 minutes)</h3>
              <ul className="space-y-2">
                <li>1. Floss before brushing (1-2 minutes)</li>
                <li>2. Brush for 2 minutes before bed</li>
                <li>3. Rinse with fluoride mouthwash (1 minute)</li>
                <li>4. Don't eat or drink anything except water after</li>
              </ul>
            </div>

            <div className="bg-primary/10 rounded-lg p-6 mt-8">
              <h3 className="font-semibold text-lg mb-3">Ready to Find a Dentist?</h3>
              <p className="mb-4">
                Regular professional care combined with excellent home hygiene ensures optimal oral health for life.
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
              <Link href="/guides/pediatric-dental-care" className="border rounded-lg p-4 hover:border-primary transition-colors">
                <h4 className="font-semibold mb-2">Dental Care for Children</h4>
                <p className="text-sm text-muted-foreground">Teaching kids healthy habits early</p>
              </Link>
              <Link href="/guides/oral-health-conditions" className="border rounded-lg p-4 hover:border-primary transition-colors">
                <h4 className="font-semibold mb-2">Common Oral Health Issues</h4>
                <p className="text-sm text-muted-foreground">Understanding cavities and gum disease</p>
              </Link>
              <Link href="/guides/dental-procedures" className="border rounded-lg p-4 hover:border-primary transition-colors">
                <h4 className="font-semibold mb-2">Common Dental Procedures</h4>
                <p className="text-sm text-muted-foreground">What to expect during treatment</p>
              </Link>
            </div>
          </div>

          <div className="mt-12 pt-8 border-t text-sm text-muted-foreground">
            <p>
              <strong>Sources:</strong> American Dental Association, Centers for Disease Control and Prevention, Journal of Clinical Periodontology, Academy of General Dentistry.
            </p>
          </div>
        </div>
      </article>
    </div>
  );
}
