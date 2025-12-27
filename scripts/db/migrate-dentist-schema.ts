/**
 * Migration script to create dentist tables in Neon database
 *
 * This script creates all necessary tables for dentistnearmenow.com
 * Run with: npx tsx scripts/db/migrate-dentist-schema.ts
 */

import { neon } from '@neondatabase/serverless';
import * as dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

const sql = neon(process.env.DATABASE_URL!);

async function migrate() {
  console.log('Starting database migration for dentistnearmenow.com...\n');

  // Drop old cemetery tables (if they exist)
  console.log('Dropping old cemetery tables...');
  await sql`DROP TABLE IF EXISTS cemetery_photos CASCADE`;
  await sql`DROP TABLE IF EXISTS cemetery_reviews CASCADE`;
  await sql`DROP TABLE IF EXISTS google_reviews CASCADE`;
  await sql`DROP TABLE IF EXISTS user_favorites_by_slug CASCADE`;
  await sql`DROP TABLE IF EXISTS user_cemeteries CASCADE`;
  await sql`DROP TABLE IF EXISTS website_feedback CASCADE`;
  await sql`DROP TABLE IF EXISTS place_claims CASCADE`;
  await sql`DROP TYPE IF EXISTS claim_status CASCADE`;
  await sql`DROP TYPE IF EXISTS claim_verification_method CASCADE`;
  console.log('Old tables dropped.\n');

  // Create users table
  console.log('Creating users table...');
  await sql`
    CREATE TABLE IF NOT EXISTS users (
      id SERIAL PRIMARY KEY,
      email VARCHAR(255) NOT NULL UNIQUE,
      password_hash VARCHAR(255),
      name VARCHAR(255) NOT NULL,
      phone VARCHAR(50),
      role VARCHAR(50) NOT NULL DEFAULT 'user',
      email_verified BOOLEAN NOT NULL DEFAULT false,
      created_at TIMESTAMP NOT NULL DEFAULT NOW(),
      updated_at TIMESTAMP NOT NULL DEFAULT NOW()
    )
  `;
  console.log('Users table created.');

  // Create verification_codes table
  console.log('Creating verification_codes table...');
  await sql`
    CREATE TABLE IF NOT EXISTS verification_codes (
      id SERIAL PRIMARY KEY,
      email VARCHAR(255) NOT NULL,
      code VARCHAR(6) NOT NULL,
      type VARCHAR(50) NOT NULL,
      expires_at TIMESTAMP NOT NULL,
      used_at TIMESTAMP,
      created_at TIMESTAMP NOT NULL DEFAULT NOW()
    )
  `;
  console.log('Verification codes table created.');

  // Create dentists table
  console.log('Creating dentists table...');
  await sql`
    CREATE TABLE IF NOT EXISTS dentists (
      id SERIAL PRIMARY KEY,

      -- Identifiers
      google_cid VARCHAR(100) UNIQUE,
      google_place_id VARCHAR(100),
      slug VARCHAR(255) NOT NULL UNIQUE,

      -- Basic info
      name VARCHAR(255) NOT NULL,
      business_type VARCHAR(100),

      -- Location
      address VARCHAR(500),
      city VARCHAR(100),
      county VARCHAR(100),
      state VARCHAR(100),
      state_abbr VARCHAR(10),
      zip_code VARCHAR(20),
      country VARCHAR(50) DEFAULT 'USA',
      latitude DECIMAL(10, 7),
      longitude DECIMAL(10, 7),

      -- Contact
      phone VARCHAR(50),
      email VARCHAR(255),
      website VARCHAR(500),

      -- Google data
      rating DECIMAL(2, 1),
      review_count INTEGER,

      -- Business details
      opening_hours TEXT,
      photo_url VARCHAR(1000),
      photos TEXT,

      -- Dentist-specific fields
      specialties TEXT,
      services TEXT,
      insurance_accepted TEXT,
      languages TEXT,

      -- Accessibility
      wheelchair_accessible BOOLEAN,
      parking_available BOOLEAN,

      -- Practice info
      year_established VARCHAR(10),
      accepting_new_patients BOOLEAN DEFAULT true,
      emergency_services BOOLEAN DEFAULT false,

      -- SEO/Content
      description TEXT,
      meta_description VARCHAR(320),

      -- Status
      is_verified BOOLEAN DEFAULT false,
      is_active BOOLEAN DEFAULT true,

      -- Discovery metadata
      discovered_at TIMESTAMP,
      last_updated TIMESTAMP,

      -- Timestamps
      created_at TIMESTAMP NOT NULL DEFAULT NOW(),
      updated_at TIMESTAMP NOT NULL DEFAULT NOW()
    )
  `;
  console.log('Dentists table created.');

  // Create indexes for dentists
  console.log('Creating indexes for dentists...');
  await sql`CREATE INDEX IF NOT EXISTS idx_dentists_state ON dentists(state)`;
  await sql`CREATE INDEX IF NOT EXISTS idx_dentists_state_abbr ON dentists(state_abbr)`;
  await sql`CREATE INDEX IF NOT EXISTS idx_dentists_city ON dentists(city)`;
  await sql`CREATE INDEX IF NOT EXISTS idx_dentists_county ON dentists(county)`;
  await sql`CREATE INDEX IF NOT EXISTS idx_dentists_zip_code ON dentists(zip_code)`;
  await sql`CREATE INDEX IF NOT EXISTS idx_dentists_rating ON dentists(rating)`;
  await sql`CREATE INDEX IF NOT EXISTS idx_dentists_business_type ON dentists(business_type)`;
  console.log('Indexes created.');

  // Create business_claims table
  console.log('Creating business_claims table...');
  await sql`
    CREATE TABLE IF NOT EXISTS business_claims (
      id SERIAL PRIMARY KEY,
      user_id INTEGER NOT NULL REFERENCES users(id),
      dentist_id INTEGER REFERENCES dentists(id),
      dentist_slug VARCHAR(255) NOT NULL,
      dentist_name VARCHAR(255) NOT NULL,
      status VARCHAR(50) NOT NULL DEFAULT 'pending',
      job_title VARCHAR(255),
      company_name VARCHAR(255),
      message TEXT,
      verification_method VARCHAR(50),
      npi_number VARCHAR(20),
      reviewed_at TIMESTAMP,
      reviewed_by INTEGER,
      rejection_reason TEXT,
      created_at TIMESTAMP NOT NULL DEFAULT NOW(),
      updated_at TIMESTAMP NOT NULL DEFAULT NOW()
    )
  `;
  console.log('Business claims table created.');

  // Create business_edits table
  console.log('Creating business_edits table...');
  await sql`
    CREATE TABLE IF NOT EXISTS business_edits (
      id SERIAL PRIMARY KEY,
      claim_id INTEGER NOT NULL REFERENCES business_claims(id),
      user_id INTEGER NOT NULL REFERENCES users(id),
      dentist_slug VARCHAR(255) NOT NULL,
      field_name VARCHAR(100) NOT NULL,
      old_value TEXT,
      new_value TEXT,
      status VARCHAR(50) NOT NULL DEFAULT 'pending',
      created_at TIMESTAMP NOT NULL DEFAULT NOW()
    )
  `;
  console.log('Business edits table created.');

  // Create sessions table
  console.log('Creating sessions table...');
  await sql`
    CREATE TABLE IF NOT EXISTS sessions (
      id SERIAL PRIMARY KEY,
      user_id INTEGER NOT NULL REFERENCES users(id),
      refresh_token VARCHAR(500) NOT NULL,
      expires_at TIMESTAMP NOT NULL,
      created_at TIMESTAMP NOT NULL DEFAULT NOW()
    )
  `;
  console.log('Sessions table created.');

  // Create user_dentists table (user-submitted dentists)
  console.log('Creating user_dentists table...');
  await sql`
    CREATE TABLE IF NOT EXISTS user_dentists (
      id SERIAL PRIMARY KEY,
      user_id INTEGER NOT NULL REFERENCES users(id),

      -- Basic info
      name VARCHAR(255) NOT NULL,
      slug VARCHAR(255) NOT NULL UNIQUE,
      business_type VARCHAR(100) NOT NULL DEFAULT 'dentist',

      -- Location
      address VARCHAR(255),
      zip_code VARCHAR(10),
      city VARCHAR(100) NOT NULL,
      county VARCHAR(100),
      state VARCHAR(50) NOT NULL,
      gps_coordinates VARCHAR(50),

      -- Contact
      phone VARCHAR(50),
      email VARCHAR(255),
      website VARCHAR(500),

      -- Details
      description TEXT,
      opening_hours TEXT,
      specialties TEXT,
      services TEXT,
      insurance_accepted TEXT,

      -- Photos
      photos TEXT,

      -- Status
      status VARCHAR(50) NOT NULL DEFAULT 'pending',
      rejection_reason TEXT,
      reviewed_at TIMESTAMP,
      reviewed_by INTEGER,

      -- Timestamps
      created_at TIMESTAMP NOT NULL DEFAULT NOW(),
      updated_at TIMESTAMP NOT NULL DEFAULT NOW()
    )
  `;
  console.log('User dentists table created.');

  // Create reviews table
  console.log('Creating reviews table...');
  await sql`
    CREATE TABLE IF NOT EXISTS reviews (
      id SERIAL PRIMARY KEY,
      dentist_id INTEGER REFERENCES dentists(id),
      dentist_slug VARCHAR(255) NOT NULL,
      user_id INTEGER REFERENCES users(id),

      -- Review data
      rating INTEGER NOT NULL,
      title VARCHAR(255),
      review_text TEXT,

      -- Reviewer info
      reviewer_name VARCHAR(100),
      is_verified_patient BOOLEAN DEFAULT false,

      -- Moderation
      status VARCHAR(50) NOT NULL DEFAULT 'pending',

      created_at TIMESTAMP NOT NULL DEFAULT NOW(),
      updated_at TIMESTAMP NOT NULL DEFAULT NOW()
    )
  `;
  await sql`CREATE INDEX IF NOT EXISTS idx_reviews_dentist_slug ON reviews(dentist_slug)`;
  await sql`CREATE INDEX IF NOT EXISTS idx_reviews_status ON reviews(status)`;
  console.log('Reviews table created.');

  // Create feedback table
  console.log('Creating feedback table...');
  await sql`
    CREATE TABLE IF NOT EXISTS feedback (
      id SERIAL PRIMARY KEY,
      type VARCHAR(50) NOT NULL DEFAULT 'rating',
      rating INTEGER,
      feedback TEXT,
      page_title VARCHAR(255),
      page_url VARCHAR(500),
      user_agent TEXT,
      ip_address VARCHAR(100),
      status VARCHAR(50) NOT NULL DEFAULT 'new',
      created_at TIMESTAMP NOT NULL DEFAULT NOW()
    )
  `;
  await sql`CREATE INDEX IF NOT EXISTS idx_feedback_status ON feedback(status)`;
  console.log('Feedback table created.');

  console.log('\n✅ Migration completed successfully!');
  console.log('All dentist tables have been created in the database.');
}

migrate()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error('Migration failed:', error);
    process.exit(1);
  });
