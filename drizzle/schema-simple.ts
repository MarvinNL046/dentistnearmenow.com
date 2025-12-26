import { pgTable, serial, varchar, text, integer, boolean, timestamp, index, pgEnum, uniqueIndex } from "drizzle-orm/pg-core"

// Enums
export const claimStatus = pgEnum("claim_status", ['pending', 'verification_sent', 'verified', 'approved', 'rejected', 'expired'])
export const claimVerificationMethod = pgEnum("claim_verification_method", ['email_domain', 'phone', 'google_business', 'document', 'manual'])

// Users table - simplified without foreign key constraints
export const users = pgTable("users", {
  id: serial().primaryKey().notNull(),
  stackauthId: varchar("stackauth_id", { length: 255 }).notNull(),
  email: varchar({ length: 255 }).notNull(),
  emailVerified: boolean("email_verified").default(false).notNull(),
  name: varchar({ length: 255 }),
  role: varchar({ length: 50 }).default('user').notNull(),
  username: varchar({ length: 50 }),
  avatarUrl: text("avatar_url"),
  bio: text(),
  location: varchar({ length: 255 }),
  websiteUrl: varchar("website_url", { length: 500 }),
  preferredLocale: varchar("preferred_locale", { length: 10 }).default('en'),
  isPublic: boolean("is_public").default(true),
  karmaPoints: integer("karma_points").default(0).notNull(),
  trustLevel: integer("trust_level").default(0).notNull(),
  karmaUpdatedAt: timestamp("karma_updated_at", { mode: 'string' }).defaultNow(),
  isExpert: boolean("is_expert").default(false).notNull(),
  professionalTitle: varchar("professional_title", { length: 100 }),
  yearsExperience: integer("years_experience"),
  expertVerifiedAt: timestamp("expert_verified_at", { mode: 'string' }),
  expertVerifiedBy: integer("expert_verified_by"),
  createdAt: timestamp("created_at", { mode: 'string' }).defaultNow().notNull(),
  updatedAt: timestamp("updated_at", { mode: 'string' }).defaultNow().notNull(),
})

// Place claims table - simplified without foreign key constraints
export const placeClaims = pgTable("place_claims", {
  id: serial().primaryKey().notNull(),
  placeId: integer("place_id").notNull(),
  userId: integer("user_id").notNull(),
  status: claimStatus().default('pending').notNull(),
  verificationMethod: claimVerificationMethod("verification_method"),
  verificationEmail: varchar("verification_email", { length: 255 }),
  verificationEmailDomain: varchar("verification_email_domain", { length: 255 }),
  verificationPhone: varchar("verification_phone", { length: 50 }),
  verificationCode: varchar("verification_code", { length: 10 }),
  verificationCodeSentAt: timestamp("verification_code_sent_at", { mode: 'string' }),
  verificationCodeExpiresAt: timestamp("verification_code_expires_at", { mode: 'string' }),
  verificationAttempts: integer("verification_attempts").default(0).notNull(),
  verifiedAt: timestamp("verified_at", { mode: 'string' }),
  googleBusinessId: varchar("google_business_id", { length: 255 }),
  googleBusinessVerifiedAt: timestamp("google_business_verified_at", { mode: 'string' }),
  proofDocumentUrl: varchar("proof_document_url", { length: 500 }),
  proofDocumentType: varchar("proof_document_type", { length: 50 }),
  businessRole: varchar("business_role", { length: 100 }),
  claimantName: varchar("claimant_name", { length: 255 }),
  claimantPhone: varchar("claimant_phone", { length: 50 }),
  notes: text(),
  adminNotes: text("admin_notes"),
  rejectionReason: varchar("rejection_reason", { length: 500 }),
  reviewedBy: integer("reviewed_by"),
  reviewedAt: timestamp("reviewed_at", { mode: 'string' }),
  createdAt: timestamp("created_at", { mode: 'string' }).defaultNow().notNull(),
  updatedAt: timestamp("updated_at", { mode: 'string' }).defaultNow().notNull(),
}, (table) => [
  index("place_claims_place_id_idx").using("btree", table.placeId.asc().nullsLast().op("int4_ops")),
  index("place_claims_status_idx").using("btree", table.status.asc().nullsLast().op("enum_ops")),
  index("place_claims_user_id_idx").using("btree", table.userId.asc().nullsLast().op("int4_ops")),
  index("place_claims_verification_code_idx").using("btree", table.verificationCode.asc().nullsLast().op("text_ops")),
])

