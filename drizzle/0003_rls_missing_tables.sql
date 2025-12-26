-- ============================================
-- RLS for Missing Tables
-- ============================================

-- ============================================
-- AD_IMPRESSIONS (analytics - admin only)
-- ============================================
ALTER TABLE ad_impressions ENABLE ROW LEVEL SECURITY;

CREATE POLICY ad_impressions_admin_only ON ad_impressions
  FOR ALL USING (auth.is_admin());

-- Allow insert for tracking (system)
CREATE POLICY ad_impressions_insert_public ON ad_impressions
  FOR INSERT WITH CHECK (true);

-- ============================================
-- AI_CONTENT_CACHE (system only)
-- ============================================
ALTER TABLE ai_content_cache ENABLE ROW LEVEL SECURITY;

CREATE POLICY ai_content_cache_admin_only ON ai_content_cache
  FOR ALL USING (auth.is_admin());

-- ============================================
-- AI_GENERATION_QUEUE (system only)
-- ============================================
ALTER TABLE ai_generation_queue ENABLE ROW LEVEL SECURITY;

CREATE POLICY ai_generation_queue_admin_only ON ai_generation_queue
  FOR ALL USING (auth.is_admin());

-- ============================================
-- BLOG_POST_TAGS (public read)
-- ============================================
ALTER TABLE blog_post_tags ENABLE ROW LEVEL SECURITY;

CREATE POLICY blog_post_tags_select_public ON blog_post_tags
  FOR SELECT USING (true);

CREATE POLICY blog_post_tags_admin_all ON blog_post_tags
  FOR ALL USING (auth.is_admin());

-- ============================================
-- CEMETERY_PHOTOS (user submitted)
-- ============================================
ALTER TABLE cemetery_photos ENABLE ROW LEVEL SECURITY;

CREATE POLICY cemetery_photos_select_public ON cemetery_photos
  FOR SELECT USING (status = 'approved' OR user_id = auth.user_id() OR auth.is_admin());

CREATE POLICY cemetery_photos_insert_public ON cemetery_photos
  FOR INSERT WITH CHECK (true);

CREATE POLICY cemetery_photos_admin_all ON cemetery_photos
  FOR ALL USING (auth.is_admin());

-- ============================================
-- CEMETERY_REVIEWS (user submitted)
-- ============================================
ALTER TABLE cemetery_reviews ENABLE ROW LEVEL SECURITY;

CREATE POLICY cemetery_reviews_select_public ON cemetery_reviews
  FOR SELECT USING (status = 'approved' OR user_id = auth.user_id() OR auth.is_admin());

CREATE POLICY cemetery_reviews_insert_public ON cemetery_reviews
  FOR INSERT WITH CHECK (true);

CREATE POLICY cemetery_reviews_update_own ON cemetery_reviews
  FOR UPDATE USING (user_id = auth.user_id() AND status = 'pending')
  WITH CHECK (user_id = auth.user_id());

CREATE POLICY cemetery_reviews_admin_all ON cemetery_reviews
  FOR ALL USING (auth.is_admin());

-- ============================================
-- GOOGLE_REVIEWS (imported - public read)
-- ============================================
ALTER TABLE google_reviews ENABLE ROW LEVEL SECURITY;

CREATE POLICY google_reviews_select_public ON google_reviews
  FOR SELECT USING (true);

CREATE POLICY google_reviews_admin_all ON google_reviews
  FOR ALL USING (auth.is_admin());

-- ============================================
-- LEGACY_REDIRECTS (public read)
-- ============================================
ALTER TABLE legacy_redirects ENABLE ROW LEVEL SECURITY;

CREATE POLICY legacy_redirects_select_public ON legacy_redirects
  FOR SELECT USING (true);

CREATE POLICY legacy_redirects_admin_all ON legacy_redirects
  FOR ALL USING (auth.is_admin());

-- ============================================
-- MESSAGE_ATTACHMENTS (thread participants)
-- ============================================
ALTER TABLE message_attachments ENABLE ROW LEVEL SECURITY;

CREATE POLICY message_attachments_select_participant ON message_attachments
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM messages m
      JOIN message_threads mt ON mt.id = m.thread_id
      WHERE m.id = message_attachments.message_id
      AND (mt.user_id = auth.user_id() OR mt.business_id = auth.business_id())
    )
    OR auth.is_admin()
  );

