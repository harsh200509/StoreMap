-- StoreMap Database Schema
-- PostgreSQL 16

-- Admins table
CREATE TABLE IF NOT EXISTS admins (
  id SERIAL PRIMARY KEY,
  username VARCHAR(100) UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Store sections (zones on the map)
CREATE TABLE IF NOT EXISTS store_sections (
  id VARCHAR(100) PRIMARY KEY,
  name VARCHAR(200) NOT NULL,
  x FLOAT NOT NULL,
  y FLOAT NOT NULL,
  width FLOAT NOT NULL,
  height FLOAT NOT NULL,
  color VARCHAR(100) DEFAULT '#f1f5f9',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Store racks / aisles
CREATE TABLE IF NOT EXISTS store_racks (
  id VARCHAR(100) PRIMARY KEY,
  name VARCHAR(200) NOT NULL,
  section_id VARCHAR(100) REFERENCES store_sections(id) ON DELETE SET NULL,
  x FLOAT NOT NULL,
  y FLOAT NOT NULL,
  width FLOAT NOT NULL,
  height FLOAT NOT NULL,
  divisions INTEGER DEFAULT 5,
  orientation VARCHAR(20) DEFAULT 'vertical', -- 'vertical' | 'horizontal'
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Products
CREATE TABLE IF NOT EXISTS products (
  id VARCHAR(100) PRIMARY KEY,
  name VARCHAR(300) NOT NULL,
  brand VARCHAR(200),
  category VARCHAR(100),
  price FLOAT NOT NULL DEFAULT 0,
  sku VARCHAR(100),
  status VARCHAR(50) DEFAULT 'Available', -- 'Available' | 'Low Stock' | 'Out of Stock'
  image_url TEXT,
  floor INTEGER DEFAULT 1,
  section_name VARCHAR(200),
  aisle VARCHAR(100),
  rack_id VARCHAR(100) REFERENCES store_racks(id) ON DELETE SET NULL,
  rack_division INTEGER DEFAULT 1, -- which slot/division on the rack (1-based)
  location_x FLOAT,
  location_y FLOAT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Navigation graph nodes
CREATE TABLE IF NOT EXISTS nav_nodes (
  id VARCHAR(100) PRIMARY KEY,
  x FLOAT NOT NULL,
  y FLOAT NOT NULL,
  label TEXT,
  type VARCHAR(50) NOT NULL DEFAULT 'path' -- 'path' | 'product' | 'entrance' | 'checkout'
);

-- Navigation graph edges
CREATE TABLE IF NOT EXISTS nav_edges (
  id SERIAL PRIMARY KEY,
  from_node VARCHAR(100) REFERENCES nav_nodes(id) ON DELETE CASCADE,
  to_node VARCHAR(100) REFERENCES nav_nodes(id) ON DELETE CASCADE,
  distance FLOAT NOT NULL,
  UNIQUE(from_node, to_node)
);

-- Store config (entrance, checkout positions, store name, etc.)
CREATE TABLE IF NOT EXISTS store_config (
  key VARCHAR(100) PRIMARY KEY,
  value JSONB NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Insert default admin (password: storemap123)
-- bcrypt hash of 'storemap123' with 10 rounds
INSERT INTO admins (username, password_hash) 
VALUES ('admin', '$2b$10$rJVNEXVjE2G.vqhMjq7VNOhvdRJzFzGMXBQMN3BZq1rl9cPp1rRBa')
ON CONFLICT (username) DO NOTHING;

-- Insert default store config
INSERT INTO store_config (key, value) VALUES 
  ('entrance', '{"x": 100, "y": 760}'),
  ('checkout', '{"x": 800, "y": 700}'),
  ('store_name', '"DMart Demo Store"'),
  ('store_width', '1000'),
  ('store_height', '800')
ON CONFLICT (key) DO NOTHING;