// Google reviews imported from BrightData - uses cemetery slug instead of place_id
export const googleReviews = pgTable("google_reviews", {
  id: serial().primaryKey().notNull(),
  cemeterySlug: varchar("cemetery_slug", { length: 255 }).notNull(),
  googlePlaceId: varchar("google_place_id", { length: 255 }),
  reviewerName: varchar("reviewer_name", { length: 255 }).notNull(),
  reviewerImageUrl: text("reviewer_image_url"),
  rating: integer().notNull(),
  content: text(),
  reviewDate: timestamp("review_date", { mode: 'string' }),
  language: varchar({ length: 10 }).default('en'),
  importedAt: timestamp("imported_at", { mode: 'string' }).defaultNow().notNull(),
}, (table) => [
  index("google_reviews_cemetery_slug_idx").using("btree", table.cemeterySlug.asc().nullsLast().op("text_ops")),
  index("google_reviews_rating_idx").using("btree", table.rating.asc().nullsLast().op("int4_ops")),
])

// User favorites - uses cemetery slug instead of place_id
export const userFavorites = pgTable("user_favorites_by_slug", {
  id: serial().primaryKey().notNull(),
  userId: integer("user_id").notNull(),
  cemeterySlug: varchar("cemetery_slug", { length: 255 }).notNull(),
  cemeteryName: varchar("cemetery_name", { length: 255 }),
  createdAt: timestamp("created_at", { mode: 'string' }).defaultNow().notNull(),
}, (table) => [
  index("user_favorites_by_slug_user_id_idx").using("btree", table.userId.asc().nullsLast().op("int4_ops")),
  uniqueIndex("user_favorites_by_slug_unique").using("btree", table.userId.asc().nullsLast(), table.cemeterySlug.asc().nullsLast()),
])

// User-submitted reviews for cemeteries
export const cemeteryReviews = pgTable("cemetery_reviews", {
  id: serial().primaryKey().notNull(),
  cemeterySlug: varchar("cemetery_slug", { length: 255 }).notNull(),
  userId: integer("user_id"),
  authorName: varchar("author_name", { length: 255 }).notNull(),
  authorEmail: varchar("author_email", { length: 255 }),
  rating: integer().notNull(),
  title: varchar({ length: 255 }),
  content: text().notNull(),
  visitDate: varchar("visit_date", { length: 50 }),
  status: varchar({ length: 20 }).default('pending').notNull(), // pending, approved, rejected
  ipHash: varchar("ip_hash", { length: 64 }),
  createdAt: timestamp("created_at", { mode: 'string' }).defaultNow().notNull(),
  updatedAt: timestamp("updated_at", { mode: 'string' }).defaultNow().notNull(),
}, (table) => [
  index("cemetery_reviews_slug_idx").using("btree", table.cemeterySlug.asc().nullsLast().op("text_ops")),
  index("cemetery_reviews_status_idx").using("btree", table.status.asc().nullsLast().op("text_ops")),
  index("cemetery_reviews_user_id_idx").using("btree", table.userId.asc().nullsLast().op("int4_ops")),
])

