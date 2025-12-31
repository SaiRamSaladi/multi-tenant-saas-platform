const pool = require("../config/db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { v4: uuidv4 } = require("uuid");

exports.registerTenant = async (req, res) => {
  const { tenantName, subdomain, adminEmail, adminPassword, adminFullName } = req.body;

  try {
    await pool.query("BEGIN");

    const tenantId = uuidv4();
    const adminId = uuidv4();
    const hash = await bcrypt.hash(adminPassword, 10);

    await pool.query(
      `INSERT INTO tenants (id, name, subdomain) VALUES ($1,$2,$3)`,
      [tenantId, tenantName, subdomain]
    );

    await pool.query(
      `INSERT INTO users (id, tenant_id, email, password_hash, full_name, role)
       VALUES ($1,$2,$3,$4,$5,'tenant_admin')`,
      [adminId, tenantId, adminEmail, hash, adminFullName]
    );

    await pool.query("COMMIT");

    res.status(201).json({
      success: true,
      message: "Tenant registered successfully",
      data: { tenantId, subdomain }
    });
  } catch (err) {
    await pool.query("ROLLBACK");
    res.status(400).json({ success: false, message: err.message });
  }
};

exports.login = async (req, res) => {
  const { email, password, tenantSubdomain } = req.body;

  const tenant = await pool.query(
    "SELECT * FROM tenants WHERE subdomain=$1",
    [tenantSubdomain]
  );

  if (!tenant.rows.length) {
    return res.status(404).json({ success: false, message: "Tenant not found" });
  }

  const user = await pool.query(
    "SELECT * FROM users WHERE email=$1 AND tenant_id=$2",
    [email, tenant.rows[0].id]
  );

  if (!user.rows.length) {
    return res.status(401).json({ success: false, message: "Invalid login" });
  }

  const match = await bcrypt.compare(password, user.rows[0].password_hash);
  if (!match) {
    return res.status(401).json({ success: false, message: "Invalid login" });
  }

  const token = jwt.sign(
    { userId: user.rows[0].id, tenantId: user.rows[0].tenant_id, role: user.rows[0].role },
    process.env.JWT_SECRET,
    { expiresIn: "24h" }
  );

  res.json({
    success: true,
    data: {
      token,
      expiresIn: 86400
    }
  });
};

exports.me = async (req, res) => {
  const user = await pool.query(
    "SELECT id,email,full_name,role,is_active FROM users WHERE id=$1",
    [req.user.userId]
  );

  res.json({ success: true, data: user.rows[0] });
};
