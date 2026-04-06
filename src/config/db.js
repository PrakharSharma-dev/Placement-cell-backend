/**
 * PostgreSQL connection pool
 * This file is the single source of DB truth
 */

/*const { Pool } = require("pg");

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "placement_cell",
  password: "prakhar",   // <-- your confirmed password
  port: 5432
}); */
const { Pool } = require("pg");

const pool = new Pool({
  connectionString: process.env.DATABASE_URL || undefined,
  user: process.env.DATABASE_URL ? undefined : "postgres",
  host: process.env.DATABASE_URL ? undefined : "localhost",
  database: process.env.DATABASE_URL ? undefined : "placement_cell",
  password: process.env.DATABASE_URL ? undefined : "prakhar",
  port: process.env.DATABASE_URL ? undefined : 5432,
  ssl: process.env.DATABASE_URL ? { rejectUnauthorized: false } : false,
});

module.exports = pool;

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
