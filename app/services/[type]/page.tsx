import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ChevronRight, ChevronDown, Stethoscope, Baby, Sparkles, SmilePlus, Wrench, Heart, AlertCircle, Crown, MapPin, Users, Phone, DollarSign, Shield, BookOpen, Clock, CheckCircle } from 'lucide-react';

// ISR: Revalidate every 24 hours
export const revalidate = 86400;

import { searchDentists } from '@/lib/dentist-data';
import DentistCard from '@/components/DentistCard';
import { Button } from '@/components/ui/button';

// FAQ type definition
interface FAQ {
  question: string;
  answer: string;
}

// Cost estimate type
interface CostEstimate {
  procedure: string;
  lowRange: string;
  highRange: string;
  note?: string;
}

// Related guide type
interface RelatedGuide {
  slug: string;
  title: string;
  category: string;
}

// Service type definitions with extended info
const serviceTypes: Record<string, {
  name: string;
  title: string;
  description: string;
  longDescription: string;
  extendedDescription: string;
  icon: typeof Stethoscope;
  color: string;
  bgColor: string;
  services: string[];
  whenToVisit: string[];
  commonProcedures: string[];
  faqs: FAQ[];
  costEstimates: CostEstimate[];
  relatedServices: string[];
  relatedGuides: RelatedGuide[];
  topCities: string[];
  insuranceInfo: string;
  whatToExpect: string[];
}> = {
  'general-dentistry': {
    name: 'General Dentist',
    title: 'General Dentistry',
    description: 'Provides routine dental care including cleanings, fillings, exams, and preventive treatments for the whole family.',
    longDescription: 'General dentists are your primary dental care providers. They diagnose, treat, and manage your overall oral health care needs, including gum care, root canals, fillings, crowns, veneers, bridges, and preventive education.',
    extendedDescription: 'A general dentist serves as your first line of defense for oral health. They are trained to handle a wide range of dental issues, from simple cleanings to complex restorative procedures. Regular visits to a general dentist every six months can help prevent serious dental problems and catch issues early when they are easier and less expensive to treat. General dentists also coordinate care with specialists when needed, ensuring you receive comprehensive dental treatment.',
    icon: Stethoscope,
    color: 'text-blue-600',
    bgColor: 'bg-blue-500',
    services: ['Dental Exams', 'Teeth Cleaning', 'Fillings', 'Crowns', 'Bridges', 'Root Canals', 'Tooth Extractions', 'Preventive Care'],
    whenToVisit: ['Routine checkups (every 6 months)', 'Tooth pain or sensitivity', 'Bleeding gums', 'Bad breath concerns', 'Cavity treatment', 'General oral health questions'],
    commonProcedures: ['Professional cleaning', 'X-rays', 'Fluoride treatment', 'Sealants', 'Composite fillings', 'Crown placement'],
    faqs: [
      {
        question: 'How often should I visit a general dentist?',
        answer: 'The American Dental Association recommends visiting a general dentist at least twice a year for routine checkups and cleanings. However, some patients with specific oral health conditions may need more frequent visits. Your dentist will recommend a schedule based on your individual needs.'
      },
      {
        question: 'What happens during a routine dental checkup?',
        answer: 'A routine dental checkup typically includes a thorough examination of your teeth, gums, and mouth, professional cleaning to remove plaque and tartar, X-rays if needed, oral cancer screening, and a discussion of any concerns or treatment recommendations. The entire visit usually takes 45-60 minutes.'
      },
      {
        question: 'Does dental insurance cover general dentistry services?',
        answer: 'Most dental insurance plans cover preventive services like cleanings, exams, and X-rays at 80-100%. Basic restorative procedures like fillings are typically covered at 70-80%. Major procedures like crowns and bridges are usually covered at 50%. Coverage varies by plan, so check with your insurance provider.'
      },
      {
        question: 'What is the difference between a general dentist and a specialist?',
        answer: 'General dentists provide comprehensive dental care and can perform many procedures. Dental specialists have completed additional years of training in specific areas like orthodontics, periodontics, or oral surgery. Your general dentist may refer you to a specialist for complex cases requiring specialized expertise.'
      },
      {
        question: 'Can a general dentist perform root canals?',
        answer: 'Yes, many general dentists are trained and experienced in performing root canal treatments. However, complex cases or teeth with unusual anatomy may be referred to an endodontist, who specializes in root canal therapy and has advanced training in treating dental pulp issues.'
      }
    ],
    costEstimates: [
      { procedure: 'Dental Exam', lowRange: '$50', highRange: '$150', note: 'Often included with cleaning' },
      { procedure: 'Teeth Cleaning', lowRange: '$75', highRange: '$200' },
      { procedure: 'Dental X-rays', lowRange: '$25', highRange: '$250', note: 'Depends on type and number' },
      { procedure: 'Composite Filling', lowRange: '$150', highRange: '$400', note: 'Per tooth' },
      { procedure: 'Crown', lowRange: '$800', highRange: '$1,700', note: 'Per tooth' },
      { procedure: 'Root Canal', lowRange: '$700', highRange: '$1,500', note: 'Varies by tooth' }
    ],
    relatedServices: ['cosmetic-dentistry', 'pediatric-dentistry', 'emergency-dentist'],
    relatedGuides: [
      { slug: 'finding-right-dentist', title: 'How to Choose the Right Dentist', category: 'Getting Started' },
      { slug: 'dental-insurance', title: 'Understanding Dental Insurance', category: 'Insurance' },
      { slug: 'dental-health-tips', title: 'Daily Dental Care Tips', category: 'Prevention' }
    ],
    topCities: ['New York', 'Los Angeles', 'Chicago', 'Houston', 'Phoenix', 'Philadelphia'],
    insuranceInfo: 'Most general dentistry services are covered by dental insurance. Preventive care like cleanings and exams often have the highest coverage rates (80-100%). Check with your insurance provider about your specific plan benefits and any waiting periods for major procedures.',
    whatToExpect: [
      'Warm welcome and medical history review',
      'Thorough oral examination',
      'Professional teeth cleaning',
      'X-rays if needed',
      'Treatment plan discussion',
      'Scheduling of follow-up appointments'
    ]
  },
  'cosmetic-dentistry': {
    name: 'Cosmetic Dentist',
    title: 'Cosmetic Dentistry',
    description: 'Focuses on improving the appearance of teeth through whitening, veneers, bonding, and smile makeovers.',
    longDescription: 'Cosmetic dentistry focuses on improving the appearance of your smile. While traditional dentistry addresses dental health, cosmetic dentistry helps you achieve the smile you\'ve always wanted through various aesthetic procedures.',
    extendedDescription: 'Cosmetic dentistry combines art and science to create beautiful, natural-looking smiles. Modern cosmetic procedures are minimally invasive and can dramatically transform your appearance. From simple teeth whitening to complete smile makeovers, cosmetic dentists use advanced techniques and materials to enhance the color, shape, size, and alignment of your teeth. A beautiful smile can boost your confidence and make a lasting impression in both personal and professional settings.',
    icon: Sparkles,
    color: 'text-purple-600',
    bgColor: 'bg-purple-500',
    services: ['Teeth Whitening', 'Veneers', 'Dental Bonding', 'Smile Makeovers', 'Gum Contouring', 'Tooth Reshaping', 'Dental Implants', 'Invisalign'],
    whenToVisit: ['Stained or discolored teeth', 'Chipped or cracked teeth', 'Gaps between teeth', 'Uneven or misshapen teeth', 'Complete smile transformation'],
    commonProcedures: ['In-office whitening', 'Porcelain veneers', 'Composite bonding', 'Enamel shaping', 'Gum lift'],
    faqs: [
      {
        question: 'How long do veneers last?',
        answer: 'Porcelain veneers typically last 10-15 years or longer with proper care. Composite veneers have a shorter lifespan of 5-7 years. Factors affecting longevity include oral hygiene habits, teeth grinding, and avoiding hard foods that could chip the veneers.'
      },
      {
        question: 'Is teeth whitening safe?',
        answer: 'Professional teeth whitening is safe when performed by a qualified dentist. It uses FDA-approved bleaching agents and is customized to your needs. Some temporary sensitivity may occur but typically resolves within a few days. Over-the-counter products are less effective and can cause uneven results.'
      },
      {
        question: 'What is the difference between veneers and bonding?',
        answer: 'Veneers are thin porcelain shells custom-made in a lab and permanently bonded to your teeth, offering superior durability and stain resistance. Dental bonding uses tooth-colored resin applied directly to the tooth in a single visit. Bonding is more affordable but less durable than veneers.'
      },
      {
        question: 'How much does a smile makeover cost?',
        answer: 'A smile makeover can range from $3,000 to $50,000 or more depending on the procedures involved. Simple treatments like whitening cost $300-$1,000, while comprehensive makeovers with veneers, implants, and orthodontics cost significantly more. Many dentists offer financing options.'
      },
      {
        question: 'Does insurance cover cosmetic dentistry?',
        answer: 'Most cosmetic procedures are considered elective and are not covered by dental insurance. However, some procedures that also have functional benefits (like crowns or implants) may receive partial coverage. Many cosmetic dentists offer payment plans and financing options.'
      }
    ],
    costEstimates: [
      { procedure: 'Teeth Whitening', lowRange: '$300', highRange: '$1,000', note: 'In-office professional' },
      { procedure: 'Porcelain Veneers', lowRange: '$900', highRange: '$2,500', note: 'Per tooth' },
      { procedure: 'Dental Bonding', lowRange: '$200', highRange: '$600', note: 'Per tooth' },
      { procedure: 'Gum Contouring', lowRange: '$300', highRange: '$3,000', note: 'Depends on extent' },
      { procedure: 'Smile Makeover', lowRange: '$5,000', highRange: '$30,000+', note: 'Multiple procedures' }
    ],
    relatedServices: ['general-dentistry', 'orthodontics', 'periodontist'],
    relatedGuides: [
      { slug: 'cosmetic-dentistry', title: 'Guide to Cosmetic Dentistry', category: 'Treatments' },
      { slug: 'dental-procedures', title: 'Common Dental Procedures Explained', category: 'Treatments' },
      { slug: 'finding-right-dentist', title: 'How to Choose the Right Dentist', category: 'Getting Started' }
    ],
    topCities: ['Los Angeles', 'New York', 'Miami', 'Beverly Hills', 'Dallas', 'San Francisco'],
    insuranceInfo: 'Cosmetic dentistry procedures are typically considered elective and are not covered by standard dental insurance. However, procedures with restorative benefits like crowns or orthodontics may receive partial coverage. Many practices offer financing through CareCredit or in-house payment plans.',
    whatToExpect: [
      'Comprehensive smile evaluation',
      'Digital imaging and smile design',
      'Discussion of treatment options',
      'Customized treatment plan',
      'Review of costs and financing',
      'Scheduling of procedures'
    ]
  },
  'orthodontics': {
    name: 'Orthodontist',
    title: 'Orthodontics',
    description: 'Specializes in correcting teeth alignment and bite issues using braces, Invisalign, and other appliances.',
    longDescription: 'Orthodontists are specialists in diagnosing, preventing, and treating teeth and jaw alignment issues. They complete 2-3 years of additional training beyond dental school to specialize in orthodontic care.',
    extendedDescription: 'Orthodontic treatment goes beyond creating a beautiful smile - it improves overall oral health and function. Properly aligned teeth are easier to clean, reducing the risk of cavities and gum disease. Correct bite alignment prevents uneven wear on teeth and can alleviate jaw pain and headaches. Modern orthodontics offers many options including traditional metal braces, ceramic braces, lingual braces, and clear aligners like Invisalign, making treatment accessible for patients of all ages.',
    icon: SmilePlus,
    color: 'text-teal-600',
    bgColor: 'bg-teal-500',
    services: ['Traditional Braces', 'Invisalign', 'Clear Aligners', 'Retainers', 'Palate Expanders', 'Bite Correction', 'Jaw Alignment', 'Space Maintainers'],
    whenToVisit: ['Crooked or crowded teeth', 'Overbite or underbite', 'Jaw pain or clicking', 'Difficulty chewing', 'Speech problems from teeth alignment', 'Cosmetic improvement of smile'],
    commonProcedures: ['Braces installation', 'Aligner fitting', 'Adjustment appointments', 'Retainer fitting', 'X-rays and imaging'],
    faqs: [
      {
        question: 'At what age should my child see an orthodontist?',
        answer: 'The American Association of Orthodontists recommends an initial orthodontic evaluation by age 7. At this age, the orthodontist can identify developing issues and determine the optimal time for treatment. Early intervention can sometimes prevent more serious problems later.'
      },
      {
        question: 'How long does orthodontic treatment take?',
        answer: 'Treatment duration varies based on the complexity of the case. Simple cases may take 6-12 months, while more complex issues can require 2-3 years. On average, comprehensive treatment takes 18-24 months. Clear aligners may have different timelines than traditional braces.'
      },
      {
        question: 'Is Invisalign as effective as traditional braces?',
        answer: 'Invisalign is highly effective for many cases, including mild to moderate crowding, spacing, and some bite issues. However, traditional braces may be more effective for complex cases, severe malocclusions, or significant tooth rotation. Your orthodontist will recommend the best option for your specific needs.'
      },
      {
        question: 'Will I need to wear a retainer after treatment?',
        answer: 'Yes, retainers are essential for maintaining your results. Teeth naturally tend to shift over time, so wearing a retainer as directed prevents relapse. Most orthodontists recommend wearing retainers full-time initially, then transitioning to night-time wear indefinitely.'
      },
      {
        question: 'Does orthodontic treatment hurt?',
        answer: 'Some discomfort is normal, especially in the first few days after getting braces or starting new aligner trays. This usually subsides within a week. Over-the-counter pain relievers, orthodontic wax, and soft foods can help manage any discomfort during the adjustment period.'
      }
    ],
    costEstimates: [
      { procedure: 'Metal Braces', lowRange: '$3,000', highRange: '$7,000', note: 'Full treatment' },
      { procedure: 'Ceramic Braces', lowRange: '$4,000', highRange: '$8,000', note: 'Full treatment' },
      { procedure: 'Invisalign', lowRange: '$3,500', highRange: '$8,000', note: 'Full treatment' },
      { procedure: 'Lingual Braces', lowRange: '$8,000', highRange: '$13,000', note: 'Behind-the-teeth' },
      { procedure: 'Retainers', lowRange: '$150', highRange: '$500', note: 'Per retainer' }
    ],
    relatedServices: ['general-dentistry', 'cosmetic-dentistry', 'oral-surgery'],
    relatedGuides: [
      { slug: 'dental-procedures', title: 'Common Dental Procedures Explained', category: 'Treatments' },
      { slug: 'pediatric-dental-care', title: 'Dental Care for Children', category: 'Family' },
      { slug: 'dental-insurance', title: 'Understanding Dental Insurance', category: 'Insurance' }
    ],
    topCities: ['New York', 'Los Angeles', 'Chicago', 'Houston', 'San Diego', 'Dallas'],
    insuranceInfo: 'Many dental insurance plans include orthodontic coverage, typically with a lifetime maximum of $1,000-$3,000. Coverage is more common for children than adults. Some plans have waiting periods before orthodontic benefits begin. Flexible spending accounts (FSA) and health savings accounts (HSA) can also be used.',
    whatToExpect: [
      'Comprehensive examination and X-rays',
      'Discussion of treatment options',
      'Review of estimated timeline',
      'Cost and payment plan discussion',
      'Fitting of braces or aligners',
      'Regular adjustment appointments'
    ]
  },
  'oral-surgery': {
    name: 'Oral Surgeon',
    title: 'Oral Surgery',
    description: 'Performs surgical procedures including wisdom teeth removal, dental implants, and corrective jaw surgery.',
    longDescription: 'Oral and maxillofacial surgeons are specialists who treat conditions, defects, injuries, and diseases of the mouth, teeth, jaws, and face. They undergo 4-6 years of hospital-based surgical training after dental school.',
    extendedDescription: 'Oral and maxillofacial surgeons are among the most extensively trained dental specialists. Their expertise covers a wide range of procedures from routine tooth extractions to complex reconstructive surgery. They are uniquely qualified to administer all types of anesthesia, including general anesthesia, ensuring patient comfort during procedures. Oral surgeons work closely with general dentists, orthodontists, and other medical specialists to provide comprehensive care for complex cases.',
    icon: Wrench,
    color: 'text-orange-600',
    bgColor: 'bg-orange-500',
    services: ['Wisdom Teeth Removal', 'Dental Implants', 'Tooth Extractions', 'Jaw Surgery', 'Bone Grafting', 'TMJ Treatment', 'Facial Trauma Repair', 'Oral Pathology'],
    whenToVisit: ['Impacted wisdom teeth', 'Need for dental implants', 'Complex tooth extractions', 'Jaw misalignment issues', 'Facial injury or trauma', 'Oral lesions or tumors'],
    commonProcedures: ['Wisdom tooth extraction', 'Implant placement', 'Bone grafts', 'Biopsy', 'Corrective jaw surgery'],
    faqs: [
      {
        question: 'Do I need to have my wisdom teeth removed?',
        answer: 'Not everyone needs wisdom teeth removal. However, extraction is recommended if wisdom teeth are impacted, causing pain, creating crowding, partially erupted (increasing infection risk), or developing cysts or tumors. Your dentist or oral surgeon will evaluate your specific situation.'
      },
      {
        question: 'How long is recovery after wisdom teeth removal?',
        answer: 'Most patients return to normal activities within 3-5 days, though complete healing takes 1-2 weeks. Factors affecting recovery include the number of teeth removed, impaction level, and individual healing ability. Follow post-operative instructions carefully to minimize complications.'
      },
      {
        question: 'What type of anesthesia is used for oral surgery?',
        answer: 'Oral surgeons can provide local anesthesia (numbing the area), sedation (IV sedation or oral sedation for relaxation), or general anesthesia (completely unconscious). The type used depends on the procedure complexity, patient anxiety, and medical history.'
      },
      {
        question: 'How long do dental implants last?',
        answer: 'With proper care, dental implants can last a lifetime. The crown attached to the implant typically lasts 10-15 years before needing replacement due to wear. Success rates for dental implants are over 95% when placed by an experienced surgeon and properly maintained.'
      },
      {
        question: 'Is oral surgery painful?',
        answer: 'During the procedure, you should not feel pain due to anesthesia. After surgery, some discomfort and swelling are normal. Pain is typically managed with prescription or over-the-counter medications. Most patients report that the procedure is less uncomfortable than anticipated.'
      }
    ],
    costEstimates: [
      { procedure: 'Wisdom Tooth Extraction', lowRange: '$200', highRange: '$600', note: 'Per tooth, simple' },
      { procedure: 'Impacted Wisdom Tooth', lowRange: '$350', highRange: '$1,000', note: 'Per tooth' },
      { procedure: 'Dental Implant', lowRange: '$1,500', highRange: '$6,000', note: 'Per implant, including crown' },
      { procedure: 'Bone Graft', lowRange: '$300', highRange: '$3,000', note: 'Depends on extent' },
      { procedure: 'Jaw Surgery', lowRange: '$20,000', highRange: '$40,000', note: 'Complex procedures' }
    ],
    relatedServices: ['general-dentistry', 'periodontist', 'orthodontics'],
    relatedGuides: [
      { slug: 'dental-procedures', title: 'Common Dental Procedures Explained', category: 'Treatments' },
      { slug: 'dental-emergencies', title: 'Handling Dental Emergencies', category: 'Emergency' },
      { slug: 'dental-insurance', title: 'Understanding Dental Insurance', category: 'Insurance' }
    ],
    topCities: ['New York', 'Los Angeles', 'Chicago', 'Houston', 'Boston', 'Philadelphia'],
    insuranceInfo: 'Dental insurance typically covers necessary oral surgery procedures like extractions at 50-80%. Dental implants may not be covered or have limited coverage. Medical insurance may cover jaw surgery or procedures related to trauma or medical conditions. Pre-authorization is often required.',
    whatToExpect: [
      'Pre-operative consultation and imaging',
      'Review of medical history',
      'Discussion of anesthesia options',
      'Detailed surgical procedure explanation',
      'Post-operative care instructions',
      'Follow-up appointment scheduling'
    ]
  },
  'pediatric-dentistry': {
    name: 'Pediatric Dentist',
    title: 'Pediatric Dentistry',
    description: 'Specializes in dental care for children and adolescents, creating a comfortable environment for young patients.',
    longDescription: 'Pediatric dentists specialize in the oral health of children from infancy through the teen years. They have the experience and qualifications to care for a child\'s teeth, gums, and mouth throughout the various stages of childhood.',
    extendedDescription: 'Pediatric dentists complete 2-3 years of additional training after dental school, focusing on child psychology, growth and development, and treating children with special needs. Their offices are designed to be welcoming and fun for children, helping to establish positive dental experiences from an early age. Early dental care is crucial for preventing cavities, establishing good oral hygiene habits, and monitoring proper jaw and tooth development.',
    icon: Baby,
    color: 'text-pink-600',
    bgColor: 'bg-pink-500',
    services: ['Children\'s Dental Exams', 'Fluoride Treatments', 'Sealants', 'Cavity Prevention', 'Early Orthodontic Assessment', 'Tooth-Friendly Diet Counseling', 'Habit Counseling', 'Special Needs Dentistry'],
    whenToVisit: ['First dental visit (by age 1)', 'Regular checkups for children', 'Baby teeth problems', 'Thumb sucking concerns', 'Dental anxiety in children', 'Sports mouth guards'],
    commonProcedures: ['Gentle cleanings', 'Fluoride application', 'Dental sealants', 'Space maintainers', 'Child-friendly fillings'],
    faqs: [
      {
        question: 'When should my child first see a dentist?',
        answer: 'The American Academy of Pediatric Dentistry recommends a child\'s first dental visit by their first birthday or within six months of the first tooth appearing. Early visits establish a dental home, allow the dentist to monitor development, and help prevent problems before they start.'
      },
      {
        question: 'Why are baby teeth important if they fall out anyway?',
        answer: 'Baby teeth are essential for proper chewing and nutrition, speech development, and maintaining space for permanent teeth. Losing baby teeth too early can cause permanent teeth to come in crooked. Cavities in baby teeth can also spread to permanent teeth and cause pain and infection.'
      },
      {
        question: 'How can I prevent cavities in my child?',
        answer: 'Brush twice daily with fluoride toothpaste, floss daily, limit sugary snacks and drinks, ensure regular dental checkups, and consider dental sealants. Establishing good habits early and making dental care fun helps children maintain healthy teeth throughout their lives.'
      },
      {
        question: 'Is sedation safe for children during dental procedures?',
        answer: 'When administered by a qualified pediatric dentist, sedation is safe and sometimes necessary for anxious children or complex procedures. Pediatric dentists are specially trained in sedation techniques and child-specific dosing. The type of sedation is tailored to the child\'s needs and the procedure.'
      },
      {
        question: 'What are dental sealants and does my child need them?',
        answer: 'Dental sealants are thin protective coatings applied to the chewing surfaces of back teeth where most cavities develop. They are highly effective at preventing decay. Sealants are recommended for children once their permanent molars come in, usually around ages 6 and 12.'
      }
    ],
    costEstimates: [
      { procedure: 'Child Dental Exam', lowRange: '$50', highRange: '$150' },
      { procedure: 'Child Teeth Cleaning', lowRange: '$75', highRange: '$150' },
      { procedure: 'Fluoride Treatment', lowRange: '$20', highRange: '$50' },
      { procedure: 'Dental Sealant', lowRange: '$30', highRange: '$60', note: 'Per tooth' },
      { procedure: 'Space Maintainer', lowRange: '$150', highRange: '$400' }
    ],
    relatedServices: ['general-dentistry', 'orthodontics', 'emergency-dentist'],
    relatedGuides: [
      { slug: 'pediatric-dental-care', title: 'Dental Care for Children', category: 'Family' },
      { slug: 'dental-health-tips', title: 'Daily Dental Care Tips', category: 'Prevention' },
      { slug: 'dental-anxiety', title: 'Overcoming Dental Anxiety', category: 'Patient Care' }
    ],
    topCities: ['New York', 'Los Angeles', 'Chicago', 'Houston', 'Phoenix', 'San Antonio'],
    insuranceInfo: 'Most dental insurance plans cover preventive pediatric dental care at 100%. This typically includes exams, cleanings, X-rays, fluoride treatments, and sealants. Some plans have age limits for coverage. Medicaid and CHIP programs provide dental coverage for eligible children.',
    whatToExpect: [
      'Child-friendly office environment',
      'Gentle, age-appropriate examination',
      'Education for parents and children',
      'Preventive treatments as needed',
      'Discussion of development and habits',
      'Creation of positive dental experiences'
    ]
  },
  'endodontist': {
    name: 'Endodontist',
    title: 'Endodontics',
    description: 'Specializes in root canal treatments and diagnosing and treating dental pulp diseases.',
    longDescription: 'Endodontists are specialists in saving teeth. They focus on the dental pulp and tissues surrounding the roots of teeth. With advanced training and specialized techniques, they perform root canal treatment and other procedures to save natural teeth.',
    extendedDescription: 'Endodontists complete 2-3 years of advanced training after dental school, focusing exclusively on treating the inside of teeth. They use advanced technology like digital imaging and operating microscopes to diagnose and treat even the most complex cases. Endodontists perform an average of 25 root canal procedures per week, compared to about 2 per week for general dentists, giving them exceptional expertise. Their goal is always to save your natural tooth whenever possible.',
    icon: Heart,
    color: 'text-red-600',
    bgColor: 'bg-red-500',
    services: ['Root Canal Treatment', 'Endodontic Retreatment', 'Apicoectomy', 'Dental Trauma Treatment', 'Cracked Teeth Treatment', 'Internal Bleaching', 'Pulp Therapy', 'Emergency Root Canal'],
    whenToVisit: ['Severe tooth pain', 'Prolonged sensitivity to hot/cold', 'Tooth discoloration', 'Swelling near tooth', 'Tender gums', 'Previous root canal needs retreatment'],
    commonProcedures: ['Root canal therapy', 'Pulpotomy', 'Apicoectomy', 'Retreatment of failed root canals', 'Dental trauma care'],
    faqs: [
      {
        question: 'Are root canals painful?',
        answer: 'Modern root canal treatment is similar to getting a filling and is usually completed in one or two appointments with minimal discomfort. Local anesthesia ensures you feel no pain during the procedure. Most patients report feeling immediate relief from the pain caused by the infected tooth.'
      },
      {
        question: 'How long does a root canal take?',
        answer: 'A typical root canal takes 60-90 minutes, though complex cases may require additional time or a second appointment. Front teeth with one root are usually quicker, while molars with multiple roots take longer. Retreatments may also require additional time.'
      },
      {
        question: 'What is the success rate of root canal treatment?',
        answer: 'Root canal treatment has a success rate of over 95% and can last a lifetime. Success depends on proper treatment, appropriate restoration (crown), and good oral hygiene. In cases where initial treatment fails, retreatment or surgical options can often save the tooth.'
      },
      {
        question: 'Can a tooth that has had a root canal get infected again?',
        answer: 'While uncommon, reinfection can occur if the crown develops a crack, new decay develops, or the tooth has complex anatomy that wasn\'t completely treated. If reinfection occurs, retreatment or an apicoectomy (surgical procedure) may be needed to save the tooth.'
      },
      {
        question: 'Do I need a crown after a root canal?',
        answer: 'In most cases, yes. A crown protects the treated tooth from fracture and restores it to full function. Back teeth (molars and premolars) almost always need crowns due to chewing forces. Front teeth may sometimes be restored with just a filling if enough tooth structure remains.'
      }
    ],
    costEstimates: [
      { procedure: 'Root Canal (Front Tooth)', lowRange: '$700', highRange: '$1,100' },
      { procedure: 'Root Canal (Premolar)', lowRange: '$800', highRange: '$1,200' },
      { procedure: 'Root Canal (Molar)', lowRange: '$1,000', highRange: '$1,500' },
      { procedure: 'Retreatment', lowRange: '$900', highRange: '$1,600' },
      { procedure: 'Apicoectomy', lowRange: '$900', highRange: '$1,800' }
    ],
    relatedServices: ['general-dentistry', 'oral-surgery', 'emergency-dentist'],
    relatedGuides: [
      { slug: 'dental-procedures', title: 'Common Dental Procedures Explained', category: 'Treatments' },
      { slug: 'dental-emergencies', title: 'Handling Dental Emergencies', category: 'Emergency' },
      { slug: 'oral-health-conditions', title: 'Common Oral Health Conditions', category: 'Education' }
    ],
    topCities: ['New York', 'Los Angeles', 'Chicago', 'Houston', 'Phoenix', 'Dallas'],
    insuranceInfo: 'Dental insurance typically covers root canal treatment at 50-80% after the deductible. Coverage varies by tooth location, with some plans covering front teeth at higher rates. Pre-authorization may be required. The crown needed after root canal treatment is usually covered separately.',
    whatToExpect: [
      'Thorough examination and diagnosis',
      'Digital X-rays and imaging',
      'Local anesthesia administration',
      'Isolation of tooth with dental dam',
      'Removal of infected pulp tissue',
      'Filling and sealing of root canals'
    ]
  },
  'periodontist': {
    name: 'Periodontist',
    title: 'Periodontics',
    description: 'Focuses on prevention, diagnosis, and treatment of gum disease, and dental implant placement.',
    longDescription: 'Periodontists specialize in the prevention, diagnosis, and treatment of periodontal disease, and in the placement of dental implants. They receive extensive training in these areas, including three additional years of education beyond dental school.',
    extendedDescription: 'Periodontists are experts in treating gum disease and its effects on overall health. Research continues to link periodontal disease to systemic conditions including heart disease, diabetes, and respiratory diseases. Periodontists use both surgical and non-surgical approaches to treat gum disease, and are specialists in placing and maintaining dental implants. They work closely with your general dentist to ensure comprehensive care for your gums and supporting bone structures.',
    icon: Crown,
    color: 'text-green-600',
    bgColor: 'bg-green-500',
    services: ['Gum Disease Treatment', 'Scaling and Root Planing', 'Gum Grafts', 'Dental Implants', 'Crown Lengthening', 'Pocket Reduction', 'Bone Regeneration', 'Periodontal Maintenance'],
    whenToVisit: ['Bleeding gums', 'Receding gums', 'Loose teeth', 'Persistent bad breath', 'Deep pockets around teeth', 'Need for dental implants'],
    commonProcedures: ['Deep cleaning', 'Gum surgery', 'Bone grafts', 'Implant placement', 'Gum tissue grafts'],
    faqs: [
      {
        question: 'What are the signs of gum disease?',
        answer: 'Warning signs include red, swollen, or tender gums, bleeding when brushing or flossing, receding gums, persistent bad breath, loose teeth, and changes in bite. Gum disease can progress without pain, so regular dental checkups are important for early detection.'
      },
      {
        question: 'Can gum disease be reversed?',
        answer: 'Gingivitis (early gum disease) can be reversed with professional treatment and improved oral hygiene. Advanced periodontitis cannot be fully reversed but can be controlled and managed to prevent further damage. Early intervention is key to preventing tooth loss.'
      },
      {
        question: 'How is gum disease treated?',
        answer: 'Treatment depends on severity. Mild cases may only need deep cleaning (scaling and root planing). Moderate to severe cases may require pocket reduction surgery, bone grafts, or gum grafts. Ongoing periodontal maintenance (cleanings every 3-4 months) is essential.'
      },
      {
        question: 'Are dental implants better than bridges or dentures?',
        answer: 'Dental implants offer several advantages: they don\'t require adjacent teeth to be modified, they prevent bone loss in the jaw, they function like natural teeth, and they can last a lifetime. However, they require sufficient bone density and are more expensive initially.'
      },
      {
        question: 'How long does gum graft surgery take to heal?',
        answer: 'Initial healing takes 1-2 weeks, during which you\'ll follow a soft food diet and avoid the surgical area. Full healing and maturation of the graft tissue takes 2-3 months. Most patients can return to normal activities within a few days of surgery.'
      }
    ],
    costEstimates: [
      { procedure: 'Scaling & Root Planing', lowRange: '$200', highRange: '$400', note: 'Per quadrant' },
      { procedure: 'Gum Graft', lowRange: '$600', highRange: '$1,200', note: 'Per area' },
      { procedure: 'Pocket Reduction Surgery', lowRange: '$1,000', highRange: '$3,000', note: 'Per quadrant' },
      { procedure: 'Dental Implant', lowRange: '$3,000', highRange: '$6,000', note: 'Including crown' },
      { procedure: 'Bone Graft', lowRange: '$300', highRange: '$1,200', note: 'Per site' }
    ],
    relatedServices: ['general-dentistry', 'oral-surgery', 'cosmetic-dentistry'],
    relatedGuides: [
      { slug: 'oral-health-conditions', title: 'Common Oral Health Conditions', category: 'Education' },
      { slug: 'dental-procedures', title: 'Common Dental Procedures Explained', category: 'Treatments' },
      { slug: 'dental-health-tips', title: 'Daily Dental Care Tips', category: 'Prevention' }
    ],
    topCities: ['New York', 'Los Angeles', 'Chicago', 'Houston', 'San Francisco', 'Boston'],
    insuranceInfo: 'Dental insurance typically covers periodontal treatments at 50-80%. Deep cleanings and periodontal maintenance are usually covered. Surgical procedures may have lower coverage rates or annual maximums. Dental implants often have limited or no coverage, though some medical plans may cover implants in certain situations.',
    whatToExpect: [
      'Comprehensive periodontal evaluation',
      'Measurement of gum pockets',
      'Assessment of bone levels',
      'Personalized treatment plan',
      'Discussion of surgical options if needed',
      'Long-term maintenance planning'
    ]
  },
  'emergency-dentist': {
    name: 'Emergency Dentist',
    title: 'Emergency Dentistry',
    description: 'Provides urgent dental care for toothaches, broken teeth, lost fillings, and other dental emergencies.',
    longDescription: 'Emergency dentists provide urgent dental care when you need it most. They handle dental emergencies like severe toothaches, broken teeth, knocked-out teeth, and other urgent situations that can\'t wait for a regular appointment.',
    extendedDescription: 'Dental emergencies can happen at any time and require immediate attention to relieve pain, prevent further damage, and save teeth. Emergency dentists are equipped to handle a wide range of urgent situations, from trauma to severe infections. Quick action in a dental emergency can mean the difference between saving and losing a tooth. Many dental offices offer same-day appointments for emergencies, and some provide after-hours and weekend care.',
    icon: AlertCircle,
    color: 'text-red-600',
    bgColor: 'bg-red-600',
    services: ['Same-Day Appointments', 'Severe Toothache Relief', 'Broken Tooth Repair', 'Knocked-Out Tooth Treatment', 'Lost Filling/Crown Replacement', 'Abscess Treatment', 'Dental Trauma Care', 'After-Hours Care'],
    whenToVisit: ['Severe tooth pain', 'Knocked-out tooth (act fast!)', 'Broken or cracked tooth', 'Lost filling or crown', 'Dental abscess', 'Bleeding that won\'t stop', 'Swelling in mouth or face'],
    commonProcedures: ['Pain relief treatment', 'Temporary fillings', 'Tooth reattachment', 'Abscess drainage', 'Emergency extractions'],
    faqs: [
      {
        question: 'What qualifies as a dental emergency?',
        answer: 'Dental emergencies include severe toothache, knocked-out tooth, broken/cracked tooth with pain, lost filling or crown with sensitivity, dental abscess (swelling with fever), uncontrolled bleeding, and facial trauma affecting teeth. If you\'re unsure, call your dentist for guidance.'
      },
      {
        question: 'What should I do if my tooth gets knocked out?',
        answer: 'Time is critical - there\'s a 30-minute window for best results. Pick up the tooth by the crown (not the root), rinse gently if dirty, and try to reinsert it in the socket. If that\'s not possible, place it in milk or between your cheek and gum. See a dentist immediately.'
      },
      {
        question: 'Should I go to the ER for a dental emergency?',
        answer: 'ERs can help with pain management and infections but cannot perform dental procedures. For true dental emergencies, seek an emergency dentist when possible. However, go to the ER for uncontrolled bleeding, difficulty breathing or swallowing, facial trauma with suspected fractures, or high fever with swelling.'
      },
      {
        question: 'How can I manage dental pain before seeing a dentist?',
        answer: 'Take over-the-counter pain relievers as directed (ibuprofen is often effective). Apply a cold compress to the outside of your cheek for 15-20 minutes. Rinse with warm salt water. Avoid hot, cold, or sweet foods. Don\'t place aspirin directly on gums as it can burn tissue.'
      },
      {
        question: 'Are emergency dental visits more expensive?',
        answer: 'Emergency visits may cost more than scheduled appointments due to the urgent nature and after-hours availability. Exam fees range from $100-$300, with additional costs for treatment. Many emergency dentists offer payment plans. Treating emergencies promptly often prevents more costly procedures later.'
      }
    ],
    costEstimates: [
      { procedure: 'Emergency Exam', lowRange: '$100', highRange: '$300' },
      { procedure: 'Emergency Extraction', lowRange: '$150', highRange: '$400' },
      { procedure: 'Abscess Drainage', lowRange: '$100', highRange: '$300' },
      { procedure: 'Temporary Crown', lowRange: '$100', highRange: '$250' },
      { procedure: 'After-Hours Visit', lowRange: '$200', highRange: '$500', note: 'Additional fee may apply' }
    ],
    relatedServices: ['general-dentistry', 'oral-surgery', 'endodontist'],
    relatedGuides: [
      { slug: 'dental-emergencies', title: 'Handling Dental Emergencies', category: 'Emergency' },
      { slug: 'dental-anxiety', title: 'Overcoming Dental Anxiety', category: 'Patient Care' },
      { slug: 'finding-right-dentist', title: 'How to Choose the Right Dentist', category: 'Getting Started' }
    ],
    topCities: ['New York', 'Los Angeles', 'Chicago', 'Houston', 'Phoenix', 'Las Vegas'],
    insuranceInfo: 'Most dental insurance covers emergency treatment, though you may pay more if seeing an out-of-network provider. Emergency exams and treatment are typically covered at the same rate as regular visits. If you need after-hours care at an emergency facility, additional fees may not be fully covered.',
    whatToExpect: [
      'Rapid assessment of your condition',
      'Pain management as first priority',
      'X-rays to diagnose the problem',
      'Immediate treatment when possible',
      'Temporary solutions if needed',
      'Follow-up care instructions'
    ]
  },
};

