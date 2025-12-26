import { Metadata } from 'next';
import Link from 'next/link';
import { ChevronRight, Heart, Brain, Shield, CheckCircle2, AlertTriangle, HelpCircle, Smile, Phone } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Overcoming Dental Anxiety - Your Complete Guide to Fear-Free Dentistry',
  description: 'Expert guide to managing dental anxiety and phobia. Learn proven techniques, sedation options, and how to find an understanding dentist.',
  keywords: 'dental anxiety, dental phobia, fear of dentist, sedation dentistry, dental fear, nervous dental patient',
};

export default function DentalAnxietyGuide() {
  return (
    <div className="bg-background">
      <section className="bg-gray-50 py-4">
        <div className="container mx-auto px-4">
          <nav className="flex items-center gap-2 text-sm text-muted-foreground">
            <Link href="/" className="hover:text-primary">Home</Link>
            <ChevronRight className="w-4 h-4" />
            <Link href="/guides" className="hover:text-primary">Guides</Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-foreground">Overcoming Dental Anxiety</span>
          </nav>
        </div>
      </section>

      <article className="py-12">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="mb-8">
            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
              <span className="px-3 py-1 bg-primary/10 text-primary rounded-full font-medium">Mental Health</span>
              <span>•</span>
              <span>8 min read</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Overcoming Dental Anxiety: Your Complete Guide to Fear-Free Dentistry
            </h1>
            <p className="text-xl text-muted-foreground">
              You're not alone in your fear of the dentist. Learn proven techniques, sedation options, and how to find compassionate care that works for you.
            </p>
          </div>

          <div className="bg-blue-50 border-l-4 border-blue-500 p-6 mb-8">
            <div className="flex items-start gap-3">
              <Heart className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold text-blue-900 mb-2">You're Not Alone</h3>
                <p className="text-blue-800 mb-3">Dental anxiety is extremely common:</p>
                <ul className="text-sm text-blue-800 space-y-1">
                  <li>• 36% of Americans experience dental anxiety</li>
                  <li>• 12% have severe dental phobia</li>
                  <li>• 5% avoid dentists completely due to fear</li>
                </ul>
                <p className="text-sm text-blue-800 mt-3 font-medium">Help is available, and most people can overcome their fear with the right support.</p>
              </div>
            </div>
          </div>

          <div className="prose prose-lg max-w-none">
            <h2 className="text-3xl font-bold mt-8 mb-6 flex items-center gap-3">
              <Brain className="w-8 h-8 text-primary" />
              What is Dental Anxiety?
            </h2>

            <p className="text-lg leading-relaxed mb-6">
              Dental anxiety is a moderate to extreme fear of dental visits that can range from mild nervousness to full-blown panic attacks. It's a genuine psychological condition that affects millions of people and can have serious consequences for oral and overall health.
            </p>

            <div className="border rounded-lg p-6 mb-8">
              <h3 className="text-2xl font-semibold mb-4">Common Symptoms</h3>
              <p className="mb-4">Dental anxiety can manifest in various physical and emotional ways:</p>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-gray-50 p-4 rounded">
                  <h4 className="font-semibold mb-2">Physical Symptoms</h4>
                  <ul className="text-sm space-y-1">
                    <li>• Sleeplessness the night before</li>
                    <li>• Increased heart rate</li>
                    <li>• Sweating or trembling</li>
                    <li>• Nausea or stomach upset</li>
                    <li>• Difficulty breathing</li>
                    <li>• Panic attacks</li>
                  </ul>
                </div>
                <div className="bg-gray-50 p-4 rounded">
                  <h4 className="font-semibold mb-2">Emotional Symptoms</h4>
                  <ul className="text-sm space-y-1">
                    <li>• Intense nervousness or dread</li>
                    <li>• Feeling of loss of control</li>
                    <li>• Crying or extreme distress</li>
                    <li>• Avoidance behaviors</li>
                    <li>• Canceling appointments</li>
                    <li>• Feelings of shame</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="border rounded-lg p-6 mb-8">
              <h3 className="text-2xl font-semibold mb-4">Common Causes of Dental Fear</h3>

              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-red-600 font-bold">1</span>
                  </div>
                  <div>
                    <strong>Past Traumatic Experiences</strong>
                    <p className="text-sm text-muted-foreground">Previous painful or frightening dental visits, especially from childhood</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-orange-600 font-bold">2</span>
                  </div>
                  <div>
                    <strong>Fear of Pain</strong>
                    <p className="text-sm text-muted-foreground">Worry about experiencing discomfort during procedures, even with modern anesthesia</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-yellow-600 font-bold">3</span>
                  </div>
                  <div>
                    <strong>Loss of Control</strong>
                    <p className="text-sm text-muted-foreground">Feeling vulnerable or helpless in the dental chair</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-green-600 font-bold">4</span>
                  </div>
                  <div>
                    <strong>Embarrassment About Teeth</strong>
                    <p className="text-sm text-muted-foreground">Shame about dental hygiene or the condition of teeth</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-blue-600 font-bold">5</span>
                  </div>
                  <div>
                    <strong>Needle Phobia</strong>
                    <p className="text-sm text-muted-foreground">Fear of injections or seeing needles</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-purple-600 font-bold">6</span>
                  </div>
                  <div>
                    <strong>Childhood Experiences</strong>
                    <p className="text-sm text-muted-foreground">Negative dental visits as a child that created lasting fear</p>
                  </div>
                </div>
              </div>
            </div>

            <h2 className="text-3xl font-bold mt-12 mb-6 flex items-center gap-3">
              <Shield className="w-8 h-8 text-primary" />
              Your 7-Step Recovery Guide
            </h2>

            <p className="text-lg leading-relaxed mb-6">
              Overcoming dental anxiety is a gradual process. These steps provide a progressive approach that has helped thousands of people conquer their fear:
            </p>

            <div className="space-y-6 mb-8">
              <div className="border-l-4 border-green-500 bg-green-50 p-6 rounded-r-lg">
                <h3 className="text-2xl font-semibold mb-3 text-green-900">Step 1: Acknowledge Your Fear</h3>
                <p className="mb-3">The first step to overcoming dental anxiety is accepting that it's real and valid. You have nothing to be ashamed of.</p>
                <div className="bg-white p-4 rounded">
                  <ul className="text-sm space-y-2">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <span>Recognize that dental anxiety is extremely common</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <span>Accept your feelings without judgment</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <span>Understand that help is available</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="border-l-4 border-blue-500 bg-blue-50 p-6 rounded-r-lg">
                <h3 className="text-2xl font-semibold mb-3 text-blue-900">Step 2: Find the Right Dentist</h3>
                <p className="mb-3">Look for dentists who specialize in treating anxious patients and understand your needs.</p>
                <div className="bg-white p-4 rounded">
                  <h4 className="font-semibold mb-2">What to Look For:</h4>
                  <ul className="text-sm space-y-2">
                    <li>• "Anxiety-friendly" or "gentle dentistry" in their marketing</li>
                    <li>• Sedation options available</li>
                    <li>• Patient reviews mentioning compassionate care</li>
                    <li>• Calm, spa-like office environment</li>
                    <li>• Staff trained in anxiety management</li>
                    <li>• Willingness to go slowly and explain everything</li>
                  </ul>
                </div>
              </div>

              <div className="border-l-4 border-purple-500 bg-purple-50 p-6 rounded-r-lg">
                <h3 className="text-2xl font-semibold mb-3 text-purple-900">Step 3: Start With a Consultation</h3>
                <p className="mb-3">Book a "meet and greet" appointment with no treatment planned. Just talking.</p>
                <div className="bg-white p-4 rounded">
                  <ul className="text-sm space-y-2">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" />
                      <span>Tour the office and meet the staff</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" />
                      <span>Discuss your fears and concerns openly</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" />
                      <span>Ask about their approach to anxious patients</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" />
                      <span>See if you feel comfortable with the dentist</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="border-l-4 border-orange-500 bg-orange-50 p-6 rounded-r-lg">
                <h3 className="text-2xl font-semibold mb-3 text-orange-900">Step 4: Communicate Openly</h3>
                <p className="mb-3">Be completely honest about your anxiety. A good dentist will adjust their approach to accommodate you.</p>
                <div className="bg-white p-4 rounded">
                  <h4 className="font-semibold mb-2">Tell Your Dentist About:</h4>
                  <ul className="text-sm space-y-1">
                    <li>• Specific fears (needles, sounds, pain, gagging)</li>
                    <li>• Past traumatic experiences</li>
                    <li>• What helps you feel calm</li>
                    <li>• Your preferred communication style</li>
                    <li>• Any need for breaks during treatment</li>
                  </ul>
                </div>
              </div>

              <div className="border-l-4 border-teal-500 bg-teal-50 p-6 rounded-r-lg">
                <h3 className="text-2xl font-semibold mb-3 text-teal-900">Step 5: Learn Relaxation Techniques</h3>
                <p className="mb-3">Practice these techniques before and during your appointment:</p>
                <div className="bg-white p-4 rounded">
                  <div className="space-y-3">
                    <div>
                      <strong className="text-sm">Deep Breathing</strong>
                      <p className="text-sm text-muted-foreground">Breathe in for 4 counts, hold for 4, out for 4. Repeat.</p>
                    </div>
                    <div>
                      <strong className="text-sm">Progressive Muscle Relaxation</strong>
                      <p className="text-sm text-muted-foreground">Tense and release muscle groups from toes to head.</p>
                    </div>
                    <div>
                      <strong className="text-sm">Visualization</strong>
                      <p className="text-sm text-muted-foreground">Imagine yourself in a calm, peaceful place.</p>
                    </div>
                    <div>
                      <strong className="text-sm">Meditation Apps</strong>
                      <p className="text-sm text-muted-foreground">Use Headspace, Calm, or similar apps before appointments.</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="border-l-4 border-indigo-500 bg-indigo-50 p-6 rounded-r-lg">
                <h3 className="text-2xl font-semibold mb-3 text-indigo-900">Step 6: Start Small and Build Gradually</h3>
                <p className="mb-3">Begin with simple procedures and work your way up to more complex treatments.</p>
                <div className="bg-white p-4 rounded">
                  <h4 className="font-semibold mb-2">Progressive Approach:</h4>
                  <ol className="text-sm space-y-2">
                    <li>1. <strong>Consultation visit</strong> (no treatment)</li>
                    <li>2. <strong>Cleaning only</strong> (no procedures)</li>
                    <li>3. <strong>X-rays and exam</strong> (still no drilling)</li>
                    <li>4. <strong>Minor filling</strong> (first treatment)</li>
                    <li>5. <strong>More complex work</strong> (as comfort builds)</li>
                  </ol>
                  <p className="text-sm mt-3 text-indigo-800">Each successful visit builds confidence for the next one.</p>
                </div>
              </div>

              <div className="border-l-4 border-pink-500 bg-pink-50 p-6 rounded-r-lg">
                <h3 className="text-2xl font-semibold mb-3 text-pink-900">Step 7: Consider Professional Help for Severe Cases</h3>
                <p className="mb-3">If your anxiety is severe or preventing you from getting care, professional therapy can be transformative.</p>
                <div className="bg-white p-4 rounded">
                  <h4 className="font-semibold mb-2">Effective Therapies:</h4>
                  <ul className="text-sm space-y-2">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-5 h-5 text-pink-600 flex-shrink-0 mt-0.5" />
                      <div>
                        <strong>Cognitive Behavioral Therapy (CBT)</strong>
                        <p className="text-muted-foreground">Helps identify and change negative thought patterns (proven highly effective)</p>
                      </div>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-5 h-5 text-pink-600 flex-shrink-0 mt-0.5" />
                      <div>
                        <strong>Exposure Therapy</strong>
                        <p className="text-muted-foreground">Gradual, controlled exposure to dental situations</p>
                      </div>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-5 h-5 text-pink-600 flex-shrink-0 mt-0.5" />
                      <div>
                        <strong>Hypnotherapy</strong>
                        <p className="text-muted-foreground">Can reduce anxiety and change fear responses</p>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <h2 className="text-3xl font-bold mt-12 mb-6 flex items-center gap-3">
              <Smile className="w-8 h-8 text-primary" />
              Sedation Options
            </h2>

            <p className="text-lg leading-relaxed mb-6">
              Modern dentistry offers several sedation methods to help anxious patients feel comfortable during treatment:
            </p>

            <div className="space-y-6 mb-8">
              <div className="border rounded-lg p-6">
                <div className="flex items-start gap-3 mb-3">
                  <div className="bg-green-100 px-3 py-1 rounded-full text-green-700 text-sm font-medium">Mild Anxiety</div>
                </div>
                <h3 className="text-2xl font-semibold mb-3">Nitrous Oxide (Laughing Gas)</h3>
                <p className="mb-4">A safe, mild sedative that helps you relax while remaining fully conscious.</p>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-gray-50 p-4 rounded">
                    <h4 className="font-semibold mb-2 text-green-700">Benefits</h4>
                    <ul className="text-sm space-y-1">
                      <li>• Takes effect within minutes</li>
                      <li>• Adjustable during procedure</li>
                      <li>• Wears off quickly (can drive home)</li>
                      <li>• No needles required</li>
                      <li>• Very safe, even for children</li>
                    </ul>
                  </div>
                  <div className="bg-gray-50 p-4 rounded">
                    <h4 className="font-semibold mb-2">Best For</h4>
                    <ul className="text-sm space-y-1">
                      <li>• Mild to moderate anxiety</li>
                      <li>• Routine procedures</li>
                      <li>• Patients with gag reflex</li>
                      <li>• First-time sedation users</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="border rounded-lg p-6">
                <div className="flex items-start gap-3 mb-3">
                  <div className="bg-yellow-100 px-3 py-1 rounded-full text-yellow-700 text-sm font-medium">Moderate Anxiety</div>
                </div>
                <h3 className="text-2xl font-semibold mb-3">Oral Sedation (Pill)</h3>
                <p className="mb-4">Take a prescribed pill before your appointment to achieve deeper relaxation.</p>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-gray-50 p-4 rounded">
                    <h4 className="font-semibold mb-2 text-yellow-700">Benefits</h4>
                    <ul className="text-sm space-y-1">
                      <li>• Deeper relaxation than nitrous</li>
                      <li>• No needles or masks</li>
                      <li>• May not remember procedure</li>
                      <li>• Good for longer appointments</li>
                    </ul>
                  </div>
                  <div className="bg-gray-50 p-4 rounded">
                    <h4 className="font-semibold mb-2">Considerations</h4>
                    <ul className="text-sm space-y-1">
                      <li>• Need someone to drive you</li>
                      <li>• Takes 30-60 min to work</li>
                      <li>• Effects last several hours</li>
                      <li>• Level can't be adjusted</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="border rounded-lg p-6">
                <div className="flex items-start gap-3 mb-3">
                  <div className="bg-orange-100 px-3 py-1 rounded-full text-orange-700 text-sm font-medium">Severe Anxiety</div>
                </div>
                <h3 className="text-2xl font-semibold mb-3">IV Sedation</h3>
                <p className="mb-4">Sedative delivered through an IV for deep relaxation during complex procedures.</p>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-gray-50 p-4 rounded">
                    <h4 className="font-semibold mb-2 text-orange-700">Benefits</h4>
                    <ul className="text-sm space-y-1">
                      <li>• Deep, comfortable relaxation</li>
                      <li>• Level adjustable during procedure</li>
                      <li>• Works quickly</li>
                      <li>• Often no memory of treatment</li>
                      <li>• Can complete multiple procedures</li>
                    </ul>
                  </div>
                  <div className="bg-gray-50 p-4 rounded">
                    <h4 className="font-semibold mb-2">Best For</h4>
                    <ul className="text-sm space-y-1">
                      <li>• Severe dental phobia</li>
                      <li>• Extensive dental work</li>
                      <li>• Strong gag reflex</li>
                      <li>• Complex procedures</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="border rounded-lg p-6">
                <div className="flex items-start gap-3 mb-3">
                  <div className="bg-red-100 px-3 py-1 rounded-full text-red-700 text-sm font-medium">Extreme Cases</div>
                </div>
                <h3 className="text-2xl font-semibold mb-3">General Anesthesia</h3>
                <p className="mb-4">Complete unconsciousness, typically reserved for extreme phobia or complex surgical procedures.</p>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-gray-50 p-4 rounded">
                    <h4 className="font-semibold mb-2 text-red-700">When Used</h4>
                    <ul className="text-sm space-y-1">
                      <li>• Extreme dental phobia</li>
                      <li>• Major oral surgery</li>
                      <li>• Special needs patients</li>
                      <li>• Multiple extractions</li>
                    </ul>
                  </div>
                  <div className="bg-gray-50 p-4 rounded">
                    <h4 className="font-semibold mb-2">Important Notes</h4>
                    <ul className="text-sm space-y-1">
                      <li>• Performed in hospital or surgery center</li>
                      <li>• Anesthesiologist present</li>
                      <li>• Higher cost and risk</li>
                      <li>• Full recovery time needed</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <h2 className="text-3xl font-bold mt-12 mb-6">Tips for Managing Dental Anxiety</h2>

            <div className="space-y-4 mb-8">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                <div>
                  <strong>Bring headphones and music</strong> to block out dental sounds and create a calming atmosphere
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                <div>
                  <strong>Use distraction techniques</strong> like stress balls, counting tiles, or watching videos during treatment
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                <div>
                  <strong>Establish a "stop" signal</strong> with your dentist (like raising your hand) so you feel in control
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                <div>
                  <strong>Schedule morning appointments</strong> when you're less tired and have less time to worry
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                <div>
                  <strong>Bring a support person</strong> who can sit with you or wait in the room if the dentist allows
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                <div>
                  <strong>Avoid caffeine</strong> before appointments as it can increase anxiety and jitteriness
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                <div>
                  <strong>Ask for detailed explanations</strong> of what's happening to reduce fear of the unknown
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                <div>
                  <strong>Reward yourself</strong> after appointments to create positive associations with dental visits
                </div>
              </div>
            </div>

            <h2 className="text-3xl font-bold mt-12 mb-6 flex items-center gap-3">
              <HelpCircle className="w-8 h-8 text-primary" />
              Frequently Asked Questions
            </h2>

            <div className="space-y-6 mb-8">
              <div className="border rounded-lg p-6">
                <h3 className="text-xl font-semibold mb-3">Is dental anxiety really that common?</h3>
                <p className="text-muted-foreground">
                  Yes, extremely common. Studies show that 36% of Americans experience some level of dental anxiety, with 12% suffering from severe dental phobia. You're far from alone in your fear, and dentists are very accustomed to working with anxious patients.
                </p>
              </div>

              <div className="border rounded-lg p-6">
                <h3 className="text-xl font-semibold mb-3">Will my dentist judge me for my fear or the condition of my teeth?</h3>
                <p className="text-muted-foreground">
                  No. Professional dentists understand that anxiety and avoidance create a cycle that leads to dental problems. They've seen it all and are focused on helping you get healthy, not judging you. Many dentists specifically advertise as "judgment-free" and specialize in anxious patients.
                </p>
              </div>

              <div className="border rounded-lg p-6">
                <h3 className="text-xl font-semibold mb-3">How do I tell my dentist about my anxiety?</h3>
                <p className="text-muted-foreground mb-3">
                  Be direct and honest. You can say something like: "I have severe dental anxiety and I need you to know that before we begin." Good things to mention:
                </p>
                <ul className="text-sm space-y-1 ml-4">
                  <li>• Specific triggers (needles, sounds, gagging)</li>
                  <li>• Past traumatic experiences</li>
                  <li>• What helps you feel calm</li>
                  <li>• Your need for breaks or a stop signal</li>
                </ul>
              </div>

              <div className="border rounded-lg p-6">
                <h3 className="text-xl font-semibold mb-3">Does insurance cover sedation dentistry?</h3>
                <p className="text-muted-foreground">
                  It depends. Many insurance plans cover nitrous oxide (laughing gas) as it's considered a standard service. Oral sedation and IV sedation are less commonly covered and may be considered "comfort" rather than medical necessity. However, some plans do cover sedation for severe anxiety or special needs. Check with your insurance provider and dentist's office for specifics.
                </p>
              </div>

              <div className="border rounded-lg p-6">
                <h3 className="text-xl font-semibold mb-3">What if I haven't been to a dentist in years?</h3>
                <p className="text-muted-foreground">
                  This is incredibly common with dental anxiety. The longer you wait, the harder it becomes. Here's what to do:
                </p>
                <ul className="text-sm space-y-2 mt-3 ml-4">
                  <li>1. Find a dentist who specializes in anxious patients</li>
                  <li>2. Schedule a consultation only (no treatment)</li>
                  <li>3. Be honest about how long it's been</li>
                  <li>4. Start with a cleaning and exam only</li>
                  <li>5. Make a treatment plan you can handle gradually</li>
                </ul>
                <p className="text-muted-foreground mt-3">
                  Remember: One appointment at a time. You don't have to fix everything immediately.
                </p>
              </div>

              <div className="border rounded-lg p-6">
                <h3 className="text-xl font-semibold mb-3">Can I overcome dental anxiety completely?</h3>
                <p className="text-muted-foreground">
                  Yes, many people do with the right support and approach. Cognitive Behavioral Therapy (CBT) has proven particularly effective for dental phobia. Even if you don't eliminate anxiety completely, most people can reduce it to manageable levels with gradual exposure, a supportive dentist, and relaxation techniques. The key is taking that first step.
                </p>
              </div>
            </div>

            <div className="bg-primary/10 rounded-lg p-6 mt-8">
              <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
                <Phone className="w-6 h-6" />
                Find Dentists Who Understand Your Anxiety
              </h3>
              <p className="mb-4">
                Search for dentists near you who specialize in treating anxious patients, offer sedation options, and create a comfortable, judgment-free environment.
              </p>
              <Link
                href="/search"
                className="inline-flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-lg font-medium hover:bg-primary/90 transition-colors"
              >
                Find Anxiety-Friendly Dentists
                <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          <div className="mt-12 pt-8 border-t">
            <h3 className="text-2xl font-bold mb-6">Related Guides</h3>
            <div className="grid md:grid-cols-3 gap-4">
              <Link href="/guides/finding-right-dentist" className="border rounded-lg p-4 hover:border-primary transition-colors">
                <h4 className="font-semibold mb-2">Choosing a Dentist</h4>
                <p className="text-sm text-muted-foreground">Find a dentist who understands anxiety</p>
              </Link>
              <Link href="/guides/dental-procedures" className="border rounded-lg p-4 hover:border-primary transition-colors">
                <h4 className="font-semibold mb-2">Dental Procedures Explained</h4>
                <p className="text-sm text-muted-foreground">Know what to expect reduces fear</p>
              </Link>
              <Link href="/guides/pediatric-dental-care" className="border rounded-lg p-4 hover:border-primary transition-colors">
                <h4 className="font-semibold mb-2">Children's Dental Care</h4>
                <p className="text-sm text-muted-foreground">Preventing dental anxiety in kids</p>
              </Link>
            </div>
          </div>

          <div className="mt-12 pt-8 border-t text-sm text-muted-foreground">
            <p>
              <strong>Sources:</strong> American Dental Association, Anxiety and Depression Association of America, Journal of Dental Research, British Dental Journal, National Institute of Mental Health.
            </p>
          </div>
        </div>
      </article>
    </div>
  );
}
