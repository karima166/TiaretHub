-- ═══════════════════════════════════════════════════════════
-- TiaretHub — Database Schema (PostgreSQL)
-- Generated to match SQLAlchemy models
-- ═══════════════════════════════════════════════════════════

-- 1. Create Tables

CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(150) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    role VARCHAR(20) DEFAULT 'client',
    is_active BOOLEAN DEFAULT TRUE,
    is_verified BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    phone VARCHAR(20),
    bio VARCHAR(500),
    city VARCHAR(100) DEFAULT 'Tiaret'
);

CREATE TABLE IF NOT EXISTS categories (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) UNIQUE NOT NULL,
    icon VARCHAR(10) NOT NULL DEFAULT '🔧',
    color VARCHAR(20) NOT NULL DEFAULT '#1a1a2e',
    image_url VARCHAR(500),
    is_active BOOLEAN DEFAULT TRUE,
    display_order INTEGER DEFAULT 0
);

CREATE TABLE IF NOT EXISTS platform_content (
    id SERIAL PRIMARY KEY,
    key VARCHAR(100) UNIQUE NOT NULL,
    value TEXT NOT NULL,
    content_type VARCHAR(50) DEFAULT 'text'
);

-- 2. Initial Data (Seeding)

-- Categories
INSERT INTO categories (name, icon, color, image_url, display_order) VALUES
('Plumbing', '🔧', '#1a1a2e', 'https://images.unsplash.com/photo-1676210134188-4c05dd172f89?q=80', 1),
('Electrical', '⚡', '#1971c2', 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=80', 2),
('Painting', '🎨', '#2f9e44', 'https://images.unsplash.com/photo-1562259929-b4e1fd3aef09?w=400&q=80', 3),
('Carpentry', '🪚', '#7048e8', 'https://images.unsplash.com/photo-1504148455328-c376907d081c?w=400&q=80', 4),
('Air Conditioning', '❄️', '#0ca678', 'https://images.unsplash.com/photo-1737012197886-7d5a52ded45b?q=80', 5),
('Aluminum Joinery', '🪟', '#e64980', 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=400&q=80', 6),
('Gardening', '🌿', '#f76707', 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400&q=80', 7),
('Masonry', '🏗️', '#1a1a2e', 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=400&q=80', 8),
('Sanitary Plumbing', '🛁', '#1a1a2e', 'https://images.unsplash.com/photo-1585704032915-c3400305e979?w=600&q=80', 9),
('Appliance Repair', '🔌', '#1971c2', 'https://images.unsplash.com/photo-1621905251918-48416bd8575a?w=600&q=80', 10)
ON CONFLICT (name) DO NOTHING;

-- Platform Content
INSERT INTO platform_content (key, value) VALUES
('hero_title', 'Find Professional Service Providers'),
('hero_subtitle', 'Across Tiaret Wilaya'),
('hero_description', 'Browse trusted plumbers, electricians, painters and more across Tiaret wilaya. View their profiles and contact them directly — no fees, no hassle.'),
('cta_title', 'Are You a Professional in Tiaret?'),
('cta_description', 'Create your free profile, upload your photos, and start getting contacted by clients across Tiaret wilaya today.')
ON CONFLICT (key) DO NOTHING;

-- Demo Users
INSERT INTO users (email, password_hash, first_name, last_name, role, is_active, is_verified) VALUES
('provider@TiaretHub.dz', 'hashed_pw', 'Karim', 'Boudiaf', 'provider', true, true),
('youcef.bh@email.com', 'hashed_pw', 'Youcef', 'Belhadj', 'provider', true, true),
('fatima.z@email.com', 'hashed_pw', 'Fatima', 'Zerrouki', 'provider', true, false),
('sofiane.m@email.com', 'hashed_pw', 'Sofiane', 'Merabet', 'provider', true, true),
('client@TiaretHub.dz', 'hashed_pw', 'Rachid', 'Bensaid', 'client', true, false)
ON CONFLICT (email) DO NOTHING;