// Map URL slugs to service type keys
const slugToType: Record<string, string> = {
  'general-dentistry': 'general-dentistry',
  'general-dentist': 'general-dentistry',
  'cosmetic-dentistry': 'cosmetic-dentistry',
  'cosmetic-dentist': 'cosmetic-dentistry',
  'orthodontics': 'orthodontics',
  'orthodontist': 'orthodontics',
  'oral-surgery': 'oral-surgery',
  'oral-surgeon': 'oral-surgery',
  'pediatric-dentistry': 'pediatric-dentistry',
  'pediatric-dentist': 'pediatric-dentistry',
  'endodontics': 'endodontist',
  'endodontist': 'endodontist',
  'periodontics': 'periodontist',
  'periodontist': 'periodontist',
  'emergency-dentistry': 'emergency-dentist',
  'emergency-dentist': 'emergency-dentist',
};

interface PageProps {
  params: Promise<{ type: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { type } = await params;
  const serviceKey = slugToType[type.toLowerCase()];
  const service = serviceKey ? serviceTypes[serviceKey] : null;

  if (!service) {
    return { title: 'Service Not Found' };
  }

  return {
    title: `${service.title} | Find ${service.name}s Near You | DentistNearMeNow`,
    description: `${service.longDescription} Find trusted ${service.name.toLowerCase()}s in your area with reviews, costs, and insurance information.`,
    openGraph: {
      title: `Find ${service.name}s Near You - ${service.title} Services`,
      description: service.description,
    },
    alternates: {
      canonical: `/services/${type}`,
    },
  };
}

export async function generateStaticParams() {
  return Object.keys(slugToType).map((type) => ({ type }));
}

// FAQ Accordion Component
function FAQAccordion({ faqs, serviceName }: { faqs: FAQ[]; serviceName: string }) {
  return (
    <div className="space-y-4">
      {faqs.map((faq, index) => (
        <details
          key={index}
          className="group bg-white border rounded-xl overflow-hidden"
        >
          <summary className="flex items-center justify-between cursor-pointer p-5 hover:bg-gray-50 transition-colors">
            <h3 className="font-medium text-left pr-4">{faq.question}</h3>
            <ChevronDown className="w-5 h-5 text-gray-500 flex-shrink-0 transition-transform group-open:rotate-180" />
          </summary>
          <div className="px-5 pb-5 pt-0">
            <p className="text-muted-foreground leading-relaxed">{faq.answer}</p>
          </div>
        </details>
      ))}
    </div>
  );
}

export default async function ServiceTypePage({ params }: PageProps) {
  const { type } = await params;
  const serviceKey = slugToType[type.toLowerCase()];
  const service = serviceKey ? serviceTypes[serviceKey] : null;

  if (!service) {
    notFound();
  }

  // Search for dentists of this type
  const searchType = type.replace(/-/g, ' ').replace('dentistry', 'dentist');
  const dentists = await searchDentists('', { type: searchType });
  const Icon = service.icon;

  // Generate FAQ Schema JSON-LD
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": service.faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };

  // Generate Service Schema JSON-LD
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "MedicalSpecialty",
    "name": service.title,
    "description": service.longDescription,
    "relevantSpecialty": {
      "@type": "MedicalSpecialty",
      "name": "Dentistry"
    }
  };

