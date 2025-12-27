#!/usr/bin/env npx tsx
/**
 * Location Generator for Multi-Country Dentist Discovery
 *
 * Generates locations.json files for each country with:
 * - Major cities (high priority)
 * - Regional capitals
 * - Population-based cities
 *
 * Usage:
 *   npx tsx scripts/discovery/generate-locations.ts --country US    # Generate US locations
 *   npx tsx scripts/discovery/generate-locations.ts --country CA    # Generate Canada locations
 *   npx tsx scripts/discovery/generate-locations.ts --country GB    # Generate UK locations
 *   npx tsx scripts/discovery/generate-locations.ts --country AU    # Generate Australia locations
 *   npx tsx scripts/discovery/generate-locations.ts --all           # Generate all countries
 */

import fs from 'fs';
import path from 'path';
import {
  getCountryConfig,
  getAllCountryConfigs,
  MAJOR_CITIES,
  CountryConfig,
} from './country-config';

// ============================================================================
// Types
// ============================================================================

interface DiscoveryLocation {
  id: string;
  city: string;
  county?: string;
  state?: string;
  state_abbr: string;
  region_type: string;      // "state", "province", "county"
  country: string;
  country_code: string;
  population?: number;
  priority: number;         // 1-10, higher = more important
  status: 'pending' | 'in_progress' | 'completed' | 'failed';
  results_count: number;
  last_searched_at: string | null;
  search_query: string | null;
  created_at: string;
}

// ============================================================================
// City Data by Country
// ============================================================================

