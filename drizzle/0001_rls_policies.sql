-- ============================================
-- Row Level Security (RLS) Policies for Neon
-- ============================================
-- This migration enables RLS and creates policies for all user-related tables
-- Run this in your Neon database console or via drizzle-kit

-- ============================================
-- Create auth schema first
-- ============================================
CREATE SCHEMA IF NOT EXISTS auth;

-- ============================================
-- Helper function to get current user ID
-- ============================================
-- This function reads the user_id from the session config
-- Set it in your app with: SET LOCAL app.current_user_id = '123';

CREATE OR REPLACE FUNCTION auth.user_id() RETURNS INTEGER AS $$
BEGIN
  RETURN NULLIF(current_setting('app.current_user_id', true), '')::INTEGER;
EXCEPTION
  WHEN OTHERS THEN
    RETURN NULL;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Helper function to check if current user is admin
CREATE OR REPLACE FUNCTION auth.is_admin() RETURNS BOOLEAN AS $$
DECLARE
  user_role VARCHAR;
BEGIN
  SELECT role INTO user_role FROM users WHERE id = auth.user_id();
  RETURN user_role = 'admin';
EXCEPTION
  WHEN OTHERS THEN
    RETURN FALSE;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Helper function to get current user's business_id
CREATE OR REPLACE FUNCTION auth.business_id() RETURNS INTEGER AS $$
DECLARE
  biz_id INTEGER;
BEGIN
  SELECT id INTO biz_id FROM businesses WHERE user_id = auth.user_id() LIMIT 1;
  RETURN biz_id;
EXCEPTION
  WHEN OTHERS THEN
    RETURN NULL;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- ============================================
-- USERS TABLE
-- ============================================
ALTER TABLE users ENABLE ROW LEVEL SECURITY;

-- Users can read their own profile
CREATE POLICY users_select_own ON users
  FOR SELECT
  USING (id = auth.user_id() OR is_public = true OR auth.is_admin());

-- Users can update their own profile
CREATE POLICY users_update_own ON users
  FOR UPDATE
  USING (id = auth.user_id())
  WITH CHECK (id = auth.user_id());

-- Admins can do everything
CREATE POLICY users_admin_all ON users
  FOR ALL
  USING (auth.is_admin());

-- ============================================
-- BUSINESSES TABLE
-- ============================================
ALTER TABLE businesses ENABLE ROW LEVEL SECURITY;

-- Anyone can read active businesses
CREATE POLICY businesses_select_public ON businesses
  FOR SELECT
  USING (status = 'active' OR user_id = auth.user_id() OR auth.is_admin());

-- Users can insert their own business
CREATE POLICY businesses_insert_own ON businesses
  FOR INSERT
  WITH CHECK (user_id = auth.user_id());

-- Users can update their own business
CREATE POLICY businesses_update_own ON businesses
  FOR UPDATE
  USING (user_id = auth.user_id())
  WITH CHECK (user_id = auth.user_id());

-- Users can delete their own business
CREATE POLICY businesses_delete_own ON businesses
  FOR DELETE
  USING (user_id = auth.user_id());

-- Admins can do everything
CREATE POLICY businesses_admin_all ON businesses
  FOR ALL
  USING (auth.is_admin());

-- ============================================
-- PLACES TABLE
-- ============================================
ALTER TABLE places ENABLE ROW LEVEL SECURITY;

-- Anyone can read active places
CREATE POLICY places_select_public ON places
  FOR SELECT
  USING (status = 'active' OR owner_id = auth.user_id() OR auth.is_admin());

-- Owners can update their places
CREATE POLICY places_update_owner ON places
  FOR UPDATE
  USING (owner_id = auth.user_id() OR business_id = auth.business_id())
  WITH CHECK (owner_id = auth.user_id() OR business_id = auth.business_id());

-- Admins can do everything
CREATE POLICY places_admin_all ON places
  FOR ALL
  USING (auth.is_admin());

