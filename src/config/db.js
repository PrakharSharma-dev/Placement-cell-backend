/**
 * PostgreSQL connection pool
 * This file is the single source of DB truth
 */

const { Pool } = require("pg");

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "placement_cell",
  password: "prakhar",   // <-- your confirmed password
  port: 5432
});

// 🔍 Explicit connection test (IMPORTANT)
(async () => {
  try {
    await pool.query("SELECT 1");
    console.log("✅ PostgreSQL connected successfully");
  } catch (err) {
    console.error("❌ PostgreSQL connection failed");
    console.error(err.message);
  }
})();

module.exports = pool;