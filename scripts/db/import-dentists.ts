/**
 * Import script to load dentists from JSON into Neon database
 *
 * This script reads discovered-dentists.json and imports all dentists
 * Run with: npx tsx scripts/db/import-dentists.ts
 */

import { neon } from '@neondatabase/serverless';
import * as dotenv from 'dotenv';
import { promises as fs } from 'fs';
import path from 'path';

dotenv.config({ path: '.env.local' });

const sql = neon(process.env.DATABASE_URL!);

// Create slug from name, city, and state abbreviation
function createSlug(name: string, city: string, stateAbbr?: string): string {
  const base = stateAbbr ? `${name}-${city}-${stateAbbr}` : `${name}-${city}`;

  return base
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

interface RawDentist {
  google_cid?: string;
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
  country?: string;
  zip_code?: string;
  rating?: number;
  review_count?: number;
  business_type?: string;
  categories?: string[];
  services?: string[];
  opening_hours?: string;
  photo_url?: string;
  photos?: string[];
  discovered_at?: string;
}

async function importDentists() {
  console.log('Starting dentist import...\n');

  // Read JSON file
  const jsonPath = path.join(process.cwd(), 'data', 'discovery', 'discovered-dentists.json');
  console.log(`Reading from: ${jsonPath}`);

  const content = await fs.readFile(jsonPath, 'utf-8');
  const rawDentists: RawDentist[] = JSON.parse(content);

  console.log(`Found ${rawDentists.length} dentists to import\n`);

  // Track slugs to handle duplicates
  const slugCounts = new Map<string, number>();

  // Process in batches for better performance
  const BATCH_SIZE = 100;
  let imported = 0;
  let skipped = 0;
  let errors = 0;

  for (let i = 0; i < rawDentists.length; i += BATCH_SIZE) {
    const batch = rawDentists.slice(i, i + BATCH_SIZE);

    for (const raw of batch) {
      try {
        // Generate unique slug
        let baseSlug = createSlug(raw.name, raw.city, raw.state_abbr);
        let slug = baseSlug;

        // Handle duplicate slugs by adding counter
        const count = slugCounts.get(baseSlug) || 0;
        if (count > 0) {
          slug = `${baseSlug}-${count + 1}`;
        }
        slugCounts.set(baseSlug, count + 1);

        // Check for emergency services
        const hasEmergency = Boolean(
          raw.services?.some(s => s.toLowerCase().includes('emergency')) ||
          raw.categories?.some(c => c.toLowerCase().includes('emergency')) ||
          raw.business_type?.toLowerCase().includes('emergency')
        );

        // Insert into database
        await sql`
          INSERT INTO dentists (
            google_cid,
            google_place_id,
            slug,
            name,
            business_type,
            address,
            city,
            county,
            state,
            state_abbr,
            zip_code,
            country,
            latitude,
            longitude,
            phone,
            website,
            rating,
            review_count,
            opening_hours,
            photo_url,
            specialties,
            services,
            emergency_services,
            discovered_at,
            is_active
          ) VALUES (
            ${raw.google_cid || null},
            ${raw.google_place_id || null},
            ${slug},
            ${raw.name},
            ${raw.business_type || 'dentist'},
            ${raw.address || null},
            ${raw.city},
            ${raw.county || null},
            ${raw.state},
            ${raw.state_abbr},
            ${raw.zip_code || null},
            ${raw.country || 'USA'},
            ${raw.latitude || null},
            ${raw.longitude || null},
            ${raw.phone || null},
            ${raw.website || null},
            ${raw.rating || null},
            ${raw.review_count || null},
            ${raw.opening_hours || null},
            ${raw.photo_url || null},
            ${raw.categories ? JSON.stringify(raw.categories) : null},
            ${raw.services ? JSON.stringify(raw.services) : null},
            ${hasEmergency},
            ${raw.discovered_at ? new Date(raw.discovered_at) : null},
            true
          )
          ON CONFLICT (google_cid) DO UPDATE SET
            name = EXCLUDED.name,
            business_type = EXCLUDED.business_type,
            address = EXCLUDED.address,
            city = EXCLUDED.city,
            county = EXCLUDED.county,
            state = EXCLUDED.state,
            state_abbr = EXCLUDED.state_abbr,
            zip_code = EXCLUDED.zip_code,
            latitude = EXCLUDED.latitude,
            longitude = EXCLUDED.longitude,
            phone = EXCLUDED.phone,
            website = EXCLUDED.website,
            rating = EXCLUDED.rating,
            review_count = EXCLUDED.review_count,
            opening_hours = EXCLUDED.opening_hours,
            photo_url = EXCLUDED.photo_url,
            specialties = EXCLUDED.specialties,
            services = EXCLUDED.services,
            emergency_services = EXCLUDED.emergency_services,
            last_updated = NOW()
        `;

        imported++;
      } catch (error) {
        // Handle unique constraint violations on slug
        if (String(error).includes('duplicate key') && String(error).includes('slug')) {
          skipped++;
        } else {
          errors++;
          if (errors <= 5) {
            console.error(`Error importing ${raw.name}:`, error);
          }
        }
      }
    }

    // Progress update
    const progress = Math.min(i + BATCH_SIZE, rawDentists.length);
    console.log(`Progress: ${progress}/${rawDentists.length} (${Math.round((progress / rawDentists.length) * 100)}%)`);
  }

  console.log('\n====================================');
  console.log('Import completed!');
  console.log(`Imported: ${imported}`);
  console.log(`Skipped (duplicates): ${skipped}`);
  console.log(`Errors: ${errors}`);
  console.log('====================================\n');

  // Verify import
  const result = await sql`SELECT COUNT(*) as count FROM dentists`;
  console.log(`Total dentists in database: ${result[0].count}`);

  // Show sample per state
  const stateStats = await sql`
    SELECT state_abbr, COUNT(*) as count
    FROM dentists
    GROUP BY state_abbr
    ORDER BY count DESC
    LIMIT 10
  `;
  console.log('\nTop 10 states by dentist count:');
  for (const row of stateStats) {
    console.log(`  ${row.state_abbr}: ${row.count}`);
  }
}

importDentists()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error('Import failed:', error);
    process.exit(1);
  });
