-- Social media posts cache for oEmbed feed
CREATE TABLE IF NOT EXISTS social_posts (
  id TEXT PRIMARY KEY,
  platform TEXT NOT NULL CHECK (platform IN ('instagram', 'facebook', 'tiktok', 'youtube')),
  url TEXT NOT NULL,
  thumbnail TEXT,
  caption TEXT,
  embed_html TEXT,
  posted_at TIMESTAMPTZ,
  fetched_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE social_posts ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read access" ON social_posts FOR SELECT USING (true);
