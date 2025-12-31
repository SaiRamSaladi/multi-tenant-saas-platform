const pool = require("../config/db");
const { v4: uuidv4 } = require("uuid");

exports.listProjects = async (req, res) => {
  const tenantId = req.user.tenantId;

  const result = await pool.query(
    "SELECT * FROM projects WHERE tenant_id=$1 ORDER BY created_at DESC",
    [tenantId]
  );

  res.json({ success: true, data: result.rows });
};

const logAudit = require("../utils/audit");

exports.createProject = async (req, res) => {
  const { name, description } = req.body;
  const tenantId = req.user.tenantId;
  const userId = req.user.userId;

  const count = await pool.query(
    "SELECT COUNT(*) FROM projects WHERE tenant_id=$1",
    [tenantId]
  );

  const tenant = await pool.query(
    "SELECT max_projects FROM tenants WHERE id=$1",
    [tenantId]
  );

  if (parseInt(count.rows[0].count) >= tenant.rows[0].max_projects) {
    return res.status(403).json({ success: false, message: "Project limit reached" });
  }

  const id = uuidv4();

  await pool.query(
    `INSERT INTO projects (id, tenant_id, name, description, created_by)
     VALUES ($1,$2,$3,$4,$5)`,
    [id, tenantId, name, description, userId]
  );

  await logAudit({
    tenantId,
    userId,
    action: "CREATE_PROJECT",
    entityType: "project",
    entityId: id,
    ip: req.ip
  });

  res.status(201).json({ success: true, message: "Project created" });
};
