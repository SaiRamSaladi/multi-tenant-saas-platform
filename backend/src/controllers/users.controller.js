const pool = require("../config/db");
const bcrypt = require("bcrypt");
const { v4: uuidv4 } = require("uuid");

exports.listUsers = async (req, res) => {
  const tenantId = req.user.tenantId;

  const result = await pool.query(
    "SELECT id,email,full_name,role,is_active,created_at FROM users WHERE tenant_id=$1",
    [tenantId]
  );

  res.json({ success: true, data: result.rows });
};


const logAudit = require("../utils/audit");

exports.createUser = async (req, res) => {
  if (req.user.role !== "tenant_admin") {
    return res.status(403).json({ success: false, message: "Only tenant admin allowed" });
  }

  const { email, password, fullName, role = "user" } = req.body;
  const tenantId = req.user.tenantId;

  const count = await pool.query(
    "SELECT COUNT(*) FROM users WHERE tenant_id=$1",
    [tenantId]
  );

  const tenant = await pool.query(
    "SELECT max_users FROM tenants WHERE id=$1",
    [tenantId]
  );

  if (parseInt(count.rows[0].count) >= tenant.rows[0].max_users) {
    return res.status(403).json({ success: false, message: "User limit reached" });
  }

  const hash = await bcrypt.hash(password, 10);
  const id = uuidv4();

  await pool.query(
    `INSERT INTO users (id, tenant_id, email, password_hash, full_name, role)
     VALUES ($1,$2,$3,$4,$5,$6)`,
    [id, tenantId, email, hash, fullName, role]
  );

  await logAudit({
    tenantId,
    userId: req.user.userId,
    action: "CREATE_USER",
    entityType: "user",
    entityId: id,
    ip: req.ip
  });

  res.status(201).json({ success: true, message: "User created" });
};