// User-submitted photos for cemeteries
export const cemeteryPhotos = pgTable("cemetery_photos", {
  id: serial().primaryKey().notNull(),
  cemeterySlug: varchar("cemetery_slug", { length: 255 }).notNull(),
  userId: integer("user_id"),
  uploaderName: varchar("uploader_name", { length: 255 }).notNull(),
  uploaderEmail: varchar("uploader_email", { length: 255 }),
  fileName: varchar("file_name", { length: 255 }).notNull(),
  fileUrl: text("file_url").notNull(),
  fileSize: integer("file_size"),
  caption: varchar({ length: 500 }),
  status: varchar({ length: 20 }).default('pending').notNull(), // pending, approved, rejected
  ipHash: varchar("ip_hash", { length: 64 }),
  createdAt: timestamp("created_at", { mode: 'string' }).defaultNow().notNull(),
}, (table) => [
  index("cemetery_photos_slug_idx").using("btree", table.cemeterySlug.asc().nullsLast().op("text_ops")),
  index("cemetery_photos_status_idx").using("btree", table.status.asc().nullsLast().op("text_ops")),
])

// User-submitted cemeteries
export const userCemeteries = pgTable("user_cemeteries", {
  id: serial().primaryKey().notNull(),
  userId: integer("user_id").notNull(),

  // Basic info
  name: varchar({ length: 255 }).notNull(),
  slug: varchar({ length: 255 }).notNull(),
  type: varchar({ length: 100 }).default('public cemetery').notNull(),

  // Location
  address: varchar({ length: 255 }),
  zipCode: varchar("zip_code", { length: 10 }),
  city: varchar({ length: 100 }).notNull(),
  county: varchar({ length: 100 }).notNull(),
  state: varchar({ length: 50 }).notNull(),
  gpsCoordinates: varchar("gps_coordinates", { length: 50 }),

  // Contact
  phone: varchar({ length: 50 }),
  email: varchar({ length: 255 }),
  website: varchar({ length: 500 }),

  // Details
  description: text(),
  openingHours: text("opening_hours"),
  facilities: text(), // comma separated
  yearEstablished: varchar("year_established", { length: 10 }),

  // Photos (JSON array of URLs)
  photos: text(), // JSON array

  // Status
  status: varchar({ length: 50 }).default('pending').notNull(), // pending, approved, rejected
  rejectionReason: text("rejection_reason"),
  reviewedAt: timestamp("reviewed_at", { mode: 'string' }),
  reviewedBy: integer("reviewed_by"),

  // Timestamps
  createdAt: timestamp("created_at", { mode: 'string' }).defaultNow().notNull(),
  updatedAt: timestamp("updated_at", { mode: 'string' }).defaultNow().notNull(),
}, (table) => [
  index("user_cemeteries_user_id_idx").using("btree", table.userId.asc().nullsLast().op("int4_ops")),
  index("user_cemeteries_status_idx").using("btree", table.status.asc().nullsLast().op("text_ops")),
  index("user_cemeteries_county_idx").using("btree", table.county.asc().nullsLast().op("text_ops")),
  uniqueIndex("user_cemeteries_slug_unique").using("btree", table.slug.asc().nullsLast()),
])

// Website feedback from visitors
export const websiteFeedback = pgTable("website_feedback", {
  id: serial().primaryKey().notNull(),
  type: varchar({ length: 50 }).default('rating').notNull(), // rating, comment
  rating: integer(), // 1-5 stars
  feedback: text(), // comment text
  pageTitle: varchar("page_title", { length: 255 }),
  pageUrl: varchar("page_url", { length: 500 }),
  userAgent: text("user_agent"),
  ipAddress: varchar("ip_address", { length: 100 }),
  status: varchar({ length: 50 }).default('new').notNull(), // new, read, resolved
  createdAt: timestamp("created_at", { mode: 'string' }).defaultNow().notNull(),
}, (table) => [
  index("website_feedback_status_idx").using("btree", table.status.asc().nullsLast().op("text_ops")),
  index("website_feedback_type_idx").using("btree", table.type.asc().nullsLast().op("text_ops")),
  index("website_feedback_created_at_idx").using("btree", table.createdAt.desc().nullsLast()),
])
