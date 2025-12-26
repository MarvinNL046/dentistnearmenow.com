-- ============================================
-- Additional RLS Policies for schema-simple.ts tables
-- ============================================
-- These tables are specific to the cemetery website

-- ============================================
-- GOOGLE_REVIEWS TABLE (imported reviews)
-- ============================================
ALTER TABLE google_reviews ENABLE ROW LEVEL SECURITY;

-- Anyone can read Google reviews (public data)
CREATE POLICY google_reviews_select_public ON google_reviews
  FOR SELECT
  USING (true);

-- Only admins can manage imported reviews
CREATE POLICY google_reviews_admin_all ON google_reviews
  FOR ALL
  USING (auth.is_admin());

-- ============================================
-- USER_FAVORITES_BY_SLUG TABLE
-- ============================================
ALTER TABLE user_favorites_by_slug ENABLE ROW LEVEL SECURITY;

-- Users can only see their own favorites
CREATE POLICY user_favorites_by_slug_select_own ON user_favorites_by_slug
  FOR SELECT
  USING (user_id = auth.user_id());

-- Users can insert their own favorites
CREATE POLICY user_favorites_by_slug_insert_own ON user_favorites_by_slug
  FOR INSERT
  WITH CHECK (user_id = auth.user_id());

-- Users can delete their own favorites
CREATE POLICY user_favorites_by_slug_delete_own ON user_favorites_by_slug
  FOR DELETE
  USING (user_id = auth.user_id());

-- Admins can see all
CREATE POLICY user_favorites_by_slug_admin_all ON user_favorites_by_slug
  FOR ALL
  USING (auth.is_admin());

-- ============================================
-- CEMETERY_REVIEWS TABLE (user-submitted reviews)
-- ============================================
ALTER TABLE cemetery_reviews ENABLE ROW LEVEL SECURITY;

-- Anyone can read approved reviews
CREATE POLICY cemetery_reviews_select_public ON cemetery_reviews
  FOR SELECT
  USING (status = 'approved' OR user_id = auth.user_id() OR auth.is_admin());

-- Anyone can submit reviews (with optional user_id)
CREATE POLICY cemetery_reviews_insert_public ON cemetery_reviews
  FOR INSERT
  WITH CHECK (true);

-- Users can update their own pending reviews
CREATE POLICY cemetery_reviews_update_own ON cemetery_reviews
  FOR UPDATE
  USING (user_id = auth.user_id() AND status = 'pending')
  WITH CHECK (user_id = auth.user_id());

-- Admins can do everything
CREATE POLICY cemetery_reviews_admin_all ON cemetery_reviews
  FOR ALL
  USING (auth.is_admin());

-- ============================================
-- CEMETERY_PHOTOS TABLE (user-submitted photos)
-- ============================================
ALTER TABLE cemetery_photos ENABLE ROW LEVEL SECURITY;

-- Anyone can read approved photos
CREATE POLICY cemetery_photos_select_public ON cemetery_photos
  FOR SELECT
  USING (status = 'approved' OR user_id = auth.user_id() OR auth.is_admin());

-- Anyone can submit photos (with optional user_id)
CREATE POLICY cemetery_photos_insert_public ON cemetery_photos
  FOR INSERT
  WITH CHECK (true);

-- Admins can do everything
CREATE POLICY cemetery_photos_admin_all ON cemetery_photos
  FOR ALL
  USING (auth.is_admin());

-- ============================================
-- USER_CEMETERIES TABLE (user-submitted cemeteries)
-- ============================================
ALTER TABLE user_cemeteries ENABLE ROW LEVEL SECURITY;

-- Users can see their own submissions + approved ones are public
CREATE POLICY user_cemeteries_select ON user_cemeteries
  FOR SELECT
  USING (user_id = auth.user_id() OR status = 'approved' OR auth.is_admin());

-- Users can submit new cemeteries
CREATE POLICY user_cemeteries_insert_auth ON user_cemeteries
  FOR INSERT
  WITH CHECK (user_id = auth.user_id());

-- Users can update their own pending submissions
CREATE POLICY user_cemeteries_update_own ON user_cemeteries
  FOR UPDATE
  USING (user_id = auth.user_id() AND status = 'pending')
  WITH CHECK (user_id = auth.user_id());

-- Admins can do everything
CREATE POLICY user_cemeteries_admin_all ON user_cemeteries
  FOR ALL
  USING (auth.is_admin());

-- ============================================
-- WEBSITE_FEEDBACK TABLE
-- ============================================
ALTER TABLE website_feedback ENABLE ROW LEVEL SECURITY;

-- Anyone can submit feedback
CREATE POLICY website_feedback_insert_public ON website_feedback
  FOR INSERT
  WITH CHECK (true);

-- Only admins can read and manage feedback
CREATE POLICY website_feedback_admin_all ON website_feedback
  FOR SELECT
  USING (auth.is_admin());

CREATE POLICY website_feedback_admin_update ON website_feedback
  FOR UPDATE
  USING (auth.is_admin());

CREATE POLICY website_feedback_admin_delete ON website_feedback
  FOR DELETE
  USING (auth.is_admin());
