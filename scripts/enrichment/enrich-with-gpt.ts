#!/usr/bin/env npx tsx
/**
 * GPT-5 nano Enrichment Pipeline for US Dentists
 *
 * Generates SEO-optimized content for dentist pages using OpenAI's GPT-5 nano model.
 *
 * Usage:
 *   npx tsx scripts/enrichment/enrich-with-gpt.ts
 *   npx tsx scripts/enrichment/enrich-with-gpt.ts --batch 100
 *   npx tsx scripts/enrichment/enrich-with-gpt.ts --state California
 *   npx tsx scripts/enrichment/enrich-with-gpt.ts --dry-run
 */

import fs from 'fs/promises';
import path from 'path';
import { OpenAI } from 'openai';
import chalk from 'chalk';
import cliProgress from 'cli-progress';
import pLimit from 'p-limit';
import { config } from 'dotenv';

// Load environment variables
config({ path: path.join(__dirname, '..', '..', '.env.openai') });

// Configuration
const CONFIG = {
  OPENAI_API_KEY: process.env.OPENAI_API_KEY || '',
  MODEL: 'gpt-5-nano', // OpenAI's fastest, cheapest GPT-5 model
  MAX_TOKENS: 1200,
  TEMPERATURE: 0.7,
  CONCURRENCY: 15, // Higher concurrency due to fast model
  DISCOVERY_FILE: path.join(__dirname, '..', '..', 'data', 'discovery', 'discovered-dentists.json'),
  JINA_SCRAPED_DIR: path.join(__dirname, '..', '..', 'data', 'scraped-websites'),
  OUTPUT_DIR: path.join(__dirname, '..', '..', 'data', 'enriched-content'),
  PROGRESS_FILE: path.join(__dirname, '..', '..', 'data', 'enriched-content', 'progress.json'),
};

// Types
interface DiscoveredDentist {
  google_cid: string;
  google_place_id?: string;
  name: string;
  address?: string;
  phone?: string;
  website?: string;
  latitude?: number;
  longitude?: number;
  city: string;
  county?: string;
  state: string;
  state_abbr: string;
  country: string;
  zip_code?: string;
  rating?: number;
  review_count?: number;
  business_type?: string;
  categories?: string[];
  services?: string[];
  opening_hours?: string;
  photo_url?: string;
}

interface EnrichedContent {
  slug: string;
  google_cid: string;
  name: string;
  city: string;
  state: string;
  state_abbr: string;
  seoTitle: string;
  seoDescription: string;
  content: string;
  highlights: string[];
  services: string[];
  practicalInfo: {
    address?: string;
    phone?: string;
    website?: string;
    hours?: string;
    parking?: string;
    accessibility?: string;
    insurance?: string;
  };
  specializations?: string[];
  enrichedAt: string;
  wordCount: number;
  model: string;
}

// Progress tracking
let progress = {
  total: 0,
  completed: 0,
  failed: 0,
  completedCids: [] as string[],
  failedCids: [] as string[],
  lastRunAt: '',
};

