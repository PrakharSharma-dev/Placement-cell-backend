/**
 * PostgreSQL connection pool
 * This file is the single source of DB truth
 */

const { Pool } = require("pg");

const pool = new Pool(
  process.env.DATABASE_URL
    ? {
        // Production: Neon PostgreSQL via connection string
        connectionString: process.env.DATABASE_URL,
        ssl: { rejectUnauthorized: false },
      }
    : {
        // Local development: hardcoded credentials
        user: "postgres",
        host: "localhost",
        database: "placement_cell",
        password: "prakhar",
        port: 5432,
      }
);

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