  // Get related service details
  const relatedServiceDetails = service.relatedServices
    .map(slug => {
      const key = slugToType[slug];
      return key ? { slug, ...serviceTypes[key] } : null;
    })
    .filter(Boolean);

  return (
    <div className="bg-background min-h-screen">
      {/* JSON-LD Schema Markup */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary to-primary/80 text-white py-16">
        <div className="container mx-auto px-4">
          <nav className="flex items-center gap-2 text-white/80 mb-4 text-sm flex-wrap">
            <Link href="/" className="hover:text-white">Home</Link>
            <ChevronRight className="w-4 h-4" />
            <Link href="/services" className="hover:text-white">Services</Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-white">{service.title}</span>
          </nav>

          <div className="flex items-start gap-6">
            <div className={`w-20 h-20 ${service.bgColor} rounded-2xl flex items-center justify-center flex-shrink-0 hidden md:flex`}>
              <Icon className="w-10 h-10 text-white" />
            </div>
            <div>
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                {service.title}
              </h1>
              <p className="text-xl text-white/90 max-w-3xl">
                {service.longDescription}
              </p>
              <div className="flex flex-wrap gap-4 mt-6">
                <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-lg">
                  <Users className="w-4 h-4" />
                  <span>{dentists.length} {service.name}s Found</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Find Near Me CTA */}
      <section className="py-8 bg-white border-b">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className={`w-12 h-12 ${service.bgColor} rounded-xl flex items-center justify-center`}>
                <MapPin className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="font-semibold text-lg">Find {service.name}s Near You</h2>
                <p className="text-muted-foreground text-sm">Search by location to find trusted providers in your area</p>
              </div>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link href={`/search?type=${type}`}>
                <Button size="lg" className="gap-2">
                  <MapPin className="w-4 h-4" />
                  Find {service.name}s Near Me
                </Button>
              </Link>
              {serviceKey === 'emergency-dentist' && (
                <Link href="/emergency-dentist">
                  <Button size="lg" variant="destructive" className="gap-2">
                    <Phone className="w-4 h-4" />
                    Emergency Care Now
                  </Button>
                </Link>
              )}
            </div>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Sidebar */}
          <aside className="lg:col-span-1 space-y-6">
            {/* Services Offered */}
            <div className="bg-white rounded-xl border p-6">
              <h2 className="font-semibold text-lg mb-4">Services Offered</h2>
              <ul className="space-y-2">
                {service.services.map((s, i) => (
                  <li key={i} className="flex items-center gap-2 text-sm text-muted-foreground">
                    <div className={`w-2 h-2 ${service.bgColor} rounded-full`} />
                    {s}
                  </li>
                ))}
              </ul>
            </div>

