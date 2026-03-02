import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';

import * as schema from './schema';

// Avoid hard crashes during build-time metadata generation when DATABASE_URL is not set.
// Queries will fail gracefully in calling code and can fall back to JSON/static data.
const sql = neon(process.env.DATABASE_URL || 'postgresql://invalid:invalid@localhost:5432/invalid');
export const db = drizzle(sql, { schema });

// Re-export schema for convenience
export * from './schema';