-- ============================================
-- REVIEWS TABLE
-- ============================================
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;

-- Anyone can read published reviews
CREATE POLICY reviews_select_public ON reviews
  FOR SELECT
  USING (status = 'published' OR user_id = auth.user_id() OR auth.is_admin());

-- Authenticated users can insert reviews
CREATE POLICY reviews_insert_auth ON reviews
  FOR INSERT
  WITH CHECK (user_id = auth.user_id() AND auth.user_id() IS NOT NULL);

-- Users can update their own pending reviews
CREATE POLICY reviews_update_own ON reviews
  FOR UPDATE
  USING (user_id = auth.user_id() AND status = 'pending')
  WITH CHECK (user_id = auth.user_id());

-- Users can delete their own reviews
CREATE POLICY reviews_delete_own ON reviews
  FOR DELETE
  USING (user_id = auth.user_id());

-- Admins can do everything
CREATE POLICY reviews_admin_all ON reviews
  FOR ALL
  USING (auth.is_admin());

-- ============================================
-- REVIEW_REPLIES TABLE
-- ============================================
ALTER TABLE review_replies ENABLE ROW LEVEL SECURITY;

-- Anyone can read replies
CREATE POLICY review_replies_select_public ON review_replies
  FOR SELECT
  USING (true);

-- Users can insert replies (business owners or admins)
CREATE POLICY review_replies_insert_auth ON review_replies
  FOR INSERT
  WITH CHECK (author_user_id = auth.user_id());

-- Users can update their own replies
CREATE POLICY review_replies_update_own ON review_replies
  FOR UPDATE
  USING (author_user_id = auth.user_id())
  WITH CHECK (author_user_id = auth.user_id());

-- Admins can do everything
CREATE POLICY review_replies_admin_all ON review_replies
  FOR ALL
  USING (auth.is_admin());

-- ============================================
-- USER_FAVORITES TABLE
-- ============================================
ALTER TABLE user_favorites ENABLE ROW LEVEL SECURITY;

-- Users can only see their own favorites
CREATE POLICY user_favorites_select_own ON user_favorites
  FOR SELECT
  USING (user_id = auth.user_id());

-- Users can insert their own favorites
CREATE POLICY user_favorites_insert_own ON user_favorites
  FOR INSERT
  WITH CHECK (user_id = auth.user_id());

-- Users can delete their own favorites
CREATE POLICY user_favorites_delete_own ON user_favorites
  FOR DELETE
  USING (user_id = auth.user_id());

-- Admins can see all
CREATE POLICY user_favorites_admin_all ON user_favorites
  FOR ALL
  USING (auth.is_admin());

-- ============================================
-- USER_RECENT_VIEWS TABLE
-- ============================================
ALTER TABLE user_recent_views ENABLE ROW LEVEL SECURITY;

-- Users can only see their own views
CREATE POLICY user_recent_views_select_own ON user_recent_views
  FOR SELECT
  USING (user_id = auth.user_id());

-- Users can insert their own views
CREATE POLICY user_recent_views_insert_own ON user_recent_views
  FOR INSERT
  WITH CHECK (user_id = auth.user_id());

-- Users can delete their own views
CREATE POLICY user_recent_views_delete_own ON user_recent_views
  FOR DELETE
  USING (user_id = auth.user_id());

-- ============================================
-- PLACE_CLAIMS TABLE
-- ============================================
ALTER TABLE place_claims ENABLE ROW LEVEL SECURITY;

-- Users can see their own claims
CREATE POLICY place_claims_select_own ON place_claims
  FOR SELECT
  USING (user_id = auth.user_id() OR auth.is_admin());

-- Users can insert claims
CREATE POLICY place_claims_insert_auth ON place_claims
  FOR INSERT
  WITH CHECK (user_id = auth.user_id());