            {/* When to Visit */}
            <div className="bg-white rounded-xl border p-6">
              <h2 className="font-semibold text-lg mb-4">When to Visit</h2>
              <ul className="space-y-2">
                {service.whenToVisit.map((reason, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                    <ChevronRight className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                    {reason}
                  </li>
                ))}
              </ul>
            </div>

            {/* Common Procedures */}
            <div className="bg-white rounded-xl border p-6">
              <h2 className="font-semibold text-lg mb-4">Common Procedures</h2>
              <ul className="space-y-2">
                {service.commonProcedures.map((proc, i) => (
                  <li key={i} className="flex items-center gap-2 text-sm text-muted-foreground">
                    <div className="w-1.5 h-1.5 bg-gray-400 rounded-full" />
                    {proc}
                  </li>
                ))}
              </ul>
            </div>

            {/* Related Guides */}
            <div className="bg-white rounded-xl border p-6">
              <h2 className="font-semibold text-lg mb-4 flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-primary" />
                Related Guides
              </h2>
              <ul className="space-y-3">
                {service.relatedGuides.map((guide, i) => (
                  <li key={i}>
                    <Link
                      href={`/guides/${guide.slug}`}
                      className="group block"
                    >
                      <span className="text-xs text-primary bg-primary/10 px-2 py-0.5 rounded">
                        {guide.category}
                      </span>
                      <p className="text-sm font-medium mt-1 group-hover:text-primary transition-colors">
                        {guide.title}
                      </p>
                    </Link>
                  </li>
                ))}
              </ul>
              <Link href="/guides" className="inline-flex items-center gap-1 text-sm text-primary font-medium mt-4 hover:underline">
                View All Guides
                <ChevronRight className="w-4 h-4" />
              </Link>
            </div>

