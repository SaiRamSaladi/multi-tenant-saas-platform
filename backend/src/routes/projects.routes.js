const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const controller = require("../controllers/projects.controller");

router.get("/", auth, controller.listProjects);
router.post("/", auth, controller.createProject);

module.exports = router;
