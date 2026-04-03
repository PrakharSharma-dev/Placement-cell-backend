/**
 * Normalizes and inserts data into PostgreSQL
 */
// src/ingestion/processor.js
const db = require('../config/db');

const processAndSave = async (listings) => {
  let saved = 0;
  let skipped = 0;

  for (const item of listings) {
    try {
      // 1. Upsert into companies
      const companyResult = await db.query(`
        INSERT INTO companies (company_name, company_type, industry, city, state, website, is_hiring)
        VALUES ($1, $2, $3, $4, $5, $6, true)
        ON CONFLICT (company_name)
        DO UPDATE SET 
          is_hiring = true,
          last_hiring_date = CURRENT_DATE
        RETURNING company_id
      `, [
        item.company_name, item.company_type, item.industry,
        item.city, item.state, item.website
      ]);

      const company_id = companyResult.rows[0].company_id;

      // 2. Insert into job_openings
      await db.query(`
        INSERT INTO job_openings (company_id, role, job_type, is_paid, location, source, apply_url)
        VALUES ($1, $2, $3, $4, $5, $6, $7)
      `, [
        company_id, item.role, item.job_type,
        item.is_paid, item.location, item.source, item.apply_url
      ]);

      saved++;
    } catch (err) {
      console.error(`❌ Skipped ${item.company_name}:`, err.message);
      skipped++;
    }
  }

  console.log(`✅ Done — Saved: ${saved}, Skipped: ${skipped}`);
};

module.exports = { processAndSave };