            {/* Related Services */}
            <div className="bg-white rounded-xl border p-6">
              <h2 className="font-semibold text-lg mb-4">Related Services</h2>
              <ul className="space-y-3">
                {relatedServiceDetails.map((related, i) => {
                  if (!related) return null;
                  const RelatedIcon = related.icon;
                  return (
                    <li key={i}>
                      <Link
                        href={`/services/${related.slug}`}
                        className="flex items-center gap-3 group"
                      >
                        <div className={`w-10 h-10 ${related.bgColor} rounded-lg flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform`}>
                          <RelatedIcon className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <p className="text-sm font-medium group-hover:text-primary transition-colors">
                            {related.title}
                          </p>
                          <p className="text-xs text-muted-foreground line-clamp-1">
                            {related.description}
                          </p>
                        </div>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>

            {/* Top Cities */}
            <div className="bg-white rounded-xl border p-6">
              <h2 className="font-semibold text-lg mb-4 flex items-center gap-2">
                <MapPin className="w-5 h-5 text-primary" />
                Popular Cities
              </h2>
              <div className="flex flex-wrap gap-2">
                {service.topCities.map((city, i) => (
                  <Link
                    key={i}
                    href={`/search?query=${encodeURIComponent(city)}&type=${type}`}
                    className="text-sm bg-gray-100 hover:bg-primary hover:text-white px-3 py-1.5 rounded-full transition-colors"
                  >
                    {city}
                  </Link>
                ))}
              </div>
            </div>

            {/* Emergency CTA for emergency page */}
            {serviceKey === 'emergency-dentist' && (
              <div className="bg-red-50 border border-red-200 rounded-xl p-6">
                <h3 className="font-semibold text-red-800 mb-2">Need Emergency Care?</h3>
                <p className="text-sm text-red-700 mb-4">
                  If you have a dental emergency, don&apos;t wait. Find immediate care now.
                </p>
                <Link href="/emergency-dentist">
                  <Button className="w-full bg-red-600 hover:bg-red-700">
                    <Phone className="w-4 h-4 mr-2" />
                    Find Emergency Dentist
                  </Button>
                </Link>
              </div>
            )}
          </aside>

          {/* Main Content - Dentist List */}
          <main className="lg:col-span-2">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold">
                {service.name}s Near You
              </h2>
              <p className="text-muted-foreground">{dentists.length} results</p>
            </div>

            {dentists.length > 0 ? (
              <div className="space-y-4">
                {dentists.slice(0, 20).map((dentist) => (
                  <DentistCard key={dentist.id} dentist={dentist} />
                ))}
                {dentists.length > 20 && (
                  <div className="text-center py-6">
                    <Link href={`/search?type=${type}`}>
                      <Button variant="outline" size="lg">
                        View All {dentists.length} {service.name}s
                        <ChevronRight className="w-4 h-4 ml-2" />
                      </Button>
                    </Link>
                  </div>
                )}
              </div>
            ) : (
              <div className="bg-gray-50 rounded-xl p-12 text-center">
                <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
                  <MapPin className="w-8 h-8 text-gray-400" />
                </div>
                <h3 className="text-xl font-semibold mb-2">No {service.name}s Found Yet</h3>
                <p className="text-muted-foreground max-w-md mx-auto mb-6">
                  We&apos;re still building our directory. Try searching in a different area
                  or check back soon for more providers.
                </p>
                <Link href="/search">
                  <Button>
                    Search All Dentists
                  </Button>
                </Link>
              </div>
            )}
          </main>
        </div>
      </div>

      {/* Cost & Insurance Section */}
      <section className="py-16 bg-white border-t">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12">
              {/* Cost Estimates */}
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                    <DollarSign className="w-6 h-6 text-green-600" />
                  </div>
                  <h2 className="text-2xl font-bold">Cost Estimates</h2>
                </div>
                <p className="text-muted-foreground mb-6">
                  Typical costs for {service.title.toLowerCase()} procedures. Actual costs may vary based on location, complexity, and insurance coverage.
                </p>
                <div className="space-y-3">
                  {service.costEstimates.map((cost, i) => (
                    <div key={i} className="flex items-center justify-between py-3 border-b last:border-0">
                      <div>
                        <p className="font-medium">{cost.procedure}</p>
                        {cost.note && (
                          <p className="text-xs text-muted-foreground">{cost.note}</p>
                        )}
                      </div>
                      <p className="font-semibold text-primary">
                        {cost.lowRange} - {cost.highRange}
                      </p>
                    </div>
                  ))}
                </div>
                <p className="text-xs text-muted-foreground mt-4">
                  * Estimates are national averages. Get a personalized quote from your dentist.
                </p>
              </div>

              {/* Insurance Information */}
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                    <Shield className="w-6 h-6 text-blue-600" />
                  </div>
                  <h2 className="text-2xl font-bold">Insurance & Payment</h2>
                </div>
                <p className="text-muted-foreground mb-6">
                  {service.insuranceInfo}
                </p>
                <div className="bg-gray-50 rounded-xl p-5">
                  <h3 className="font-semibold mb-3">Tips for Maximizing Benefits</h3>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2 text-sm text-muted-foreground">
                      <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                      Verify coverage before your appointment
                    </li>
                    <li className="flex items-start gap-2 text-sm text-muted-foreground">
                      <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                      Ask about in-network providers for lower costs
                    </li>
                    <li className="flex items-start gap-2 text-sm text-muted-foreground">
                      <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                      Use preventive benefits before year-end
                    </li>
                    <li className="flex items-start gap-2 text-sm text-muted-foreground">
                      <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                      Consider FSA/HSA for out-of-pocket costs
                    </li>
                  </ul>
                </div>
                <Link href="/guides/dental-insurance" className="inline-flex items-center gap-1 text-primary font-medium mt-4 hover:underline">
                  Learn More About Dental Insurance
                  <ChevronRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What to Expect Section */}
      <section className="py-16 bg-gray-50 border-t">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-3 mb-8 justify-center">
              <div className={`w-12 h-12 ${service.bgColor} rounded-xl flex items-center justify-center`}>
                <Clock className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-2xl font-bold">What to Expect at Your Visit</h2>
            </div>
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
              {service.whatToExpect.map((step, i) => (
                <div key={i} className="bg-white rounded-xl border p-5 flex items-start gap-3">
                  <div className={`w-8 h-8 ${service.bgColor} text-white rounded-full flex items-center justify-center flex-shrink-0 text-sm font-bold`}>
                    {i + 1}
                  </div>
                  <p className="text-sm text-muted-foreground">{step}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-white border-t">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-3">
              Frequently Asked Questions
            </h2>
            <p className="text-center text-muted-foreground mb-10">
              Common questions about {service.title.toLowerCase()} answered by dental professionals
            </p>
            <FAQAccordion faqs={service.faqs} serviceName={service.name} />
          </div>
        </div>
      </section>

      {/* SEO Content Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto prose prose-lg">
            <h2>About {service.title}</h2>
            <p>{service.longDescription}</p>
            <p>{service.extendedDescription}</p>

            <h3>What Does a {service.name} Do?</h3>
            <p>
              A {service.name.toLowerCase()} specializes in {service.description.toLowerCase()}{' '}
              They work to ensure your oral health needs are met with professional care and expertise.
              With specialized training and advanced equipment, they can diagnose and treat a wide range
              of conditions related to their specialty.
            </p>

            <h3>Finding the Right {service.name}</h3>
            <p>
              When choosing a {service.name.toLowerCase()}, consider their experience, patient reviews,
              office location, and whether they accept your insurance. It&apos;s important to feel
              comfortable with your dental care provider. Look for dentists who take time to explain
              procedures, answer your questions, and create a welcoming environment.
            </p>

            <h3>Why Choose a Specialist?</h3>
            <p>
              {service.name}s complete additional years of training beyond dental school to master their
              specialty. This advanced education, combined with focused experience, means they often
              achieve better outcomes for complex cases. Your general dentist may refer you to a
              specialist when your needs require this level of expertise.
            </p>

            <div className="not-prose mt-8 flex flex-wrap gap-4">
              <Link href={`/search?type=${type}`}>
                <Button size="lg" className="gap-2">
                  <MapPin className="w-4 h-4" />
                  Find {service.name}s Near Me
                </Button>
              </Link>
              <Link href="/search">
                <Button variant="outline" size="lg">
                  Search All Dentists
                  <ChevronRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
              <Link href="/services">
                <Button variant="outline" size="lg">
                  View All Services
                  <ChevronRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
