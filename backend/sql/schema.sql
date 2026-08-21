CREATE TABLE IF NOT EXISTS career_applications (
  id SERIAL PRIMARY KEY,
  full_name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(50) NOT NULL,
  job_title VARCHAR(255),
  education VARCHAR(255),
  expertise TEXT,
  message TEXT,
  cv_filename VARCHAR(255),
  cv_path VARCHAR(500),
  cv_url TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE career_applications
  ADD COLUMN IF NOT EXISTS cv_url TEXT;

CREATE TABLE IF NOT EXISTS admin_users (
  id SERIAL PRIMARY KEY,
  full_name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  password_hash VARCHAR(255) NOT NULL,
  role VARCHAR(50) NOT NULL DEFAULT 'user',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_admin_users_email ON admin_users (email);

CREATE TABLE IF NOT EXISTS demos (
  id VARCHAR(120) PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  video_id VARCHAR(64) NOT NULL DEFAULT '',
  youtube_url TEXT NOT NULL DEFAULT '',
  video_url TEXT,
  thumbnail_url TEXT,
  industries JSONB NOT NULL DEFAULT '[]'::jsonb,
  is_public BOOLEAN NOT NULL DEFAULT TRUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE demos
  ADD COLUMN IF NOT EXISTS is_public BOOLEAN NOT NULL DEFAULT TRUE;

ALTER TABLE demos
  ADD COLUMN IF NOT EXISTS video_url TEXT;

ALTER TABLE demos
  ADD COLUMN IF NOT EXISTS thumbnail_url TEXT;

ALTER TABLE demos
  ALTER COLUMN video_id SET DEFAULT '';

ALTER TABLE demos
  ALTER COLUMN youtube_url SET DEFAULT '';

CREATE INDEX IF NOT EXISTS idx_demos_created_at ON demos (created_at DESC);
CREATE INDEX IF NOT EXISTS idx_demos_is_public ON demos (is_public);

CREATE TABLE IF NOT EXISTS demo_tags (
  id SERIAL PRIMARY KEY,
  name VARCHAR(120) NOT NULL UNIQUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_demo_tags_name ON demo_tags (LOWER(name));

CREATE TABLE IF NOT EXISTS blogs (
  id VARCHAR(120) PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT NOT NULL DEFAULT '',
  image_url TEXT NOT NULL DEFAULT '',
  is_public BOOLEAN NOT NULL DEFAULT TRUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE blogs
  ADD COLUMN IF NOT EXISTS is_public BOOLEAN NOT NULL DEFAULT TRUE;

CREATE INDEX IF NOT EXISTS idx_blogs_created_at ON blogs (created_at DESC);
CREATE INDEX IF NOT EXISTS idx_blogs_is_public ON blogs (is_public);

CREATE TABLE IF NOT EXISTS testimonials (
  id VARCHAR(120) PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  title VARCHAR(255) NOT NULL DEFAULT '',
  quote TEXT NOT NULL DEFAULT '',
  full_quote TEXT NOT NULL DEFAULT '',
  logo_url TEXT NOT NULL DEFAULT '',
  profile_url TEXT NOT NULL DEFAULT '',
  sort_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_testimonials_sort_order ON testimonials (sort_order ASC, created_at DESC);

CREATE TABLE IF NOT EXISTS jobs (
  id VARCHAR(120) PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  tag VARCHAR(120) NOT NULL DEFAULT '',
  description TEXT NOT NULL DEFAULT '',
  type VARCHAR(120) NOT NULL DEFAULT 'Full-time',
  location VARCHAR(120) NOT NULL DEFAULT 'Remotely',
  category VARCHAR(255) NOT NULL DEFAULT '',
  category_subtitle VARCHAR(255) NOT NULL DEFAULT '',
  sort_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_jobs_sort_order ON jobs (sort_order ASC, created_at DESC);

