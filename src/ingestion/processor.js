/**
 * Normalizes and inserts data into PostgreSQL
 */

const pool = require("../config/db");

exports.processHiringData = async (data) => {
  for (const item of data) {
    const companyResult = await pool.query(
      `INSERT INTO companies
       (company_name, company_type, industry, state, city, website, is_hiring, last_hiring_date, visited_other_colleges)
       VALUES ($1,$2,$3,$4,$5,$6,true,CURRENT_DATE,$7)
       ON CONFLICT (company_name) DO UPDATE
       SET is_hiring = true, last_hiring_date = CURRENT_DATE
       RETURNING company_id`,
      [
        item.company_name,
        item.company_type,
        item.industry,
        item.state,
        item.city,
        item.website,
        item.visited_other_colleges
      ]
    );

    const companyId = companyResult.rows[0].company_id;

    await pool.query(
      `INSERT INTO job_openings
       (company_id, role, job_type, is_paid, location, source, apply_url)
       VALUES ($1,$2,$3,$4,$5,$6,$7)`,
      [
        companyId,
        item.job.role,
        item.job.job_type,
        item.job.is_paid,
        item.job.location,
        item.job.source,
        item.job.apply_url
      ]
    );
  }

  console.log("Hiring data processed successfully");
};