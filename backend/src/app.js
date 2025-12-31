require("dotenv").config();
const express = require("express");
const cors = require("cors");

const authRoutes = require("./routes/auth.routes");
const userRoutes = require("./routes/users.routes");
const projectRoutes = require("./routes/projects.routes");
const taskRoutes = require("./routes/tasks.routes");

const app = express();

/* ✅ MIDDLEWARE FIRST */
app.use(cors({
  origin: process.env.FRONTEND_URL || "http://localhost:3000"
}));

app.use(express.json());

/* ✅ ROUTES AFTER MIDDLEWARE */
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/tasks", taskRoutes);

/* ✅ HEALTH CHECK */
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", database: "connected" });
});

module.exports = app;
