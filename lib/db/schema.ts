import { pgTable, serial, varchar, text, timestamp, boolean, integer, decimal } from 'drizzle-orm/pg-core';

// Users table
export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  email: varchar('email', { length: 255 }).notNull().unique(),
  passwordHash: varchar('password_hash', { length: 255 }),
  name: varchar('name', { length: 255 }).notNull(),
  phone: varchar('phone', { length: 50 }),
  role: varchar('role', { length: 50 }).notNull().default('user'), // user, admin, dentist
  emailVerified: boolean('email_verified').notNull().default(false),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
});

// Verification codes table
export const verificationCodes = pgTable('verification_codes', {
  id: serial('id').primaryKey(),
  email: varchar('email', { length: 255 }).notNull(),
  code: varchar('code', { length: 6 }).notNull(),
  type: varchar('type', { length: 50 }).notNull(), // 'register', 'login', 'reset_password'
  expiresAt: timestamp('expires_at').notNull(),
  usedAt: timestamp('used_at'),
  createdAt: timestamp('created_at').notNull().defaultNow(),
});

// Dentists table - main dentist/practice data
export const dentists = pgTable('dentists', {
  id: serial('id').primaryKey(),

  // Identifiers
  googleCid: varchar('google_cid', { length: 100 }).unique(),
  googlePlaceId: varchar('google_place_id', { length: 100 }),
  slug: varchar('slug', { length: 255 }).notNull().unique(),

  // Basic info
  name: varchar('name', { length: 255 }).notNull(),
  businessType: varchar('business_type', { length: 100 }), // dentist, orthodontist, oral surgeon, etc.

  // Location
  address: varchar('address', { length: 500 }),
  city: varchar('city', { length: 100 }),
  county: varchar('county', { length: 100 }),
  state: varchar('state', { length: 100 }),
  stateAbbr: varchar('state_abbr', { length: 10 }),
  zipCode: varchar('zip_code', { length: 20 }),
  country: varchar('country', { length: 50 }).default('USA'),
  latitude: decimal('latitude', { precision: 10, scale: 7 }),
  longitude: decimal('longitude', { precision: 10, scale: 7 }),

  // Contact
  phone: varchar('phone', { length: 50 }),
  email: varchar('email', { length: 255 }),
  website: varchar('website', { length: 500 }),

  // Google data
  rating: decimal('rating', { precision: 2, scale: 1 }),
  reviewCount: integer('review_count'),

  // Business details
  openingHours: text('opening_hours'), // JSON
  photoUrl: varchar('photo_url', { length: 1000 }),
  photos: text('photos'), // JSON array of photo URLs

  // Dentist-specific fields
  specialties: text('specialties'), // JSON array: ["General Dentistry", "Cosmetic", "Pediatric"]
  services: text('services'), // JSON array: ["Teeth Whitening", "Implants", "Invisalign"]
  insuranceAccepted: text('insurance_accepted'), // JSON array
  languages: text('languages'), // JSON array: ["English", "Spanish"]

  // Accessibility
  wheelchairAccessible: boolean('wheelchair_accessible'),
  parkingAvailable: boolean('parking_available'),

  // Practice info
  yearEstablished: varchar('year_established', { length: 10 }),
  acceptingNewPatients: boolean('accepting_new_patients').default(true),
  emergencyServices: boolean('emergency_services').default(false),

  // SEO/Content
  description: text('description'),
  metaDescription: varchar('meta_description', { length: 320 }),

  // Status
  isVerified: boolean('is_verified').default(false),
  isActive: boolean('is_active').default(true),

  // Discovery metadata
  discoveredAt: timestamp('discovered_at'),
  lastUpdated: timestamp('last_updated'),

  // Timestamps
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
});

// Business claims table
export const businessClaims = pgTable('business_claims', {
  id: serial('id').primaryKey(),
  userId: integer('user_id').notNull().references(() => users.id),
  dentistId: integer('dentist_id').references(() => dentists.id),
  dentistSlug: varchar('dentist_slug', { length: 255 }).notNull(),
  dentistName: varchar('dentist_name', { length: 255 }).notNull(),
  status: varchar('status', { length: 50 }).notNull().default('pending'), // pending, approved, rejected
  jobTitle: varchar('job_title', { length: 255 }), // dentist, office_manager, owner
  companyName: varchar('company_name', { length: 255 }),
  message: text('message'),
  verificationMethod: varchar('verification_method', { length: 50 }), // email, phone, document, npi
  npiNumber: varchar('npi_number', { length: 20 }), // National Provider Identifier
  reviewedAt: timestamp('reviewed_at'),
  reviewedBy: integer('reviewed_by'),
  rejectionReason: text('rejection_reason'),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
});