-- Users can update their pending claims
CREATE POLICY place_claims_update_own ON place_claims
  FOR UPDATE
  USING (user_id = auth.user_id() AND status IN ('pending', 'verification_sent'))
  WITH CHECK (user_id = auth.user_id());

-- Admins can do everything
CREATE POLICY place_claims_admin_all ON place_claims
  FOR ALL
  USING (auth.is_admin());

-- ============================================
-- LEADS TABLE
-- ============================================
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;

-- Business owners can see leads for their places
CREATE POLICY leads_select_business ON leads
  FOR SELECT
  USING (
    business_id = auth.business_id()
    OR EXISTS (
      SELECT 1 FROM places p
      WHERE p.id = leads.place_id
      AND (p.owner_id = auth.user_id() OR p.business_id = auth.business_id())
    )
    OR auth.is_admin()
  );

-- Anyone can insert leads (contact forms)
CREATE POLICY leads_insert_public ON leads
  FOR INSERT
  WITH CHECK (true);

-- Admins can do everything
CREATE POLICY leads_admin_all ON leads
  FOR ALL
  USING (auth.is_admin());

-- ============================================
-- MESSAGE_THREADS TABLE
-- ============================================
ALTER TABLE message_threads ENABLE ROW LEVEL SECURITY;

-- Users can see threads they're part of
CREATE POLICY message_threads_select_participant ON message_threads
  FOR SELECT
  USING (user_id = auth.user_id() OR business_id = auth.business_id() OR auth.is_admin());

-- Users can create threads
CREATE POLICY message_threads_insert_auth ON message_threads
  FOR INSERT
  WITH CHECK (user_id = auth.user_id());

-- Participants can update threads
CREATE POLICY message_threads_update_participant ON message_threads
  FOR UPDATE
  USING (user_id = auth.user_id() OR business_id = auth.business_id())
  WITH CHECK (user_id = auth.user_id() OR business_id = auth.business_id());

-- ============================================
-- MESSAGES TABLE
-- ============================================
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;

-- Users can see messages in their threads
CREATE POLICY messages_select_thread_participant ON messages
  FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM message_threads mt
      WHERE mt.id = messages.thread_id
      AND (mt.user_id = auth.user_id() OR mt.business_id = auth.business_id())
    )
    OR auth.is_admin()
  );

-- Users can send messages in their threads
CREATE POLICY messages_insert_thread_participant ON messages
  FOR INSERT
  WITH CHECK (
    sender_user_id = auth.user_id()
    AND EXISTS (
      SELECT 1 FROM message_threads mt
      WHERE mt.id = messages.thread_id
      AND (mt.user_id = auth.user_id() OR mt.business_id = auth.business_id())
    )
  );

-- ============================================
-- BUSINESS_NOTIFICATIONS TABLE
-- ============================================
ALTER TABLE business_notifications ENABLE ROW LEVEL SECURITY;

-- Business owners can see their notifications
CREATE POLICY business_notifications_select_own ON business_notifications
  FOR SELECT
  USING (business_id = auth.business_id() OR auth.is_admin());

-- Business owners can update (mark as read)
CREATE POLICY business_notifications_update_own ON business_notifications
  FOR UPDATE
  USING (business_id = auth.business_id())
  WITH CHECK (business_id = auth.business_id());

-- ============================================
-- NOTIFICATION_SETTINGS TABLE
-- ============================================
ALTER TABLE notification_settings ENABLE ROW LEVEL SECURITY;

-- Users can see their own settings
CREATE POLICY notification_settings_select_own ON notification_settings
  FOR SELECT
  USING (user_id = auth.user_id());

-- Users can insert their own settings
CREATE POLICY notification_settings_insert_own ON notification_settings
  FOR INSERT
  WITH CHECK (user_id = auth.user_id());

-- Users can update their own settings
CREATE POLICY notification_settings_update_own ON notification_settings
  FOR UPDATE
  USING (user_id = auth.user_id())
  WITH CHECK (user_id = auth.user_id());