CREATE POLICY message_attachments_insert_participant ON message_attachments
  FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1 FROM messages m
      JOIN message_threads mt ON mt.id = m.thread_id
      WHERE m.id = message_attachments.message_id
      AND (mt.user_id = auth.user_id() OR mt.business_id = auth.business_id())
    )
  );

-- ============================================
-- NOTIFICATION_LOGS (admin only)
-- ============================================
ALTER TABLE notification_logs ENABLE ROW LEVEL SECURITY;

CREATE POLICY notification_logs_admin_only ON notification_logs
  FOR ALL USING (auth.is_admin());

-- ============================================
-- PAGE_VIEWS (analytics - business owners + admin)
-- ============================================
ALTER TABLE page_views ENABLE ROW LEVEL SECURITY;

CREATE POLICY page_views_select_owner ON page_views
  FOR SELECT USING (
    business_id = auth.business_id()
    OR EXISTS (
      SELECT 1 FROM places p
      WHERE p.id = page_views.place_id
      AND (p.owner_id = auth.user_id() OR p.business_id = auth.business_id())
    )
    OR auth.is_admin()
  );

-- Allow insert for tracking
CREATE POLICY page_views_insert_public ON page_views
  FOR INSERT WITH CHECK (true);

-- ============================================
-- PLACE_CATEGORIES (public read)
-- ============================================
ALTER TABLE place_categories ENABLE ROW LEVEL SECURITY;

CREATE POLICY place_categories_select_public ON place_categories
  FOR SELECT USING (true);

CREATE POLICY place_categories_admin_all ON place_categories
  FOR ALL USING (auth.is_admin());

-- ============================================
-- PLACE_REFRESH_JOBS (admin only)
-- ============================================
ALTER TABLE place_refresh_jobs ENABLE ROW LEVEL SECURITY;

CREATE POLICY place_refresh_jobs_admin_only ON place_refresh_jobs
  FOR ALL USING (auth.is_admin());

-- ============================================
-- USER_CEMETERIES (user submitted)
-- ============================================
ALTER TABLE user_cemeteries ENABLE ROW LEVEL SECURITY;

CREATE POLICY user_cemeteries_select ON user_cemeteries
  FOR SELECT USING (user_id = auth.user_id() OR status = 'approved' OR auth.is_admin());

CREATE POLICY user_cemeteries_insert_auth ON user_cemeteries
  FOR INSERT WITH CHECK (user_id = auth.user_id());

CREATE POLICY user_cemeteries_update_own ON user_cemeteries
  FOR UPDATE USING (user_id = auth.user_id() AND status = 'pending')
  WITH CHECK (user_id = auth.user_id());

CREATE POLICY user_cemeteries_admin_all ON user_cemeteries
  FOR ALL USING (auth.is_admin());

-- ============================================
-- USER_FAVORITES_BY_SLUG (user's own only)
-- ============================================
ALTER TABLE user_favorites_by_slug ENABLE ROW LEVEL SECURITY;

CREATE POLICY user_favorites_by_slug_select_own ON user_favorites_by_slug
  FOR SELECT USING (user_id = auth.user_id() OR auth.is_admin());

CREATE POLICY user_favorites_by_slug_insert_own ON user_favorites_by_slug
  FOR INSERT WITH CHECK (user_id = auth.user_id());

CREATE POLICY user_favorites_by_slug_delete_own ON user_favorites_by_slug
  FOR DELETE USING (user_id = auth.user_id());

-- ============================================
-- WEBSITE_FEEDBACK (public insert, admin read)
-- ============================================
ALTER TABLE website_feedback ENABLE ROW LEVEL SECURITY;

CREATE POLICY website_feedback_insert_public ON website_feedback
  FOR INSERT WITH CHECK (true);

CREATE POLICY website_feedback_admin_select ON website_feedback
  FOR SELECT USING (auth.is_admin());

CREATE POLICY website_feedback_admin_update ON website_feedback
  FOR UPDATE USING (auth.is_admin());

CREATE POLICY website_feedback_admin_delete ON website_feedback
  FOR DELETE USING (auth.is_admin());
