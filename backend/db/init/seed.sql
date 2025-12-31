-- EXTENSION
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- TENANTS
CREATE TABLE IF NOT EXISTS tenants (
  id UUID PRIMARY KEY,
  name VARCHAR NOT NULL,
  subdomain VARCHAR UNIQUE NOT NULL,
  status VARCHAR,
  subscription_plan VARCHAR,
  max_users INT,
  max_projects INT
);

-- USERS
CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY,
  tenant_id UUID NULL,
  email VARCHAR NOT NULL,
  password_hash VARCHAR NOT NULL,
  full_name VARCHAR NOT NULL,
  role VARCHAR NOT NULL,
  is_active BOOLEAN DEFAULT true
);

-- PROJECTS
CREATE TABLE IF NOT EXISTS projects (
  id UUID PRIMARY KEY,
  tenant_id UUID,
  name VARCHAR,
  description TEXT,
  status VARCHAR,
  created_by UUID
);

-- TASKS
CREATE TABLE IF NOT EXISTS tasks (
  id UUID PRIMARY KEY,
  project_id UUID,
  tenant_id UUID,
  title VARCHAR,
  description TEXT,
  priority VARCHAR,
  assigned_to UUID
);

-- SUPER ADMIN (password = Admin@123)
INSERT INTO users VALUES (
  '11111111-1111-1111-1111-111111111111',
  NULL,
  'superadmin@system.com',
  '$2b$10$u1rU4Y5zJm9B4zZ0g1l9FezWZ4wZz1rQ2E7J8lYw2kJz2n8gkFq3K',
  'System Admin',
  'super_admin',
  true
);

-- TENANT
INSERT INTO tenants VALUES (
  '22222222-2222-2222-2222-222222222222',
  'Demo Company',
  'demo',
  'active',
  'pro',
  25,
  15
);

-- TENANT ADMIN (password = Admin@123)
INSERT INTO users VALUES (
  '33333333-3333-3333-3333-333333333333',
  '22222222-2222-2222-2222-222222222222',
  'admin@demo.com',
  '$2b$10$u1rU4Y5zJm9B4zZ0g1l9FezWZ4wZz1rQ2E7J8lYw2kJz2n8gkFq3K',
  'Demo Admin',
  'tenant_admin',
  true
);
