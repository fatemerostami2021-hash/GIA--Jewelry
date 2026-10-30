DROP TABLE IF EXISTS gems;
CREATE TABLE gems (
  id SERIAL PRIMARY KEY,
  slug TEXT UNIQUE NOT NULL,
  category TEXT NOT NULL,
  name_en TEXT NOT NULL, name_fa TEXT NOT NULL,
  stone_type_en TEXT, stone_type_fa TEXT,
  color_en TEXT, color_fa TEXT,
  carat NUMERIC(8,2) NOT NULL,
  clarity_en TEXT, clarity_fa TEXT,
  cut_en TEXT, cut_fa TEXT,
  origin_en TEXT, origin_fa TEXT,
  made_en TEXT, made_fa TEXT,
  is_natural BOOLEAN NOT NULL DEFAULT true,
  treatment_en TEXT, treatment_fa TEXT,
  cert_no TEXT,
  lab TEXT,
  price_usd NUMERIC(14,2) NOT NULL,
  price_note_en TEXT, price_note_fa TEXT,
  stock_en TEXT, stock_fa TEXT,
  hex TEXT NOT NULL DEFAULT '#d8b26a',
  image TEXT NOT NULL,
  model_url TEXT,
  video_url TEXT,
  links JSONB NOT NULL DEFAULT '[]',
  description_en TEXT, description_fa TEXT,
  featured BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE TABLE IF NOT EXISTS inquiries (
  id SERIAL PRIMARY KEY,
  type TEXT NOT NULL DEFAULT 'contact',
  name TEXT NOT NULL, email TEXT, phone TEXT, message TEXT, gem_slug TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
