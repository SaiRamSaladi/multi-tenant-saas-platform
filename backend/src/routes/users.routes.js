const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const controller = require("../controllers/users.controller");

router.get("/", auth, controller.listUsers);
router.post("/", auth, controller.createUser);

module.exports = router;