// Extended city lists with populations (approximate 2024)
const CITY_DATA: Record<string, Array<{ city: string; region: string; population: number }>> = {
  // Canada - Top 100 cities by population
  CA: [
    { city: 'Toronto', region: 'ON', population: 2930000 },
    { city: 'Montreal', region: 'QC', population: 1760000 },
    { city: 'Vancouver', region: 'BC', population: 675000 },
    { city: 'Calgary', region: 'AB', population: 1340000 },
    { city: 'Edmonton', region: 'AB', population: 1010000 },
    { city: 'Ottawa', region: 'ON', population: 1010000 },
    { city: 'Mississauga', region: 'ON', population: 720000 },
    { city: 'Winnipeg', region: 'MB', population: 750000 },
    { city: 'Quebec City', region: 'QC', population: 550000 },
    { city: 'Hamilton', region: 'ON', population: 570000 },
    { city: 'Brampton', region: 'ON', population: 650000 },
    { city: 'Surrey', region: 'BC', population: 570000 },
    { city: 'Laval', region: 'QC', population: 440000 },
    { city: 'Halifax', region: 'NS', population: 440000 },
    { city: 'London', region: 'ON', population: 420000 },
    { city: 'Markham', region: 'ON', population: 340000 },
    { city: 'Vaughan', region: 'ON', population: 320000 },
    { city: 'Gatineau', region: 'QC', population: 290000 },
    { city: 'Longueuil', region: 'QC', population: 250000 },
    { city: 'Burnaby', region: 'BC', population: 250000 },
    { city: 'Saskatoon', region: 'SK', population: 270000 },
    { city: 'Kitchener', region: 'ON', population: 260000 },
    { city: 'Windsor', region: 'ON', population: 230000 },
    { city: 'Regina', region: 'SK', population: 230000 },
    { city: 'Richmond', region: 'BC', population: 210000 },
    { city: 'Richmond Hill', region: 'ON', population: 200000 },
    { city: 'Oakville', region: 'ON', population: 210000 },
    { city: 'Burlington', region: 'ON', population: 190000 },
    { city: 'Barrie', region: 'ON', population: 155000 },
    { city: 'Oshawa', region: 'ON', population: 175000 },
    { city: 'Victoria', region: 'BC', population: 95000 },
    { city: 'St. Catharines', region: 'ON', population: 135000 },
    { city: 'Kelowna', region: 'BC', population: 145000 },
    { city: 'Cambridge', region: 'ON', population: 140000 },
    { city: 'Guelph', region: 'ON', population: 145000 },
    { city: 'Kingston', region: 'ON', population: 130000 },
    { city: 'Abbotsford', region: 'BC', population: 160000 },
    { city: 'Coquitlam', region: 'BC', population: 150000 },
    { city: 'Whitby', region: 'ON', population: 140000 },
    { city: 'Ajax', region: 'ON', population: 125000 },
    { city: 'St. John\'s', region: 'NL', population: 110000 },
    { city: 'Moncton', region: 'NB', population: 80000 },
    { city: 'Fredericton', region: 'NB', population: 65000 },
    { city: 'Charlottetown', region: 'PE', population: 40000 },
    { city: 'Yellowknife', region: 'NT', population: 22000 },
    { city: 'Whitehorse', region: 'YT', population: 30000 },
    { city: 'Iqaluit', region: 'NU', population: 8000 },
  ],

  // UK - Top 100 cities by population
  GB: [
    { city: 'London', region: 'LDN', population: 8980000 },
    { city: 'Birmingham', region: 'WMD', population: 1150000 },
    { city: 'Manchester', region: 'MAN', population: 550000 },
    { city: 'Leeds', region: 'WYK', population: 790000 },
    { city: 'Glasgow', region: 'SCT', population: 635000 },
    { city: 'Liverpool', region: 'MSY', population: 495000 },
    { city: 'Newcastle upon Tyne', region: 'TWR', population: 300000 },
    { city: 'Sheffield', region: 'SYK', population: 585000 },
    { city: 'Bristol', region: 'BST', population: 465000 },
    { city: 'Edinburgh', region: 'SCT', population: 525000 },
    { city: 'Leicester', region: 'LEC', population: 355000 },
    { city: 'Coventry', region: 'WMD', population: 370000 },
    { city: 'Bradford', region: 'WYK', population: 540000 },
    { city: 'Cardiff', region: 'WLS', population: 365000 },
    { city: 'Belfast', region: 'NIR', population: 345000 },
    { city: 'Nottingham', region: 'NOT', population: 330000 },
    { city: 'Kingston upon Hull', region: 'HUL', population: 260000 },
    { city: 'Southampton', region: 'HAM', population: 255000 },
    { city: 'Derby', region: 'DBY', population: 255000 },
    { city: 'Plymouth', region: 'DEV', population: 265000 },
    { city: 'Stoke-on-Trent', region: 'STS', population: 255000 },
    { city: 'Wolverhampton', region: 'WMD', population: 265000 },
    { city: 'Sunderland', region: 'TWR', population: 175000 },
    { city: 'Aberdeen', region: 'SCT', population: 230000 },
    { city: 'Swansea', region: 'WLS', population: 245000 },
    { city: 'Reading', region: 'BRK', population: 175000 },
    { city: 'Milton Keynes', region: 'BKM', population: 250000 },
    { city: 'Northampton', region: 'NTH', population: 215000 },
    { city: 'Luton', region: 'BDF', population: 215000 },
    { city: 'Norwich', region: 'NFK', population: 145000 },
    { city: 'Bournemouth', region: 'DOR', population: 185000 },
    { city: 'Portsmouth', region: 'HAM', population: 210000 },
    { city: 'Brighton', region: 'SXE', population: 230000 },
    { city: 'Peterborough', region: 'CAM', population: 205000 },
    { city: 'Middlesbrough', region: 'CLE', population: 140000 },
    { city: 'York', region: 'NYK', population: 210000 },
    { city: 'Oxford', region: 'OXF', population: 155000 },
    { city: 'Cambridge', region: 'CAM', population: 125000 },
    { city: 'Bath', region: 'BST', population: 90000 },
    { city: 'Exeter', region: 'DEV', population: 130000 },
  ],

  // Australia - Top 50 cities by population
  AU: [
    { city: 'Sydney', region: 'NSW', population: 5310000 },
    { city: 'Melbourne', region: 'VIC', population: 5080000 },
    { city: 'Brisbane', region: 'QLD', population: 2510000 },
    { city: 'Perth', region: 'WA', population: 2120000 },
    { city: 'Adelaide', region: 'SA', population: 1380000 },
    { city: 'Gold Coast', region: 'QLD', population: 680000 },
    { city: 'Newcastle', region: 'NSW', population: 480000 },
    { city: 'Canberra', region: 'ACT', population: 460000 },
    { city: 'Wollongong', region: 'NSW', population: 310000 },
    { city: 'Hobart', region: 'TAS', population: 240000 },
    { city: 'Geelong', region: 'VIC', population: 270000 },
    { city: 'Townsville', region: 'QLD', population: 180000 },
    { city: 'Cairns', region: 'QLD', population: 160000 },
    { city: 'Darwin', region: 'NT', population: 150000 },
    { city: 'Toowoomba', region: 'QLD', population: 140000 },
    { city: 'Ballarat', region: 'VIC', population: 110000 },
    { city: 'Bendigo', region: 'VIC', population: 100000 },
    { city: 'Launceston', region: 'TAS', population: 90000 },
    { city: 'Mackay', region: 'QLD', population: 80000 },
    { city: 'Rockhampton', region: 'QLD', population: 80000 },
    { city: 'Bunbury', region: 'WA', population: 75000 },
    { city: 'Bundaberg', region: 'QLD', population: 70000 },
    { city: 'Hervey Bay', region: 'QLD', population: 55000 },
    { city: 'Wagga Wagga', region: 'NSW', population: 65000 },
    { city: 'Albury', region: 'NSW', population: 55000 },
    { city: 'Mildura', region: 'VIC', population: 35000 },
    { city: 'Shepparton', region: 'VIC', population: 50000 },
    { city: 'Tamworth', region: 'NSW', population: 45000 },
    { city: 'Orange', region: 'NSW', population: 40000 },
    { city: 'Dubbo', region: 'NSW', population: 40000 },
    { city: 'Geraldton', region: 'WA', population: 40000 },
    { city: 'Kalgoorlie', region: 'WA', population: 30000 },
    { city: 'Alice Springs', region: 'NT', population: 25000 },
    { city: 'Port Macquarie', region: 'NSW', population: 50000 },
    { city: 'Sunshine Coast', region: 'QLD', population: 350000 },
  ],
};

