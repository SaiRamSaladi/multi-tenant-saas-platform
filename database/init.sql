-- CREATE TABLES
CREATE TABLE tenants (
  id UUID PRIMARY KEY,
  name VARCHAR(255),
  subdomain VARCHAR(100),
  status VARCHAR(20),
  subscription_plan VARCHAR(20),
  max_users INT,
  max_projects INT
);

CREATE TABLE users (
  id UUID PRIMARY KEY,
  tenant_id UUID,
  email VARCHAR(255),
  password_hash VARCHAR(255),
  full_name VARCHAR(255),
  role VARCHAR(20),
  is_active BOOLEAN
);

CREATE TABLE projects (
  id UUID PRIMARY KEY,
  tenant_id UUID,
  name VARCHAR(255),
  description TEXT,
  status VARCHAR(20),
  created_by UUID
);

CREATE TABLE tasks (
  id UUID PRIMARY KEY,
  project_id UUID,
  tenant_id UUID,
  title VARCHAR(255),
  description TEXT,
  priority VARCHAR(20),
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