-- ============================================
-- USER_BADGES TABLE
-- ============================================
ALTER TABLE user_badges ENABLE ROW LEVEL SECURITY;

-- Anyone can see badges (public achievement)
CREATE POLICY user_badges_select_public ON user_badges
  FOR SELECT
  USING (true);

-- Only admins can manage badges
CREATE POLICY user_badges_admin_all ON user_badges
  FOR ALL
  USING (auth.is_admin());

-- ============================================
-- KARMA_EVENTS TABLE
-- ============================================
ALTER TABLE karma_events ENABLE ROW LEVEL SECURITY;

-- Users can see their own karma events
CREATE POLICY karma_events_select_own ON karma_events
  FOR SELECT
  USING (user_id = auth.user_id() OR auth.is_admin());

-- Only system/admin can insert
CREATE POLICY karma_events_admin_insert ON karma_events
  FOR INSERT
  WITH CHECK (auth.is_admin());

-- ============================================
-- BUSINESS_PHOTOS TABLE
-- ============================================
ALTER TABLE business_photos ENABLE ROW LEVEL SECURITY;

-- Anyone can see active photos
CREATE POLICY business_photos_select_public ON business_photos
  FOR SELECT
  USING (status = 'active' OR business_id = auth.business_id() OR auth.is_admin());

-- Business owners can manage their photos
CREATE POLICY business_photos_insert_owner ON business_photos
  FOR INSERT
  WITH CHECK (business_id = auth.business_id());

CREATE POLICY business_photos_update_owner ON business_photos
  FOR UPDATE
  USING (business_id = auth.business_id())
  WITH CHECK (business_id = auth.business_id());

CREATE POLICY business_photos_delete_owner ON business_photos
  FOR DELETE
  USING (business_id = auth.business_id());

-- Admins can do everything
CREATE POLICY business_photos_admin_all ON business_photos
  FOR ALL
  USING (auth.is_admin());

-- ============================================
-- REVIEW_PHOTOS TABLE
-- ============================================
ALTER TABLE review_photos ENABLE ROW LEVEL SECURITY;

-- Anyone can see approved photos
CREATE POLICY review_photos_select_public ON review_photos
  FOR SELECT
  USING (status = 'approved' OR user_id = auth.user_id() OR auth.is_admin());

-- Users can insert photos with their reviews
CREATE POLICY review_photos_insert_own ON review_photos
  FOR INSERT
  WITH CHECK (user_id = auth.user_id());

-- Admins can do everything
CREATE POLICY review_photos_admin_all ON review_photos
  FOR ALL
  USING (auth.is_admin());

-- ============================================
-- CREDIT_TRANSACTIONS TABLE
-- ============================================
ALTER TABLE credit_transactions ENABLE ROW LEVEL SECURITY;

-- Business owners can see their transactions
CREATE POLICY credit_transactions_select_own ON credit_transactions
  FOR SELECT
  USING (business_id = auth.business_id() OR auth.is_admin());

-- Only system/admin can insert
CREATE POLICY credit_transactions_admin_insert ON credit_transactions
  FOR INSERT
  WITH CHECK (auth.is_admin());

-- ============================================
-- AD_CAMPAIGNS TABLE
-- ============================================
ALTER TABLE ad_campaigns ENABLE ROW LEVEL SECURITY;

-- Business owners can see their campaigns
CREATE POLICY ad_campaigns_select_own ON ad_campaigns
  FOR SELECT
  USING (business_id = auth.business_id() OR auth.is_admin());

-- Business owners can create campaigns
CREATE POLICY ad_campaigns_insert_own ON ad_campaigns
  FOR INSERT
  WITH CHECK (business_id = auth.business_id());

-- Business owners can update their campaigns
CREATE POLICY ad_campaigns_update_own ON ad_campaigns
  FOR UPDATE
  USING (business_id = auth.business_id())
  WITH CHECK (business_id = auth.business_id());

