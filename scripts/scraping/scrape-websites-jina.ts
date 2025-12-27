#!/usr/bin/env npx tsx
/**
 * Jina.ai Website Scraper for US Dentists
 *
 * Scrapes dentist websites to get additional content for GPT enrichment.
 * Uses Jina Reader API to convert websites to clean markdown.
 *
 * Pipeline:
 * 1. Bright Data SERP → Base dentist data (location, ratings, photos)
 * 2. Jina.ai → Scrape website content (about, services, team info)
 * 3. OpenAI GPT-5 nano → Generate unique "About Us" sections
 *
 * Usage:
 *   npx tsx scripts/scraping/scrape-websites-jina.ts
 *   npx tsx scripts/scraping/scrape-websites-jina.ts --batch 100
 *   npx tsx scripts/scraping/scrape-websites-jina.ts --state California
 *   npx tsx scripts/scraping/scrape-websites-jina.ts --dry-run
 */

import fs from 'fs/promises';
import path from 'path';
import chalk from 'chalk';
import cliProgress from 'cli-progress';
import pLimit from 'p-limit';
import { config } from 'dotenv';

// Load environment variables
config({ path: path.join(__dirname, '..', '..', '.env.local') });

// Configuration
const CONFIG = {
  JINA_API_KEY: process.env.JINA_API_KEY || '',
  JINA_READER_URL: 'https://r.jina.ai/',
  CONCURRENCY: 5, // Jina rate limits - keep it moderate
  DELAY_BETWEEN_REQUESTS: 500, // ms
  TIMEOUT: 30000, // 30 seconds
  DISCOVERY_FILE: path.join(__dirname, '..', '..', 'data', 'discovery', 'discovered-dentists.json'),
  OUTPUT_DIR: path.join(__dirname, '..', '..', 'data', 'scraped-websites'),
  PROGRESS_FILE: path.join(__dirname, '..', '..', 'data', 'scraped-websites', 'progress.json'),
};

// Types
interface DiscoveredDentist {
  google_cid: string;
  name: string;
  website?: string;
  city: string;
  state: string;
  state_abbr: string;
}

interface ScrapedWebsite {
  google_cid: string;
  name: string;
  city: string;
  state: string;
  state_abbr: string;
  website: string;
  content: string;
  contentLength: number;
  scrapedAt: string;
  success: boolean;
  error?: string;
}

// Progress tracking
let progress = {
  total: 0,
  completed: 0,
  failed: 0,
  skipped: 0, // No website
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

// Delay helper
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Fetch website content with Jina
async function fetchWithJina(url: string): Promise<string> {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), CONFIG.TIMEOUT);

  try {
    const response = await fetch(`${CONFIG.JINA_READER_URL}${url}`, {
      headers: {
        'Authorization': `Bearer ${CONFIG.JINA_API_KEY}`,
        'Accept': 'text/plain',
        'X-Return-Format': 'markdown',
      },
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      throw new Error(`Jina fetch failed: ${response.status} ${response.statusText}`);
    }

    return response.text();
  } catch (error: any) {
    clearTimeout(timeoutId);
    if (error.name === 'AbortError') {
      throw new Error('Request timeout');
    }
    throw error;
  }
}

