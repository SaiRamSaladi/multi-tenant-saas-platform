const fs = require("fs");
const path = require("path");
const pool = require("../src/config/db");

async function run() {
  const migration = fs.readFileSync(
    path.join(__dirname, "../migrations/001_create_tables.sql"),
    "utf8"
  );

  const seed = fs.readFileSync(
    path.join(__dirname, "../seeds/seed_data.sql"),
    "utf8"
  );

  await pool.query(migration);
  await pool.query(seed);

  console.log("✅ Database initialized");
  process.exit();
}

run().catch(err => {
  console.error(err);
  process.exit(1);
});