// Create slug from name and location
function createSlug(name: string, city: string, stateAbbr: string): string {
  return `${name}-${city}-${stateAbbr}`
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

// Load Jina-scraped website content for a dentist
async function loadJinaContent(dentist: DiscoveredDentist): Promise<string | null> {
  try {
    const slug = createSlug(dentist.name, dentist.city, dentist.state_abbr);
    const jinaPath = path.join(CONFIG.JINA_SCRAPED_DIR, `${slug}.json`);
    const data = JSON.parse(await fs.readFile(jinaPath, 'utf-8'));

    if (data.success && data.content) {
      // Return first 3000 chars of website content for GPT context
      return data.content.substring(0, 3000);
    }
    return null;
  } catch {
    // No Jina content available for this dentist
    return null;
  }
}

// Create the SEO prompt for dentists
function createEnrichmentPrompt(dentist: DiscoveredDentist, websiteContent: string | null): string {
  const categories = dentist.categories?.join(', ') || 'General Dentist';
  const services = dentist.services?.join(', ') || '';

  const websiteSection = websiteContent
    ? `\n\nWEBSITE CONTENT (from their official website):\n${websiteContent}\n`
    : '';

  return `You are an SEO specialist and content writer for US dental practices.

Write a rich, informative, and SEO-optimized description for this dental practice:

DENTIST INFORMATION:
- Name: ${dentist.name}
- City: ${dentist.city}
- State: ${dentist.state} (${dentist.state_abbr})
- Address: ${dentist.address || 'Not available'}
- Phone: ${dentist.phone || 'Not available'}
- Rating: ${dentist.rating ? `${dentist.rating}/5 stars` : 'Not rated yet'}
- Reviews: ${dentist.review_count || 0} reviews
- Business Type: ${dentist.business_type || 'Dentist'}
- Categories: ${categories}
- Services/Amenities: ${services}${websiteSection}

INSTRUCTIONS:
1. Write an engaging, informative text of MINIMUM 350 and MAXIMUM 400 words
2. Start with a compelling opening sentence that captures the essence of this dental practice
3. Naturally use keywords: "${dentist.name}", "${dentist.city}", "dentist", "${dentist.state}"
4. Write in a professional, friendly, and trustworthy tone
5. Mention practical information where available
6. Highlight what makes this practice unique
7. Make it locally relevant (mention the city, nearby landmarks if logical)
8. End with a call to action (schedule an appointment, visit)
9. IMPORTANT: The text must be between 350-400 words

RESPONSE FORMAT (JSON):
{
  "seoTitle": "Short, catchy SEO title (max 60 characters)",
  "seoDescription": "Meta description for Google (max 155 characters)",
  "content": "The main text (350-400 words)",
  "highlights": [
    "First highlight/feature",
    "Second highlight/feature",
    "Third highlight/feature",
    "Fourth highlight/feature"
  ],
  "services": [
    "General Dentistry",
    "Cosmetic Dentistry",
    "Emergency Care",
    "Other services based on categories"
  ],
  "practicalInfo": {
    "address": "Full address if available",
    "phone": "Phone number if available",
    "website": "Website if available",
    "hours": "Opening hours if known, otherwise 'Call for hours'",
    "parking": "Parking information if available",
    "accessibility": "Wheelchair accessible if mentioned in services",
    "insurance": "Insurance information if available"
  },
  "specializations": [
    "Specializations based on categories/business type"
  ]
}

EXAMPLE HIGHLIGHTS (use this format):
- Experienced dental team serving ${dentist.city} residents
- Modern facilities with latest dental technology
- Accepts most major insurance plans
- Convenient location with easy parking

Ensure the content is unique and adds value for people searching for a dentist in ${dentist.city}, ${dentist.state}.`;
}

// Initialize OpenAI client
function initOpenAI(): OpenAI {
  if (!CONFIG.OPENAI_API_KEY) {
    console.error(chalk.red('❌ OPENAI_API_KEY not found in .env.openai'));
    console.log(chalk.yellow('Please create .env.openai with:'));
    console.log(chalk.gray('OPENAI_API_KEY=your-api-key-here'));
    process.exit(1);
  }

  return new OpenAI({
    apiKey: CONFIG.OPENAI_API_KEY,
  });
}

// Enrich single dentist
async function enrichDentist(
  openai: OpenAI,
  dentist: DiscoveredDentist
): Promise<EnrichedContent | null> {
  try {
    // Load Jina-scraped website content if available
    const websiteContent = await loadJinaContent(dentist);
    const prompt = createEnrichmentPrompt(dentist, websiteContent);
    const slug = createSlug(dentist.name, dentist.city, dentist.state_abbr);

    const response = await openai.chat.completions.create({
      model: CONFIG.MODEL,
      messages: [
        {
          role: 'system',
          content: 'You are an expert in writing SEO-optimized content for US dental practices. Always respond in perfect JSON format.'
        },
        {
          role: 'user',
          content: prompt
        }
      ],
      temperature: CONFIG.TEMPERATURE,
      max_tokens: CONFIG.MAX_TOKENS,
      response_format: { type: 'json_object' },
    });

    let enrichedData;
    try {
      const content = response.choices[0].message.content || '{}';
      enrichedData = JSON.parse(content);
    } catch (parseError) {
      console.error(chalk.yellow(`\nJSON parse error for ${dentist.name}, retrying...`));
      // Retry with emphasis on valid JSON
      const retryResponse = await openai.chat.completions.create({
        model: CONFIG.MODEL,
        messages: [
          {
            role: 'system',
            content: 'You are an expert in writing SEO-optimized content for US dental practices. Always respond in perfect JSON format. Do not use any newlines within string values.'
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        temperature: CONFIG.TEMPERATURE,
        max_tokens: CONFIG.MAX_TOKENS,
        response_format: { type: 'json_object' },
      });

      enrichedData = JSON.parse(retryResponse.choices[0].message.content || '{}');
    }

    // Count words in content
    const wordCount = enrichedData.content ? enrichedData.content.split(/\s+/).length : 0;

    return {
      slug,
      google_cid: dentist.google_cid,
      name: dentist.name,
      city: dentist.city,
      state: dentist.state,
      state_abbr: dentist.state_abbr,
      ...enrichedData,
      enrichedAt: new Date().toISOString(),
      wordCount,
      model: CONFIG.MODEL,
    };

  } catch (error: any) {
    console.error(chalk.red(`\nFailed to enrich ${dentist.name}:`), error.message);
    return null;
  }
}

// Load progress
async function loadProgress(): Promise<void> {
  try {
    const data = await fs.readFile(CONFIG.PROGRESS_FILE, 'utf-8');
    progress = JSON.parse(data);
  } catch {
    // Fresh start
  }
}

// Save progress
async function saveProgress(): Promise<void> {
  progress.lastRunAt = new Date().toISOString();
  await fs.writeFile(CONFIG.PROGRESS_FILE, JSON.stringify(progress, null, 2));
}

// Parse CLI arguments
function parseArgs(): { batch?: number; state?: string; dryRun?: boolean } {
  const args: { batch?: number; state?: string; dryRun?: boolean } = {};

  for (let i = 2; i < process.argv.length; i++) {
    if (process.argv[i] === '--batch' && process.argv[i + 1]) {
      args.batch = parseInt(process.argv[i + 1], 10);
      i++;
    } else if (process.argv[i] === '--state' && process.argv[i + 1]) {
      args.state = process.argv[i + 1];
      i++;
    } else if (process.argv[i] === '--dry-run') {
      args.dryRun = true;
    }
  }

  return args;
}

// Main enrichment function
async function main() {
  console.log(chalk.bold.blue('\n🦷 GPT-5 nano Dentist Enrichment Pipeline\n'));

  const args = parseArgs();

  // Initialize OpenAI
  const openai = initOpenAI();

  // Ensure output directory
  await fs.mkdir(CONFIG.OUTPUT_DIR, { recursive: true });

  // Load progress
  await loadProgress();

  // Load discovered dentists
  console.log(chalk.cyan('Loading discovered dentists...'));
  const discoveredData = JSON.parse(await fs.readFile(CONFIG.DISCOVERY_FILE, 'utf-8'));
  const dentists: DiscoveredDentist[] = Array.isArray(discoveredData) ? discoveredData : discoveredData.dentists || [];

  console.log(chalk.cyan(`Found ${dentists.length} dentists in discovery file`));

  // Filter by state if specified
  let toProcess = dentists.filter(d => !progress.completedCids.includes(d.google_cid));

  if (args.state) {
    toProcess = toProcess.filter(d =>
      d.state.toLowerCase() === args.state!.toLowerCase() ||
      d.state_abbr.toLowerCase() === args.state!.toLowerCase()
    );
    console.log(chalk.cyan(`Filtered to ${toProcess.length} dentists in ${args.state}`));
  }

  // Apply batch limit
  if (args.batch && args.batch > 0) {
    toProcess = toProcess.slice(0, args.batch);
    console.log(chalk.cyan(`Limited to batch of ${args.batch} dentists`));
  }

  if (toProcess.length === 0) {
    console.log(chalk.green('✅ All dentists already enriched!'));
    return;
  }

  // Dry run mode
  if (args.dryRun) {
    console.log(chalk.yellow('\n🔍 DRY RUN MODE - No API calls will be made\n'));
    console.log(chalk.white(`Would process ${toProcess.length} dentists:`));
    toProcess.slice(0, 10).forEach(d => {
      console.log(chalk.gray(`  - ${d.name} (${d.city}, ${d.state_abbr})`));
    });
    if (toProcess.length > 10) {
      console.log(chalk.gray(`  ... and ${toProcess.length - 10} more`));
    }

    // Cost estimation
    const estimatedInputTokens = toProcess.length * 800; // ~800 tokens per prompt
    const estimatedOutputTokens = toProcess.length * 600; // ~600 tokens per response
    const inputCost = (estimatedInputTokens / 1_000_000) * 0.05;
    const outputCost = (estimatedOutputTokens / 1_000_000) * 0.40;
    const totalCost = inputCost + outputCost;

    console.log(chalk.cyan('\n💰 Estimated Cost (GPT-5 nano):'));
    console.log(chalk.gray(`  Input:  ~${estimatedInputTokens.toLocaleString()} tokens = $${inputCost.toFixed(4)}`));
    console.log(chalk.gray(`  Output: ~${estimatedOutputTokens.toLocaleString()} tokens = $${outputCost.toFixed(4)}`));
    console.log(chalk.green(`  Total:  ~$${totalCost.toFixed(4)}`));

    return;
  }

  console.log(chalk.yellow(`\nProcessing ${toProcess.length} dentists with GPT-5 nano...\n`));

  // Progress bar
  const progressBar = new cliProgress.SingleBar({
    format: 'Enriching |{bar}| {percentage}% | {value}/{total} | {name}',
    barCompleteChar: '\u2588',
    barIncompleteChar: '\u2591',
  });

  progressBar.start(toProcess.length, 0, { name: 'Starting...' });

  // Process with concurrency limit
  const limit = pLimit(CONFIG.CONCURRENCY);
  let processed = 0;

  const tasks = toProcess.map(dentist =>
    limit(async () => {
      try {
        // Enrich with GPT
        const enriched = await enrichDentist(openai, dentist);

        if (enriched) {
          // Save enriched content
          const outputPath = path.join(CONFIG.OUTPUT_DIR, `${enriched.slug}.json`);
          await fs.writeFile(outputPath, JSON.stringify(enriched, null, 2));

          progress.completed++;
          progress.completedCids.push(dentist.google_cid);

          // Quality check
          if (enriched.wordCount < 300) {
            console.log(chalk.yellow(`\n⚠️  Short content for ${dentist.name}: ${enriched.wordCount} words`));
          }
        } else {
          progress.failed++;
          progress.failedCids.push(dentist.google_cid);
        }

        processed++;
        progressBar.update(processed, { name: dentist.name.substring(0, 30) });

        // Save progress periodically
        if (processed % 20 === 0) {
          await saveProgress();
        }

      } catch (error: any) {
        console.error(chalk.red(`\nError processing ${dentist.name}:`), error.message);
        progress.failed++;
        progress.failedCids.push(dentist.google_cid);
      }
    })
  );

  await Promise.all(tasks);

  progressBar.stop();

  // Final save
  progress.total = dentists.length;
  await saveProgress();

  // Summary
  console.log(chalk.bold.green('\n✅ Enrichment Complete!\n'));
  console.log(chalk.white(`Model: ${CONFIG.MODEL}`));
  console.log(chalk.white(`Total processed: ${progress.completed}`));
  console.log(chalk.red(`Failed: ${progress.failed}`));
  console.log(chalk.cyan(`Output directory: ${CONFIG.OUTPUT_DIR}`));

  // Show example
  if (progress.completedCids.length > 0) {
    const files = await fs.readdir(CONFIG.OUTPUT_DIR);
    const jsonFiles = files.filter(f => f.endsWith('.json') && f !== 'progress.json');

    if (jsonFiles.length > 0) {
      console.log(chalk.yellow('\n📝 Example enriched content:'));
      const examplePath = path.join(CONFIG.OUTPUT_DIR, jsonFiles[jsonFiles.length - 1]);
      const example = JSON.parse(await fs.readFile(examplePath, 'utf-8'));

      console.log(chalk.gray('\nSEO Title:'), example.seoTitle);
      console.log(chalk.gray('SEO Description:'), example.seoDescription);
      console.log(chalk.gray('Word count:'), example.wordCount);
      console.log(chalk.gray('\nHighlights:'));
      example.highlights?.forEach((h: string) => console.log(chalk.gray(`  - ${h}`)));
    }
  }
}

// Run if called directly
main().catch(console.error);

export { enrichDentist, createEnrichmentPrompt };