// Scrape single dentist website
async function scrapeDentistWebsite(dentist: DiscoveredDentist): Promise<ScrapedWebsite | null> {
  if (!dentist.website) {
    return null;
  }

  try {
    // Clean up URL
    let url = dentist.website;
    if (!url.startsWith('http')) {
      url = `https://${url}`;
    }

    const content = await fetchWithJina(url);

    return {
      google_cid: dentist.google_cid,
      name: dentist.name,
      city: dentist.city,
      state: dentist.state,
      state_abbr: dentist.state_abbr,
      website: url,
      content: content.substring(0, 50000), // Limit content size
      contentLength: content.length,
      scrapedAt: new Date().toISOString(),
      success: true,
    };
  } catch (error: any) {
    return {
      google_cid: dentist.google_cid,
      name: dentist.name,
      city: dentist.city,
      state: dentist.state,
      state_abbr: dentist.state_abbr,
      website: dentist.website,
      content: '',
      contentLength: 0,
      scrapedAt: new Date().toISOString(),
      success: false,
      error: error.message,
    };
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

// Main scraping function
async function main() {
  console.log(chalk.bold.blue('\n🦷 Jina.ai Website Scraper for Dentists\n'));

  const args = parseArgs();

  // Check API key
  if (!CONFIG.JINA_API_KEY) {
    console.error(chalk.red('❌ JINA_API_KEY not found in .env.local'));
    console.log(chalk.yellow('Please add to .env.local:'));
    console.log(chalk.gray('JINA_API_KEY=jina_xxxxx'));
    process.exit(1);
  }

  // Ensure output directory
  await fs.mkdir(CONFIG.OUTPUT_DIR, { recursive: true });

  // Load progress
  await loadProgress();

  // Load discovered dentists
  console.log(chalk.cyan('Loading discovered dentists...'));
  const discoveredData = JSON.parse(await fs.readFile(CONFIG.DISCOVERY_FILE, 'utf-8'));
  const dentists: DiscoveredDentist[] = Array.isArray(discoveredData) ? discoveredData : discoveredData.dentists || [];

  // Filter dentists with websites that haven't been scraped
  let toProcess = dentists.filter(d =>
    d.website &&
    !progress.completedCids.includes(d.google_cid) &&
    !progress.failedCids.includes(d.google_cid)
  );

  console.log(chalk.cyan(`Found ${dentists.length} dentists, ${toProcess.length} with websites to scrape`));

  // Filter by state if specified
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
    console.log(chalk.green('✅ All dentist websites already scraped!'));
    return;
  }

  // Dry run mode
  if (args.dryRun) {
    console.log(chalk.yellow('\n🔍 DRY RUN MODE - No API calls will be made\n'));
    console.log(chalk.white(`Would scrape ${toProcess.length} websites:`));
    toProcess.slice(0, 10).forEach(d => {
      console.log(chalk.gray(`  - ${d.name}: ${d.website}`));
    });
    if (toProcess.length > 10) {
      console.log(chalk.gray(`  ... and ${toProcess.length - 10} more`));
    }

    // Cost estimation (Jina has free tier, then pay per request)
    console.log(chalk.cyan('\n💰 Estimated Jina API calls:'), toProcess.length);
    return;
  }

  console.log(chalk.yellow(`\nScraping ${toProcess.length} dentist websites...\n`));

  // Progress bar
  const progressBar = new cliProgress.SingleBar({
    format: 'Scraping |{bar}| {percentage}% | {value}/{total} | {name}',
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
        // Add delay between requests
        await delay(CONFIG.DELAY_BETWEEN_REQUESTS);

        const scraped = await scrapeDentistWebsite(dentist);

        if (scraped) {
          const slug = createSlug(dentist.name, dentist.city, dentist.state_abbr);
          const outputPath = path.join(CONFIG.OUTPUT_DIR, `${slug}.json`);
          await fs.writeFile(outputPath, JSON.stringify(scraped, null, 2));

          if (scraped.success) {
            progress.completed++;
            progress.completedCids.push(dentist.google_cid);
          } else {
            progress.failed++;
            progress.failedCids.push(dentist.google_cid);
          }
        }

        processed++;
        progressBar.update(processed, { name: dentist.name.substring(0, 30) });

        // Save progress periodically
        if (processed % 20 === 0) {
          await saveProgress();
        }

      } catch (error: any) {
        console.error(chalk.red(`\nError scraping ${dentist.name}:`), error.message);
        progress.failed++;
        progress.failedCids.push(dentist.google_cid);
      }
    })
  );

  await Promise.all(tasks);

  progressBar.stop();

  // Final save
  progress.total = dentists.filter(d => d.website).length;
  await saveProgress();

  // Summary
  console.log(chalk.bold.green('\n✅ Scraping Complete!\n'));
  console.log(chalk.white(`Successfully scraped: ${progress.completed}`));
  console.log(chalk.red(`Failed: ${progress.failed}`));
  console.log(chalk.gray(`Skipped (no website): ${dentists.length - dentists.filter(d => d.website).length}`));
  console.log(chalk.cyan(`Output directory: ${CONFIG.OUTPUT_DIR}`));
}

// Run if called directly
main().catch(console.error);
