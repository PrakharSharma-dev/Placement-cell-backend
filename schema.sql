-- Companies master table
CREATE TABLE IF NOT EXISTS companies (
  company_id SERIAL PRIMARY KEY,
  company_name VARCHAR(255) UNIQUE NOT NULL,
  company_type VARCHAR(50) CHECK (company_type IN ('startup', 'enterprise')),
  industry VARCHAR(100),
  state VARCHAR(100),
  city VARCHAR(100),
  website TEXT,
  is_hiring BOOLEAN DEFAULT false,
  last_hiring_date DATE,
  visited_other_colleges BOOLEAN DEFAULT false
);

-- Job & internship openings table
CREATE TABLE IF NOT EXISTS job_openings (
  job_id SERIAL PRIMARY KEY,
  company_id INTEGER REFERENCES companies(company_id) ON DELETE CASCADE,
  role VARCHAR(255),
  job_type VARCHAR(50) CHECK (job_type IN ('internship', 'fulltime')),
  is_paid BOOLEAN,
  location VARCHAR(255),
  source VARCHAR(255),
  apply_url TEXT,
  posted_date DATE DEFAULT CURRENT_DATE
);