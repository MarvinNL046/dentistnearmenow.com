-- Current sql file was generated after introspecting the database
-- If you want to run this migration please uncomment this code before executing migrations
/*
CREATE TYPE "public"."ad_campaign_status" AS ENUM('draft', 'pending_payment', 'active', 'paused', 'completed', 'cancelled');--> statement-breakpoint
CREATE TYPE "public"."ad_placement_type" AS ENUM('blog_sidebar', 'blog_inline', 'directory_sidebar', 'search_results', 'homepage_featured');--> statement-breakpoint
CREATE TYPE "public"."badge_category" AS ENUM('general', 'reviewer', 'contributor', 'business', 'special');--> statement-breakpoint
CREATE TYPE "public"."blog_post_status" AS ENUM('draft', 'published', 'archived');--> statement-breakpoint
CREATE TYPE "public"."business_photo_status" AS ENUM('active', 'deleted');--> statement-breakpoint
CREATE TYPE "public"."claim_status" AS ENUM('pending', 'verification_sent', 'verified', 'approved', 'rejected', 'expired');--> statement-breakpoint
CREATE TYPE "public"."claim_verification_method" AS ENUM('email_domain', 'phone', 'google_business', 'document', 'manual');--> statement-breakpoint
CREATE TYPE "public"."in_app_notification_type" AS ENUM('new_review', 'new_lead', 'review_reply', 'listing_view', 'claim_approved', 'claim_rejected', 'plan_upgraded', 'plan_expiring', 'weekly_summary', 'system');--> statement-breakpoint
CREATE TYPE "public"."notification_log_status" AS ENUM('sent', 'failed');--> statement-breakpoint
CREATE TYPE "public"."place_status" AS ENUM('active', 'temporarily_closed', 'permanently_closed', 'unknown');--> statement-breakpoint
CREATE TYPE "public"."plan_status" AS ENUM('ACTIVE', 'CANCELLED', 'TRIAL', 'PAST_DUE', 'INACTIVE');--> statement-breakpoint
CREATE TYPE "public"."refresh_job_status" AS ENUM('pending', 'in_progress', 'done', 'failed');--> statement-breakpoint
CREATE TYPE "public"."review_photo_status" AS ENUM('pending', 'approved', 'rejected', 'flagged');--> statement-breakpoint
CREATE TYPE "public"."review_reply_author_type" AS ENUM('business', 'admin');--> statement-breakpoint
CREATE TYPE "public"."review_status" AS ENUM('pending', 'published', 'rejected', 'flagged');--> statement-breakpoint
CREATE TABLE "ad_packages" (
	"id" serial PRIMARY KEY NOT NULL,
	"key" varchar(50) NOT NULL,
	"name" varchar(100) NOT NULL,
	"name_nl" varchar(100),
	"description" text,
	"description_nl" text,
	"price_cents" integer NOT NULL,
	"duration_days" integer NOT NULL,
	"included_placements" varchar(255) NOT NULL,
	"max_impressions" integer,
	"stripe_price_id" varchar(255),
	"is_popular" boolean DEFAULT false NOT NULL,
	"sort_order" integer DEFAULT 0 NOT NULL,
	"is_active" boolean DEFAULT true NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "ad_packages_key_unique" UNIQUE("key")
);
--> statement-breakpoint
CREATE TABLE "blog_posts" (
	"id" serial PRIMARY KEY NOT NULL,
	"slug" varchar(255) NOT NULL,
	"author_id" integer,
	"author_name" varchar(100),
	"category_id" integer,
	"status" "blog_post_status" DEFAULT 'draft' NOT NULL,
	"featured_image" varchar(500),
	"featured_image_alt" varchar(255),
	"title_en" varchar(255) NOT NULL,
	"excerpt_en" text,
	"content_en" text NOT NULL,
	"title_nl" varchar(255),
	"excerpt_nl" text,
	"content_nl" text,
	"title_de" varchar(255),
	"excerpt_de" text,
	"content_de" text,
	"title_fr" varchar(255),
	"excerpt_fr" text,
	"content_fr" text,
	"meta_title_en" varchar(60),
	"meta_description_en" varchar(160),
	"meta_title_nl" varchar(60),
	"meta_description_nl" varchar(160),
	"meta_title_de" varchar(60),
	"meta_description_de" varchar(160),
	"meta_title_fr" varchar(60),
	"meta_description_fr" varchar(160),
	"reading_time_minutes" integer DEFAULT 5,
	"view_count" integer DEFAULT 0 NOT NULL,
	"published_at" timestamp,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "blog_posts_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
CREATE TABLE "ad_impressions" (
	"id" serial PRIMARY KEY NOT NULL,
	"campaign_id" integer NOT NULL,
	"placement" "ad_placement_type" NOT NULL,
	"page_url" varchar(500),
	"locale" varchar(5),
	"session_id" varchar(100),
	"user_agent" varchar(500),
	"ip_country" varchar(2),
	"clicked" boolean DEFAULT false NOT NULL,
	"clicked_at" timestamp,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "ai_content_cache" (
	"id" serial PRIMARY KEY NOT NULL,
	"key" text NOT NULL,
	"content_type" varchar(50) NOT NULL,
	"content" jsonb NOT NULL,
	"model" varchar(100) NOT NULL,
	"locale" varchar(10) NOT NULL,
	"version" varchar(50) NOT NULL,
	"prompt_tokens" integer,
	"completion_tokens" integer,
	"generated_at" timestamp DEFAULT now() NOT NULL,
	"generation_time_ms" integer,
	"is_stale" boolean DEFAULT false NOT NULL,
	"marked_stale_at" timestamp,
	"last_error" text,
	"error_count" integer DEFAULT 0 NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "ai_content_cache_key_unique" UNIQUE("key")
);
--> statement-breakpoint
CREATE TABLE "ai_generation_queue" (
	"id" serial PRIMARY KEY NOT NULL,
	"cache_key" text NOT NULL,
	"content_type" varchar(50) NOT NULL,
	"locale" varchar(10) NOT NULL,
	"priority" integer DEFAULT 0 NOT NULL,
	"status" varchar(20) DEFAULT 'pending' NOT NULL,
	"attempts" integer DEFAULT 0 NOT NULL,
	"last_attempt_at" timestamp,
	"completed_at" timestamp,
	"error" text,
	"context_data" jsonb,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "blog_categories" (
	"id" serial PRIMARY KEY NOT NULL,
	"slug" varchar(100) NOT NULL,
	"name_en" varchar(100) NOT NULL,
	"name_nl" varchar(100),
	"name_de" varchar(100),
	"name_fr" varchar(100),
	"description_en" text,
	"description_nl" text,
	"description_de" text,
	"description_fr" text,
	"icon" varchar(50),
	"color" varchar(20),
	"sort_order" integer DEFAULT 0 NOT NULL,
	"is_active" boolean DEFAULT true NOT NULL,
	"meta_title_en" varchar(60),
	"meta_description_en" varchar(160),
	"meta_title_nl" varchar(60),
	"meta_description_nl" varchar(160),
	"meta_title_de" varchar(60),
	"meta_description_de" varchar(160),
	"meta_title_fr" varchar(60),
	"meta_description_fr" varchar(160),
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "blog_categories_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
CREATE TABLE "ad_campaigns" (
	"id" serial PRIMARY KEY NOT NULL,
	"business_id" integer NOT NULL,
	"place_id" integer,
	"package_id" integer NOT NULL,
	"name" varchar(255) NOT NULL,
	"status" "ad_campaign_status" DEFAULT 'draft' NOT NULL,
	"headline" varchar(100) NOT NULL,
	"headline_nl" varchar(100),
	"description" varchar(255),
	"description_nl" varchar(255),
	"image_url" varchar(500),
	"cta_text" varchar(50) DEFAULT 'Learn More',
	"cta_text_nl" varchar(50) DEFAULT 'Meer informatie',
	"destination_url" varchar(500),
	"starts_at" timestamp,
	"ends_at" timestamp,
	"total_budget_cents" integer,
	"max_impressions" integer,
	"impressions" integer DEFAULT 0 NOT NULL,
	"clicks" integer DEFAULT 0 NOT NULL,
	"stripe_payment_intent_id" varchar(255),
	"stripe_checkout_session_id" varchar(255),
	"paid_at" timestamp,
	"amount_paid_cents" integer,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "admin_audit_logs" (
	"id" serial PRIMARY KEY NOT NULL,
	"admin_id" integer NOT NULL,
	"action" varchar(100) NOT NULL,
	"entity_type" varchar(50) NOT NULL,
	"entity_id" integer,
	"details" text,
	"ip_address" varchar(45),
	"user_agent" varchar(500),
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "audit_logs" (
	"id" serial PRIMARY KEY NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"actor_user_id" integer,
	"actor_business_id" integer,
	"actor_role" varchar(30) NOT NULL,
	"event_type" varchar(50) NOT NULL,
	"target_type" varchar(30) NOT NULL,
	"target_id" varchar(100),
	"metadata" jsonb,
	"ip_address" varchar(45)
);
--> statement-breakpoint
CREATE TABLE "blog_tags" (
	"id" serial PRIMARY KEY NOT NULL,
	"slug" varchar(100) NOT NULL,
	"name_en" varchar(100) NOT NULL,
	"name_nl" varchar(100),
	"name_de" varchar(100),
	"name_fr" varchar(100),
	"post_count" integer DEFAULT 0 NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "blog_tags_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
CREATE TABLE "badge_definitions" (
	"key" varchar(50) PRIMARY KEY NOT NULL,
	"label" varchar(100) NOT NULL,
	"label_nl" varchar(100),
	"description" text NOT NULL,
	"description_nl" text,
	"icon" varchar(50) NOT NULL,
	"category" varchar(50) DEFAULT 'general' NOT NULL,
	"sort_order" integer DEFAULT 0 NOT NULL,
	"is_active" boolean DEFAULT true NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "countries" (
	"id" serial PRIMARY KEY NOT NULL,
	"slug" varchar(255) NOT NULL,
	"code" varchar(3) NOT NULL,
	"name" varchar(255) NOT NULL,
	CONSTRAINT "countries_slug_unique" UNIQUE("slug"),
	CONSTRAINT "countries_code_unique" UNIQUE("code")
);
--> statement-breakpoint
CREATE TABLE "business_notifications" (
	"id" serial PRIMARY KEY NOT NULL,
	"business_id" integer NOT NULL,
	"type" "in_app_notification_type" NOT NULL,
	"title" varchar(255) NOT NULL,
	"message" text NOT NULL,
	"related_place_id" integer,
	"related_review_id" integer,
	"related_lead_id" integer,
	"action_url" varchar(500),
	"is_read" boolean DEFAULT false NOT NULL,
	"read_at" timestamp,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "categories" (
	"id" serial PRIMARY KEY NOT NULL,
	"slug" varchar(255) NOT NULL,
	"icon" varchar(100),
	"label_key" varchar(255) NOT NULL,
	CONSTRAINT "categories_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
CREATE TABLE "businesses" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" integer NOT NULL,
	"slug" varchar(255),
	"name" varchar(255) NOT NULL,
	"description" text,
	"website" varchar(500),
	"logo" varchar(500),
	"contact_email" varchar(255),
	"contact_phone" varchar(50),
	"status" varchar(20) DEFAULT 'active' NOT NULL,
	"plan" varchar(20) DEFAULT 'free' NOT NULL,
	"billing_status" varchar(20) DEFAULT 'trial' NOT NULL,
	"plan_key" varchar(20) DEFAULT 'FREE' NOT NULL,
	"plan_status" "plan_status" DEFAULT 'ACTIVE' NOT NULL,
	"plan_started_at" timestamp,
	"plan_valid_until" timestamp,
	"trial_ends_at" timestamp,
	"stripe_customer_id" varchar(255),
	"stripe_subscription_id" varchar(255),
	"credit_balance_cents" integer DEFAULT 0 NOT NULL,
	"lead_price_cents" integer,
	"auto_charge_enabled" boolean DEFAULT true NOT NULL,
	"notes" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "businesses_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
CREATE TABLE "business_photos" (
	"id" serial PRIMARY KEY NOT NULL,
	"place_id" integer NOT NULL,
	"business_id" integer NOT NULL,
	"uploaded_by" integer,
	"storage_key" varchar(500) NOT NULL,
	"width" integer,
	"height" integer,
	"size_bytes" integer,
	"mime_type" varchar(50),
	"alt_text" varchar(255),
	"caption" varchar(500),
	"is_primary" boolean DEFAULT false NOT NULL,
	"sort_order" integer DEFAULT 0 NOT NULL,
	"status" "business_photo_status" DEFAULT 'active' NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "karma_events" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" integer NOT NULL,
	"event_type" varchar(50) NOT NULL,
	"points" integer NOT NULL,
	"description" varchar(255),
	"review_id" integer,
	"place_id" integer,
	"badge_key" varchar(50),
	"metadata" jsonb,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "messages" (
	"id" serial PRIMARY KEY NOT NULL,
	"thread_id" integer NOT NULL,
	"sender_type" varchar(20) NOT NULL,
	"sender_user_id" integer,
	"body" text NOT NULL,
	"is_read" boolean DEFAULT false NOT NULL,
	"read_at" timestamp,
	"deleted_by_sender" boolean DEFAULT false NOT NULL,
	"deleted_by_recipient" boolean DEFAULT false NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "credit_transactions" (
	"id" serial PRIMARY KEY NOT NULL,
	"business_id" integer NOT NULL,
	"amount_cents" integer NOT NULL,
	"type" varchar(30) NOT NULL,
	"description" varchar(500),
	"stripe_payment_intent_id" varchar(255),
	"stripe_invoice_id" varchar(255),
	"lead_id" integer,
	"place_id" integer,
	"metadata" jsonb,
	"balance_after_cents" integer NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "message_threads" (
	"id" serial PRIMARY KEY NOT NULL,
	"business_id" integer NOT NULL,
	"user_id" integer NOT NULL,
	"place_id" integer,
	"subject" varchar(255),
	"status" varchar(20) DEFAULT 'open' NOT NULL,
	"last_message_at" timestamp DEFAULT now() NOT NULL,
	"last_message_preview" varchar(255),
	"unread_count_business" integer DEFAULT 0 NOT NULL,
	"unread_count_user" integer DEFAULT 0 NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "leads" (
	"id" serial PRIMARY KEY NOT NULL,
	"place_id" integer NOT NULL,
	"business_id" integer,
	"name" varchar(255) NOT NULL,
	"email" varchar(255) NOT NULL,
	"phone" varchar(50),
	"message" text,
	"source" varchar(100),
	"status" varchar(20) DEFAULT 'new' NOT NULL,
	"viewed_at" timestamp,
	"price_cents" integer,
	"charged_at" timestamp,
	"charged_transaction_id" integer,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "notification_settings" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" integer NOT NULL,
	"email_general" boolean DEFAULT true NOT NULL,
	"email_reviews" boolean DEFAULT true NOT NULL,
	"email_favorites" boolean DEFAULT true NOT NULL,
	"email_leads" boolean DEFAULT true NOT NULL,
	"email_business" boolean DEFAULT true NOT NULL,
	"email_digest" boolean DEFAULT true NOT NULL,
	"locale" varchar(10),
	"quiet_hours_enabled" boolean DEFAULT false NOT NULL,
	"quiet_hours_start" integer DEFAULT 22,
	"quiet_hours_end" integer DEFAULT 8,
	"timezone" varchar(50),
	"max_emails_per_week" integer DEFAULT 50,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "notification_settings_user_id_unique" UNIQUE("user_id")
);
--> statement-breakpoint
CREATE TABLE "page_views" (
	"id" serial PRIMARY KEY NOT NULL,
	"place_id" integer NOT NULL,
	"business_id" integer,
	"session_id" varchar(64),
	"source" varchar(100),
	"referrer" varchar(500),
	"device_type" varchar(20),
	"locale" varchar(10),
	"viewed_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "place_refresh_jobs" (
	"id" serial PRIMARY KEY NOT NULL,
	"place_id" integer NOT NULL,
	"status" "refresh_job_status" DEFAULT 'pending' NOT NULL,
	"reason" varchar(50) NOT NULL,
	"priority" integer DEFAULT 0 NOT NULL,
	"last_error" text,
	"attempt_count" integer DEFAULT 0 NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"started_at" timestamp,
	"completed_at" timestamp
);
--> statement-breakpoint
CREATE TABLE "review_photos" (
	"id" serial PRIMARY KEY NOT NULL,
	"review_id" integer NOT NULL,
	"place_id" integer NOT NULL,
	"user_id" integer,
	"storage_key" varchar(500) NOT NULL,
	"width" integer,
	"height" integer,
	"mime_type" varchar(50) NOT NULL,
	"filesize_bytes" integer,
	"alt_text" varchar(255),
	"status" "review_photo_status" DEFAULT 'pending' NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "reviews" (
	"id" serial PRIMARY KEY NOT NULL,
	"place_id" integer NOT NULL,
	"business_id" integer,
	"user_id" integer NOT NULL,
	"rating" integer NOT NULL,
	"title" varchar(255),
	"body" text NOT NULL,
	"locale" varchar(10) DEFAULT 'en' NOT NULL,
	"status" "review_status" DEFAULT 'pending' NOT NULL,
	"is_featured" boolean DEFAULT false NOT NULL,
	"visit_date" date,
	"ip_hash" varchar(64),
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "place_claims" (
	"id" serial PRIMARY KEY NOT NULL,
	"place_id" integer NOT NULL,
	"user_id" integer NOT NULL,
	"status" "claim_status" DEFAULT 'pending' NOT NULL,
	"verification_method" "claim_verification_method",
	"verification_email" varchar(255),
	"verification_email_domain" varchar(255),
	"verification_phone" varchar(50),
	"verification_code" varchar(10),
	"verification_code_sent_at" timestamp,
	"verification_code_expires_at" timestamp,
	"verification_attempts" integer DEFAULT 0 NOT NULL,
	"verified_at" timestamp,
	"google_business_id" varchar(255),
	"google_business_verified_at" timestamp,
	"proof_document_url" varchar(500),
	"proof_document_type" varchar(50),
	"business_role" varchar(100),
	"claimant_name" varchar(255),
	"claimant_phone" varchar(50),
	"notes" text,
	"admin_notes" text,
	"rejection_reason" varchar(500),
	"reviewed_by" integer,
	"reviewed_at" timestamp,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "review_replies" (
	"id" serial PRIMARY KEY NOT NULL,
	"review_id" integer NOT NULL,
	"author_type" "review_reply_author_type" NOT NULL,
	"author_user_id" integer NOT NULL,
	"body" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "subscription_plans" (
	"key" varchar(20) PRIMARY KEY NOT NULL,
	"name" varchar(100) NOT NULL,
	"name_nl" varchar(100),
	"description" text,
	"description_nl" text,
	"monthly_price_cents" integer DEFAULT 0 NOT NULL,
	"yearly_price_cents" integer,
	"max_photos" integer DEFAULT 0 NOT NULL,
	"max_categories" integer DEFAULT 1 NOT NULL,
	"can_show_website" boolean DEFAULT false NOT NULL,
	"can_show_email" boolean DEFAULT false NOT NULL,
	"can_show_phone" boolean DEFAULT false NOT NULL,
	"can_show_social_links" boolean DEFAULT false NOT NULL,
	"can_show_description" boolean DEFAULT false NOT NULL,
	"priority_rank" integer DEFAULT 1 NOT NULL,
	"has_featured_styling" boolean DEFAULT false NOT NULL,
	"has_basic_analytics" boolean DEFAULT false NOT NULL,
	"has_advanced_analytics" boolean DEFAULT false NOT NULL,
	"show_plan_badge" boolean DEFAULT false NOT NULL,
	"badge_text" varchar(50),
	"badge_color" varchar(20),
	"is_popular" boolean DEFAULT false NOT NULL,
	"is_active" boolean DEFAULT true NOT NULL,
	"sort_order" integer DEFAULT 0 NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "provinces" (
	"id" serial PRIMARY KEY NOT NULL,
	"country_id" integer NOT NULL,
	"slug" varchar(255) NOT NULL,
	"name" varchar(255) NOT NULL,
	"code" varchar(10),
	"lat" numeric(10, 7),
	"lng" numeric(10, 7),
	"description" text,
	"city_count" integer DEFAULT 0 NOT NULL,
	"place_count" integer DEFAULT 0 NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "trust_level_definitions" (
	"level" integer PRIMARY KEY NOT NULL,
	"name" varchar(50) NOT NULL,
	"name_nl" varchar(50),
	"description" text NOT NULL,
	"description_nl" text,
	"min_karma" integer DEFAULT 0 NOT NULL,
	"icon" varchar(50),
	"color" varchar(20),
	"can_review" boolean DEFAULT true NOT NULL,
	"can_upload_photos" boolean DEFAULT true NOT NULL,
	"max_photos_per_review" integer DEFAULT 3,
	"reviews_auto_approved" boolean DEFAULT false NOT NULL,
	"can_flag_reviews" boolean DEFAULT false NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "places" (
	"id" serial PRIMARY KEY NOT NULL,
	"owner_id" integer,
	"business_id" integer,
	"city_id" integer NOT NULL,
	"slug" varchar(255) NOT NULL,
	"name" varchar(255) NOT NULL,
	"description" text,
	"address" varchar(500),
	"postal_code" varchar(20),
	"phone" varchar(50),
	"website" varchar(500),
	"email" varchar(255),
	"lat" numeric(10, 7),
	"lng" numeric(10, 7),
	"opening_hours" jsonb,
	"is_verified" boolean DEFAULT false NOT NULL,
	"is_premium" boolean DEFAULT false NOT NULL,
	"premium_since" timestamp,
	"premium_until" timestamp,
	"premium_level" integer DEFAULT 0 NOT NULL,
	"avg_rating" numeric(2, 1) DEFAULT '0',
	"review_count" integer DEFAULT 0 NOT NULL,
	"last_review_at" timestamp,
	"has_photos" boolean DEFAULT false NOT NULL,
	"is_top_rated" boolean DEFAULT false NOT NULL,
	"is_community_favorite" boolean DEFAULT false NOT NULL,
	"data_quality_score" integer DEFAULT 0 NOT NULL,
	"data_quality_flags" jsonb,
	"last_refreshed_at" timestamp,
	"scraped_content" jsonb,
	"status" "place_status" DEFAULT 'active' NOT NULL,
	"status_last_checked_at" timestamp,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" serial PRIMARY KEY NOT NULL,
	"stackauth_id" varchar(255) NOT NULL,
	"email" varchar(255) NOT NULL,
	"email_verified" boolean DEFAULT false NOT NULL,
	"name" varchar(255),
	"role" varchar(50) DEFAULT 'user' NOT NULL,
	"username" varchar(50),
	"avatar_url" text,
	"bio" text,
	"location" varchar(255),
	"website_url" varchar(500),
	"social_links" jsonb DEFAULT '{}'::jsonb,
	"preferred_locale" varchar(10) DEFAULT 'en',
	"is_public" boolean DEFAULT true,
	"karma_points" integer DEFAULT 0 NOT NULL,
	"trust_level" integer DEFAULT 0 NOT NULL,
	"karma_updated_at" timestamp DEFAULT now(),
	"is_expert" boolean DEFAULT false NOT NULL,
	"professional_title" varchar(100),
	"credentials" jsonb DEFAULT '[]'::jsonb,
	"expertise_areas" jsonb DEFAULT '[]'::jsonb,
	"years_experience" integer,
	"expert_verified_at" timestamp,
	"expert_verified_by" integer,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "users_stackauth_id_unique" UNIQUE("stackauth_id"),
	CONSTRAINT "users_email_unique" UNIQUE("email"),
	CONSTRAINT "users_username_unique" UNIQUE("username")
);
--> statement-breakpoint
CREATE TABLE "cities" (
	"id" serial PRIMARY KEY NOT NULL,
	"country_id" integer NOT NULL,
	"province_id" integer,
	"slug" varchar(255) NOT NULL,
	"name" varchar(255) NOT NULL,
	"lat" numeric(10, 7),
	"lng" numeric(10, 7)
);
--> statement-breakpoint
CREATE TABLE "message_attachments" (
	"id" serial PRIMARY KEY NOT NULL,
	"message_id" integer NOT NULL,
	"filename" varchar(255) NOT NULL,
	"mime_type" varchar(100) NOT NULL,
	"file_size_bytes" integer,
	"storage_key" varchar(500) NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "notification_logs" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" integer,
	"business_id" integer,
	"type" varchar(50) NOT NULL,
	"email" varchar(255) NOT NULL,
	"status" "notification_log_status" NOT NULL,
	"error" text,
	"metadata" jsonb,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "user_badges" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" integer NOT NULL,
	"badge_key" varchar(50) NOT NULL,
	"awarded_at" timestamp DEFAULT now() NOT NULL,
	"awarded_by" varchar(50),
	"notes" text
);
--> statement-breakpoint
CREATE TABLE "user_favorites" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" integer NOT NULL,
	"place_id" integer NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "user_recent_views" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" integer NOT NULL,
	"place_id" integer NOT NULL,
	"viewed_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "legacy_redirects" (
	"id" serial PRIMARY KEY NOT NULL,
	"source_path" varchar(500) NOT NULL,
	"destination_path" varchar(500) NOT NULL,
	"redirect_type" integer DEFAULT 301,
	"created_at" timestamp DEFAULT now(),
	CONSTRAINT "legacy_redirects_source_path_key" UNIQUE("source_path")
);
--> statement-breakpoint
CREATE TABLE "place_categories" (
	"place_id" integer NOT NULL,
	"category_id" integer NOT NULL,
	CONSTRAINT "place_categories_place_id_category_id_pk" PRIMARY KEY("place_id","category_id")
);
--> statement-breakpoint
CREATE TABLE "blog_post_tags" (
	"post_id" integer NOT NULL,
	"tag_id" integer NOT NULL,
	CONSTRAINT "blog_post_tags_post_id_tag_id_pk" PRIMARY KEY("post_id","tag_id")
);
--> statement-breakpoint
ALTER TABLE "blog_posts" ADD CONSTRAINT "blog_posts_author_id_users_id_fk" FOREIGN KEY ("author_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "blog_posts" ADD CONSTRAINT "blog_posts_category_id_blog_categories_id_fk" FOREIGN KEY ("category_id") REFERENCES "public"."blog_categories"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "ad_impressions" ADD CONSTRAINT "ad_impressions_campaign_id_ad_campaigns_id_fk" FOREIGN KEY ("campaign_id") REFERENCES "public"."ad_campaigns"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "ad_campaigns" ADD CONSTRAINT "ad_campaigns_business_id_businesses_id_fk" FOREIGN KEY ("business_id") REFERENCES "public"."businesses"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "ad_campaigns" ADD CONSTRAINT "ad_campaigns_place_id_places_id_fk" FOREIGN KEY ("place_id") REFERENCES "public"."places"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "ad_campaigns" ADD CONSTRAINT "ad_campaigns_package_id_ad_packages_id_fk" FOREIGN KEY ("package_id") REFERENCES "public"."ad_packages"("id") ON DELETE restrict ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "admin_audit_logs" ADD CONSTRAINT "admin_audit_logs_admin_id_users_id_fk" FOREIGN KEY ("admin_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "audit_logs" ADD CONSTRAINT "audit_logs_actor_user_id_users_id_fk" FOREIGN KEY ("actor_user_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "audit_logs" ADD CONSTRAINT "audit_logs_actor_business_id_businesses_id_fk" FOREIGN KEY ("actor_business_id") REFERENCES "public"."businesses"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "business_notifications" ADD CONSTRAINT "business_notifications_business_id_businesses_id_fk" FOREIGN KEY ("business_id") REFERENCES "public"."businesses"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "business_notifications" ADD CONSTRAINT "business_notifications_related_place_id_places_id_fk" FOREIGN KEY ("related_place_id") REFERENCES "public"."places"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "business_notifications" ADD CONSTRAINT "business_notifications_related_review_id_reviews_id_fk" FOREIGN KEY ("related_review_id") REFERENCES "public"."reviews"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "business_notifications" ADD CONSTRAINT "business_notifications_related_lead_id_leads_id_fk" FOREIGN KEY ("related_lead_id") REFERENCES "public"."leads"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "businesses" ADD CONSTRAINT "businesses_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "businesses" ADD CONSTRAINT "businesses_plan_key_subscription_plans_key_fk" FOREIGN KEY ("plan_key") REFERENCES "public"."subscription_plans"("key") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "business_photos" ADD CONSTRAINT "business_photos_place_id_places_id_fk" FOREIGN KEY ("place_id") REFERENCES "public"."places"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "business_photos" ADD CONSTRAINT "business_photos_business_id_businesses_id_fk" FOREIGN KEY ("business_id") REFERENCES "public"."businesses"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "business_photos" ADD CONSTRAINT "business_photos_uploaded_by_users_id_fk" FOREIGN KEY ("uploaded_by") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "karma_events" ADD CONSTRAINT "karma_events_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "karma_events" ADD CONSTRAINT "karma_events_review_id_reviews_id_fk" FOREIGN KEY ("review_id") REFERENCES "public"."reviews"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "karma_events" ADD CONSTRAINT "karma_events_place_id_places_id_fk" FOREIGN KEY ("place_id") REFERENCES "public"."places"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "karma_events" ADD CONSTRAINT "karma_events_badge_key_badge_definitions_key_fk" FOREIGN KEY ("badge_key") REFERENCES "public"."badge_definitions"("key") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "messages" ADD CONSTRAINT "messages_thread_id_message_threads_id_fk" FOREIGN KEY ("thread_id") REFERENCES "public"."message_threads"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "messages" ADD CONSTRAINT "messages_sender_user_id_users_id_fk" FOREIGN KEY ("sender_user_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "credit_transactions" ADD CONSTRAINT "credit_transactions_business_id_businesses_id_fk" FOREIGN KEY ("business_id") REFERENCES "public"."businesses"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "credit_transactions" ADD CONSTRAINT "credit_transactions_lead_id_leads_id_fk" FOREIGN KEY ("lead_id") REFERENCES "public"."leads"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "credit_transactions" ADD CONSTRAINT "credit_transactions_place_id_places_id_fk" FOREIGN KEY ("place_id") REFERENCES "public"."places"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "message_threads" ADD CONSTRAINT "message_threads_business_id_businesses_id_fk" FOREIGN KEY ("business_id") REFERENCES "public"."businesses"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "message_threads" ADD CONSTRAINT "message_threads_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "message_threads" ADD CONSTRAINT "message_threads_place_id_places_id_fk" FOREIGN KEY ("place_id") REFERENCES "public"."places"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "leads" ADD CONSTRAINT "leads_place_id_places_id_fk" FOREIGN KEY ("place_id") REFERENCES "public"."places"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "leads" ADD CONSTRAINT "leads_business_id_businesses_id_fk" FOREIGN KEY ("business_id") REFERENCES "public"."businesses"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "leads" ADD CONSTRAINT "leads_charged_transaction_id_credit_transactions_id_fk" FOREIGN KEY ("charged_transaction_id") REFERENCES "public"."credit_transactions"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "notification_settings" ADD CONSTRAINT "notification_settings_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "page_views" ADD CONSTRAINT "page_views_place_id_places_id_fk" FOREIGN KEY ("place_id") REFERENCES "public"."places"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "page_views" ADD CONSTRAINT "page_views_business_id_businesses_id_fk" FOREIGN KEY ("business_id") REFERENCES "public"."businesses"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "place_refresh_jobs" ADD CONSTRAINT "place_refresh_jobs_place_id_places_id_fk" FOREIGN KEY ("place_id") REFERENCES "public"."places"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "review_photos" ADD CONSTRAINT "review_photos_review_id_reviews_id_fk" FOREIGN KEY ("review_id") REFERENCES "public"."reviews"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "review_photos" ADD CONSTRAINT "review_photos_place_id_places_id_fk" FOREIGN KEY ("place_id") REFERENCES "public"."places"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "review_photos" ADD CONSTRAINT "review_photos_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "reviews" ADD CONSTRAINT "reviews_place_id_places_id_fk" FOREIGN KEY ("place_id") REFERENCES "public"."places"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "reviews" ADD CONSTRAINT "reviews_business_id_businesses_id_fk" FOREIGN KEY ("business_id") REFERENCES "public"."businesses"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "reviews" ADD CONSTRAINT "reviews_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "place_claims" ADD CONSTRAINT "place_claims_place_id_places_id_fk" FOREIGN KEY ("place_id") REFERENCES "public"."places"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "place_claims" ADD CONSTRAINT "place_claims_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "place_claims" ADD CONSTRAINT "place_claims_reviewed_by_users_id_fk" FOREIGN KEY ("reviewed_by") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "review_replies" ADD CONSTRAINT "review_replies_review_id_reviews_id_fk" FOREIGN KEY ("review_id") REFERENCES "public"."reviews"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "review_replies" ADD CONSTRAINT "review_replies_author_user_id_users_id_fk" FOREIGN KEY ("author_user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "provinces" ADD CONSTRAINT "provinces_country_id_countries_id_fk" FOREIGN KEY ("country_id") REFERENCES "public"."countries"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "places" ADD CONSTRAINT "places_owner_id_users_id_fk" FOREIGN KEY ("owner_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "places" ADD CONSTRAINT "places_business_id_businesses_id_fk" FOREIGN KEY ("business_id") REFERENCES "public"."businesses"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "places" ADD CONSTRAINT "places_city_id_cities_id_fk" FOREIGN KEY ("city_id") REFERENCES "public"."cities"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "cities" ADD CONSTRAINT "cities_country_id_countries_id_fk" FOREIGN KEY ("country_id") REFERENCES "public"."countries"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "cities" ADD CONSTRAINT "cities_province_id_provinces_id_fk" FOREIGN KEY ("province_id") REFERENCES "public"."provinces"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "message_attachments" ADD CONSTRAINT "message_attachments_message_id_messages_id_fk" FOREIGN KEY ("message_id") REFERENCES "public"."messages"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "notification_logs" ADD CONSTRAINT "notification_logs_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "notification_logs" ADD CONSTRAINT "notification_logs_business_id_businesses_id_fk" FOREIGN KEY ("business_id") REFERENCES "public"."businesses"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user_badges" ADD CONSTRAINT "user_badges_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user_badges" ADD CONSTRAINT "user_badges_badge_key_badge_definitions_key_fk" FOREIGN KEY ("badge_key") REFERENCES "public"."badge_definitions"("key") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user_favorites" ADD CONSTRAINT "user_favorites_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user_favorites" ADD CONSTRAINT "user_favorites_place_id_places_id_fk" FOREIGN KEY ("place_id") REFERENCES "public"."places"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user_recent_views" ADD CONSTRAINT "user_recent_views_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user_recent_views" ADD CONSTRAINT "user_recent_views_place_id_places_id_fk" FOREIGN KEY ("place_id") REFERENCES "public"."places"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "place_categories" ADD CONSTRAINT "place_categories_place_id_places_id_fk" FOREIGN KEY ("place_id") REFERENCES "public"."places"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "place_categories" ADD CONSTRAINT "place_categories_category_id_categories_id_fk" FOREIGN KEY ("category_id") REFERENCES "public"."categories"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "blog_post_tags" ADD CONSTRAINT "blog_post_tags_post_id_blog_posts_id_fk" FOREIGN KEY ("post_id") REFERENCES "public"."blog_posts"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "blog_post_tags" ADD CONSTRAINT "blog_post_tags_tag_id_blog_tags_id_fk" FOREIGN KEY ("tag_id") REFERENCES "public"."blog_tags"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "blog_posts_author_id_idx" ON "blog_posts" USING btree ("author_id" int4_ops);--> statement-breakpoint
CREATE INDEX "blog_posts_category_id_idx" ON "blog_posts" USING btree ("category_id" int4_ops);--> statement-breakpoint
CREATE INDEX "blog_posts_published_at_idx" ON "blog_posts" USING btree ("published_at" timestamp_ops);--> statement-breakpoint
CREATE INDEX "blog_posts_slug_idx" ON "blog_posts" USING btree ("slug" text_ops);--> statement-breakpoint
CREATE INDEX "blog_posts_status_idx" ON "blog_posts" USING btree ("status" enum_ops);--> statement-breakpoint
CREATE INDEX "ad_impressions_campaign_idx" ON "ad_impressions" USING btree ("campaign_id" int4_ops);--> statement-breakpoint
CREATE INDEX "ad_impressions_date_idx" ON "ad_impressions" USING btree ("created_at" timestamp_ops);--> statement-breakpoint
CREATE INDEX "ai_content_cache_content_type_idx" ON "ai_content_cache" USING btree ("content_type" text_ops);--> statement-breakpoint
CREATE UNIQUE INDEX "ai_content_cache_key_idx" ON "ai_content_cache" USING btree ("key" text_ops);--> statement-breakpoint
CREATE INDEX "ai_content_cache_locale_idx" ON "ai_content_cache" USING btree ("locale" text_ops);--> statement-breakpoint
CREATE INDEX "ai_content_cache_stale_idx" ON "ai_content_cache" USING btree ("is_stale" bool_ops,"updated_at" timestamp_ops);--> statement-breakpoint
CREATE INDEX "ai_content_cache_version_idx" ON "ai_content_cache" USING btree ("version" text_ops);--> statement-breakpoint
CREATE INDEX "ai_generation_queue_cache_key_idx" ON "ai_generation_queue" USING btree ("cache_key" text_ops);--> statement-breakpoint
CREATE INDEX "ai_generation_queue_status_priority_idx" ON "ai_generation_queue" USING btree ("status" int4_ops,"priority" int4_ops);--> statement-breakpoint
CREATE INDEX "ad_campaigns_active_idx" ON "ad_campaigns" USING btree ("status" enum_ops,"starts_at" enum_ops,"ends_at" enum_ops);--> statement-breakpoint
CREATE INDEX "ad_campaigns_business_idx" ON "ad_campaigns" USING btree ("business_id" int4_ops);--> statement-breakpoint
CREATE INDEX "ad_campaigns_status_idx" ON "ad_campaigns" USING btree ("status" enum_ops);--> statement-breakpoint
CREATE INDEX "audit_logs_actor_user_id_idx" ON "audit_logs" USING btree ("actor_user_id" int4_ops);--> statement-breakpoint
CREATE INDEX "audit_logs_created_at_idx" ON "audit_logs" USING btree ("created_at" timestamp_ops);--> statement-breakpoint
CREATE INDEX "audit_logs_event_type_idx" ON "audit_logs" USING btree ("event_type" text_ops);--> statement-breakpoint
CREATE INDEX "audit_logs_target_type_idx" ON "audit_logs" USING btree ("target_type" text_ops);--> statement-breakpoint
CREATE INDEX "business_notifications_business_id_idx" ON "business_notifications" USING btree ("business_id" int4_ops);--> statement-breakpoint
CREATE INDEX "business_notifications_created_at_idx" ON "business_notifications" USING btree ("created_at" timestamp_ops);--> statement-breakpoint
CREATE INDEX "business_notifications_is_read_idx" ON "business_notifications" USING btree ("is_read" bool_ops);--> statement-breakpoint
CREATE INDEX "business_notifications_type_idx" ON "business_notifications" USING btree ("type" enum_ops);--> statement-breakpoint
CREATE INDEX "business_photos_business_id_idx" ON "business_photos" USING btree ("business_id" int4_ops);--> statement-breakpoint
CREATE INDEX "business_photos_place_id_idx" ON "business_photos" USING btree ("place_id" int4_ops);--> statement-breakpoint
CREATE INDEX "business_photos_status_idx" ON "business_photos" USING btree ("status" enum_ops);--> statement-breakpoint
CREATE INDEX "karma_events_created_at_idx" ON "karma_events" USING btree ("created_at" timestamp_ops);--> statement-breakpoint
CREATE INDEX "karma_events_event_type_idx" ON "karma_events" USING btree ("event_type" text_ops);--> statement-breakpoint
CREATE INDEX "karma_events_user_id_idx" ON "karma_events" USING btree ("user_id" int4_ops);--> statement-breakpoint
CREATE INDEX "messages_created_at_idx" ON "messages" USING btree ("created_at" timestamp_ops);--> statement-breakpoint
CREATE INDEX "messages_thread_id_idx" ON "messages" USING btree ("thread_id" int4_ops);--> statement-breakpoint
CREATE INDEX "message_threads_business_id_idx" ON "message_threads" USING btree ("business_id" int4_ops);--> statement-breakpoint
CREATE INDEX "message_threads_last_message_at_idx" ON "message_threads" USING btree ("last_message_at" timestamp_ops);--> statement-breakpoint
CREATE INDEX "message_threads_user_id_idx" ON "message_threads" USING btree ("user_id" int4_ops);--> statement-breakpoint
CREATE INDEX "leads_business_id_idx" ON "leads" USING btree ("business_id" int4_ops);--> statement-breakpoint
CREATE INDEX "leads_place_id_idx" ON "leads" USING btree ("place_id" int4_ops);--> statement-breakpoint
CREATE INDEX "leads_status_idx" ON "leads" USING btree ("status" text_ops);--> statement-breakpoint
CREATE INDEX "page_views_business_id_idx" ON "page_views" USING btree ("business_id" int4_ops);--> statement-breakpoint
CREATE INDEX "page_views_place_date_idx" ON "page_views" USING btree ("place_id" int4_ops,"viewed_at" timestamp_ops);--> statement-breakpoint
CREATE INDEX "page_views_place_id_idx" ON "page_views" USING btree ("place_id" int4_ops);--> statement-breakpoint
CREATE INDEX "page_views_viewed_at_idx" ON "page_views" USING btree ("viewed_at" timestamp_ops);--> statement-breakpoint
CREATE INDEX "place_refresh_jobs_place_id_idx" ON "place_refresh_jobs" USING btree ("place_id" int4_ops);--> statement-breakpoint
CREATE INDEX "place_refresh_jobs_priority_idx" ON "place_refresh_jobs" USING btree ("priority" int4_ops);--> statement-breakpoint
CREATE INDEX "place_refresh_jobs_status_idx" ON "place_refresh_jobs" USING btree ("status" enum_ops);--> statement-breakpoint
CREATE INDEX "review_photos_place_id_idx" ON "review_photos" USING btree ("place_id" int4_ops);--> statement-breakpoint
CREATE INDEX "review_photos_review_id_idx" ON "review_photos" USING btree ("review_id" int4_ops);--> statement-breakpoint
CREATE INDEX "review_photos_status_idx" ON "review_photos" USING btree ("status" enum_ops);--> statement-breakpoint
CREATE INDEX "reviews_business_id_idx" ON "reviews" USING btree ("business_id" int4_ops);--> statement-breakpoint
CREATE INDEX "reviews_place_id_idx" ON "reviews" USING btree ("place_id" int4_ops);--> statement-breakpoint
CREATE INDEX "reviews_status_idx" ON "reviews" USING btree ("status" enum_ops);--> statement-breakpoint
CREATE INDEX "reviews_user_id_idx" ON "reviews" USING btree ("user_id" int4_ops);--> statement-breakpoint
CREATE INDEX "place_claims_place_id_idx" ON "place_claims" USING btree ("place_id" int4_ops);--> statement-breakpoint
CREATE INDEX "place_claims_status_idx" ON "place_claims" USING btree ("status" enum_ops);--> statement-breakpoint
CREATE INDEX "place_claims_user_id_idx" ON "place_claims" USING btree ("user_id" int4_ops);--> statement-breakpoint
CREATE INDEX "place_claims_verification_code_idx" ON "place_claims" USING btree ("verification_code" text_ops);--> statement-breakpoint
CREATE INDEX "review_replies_review_id_idx" ON "review_replies" USING btree ("review_id" int4_ops);--> statement-breakpoint
CREATE INDEX "provinces_country_id_idx" ON "provinces" USING btree ("country_id" int4_ops);--> statement-breakpoint
CREATE INDEX "provinces_slug_country_idx" ON "provinces" USING btree ("slug" int4_ops,"country_id" int4_ops);--> statement-breakpoint
CREATE INDEX "places_business_id_idx" ON "places" USING btree ("business_id" int4_ops);--> statement-breakpoint
CREATE INDEX "places_city_id_idx" ON "places" USING btree ("city_id" int4_ops);--> statement-breakpoint
CREATE INDEX "cities_country_id_idx" ON "cities" USING btree ("country_id" int4_ops);--> statement-breakpoint
CREATE INDEX "cities_province_id_idx" ON "cities" USING btree ("province_id" int4_ops);--> statement-breakpoint
CREATE INDEX "message_attachments_message_id_idx" ON "message_attachments" USING btree ("message_id" int4_ops);--> statement-breakpoint
CREATE INDEX "notification_logs_business_id_idx" ON "notification_logs" USING btree ("business_id" int4_ops);--> statement-breakpoint
CREATE INDEX "notification_logs_created_at_idx" ON "notification_logs" USING btree ("created_at" timestamp_ops);--> statement-breakpoint
CREATE INDEX "notification_logs_type_idx" ON "notification_logs" USING btree ("type" text_ops);--> statement-breakpoint
CREATE INDEX "notification_logs_user_id_idx" ON "notification_logs" USING btree ("user_id" int4_ops);--> statement-breakpoint
CREATE INDEX "user_badges_awarded_at_idx" ON "user_badges" USING btree ("awarded_at" timestamp_ops);--> statement-breakpoint
CREATE INDEX "user_badges_badge_key_idx" ON "user_badges" USING btree ("badge_key" text_ops);--> statement-breakpoint
CREATE INDEX "user_badges_user_id_idx" ON "user_badges" USING btree ("user_id" int4_ops);--> statement-breakpoint
CREATE INDEX "user_favorites_place_id_idx" ON "user_favorites" USING btree ("place_id" int4_ops);--> statement-breakpoint
CREATE INDEX "user_favorites_unique_idx" ON "user_favorites" USING btree ("user_id" int4_ops,"place_id" int4_ops);--> statement-breakpoint
CREATE INDEX "user_favorites_user_id_idx" ON "user_favorites" USING btree ("user_id" int4_ops);--> statement-breakpoint
CREATE INDEX "user_recent_views_place_id_idx" ON "user_recent_views" USING btree ("place_id" int4_ops);--> statement-breakpoint
CREATE INDEX "user_recent_views_unique_idx" ON "user_recent_views" USING btree ("user_id" int4_ops,"place_id" int4_ops);--> statement-breakpoint
CREATE INDEX "user_recent_views_user_id_idx" ON "user_recent_views" USING btree ("user_id" int4_ops);--> statement-breakpoint
CREATE INDEX "user_recent_views_viewed_at_idx" ON "user_recent_views" USING btree ("viewed_at" timestamp_ops);--> statement-breakpoint
CREATE INDEX "idx_legacy_redirects_source" ON "legacy_redirects" USING btree ("source_path" text_ops);--> statement-breakpoint
CREATE INDEX "place_categories_category_id_idx" ON "place_categories" USING btree ("category_id" int4_ops);--> statement-breakpoint
CREATE INDEX "blog_post_tags_tag_id_idx" ON "blog_post_tags" USING btree ("tag_id" int4_ops);
*/