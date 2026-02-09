/**
 * Business logic for company dashboard
 */

const pool = require("../config/db");

async function getCompanies(req, res) {
  const result = await pool.query("SELECT * FROM companies");
  res.json(result.rows);
}

async function getCompanyStats(req, res) {
  const statsQuery = `
    SELECT
      COUNT(*) AS total_companies,
      COUNT(*) FILTER (WHERE is_hiring = true) AS active_hiring,
      COUNT(*) FILTER (WHERE company_type = 'startup') AS startups,
      COUNT(*) FILTER (WHERE visited_other_colleges = true) AS visited_others
    FROM companies
  `;

  const { rows } = await pool.query(statsQuery);
  res.json(rows[0]);
}

module.exports = {
  getCompanies,
  getCompanyStats,
};
