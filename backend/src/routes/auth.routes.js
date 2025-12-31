const express = require("express");
const router = express.Router();
const controller = require("../controllers/auth.controller");
const auth = require("../middleware/auth");

router.post("/register-tenant", controller.registerTenant);
router.post("/login", controller.login);
router.get("/me", auth, controller.me);

module.exports = router;
