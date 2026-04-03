// src/ingestion/sources.js
const SOURCES = [
  {
    name: 'Internshala',
    url: 'https://internshala.com/internships/ajax/computer-science-internship',
    job_type: 'internship',
    type: 'api'   // ← flag to use API method
  },
  {
    name: 'Internshala-Fulltime',
    url: 'https://internshala.com/jobs/ajax/computer-science-jobs',
    job_type: 'fulltime',
    type: 'api'
  }
];

module.exports = SOURCES;