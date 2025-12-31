const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const controller = require("../controllers/tasks.controller");

router.get("/:projectId", auth, controller.listTasks);
router.post("/:projectId", auth, controller.createTask);

module.exports = router;
