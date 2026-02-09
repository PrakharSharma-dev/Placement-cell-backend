/**
 * Mock external hiring sources
 * In real system → APIs, scraping, feeds
 */

module.exports = [
  {
    company_name: "TechNova",
    company_type: "startup",
    industry: "Software",
    state: "Karnataka",
    city: "Bangalore",
    website: "https://technova.com",
    visited_other_colleges: true,
    job: {
      role: "Backend Intern",
      job_type: "internship",
      is_paid: true,
      location: "Remote",
      source: "Company Website",
      apply_url: "https://technova.com/careers"
    }
  }
];