-- Admins can do everything
CREATE POLICY ad_campaigns_admin_all ON ad_campaigns
  FOR ALL
  USING (auth.is_admin());

-- ============================================
-- AUDIT_LOGS TABLE (Admin only)
-- ============================================
ALTER TABLE audit_logs ENABLE ROW LEVEL SECURITY;

CREATE POLICY audit_logs_admin_only ON audit_logs
  FOR ALL
  USING (auth.is_admin());

-- ============================================
-- ADMIN_AUDIT_LOGS TABLE (Admin only)
-- ============================================
ALTER TABLE admin_audit_logs ENABLE ROW LEVEL SECURITY;

CREATE POLICY admin_audit_logs_admin_only ON admin_audit_logs
  FOR ALL
  USING (auth.is_admin());

-- ============================================
-- PUBLIC READ-ONLY TABLES (No RLS needed, or simple read policy)
-- ============================================

-- Countries, provinces, cities, categories - public read
ALTER TABLE countries ENABLE ROW LEVEL SECURITY;
CREATE POLICY countries_select_public ON countries FOR SELECT USING (true);

ALTER TABLE provinces ENABLE ROW LEVEL SECURITY;
CREATE POLICY provinces_select_public ON provinces FOR SELECT USING (true);

ALTER TABLE cities ENABLE ROW LEVEL SECURITY;
CREATE POLICY cities_select_public ON cities FOR SELECT USING (true);

ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
CREATE POLICY categories_select_public ON categories FOR SELECT USING (true);

ALTER TABLE subscription_plans ENABLE ROW LEVEL SECURITY;
CREATE POLICY subscription_plans_select_public ON subscription_plans FOR SELECT USING (true);

ALTER TABLE badge_definitions ENABLE ROW LEVEL SECURITY;
CREATE POLICY badge_definitions_select_public ON badge_definitions FOR SELECT USING (true);

ALTER TABLE trust_level_definitions ENABLE ROW LEVEL SECURITY;
CREATE POLICY trust_level_definitions_select_public ON trust_level_definitions FOR SELECT USING (true);

ALTER TABLE ad_packages ENABLE ROW LEVEL SECURITY;
CREATE POLICY ad_packages_select_public ON ad_packages FOR SELECT USING (is_active = true);

-- Blog posts - public read for published
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;
CREATE POLICY blog_posts_select_public ON blog_posts
  FOR SELECT USING (status = 'published' OR auth.is_admin());
CREATE POLICY blog_posts_admin_all ON blog_posts
  FOR ALL USING (auth.is_admin());

ALTER TABLE blog_categories ENABLE ROW LEVEL SECURITY;
CREATE POLICY blog_categories_select_public ON blog_categories FOR SELECT USING (true);

ALTER TABLE blog_tags ENABLE ROW LEVEL SECURITY;
CREATE POLICY blog_tags_select_public ON blog_tags FOR SELECT USING (true);

-- ============================================
-- GRANT USAGE on auth schema
-- ============================================
-- Grant execute on helper functions
GRANT EXECUTE ON FUNCTION auth.user_id() TO PUBLIC;
GRANT EXECUTE ON FUNCTION auth.is_admin() TO PUBLIC;
GRANT EXECUTE ON FUNCTION auth.business_id() TO PUBLIC;

-- ============================================
-- IMPORTANT: How to use in your app
-- ============================================
-- Before each request, set the user context:
--
-- await db.execute(sql`SET LOCAL app.current_user_id = ${userId}`);
--
-- This sets the user ID for the current transaction only.
-- The auth.user_id() function will then return this value.
--
-- Example in Next.js API route:
--
-- export async function GET(request: Request) {
--   const user = await getCurrentUser();
--   if (user) {
--     await db.execute(sql`SET LOCAL app.current_user_id = ${user.id}`);
--   }
--   // Now all queries will respect RLS policies
--   const data = await db.select().from(reviews);
--   return Response.json(data);
-- }
