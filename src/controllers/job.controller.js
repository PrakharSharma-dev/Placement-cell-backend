/**
 * Business logic for job & internship dashboard
 */

const pool = require("../config/db");

async function getJobs(req, res) {
  let baseQuery = `
    SELECT j.*, c.company_name
    FROM job_openings j
    JOIN companies c ON j.company_id = c.company_id
    WHERE 1=1
  `;
  const values = [];

  if (req.query.jobType) {
    values.push(req.query.jobType);
    baseQuery += ` AND j.job_type = $${values.length}`;
  }

  if (req.query.isPaid !== undefined) {
    values.push(req.query.isPaid === "true");
    baseQuery += ` AND j.is_paid = $${values.length}`;
  }

  const { rows } = await pool.query(baseQuery, values);
  res.json(rows);
}

module.exports = {
  getJobs,
};