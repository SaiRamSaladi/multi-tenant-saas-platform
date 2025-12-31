-- SUPER ADMIN
INSERT INTO users (
  id, tenant_id, email, password_hash, full_name, role, is_active
) VALUES (
  '11111111-1111-1111-1111-111111111111',
  NULL,
  'superadmin@system.com',
  '$2b$10$u1rU4Y5zJm9B4zZ0g1l9FezWZ4wZz1rQ2E7J8lYw2kJz2n8gkFq3K',
  'System Admin',
  'super_admin',
  true
);

-- TENANT
INSERT INTO tenants (
  id, name, subdomain, status, subscription_plan, max_users, max_projects
) VALUES (
  '22222222-2222-2222-2222-222222222222',
  'Demo Company',
  'demo',
  'active',
  'pro',
  25,
  15
);

-- TENANT ADMIN
INSERT INTO users (
  id, tenant_id, email, password_hash, full_name, role, is_active
) VALUES (
  '33333333-3333-3333-3333-333333333333',
  '22222222-2222-2222-2222-222222222222',
  'admin@demo.com',
  '$2b$10$u1rU4Y5zJm9B4zZ0g1l9FezWZ4wZz1rQ2E7J8lYw2kJz2n8gkFq3K',
  'Demo Admin',
  'tenant_admin',
  true
);
