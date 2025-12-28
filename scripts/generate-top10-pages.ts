#!/usr/bin/env npx tsx
/**
 * Generate Top 10 Dentist Pages
 *
 * Populates the `pages` table with indexable Top 10 pages based on:
 * - Minimum 10 dentists in the city
 * - Average review_count >= 5 in top 10
 * - At least 8 of top 10 have rating + review_count
 */

import { neon } from '@neondatabase/serverless';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

const sql = neon(process.env.DATABASE_URL!);

// Confidence factor for Bayesian scoring
const C = 20;

interface CityStats {
  city: string;
  state: string;
  dentist_count: number;
  mean_rating: number;
}

interface TopDentist {
  id: number;
  slug: string;
  name: string;
  rating: number;
  review_count: number;
  score: number;
}

function generateSlug(city: string, state: string): string {
  return `best-dentists-${city.toLowerCase().replace(/[^a-z0-9]+/g, '-')}-${state.toLowerCase()}`;
}

async function getTop10ForCity(city: string, state: string, meanRating: number): Promise<TopDentist[]> {
  const results = await sql`
    SELECT
      id,
      slug,
      name,
      rating,
      review_count,
      ((rating::numeric * review_count::numeric) + (${C}::numeric * ${meanRating}::numeric)) / (review_count::numeric + ${C}::numeric) AS score
    FROM dentists
    WHERE city = ${city}
      AND state_abbr = ${state}
      AND rating IS NOT NULL
      AND review_count IS NOT NULL
    ORDER BY score DESC, review_count DESC
    LIMIT 10
  `;

  return results as TopDentist[];
}

async function main() {
  console.log('🏆 Top 10 Dentist Pages Generator\n');
  console.log('━'.repeat(50));

  // Get all cities with their stats (lowered to >= 5 for more coverage)
  console.log('\n📊 Fetching city statistics...');
  const cityStats = await sql`
    SELECT
      city,
      state,
      dentist_count::int,
      COALESCE(mean_rating, 0)::float as mean_rating
    FROM city_dentist_stats
    WHERE dentist_count >= 5
    ORDER BY dentist_count DESC
  ` as CityStats[];

  console.log(`Found ${cityStats.length} cities with 5+ dentists\n`);

  let indexableCount = 0;
  let skippedCount = 0;

  for (const city of cityStats) {
    const slug = generateSlug(city.city, city.state);

    // Get top 10 for this city
    const top10 = await getTop10ForCity(city.city, city.state, city.mean_rating);

    // Check indexability criteria (stricter for SEO quality)
    // Must have: 10+ dentists, 8+ with data, avg reviews >= 5, mean rating >= 4.0
    const hasEnoughDentists = city.dentist_count >= 10;
    const hasEnoughData = top10.length >= 8;
    const avgReviewCount = top10.reduce((sum, d) => sum + d.review_count, 0) / top10.length;
    const meetsReviewThreshold = avgReviewCount >= 5;
    const meetsRatingThreshold = city.mean_rating >= 4.0;

    const indexable = hasEnoughDentists && hasEnoughData && meetsReviewThreshold && meetsRatingThreshold;

    // Prepare payload with top 10 IDs and scores
    const payload = {
      top10: top10.map(d => ({
        id: d.id,
        slug: d.slug,
        name: d.name,
        rating: Number(d.rating),
        review_count: d.review_count,
        score: Number(Number(d.score).toFixed(4))
      })),
      avgReviewCount: Math.round(avgReviewCount),
      generatedAt: new Date().toISOString()
    };

    // Upsert into pages table
    await sql`
      INSERT INTO pages (slug, type, city, state, indexable, dentist_count, mean_rating, payload, updated_at)
      VALUES (
        ${slug},
        'best_dentists_city',
        ${city.city},
        ${city.state},
        ${indexable},
        ${city.dentist_count},
        ${city.mean_rating},
        ${JSON.stringify(payload)},
        NOW()
      )
      ON CONFLICT (slug) DO UPDATE SET
        indexable = EXCLUDED.indexable,
        dentist_count = EXCLUDED.dentist_count,
        mean_rating = EXCLUDED.mean_rating,
        payload = EXCLUDED.payload,
        updated_at = NOW()
    `;

    if (indexable) {
      indexableCount++;
      console.log(`✅ ${city.city}, ${city.state}: ${city.dentist_count} dentists, avg ${Math.round(avgReviewCount)} reviews, ${city.mean_rating.toFixed(1)}★`);
    } else {
      skippedCount++;
      const reasons = [];
      if (!hasEnoughDentists) reasons.push(`<10 dentists`);
      if (!hasEnoughData) reasons.push(`<8 with data`);
      if (!meetsReviewThreshold) reasons.push(`low reviews`);
      if (!meetsRatingThreshold) reasons.push(`rating <4.0`);
      console.log(`⏭️  ${city.city}, ${city.state}: noindex (${reasons.join(', ')})`);
    }
  }

  console.log('\n' + '━'.repeat(50));
  console.log(`\n📊 Summary:`);
  console.log(`   Indexable pages: ${indexableCount}`);
  console.log(`   Skipped (noindex): ${skippedCount}`);
  console.log(`   Total processed: ${cityStats.length}`);

  // Show top indexable cities
  console.log('\n🏆 Top 10 Indexable Cities:');
  const topPages = await sql`
    SELECT slug, city, state, dentist_count
    FROM pages
    WHERE indexable = TRUE
    ORDER BY dentist_count DESC
    LIMIT 10
  `;

  topPages.forEach((p: any, i: number) => {
    console.log(`   ${i + 1}. ${p.city}, ${p.state} (${p.dentist_count} dentists) → /${p.slug}`);
  });

  console.log('\n✅ Done!');
}

main().catch(console.error);
