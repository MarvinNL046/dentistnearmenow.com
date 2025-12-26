import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';

// Use simplified schema to avoid circular reference issues
import * as schema from '../../drizzle/schema-simple';

const sql = neon(process.env.DATABASE_URL!);
export const db = drizzle(sql, { schema });

// Re-export schema for convenience
export * from '../../drizzle/schema-simple';