// Business edits - track changes made by claimed business owners
export const businessEdits = pgTable('business_edits', {
  id: serial('id').primaryKey(),
  claimId: integer('claim_id').notNull().references(() => businessClaims.id),
  userId: integer('user_id').notNull().references(() => users.id),
  dentistSlug: varchar('dentist_slug', { length: 255 }).notNull(),
  fieldName: varchar('field_name', { length: 100 }).notNull(),
  oldValue: text('old_value'),
  newValue: text('new_value'),
  status: varchar('status', { length: 50 }).notNull().default('pending'), // pending, approved, rejected
  createdAt: timestamp('created_at').notNull().defaultNow(),
});

// Sessions table for JWT refresh tokens
export const sessions = pgTable('sessions', {
  id: serial('id').primaryKey(),
  userId: integer('user_id').notNull().references(() => users.id),
  refreshToken: varchar('refresh_token', { length: 500 }).notNull(),
  expiresAt: timestamp('expires_at').notNull(),
  createdAt: timestamp('created_at').notNull().defaultNow(),
});

// User-submitted dentists
export const userDentists = pgTable('user_dentists', {
  id: serial('id').primaryKey(),
  userId: integer('user_id').notNull().references(() => users.id),

  // Basic info
  name: varchar('name', { length: 255 }).notNull(),
  slug: varchar('slug', { length: 255 }).notNull().unique(),
  businessType: varchar('business_type', { length: 100 }).notNull().default('dentist'),

  // Location
  address: varchar('address', { length: 255 }),
  zipCode: varchar('zip_code', { length: 10 }),
  city: varchar('city', { length: 100 }).notNull(),
  county: varchar('county', { length: 100 }),
  state: varchar('state', { length: 50 }).notNull(),
  gpsCoordinates: varchar('gps_coordinates', { length: 50 }),

  // Contact
  phone: varchar('phone', { length: 50 }),
  email: varchar('email', { length: 255 }),
  website: varchar('website', { length: 500 }),

  // Details
  description: text('description'),
  openingHours: text('opening_hours'),
  specialties: text('specialties'), // JSON array
  services: text('services'), // JSON array
  insuranceAccepted: text('insurance_accepted'), // JSON array

  // Photos (JSON array of URLs)
  photos: text('photos'),

  // Status
  status: varchar('status', { length: 50 }).notNull().default('pending'), // pending, approved, rejected
  rejectionReason: text('rejection_reason'),
  reviewedAt: timestamp('reviewed_at'),
  reviewedBy: integer('reviewed_by'),

  // Timestamps
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
});

// Reviews table
export const reviews = pgTable('reviews', {
  id: serial('id').primaryKey(),
  dentistId: integer('dentist_id').references(() => dentists.id),
  dentistSlug: varchar('dentist_slug', { length: 255 }).notNull(),
  userId: integer('user_id').references(() => users.id),

  // Review data
  rating: integer('rating').notNull(), // 1-5
  title: varchar('title', { length: 255 }),
  reviewText: text('review_text'),

  // Reviewer info (for anonymous reviews)
  reviewerName: varchar('reviewer_name', { length: 100 }),
  isVerifiedPatient: boolean('is_verified_patient').default(false),

  // Moderation
  status: varchar('status', { length: 50 }).notNull().default('pending'), // pending, approved, rejected

  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
});

// Feedback table
export const feedback = pgTable('feedback', {
  id: serial('id').primaryKey(),
  type: varchar('type', { length: 50 }).notNull().default('rating'), // rating, comment
  rating: integer('rating'), // 1-5 stars
  feedback: text('feedback'),
  pageTitle: varchar('page_title', { length: 255 }),
  pageUrl: varchar('page_url', { length: 500 }),
  userAgent: text('user_agent'),
  ipAddress: varchar('ip_address', { length: 100 }),
  status: varchar('status', { length: 50 }).notNull().default('new'), // new, read, resolved
  createdAt: timestamp('created_at').notNull().defaultNow(),
});

// Types
export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;
export type VerificationCode = typeof verificationCodes.$inferSelect;
export type Dentist = typeof dentists.$inferSelect;
export type NewDentist = typeof dentists.$inferInsert;
export type BusinessClaim = typeof businessClaims.$inferSelect;
export type NewBusinessClaim = typeof businessClaims.$inferInsert;
export type BusinessEdit = typeof businessEdits.$inferSelect;
export type Session = typeof sessions.$inferSelect;
export type UserDentist = typeof userDentists.$inferSelect;
export type NewUserDentist = typeof userDentists.$inferInsert;
export type Review = typeof reviews.$inferSelect;
export type NewReview = typeof reviews.$inferInsert;
export type Feedback = typeof feedback.$inferSelect;
export type NewFeedback = typeof feedback.$inferInsert;
