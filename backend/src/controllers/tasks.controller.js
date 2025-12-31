const pool = require("../config/db");
const { v4: uuidv4 } = require("uuid");

exports.listTasks = async (req, res) => {
  const { projectId } = req.params;
  const tenantId = req.user.tenantId;

  const result = await pool.query(
    "SELECT * FROM tasks WHERE project_id=$1 AND tenant_id=$2",
    [projectId, tenantId]
  );

  res.json({ success: true, data: result.rows });
};

const logAudit = require("../utils/audit");

exports.createTask = async (req, res) => {
  const { title, description, priority } = req.body;
  const { projectId } = req.params;

  const project = await pool.query(
    "SELECT tenant_id FROM projects WHERE id=$1",
    [projectId]
  );

  if (!project.rows.length) {
    return res.status(404).json({ success: false, message: "Project not found" });
  }

  if (project.rows[0].tenant_id !== req.user.tenantId) {
    return res.status(403).json({ success: false, message: "Cross-tenant access denied" });
  }

  const id = uuidv4();
  const tenantId = project.rows[0].tenant_id;

  await pool.query(
    `INSERT INTO tasks (id, project_id, tenant_id, title, description, priority)
     VALUES ($1,$2,$3,$4,$5,$6)`,
    [id, projectId, tenantId, title, description, priority || "medium"]
  );

  await logAudit({
    tenantId,
    userId: req.user.userId,
    action: "CREATE_TASK",
    entityType: "task",
    entityId: id,
    ip: req.ip
  });

  res.status(201).json({ success: true, message: "Task created" });
};
