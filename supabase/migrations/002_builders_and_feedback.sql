-- Migration: Builder Projects & Feedback tables
-- Run this in Supabase SQL Editor

-- Builder/Investor collaboration projects table
CREATE TABLE builder_projects (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  description TEXT NOT NULL DEFAULT '',
  short_description TEXT DEFAULT '',
  investment_range TEXT NOT NULL,
  min_entry_amount TEXT,
  collaboration_type TEXT DEFAULT 'Joint Venture',
  location TEXT NOT NULL DEFAULT '',
  area TEXT,
  project_type TEXT DEFAULT '',
  highlights TEXT[] DEFAULT '{}',
  image_url TEXT DEFAULT '',
  gallery_images TEXT[] DEFAULT '{}',
  contact_phone TEXT,
  contact_email TEXT,
  is_active BOOLEAN DEFAULT true,
  is_featured BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Feedback table
CREATE TABLE feedback (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT DEFAULT '',
  rating INTEGER CHECK (rating >= 1 AND rating <= 5),
  message TEXT NOT NULL DEFAULT '',
  status TEXT DEFAULT 'new' CHECK (status IN ('new', 'reviewed', 'resolved')),
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Indexes
CREATE INDEX idx_builder_projects_active ON builder_projects(is_active);
CREATE INDEX idx_builder_projects_slug ON builder_projects(slug);
CREATE INDEX idx_builder_projects_featured ON builder_projects(is_featured);
CREATE INDEX idx_feedback_status ON feedback(status);

-- Row Level Security
ALTER TABLE builder_projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE feedback ENABLE ROW LEVEL SECURITY;

-- Public read access for builder projects
CREATE POLICY "Builder projects are viewable by everyone"
  ON builder_projects FOR SELECT USING (true);

-- Public can submit feedback
CREATE POLICY "Anyone can submit feedback"
  ON feedback FOR INSERT WITH CHECK (true);

-- Public can read feedback (for display)
CREATE POLICY "Feedback is readable by everyone"
  ON feedback FOR SELECT USING (true);