// ============================================================================
// Location Generation
// ============================================================================

function generateLocations(countryConfig: CountryConfig): DiscoveryLocation[] {
  const locations: DiscoveryLocation[] = [];
  const now = new Date().toISOString();
  const countryCode = countryConfig.code;

  const cityData = CITY_DATA[countryCode] || [];
  const majorCities = new Set(MAJOR_CITIES[countryCode]?.map(c => c.toLowerCase()) || []);

  for (const { city, region, population } of cityData) {
    // Determine priority based on population and major city status
    let priority = 5;
    if (majorCities.has(city.toLowerCase())) {
      priority = 10;
    } else if (population > 500000) {
      priority = 9;
    } else if (population > 200000) {
      priority = 8;
    } else if (population > 100000) {
      priority = 7;
    } else if (population > 50000) {
      priority = 6;
    }

    // Get full region name
    const regionInfo = countryConfig.regions.find(r => r.abbr === region);
    const regionName = regionInfo?.name || region;

    const location: DiscoveryLocation = {
      id: `${countryCode.toLowerCase()}-${city.toLowerCase().replace(/[^a-z0-9]+/g, '-')}-${region.toLowerCase()}`,
      city,
      state: regionName,
      state_abbr: region,
      region_type: countryConfig.regionType,
      country: countryConfig.name,
      country_code: countryCode,
      population,
      priority,
      status: 'pending',
      results_count: 0,
      last_searched_at: null,
      search_query: null,
      created_at: now,
    };

    locations.push(location);
  }

  // Sort by priority (high to low), then by population
  locations.sort((a, b) => {
    if (b.priority !== a.priority) return b.priority - a.priority;
    return (b.population || 0) - (a.population || 0);
  });

  return locations;
}

function saveLocations(countryCode: string, locations: DiscoveryLocation[]): void {
  const dataDir = path.join(process.cwd(), 'data', 'discovery', countryCode.toLowerCase());

  // Create directory if it doesn't exist
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }

  const filePath = path.join(dataDir, 'locations.json');
  const countryConfig = getCountryConfig(countryCode);

  const data = {
    country: countryConfig?.name,
    country_code: countryCode,
    region_type: countryConfig?.regionType,
    total_locations: locations.length,
    search_queries: countryConfig?.searchQueries,
    locations,
    generated_at: new Date().toISOString(),
  };

  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
  console.log(`✅ Saved ${locations.length} locations to ${filePath}`);
}

// ============================================================================
// Main
// ============================================================================

function main() {
  const args = process.argv.slice(2);
  let countryCode: string | null = null;
  let generateAll = false;

  for (let i = 0; i < args.length; i++) {
    if (args[i] === '--country' && args[i + 1]) {
      countryCode = args[i + 1].toUpperCase();
      i++;
    } else if (args[i] === '--all') {
      generateAll = true;
    }
  }

  console.log('🌍 Location Generator for Dentist Discovery\n');
  console.log('━'.repeat(50));

  if (generateAll) {
    // Generate for all countries
    const configs = getAllCountryConfigs();
    for (const config of configs) {
      console.log(`\n📍 Generating locations for ${config.name}...`);
      const locations = generateLocations(config);
      saveLocations(config.code, locations);
    }
  } else if (countryCode) {
    // Generate for specific country
    const config = getCountryConfig(countryCode);
    if (!config) {
      console.error(`❌ Unknown country code: ${countryCode}`);
      console.error('   Supported: US, CA, GB, AU');
      process.exit(1);
    }

    console.log(`📍 Generating locations for ${config.name}...`);
    const locations = generateLocations(config);
    saveLocations(config.code, locations);
  } else {
    console.log('Usage:');
    console.log('  npx tsx scripts/discovery/generate-locations.ts --country US');
    console.log('  npx tsx scripts/discovery/generate-locations.ts --country CA');
    console.log('  npx tsx scripts/discovery/generate-locations.ts --country GB');
    console.log('  npx tsx scripts/discovery/generate-locations.ts --country AU');
    console.log('  npx tsx scripts/discovery/generate-locations.ts --all');
    process.exit(0);
  }

  console.log('\n✅ Done!');
}

main();
