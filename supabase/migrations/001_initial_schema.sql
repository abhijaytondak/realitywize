-- RealtyWize Database Schema
-- Run this in Supabase SQL Editor to set up your database

-- Properties table
CREATE TABLE properties (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  subtitle TEXT,
  description TEXT DEFAULT '',
  type TEXT NOT NULL CHECK (type IN ('Commercial', 'Industrial', 'Institutional', 'Residential')),
  subtype TEXT NOT NULL,
  transaction_type TEXT NOT NULL CHECK (transaction_type IN ('Sale', 'Lease', 'Pre-Leased')),
  price TEXT,
  area NUMERIC,
  area_type TEXT CHECK (area_type IN ('Acres', 'SqFt', 'SqMt', 'SqYd')),
  facing TEXT,
  floor TEXT,
  bedrooms INTEGER,
  status TEXT CHECK (status IN ('Warm-shell', 'Semi Furnished', 'Furnished', 'Under Construction', 'New', 'Old', 'Bare-Shell')),
  address TEXT NOT NULL DEFAULT '',
  pincode TEXT,
  city TEXT NOT NULL DEFAULT 'Noida',
  state TEXT NOT NULL DEFAULT 'Uttar Pradesh',
  maps_link TEXT,
  tags TEXT[] DEFAULT '{}',
  is_sold BOOLEAN DEFAULT false,
  is_active BOOLEAN DEFAULT true,
  is_featured BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Property images table
CREATE TABLE property_images (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  property_id UUID REFERENCES properties(id) ON DELETE CASCADE,
  url TEXT NOT NULL,
  alt_text TEXT DEFAULT '',
  sort_order INTEGER DEFAULT 0,
  is_primary BOOLEAN DEFAULT false
);

-- Enquiries table
CREATE TABLE enquiries (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  property_id UUID REFERENCES properties(id) ON DELETE SET NULL,
  property_title TEXT,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  message TEXT DEFAULT '',
  status TEXT DEFAULT 'new' CHECK (status IN ('new', 'contacted', 'closed')),
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Site config table
CREATE TABLE site_config (
  key TEXT PRIMARY KEY,
  value JSONB NOT NULL
);

-- Indexes
CREATE INDEX idx_properties_type ON properties(type);
CREATE INDEX idx_properties_active ON properties(is_active);
CREATE INDEX idx_properties_featured ON properties(is_featured);
CREATE INDEX idx_properties_slug ON properties(slug);
CREATE INDEX idx_enquiries_status ON enquiries(status);
CREATE INDEX idx_property_images_property ON property_images(property_id);

-- Row Level Security
ALTER TABLE properties ENABLE ROW LEVEL SECURITY;
ALTER TABLE property_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE enquiries ENABLE ROW LEVEL SECURITY;
ALTER TABLE site_config ENABLE ROW LEVEL SECURITY;

-- Public read access for properties
CREATE POLICY "Properties are viewable by everyone"
  ON properties FOR SELECT USING (true);

-- Public read access for property images
CREATE POLICY "Property images are viewable by everyone"
  ON property_images FOR SELECT USING (true);

-- Public can insert enquiries
CREATE POLICY "Anyone can submit enquiries"
  ON enquiries FOR INSERT WITH CHECK (true);

-- Public read access for site config
CREATE POLICY "Site config is readable by everyone"
  ON site_config FOR SELECT USING (true);

-- Insert default site config
INSERT INTO site_config (key, value) VALUES
  ('contact_phone', '"+91-9876543210"'),
  ('contact_email', '"info@realitywize.com"'),
  ('whatsapp_number', '"919876543210"'),
  ('office_address', '"Plot 22, Sector 150, Noida Expressway, UP 201310"');
