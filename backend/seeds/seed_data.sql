-- SUPER ADMIN
INSERT INTO users VALUES (
  '11111111-1111-1111-1111-111111111111',
  NULL,
  'superadmin@system.com',
  '$2b$10$u1rU4Y5zJm9B4zZ0g1l9FezWZ4wZz1rQ2E7J8lYw2kJz2n8gkFq3K',
  'System Admin',
  'super_admin',
  true,
  NOW()
);

-- TENANT
INSERT INTO tenants VALUES (
  '22222222-2222-2222-2222-222222222222',
  'Demo Company',
  'demo',
  'active',
  'pro',
  25,
  15,
  NOW()
);

-- TENANT ADMIN
INSERT INTO users VALUES (
  '33333333-3333-3333-3333-333333333333',
  '22222222-2222-2222-2222-222222222222',
  'admin@demo.com',
  '$2b$10$u1rU4Y5zJm9B4zZ0g1l9FezWZ4wZz1rQ2E7J8lYw2kJz2n8gkFq3K',
  'Demo Admin',
  'tenant_admin',
  true,
  NOW()
);
