# Placement Cell Company & Hiring Intelligence System – Backend

This repository contains the **backend** for the *Placement Cell Company & Hiring Intelligence System*.

The system is designed **only for placement cell staff**, not for students or recruiters.  
It provides clean REST APIs to power two dashboards:
1. Companies Dashboard
2. Jobs & Internship Openings Dashboard

---

##  Tech Stack

- **Node.js**
- **Express.js**
- **PostgreSQL**
- **pg** (PostgreSQL client)
- **node-cron** (for automated ingestion)
- **CORS enabled**
- REST APIs

---

##  Project Structure
backend/
├── src/
│ ├── config/ # Database configuration
│ ├── routes/ # API routes
│ ├── controllers/ # Business logic
│ ├── ingestion/ # Automated data ingestion pipeline
│ ├── app.js # Express app setup
│ └── server.js # Server entry point
├── schema.sql # PostgreSQL schema
├── package.json
└── README.md

---

## 🧠 Core Features

### 1. Companies Dashboard Support
- List all companies
- Startup vs Enterprise classification
- Hiring status
- Last hiring activity
- Companies visiting other colleges
- Dynamic statistics:
  - Total companies
  - Active hiring companies
  - Startups
  - Companies visiting other colleges

### 2. Jobs & Internship Dashboard Support
- List job and internship openings
- Internship / Full-time
- Paid / Unpaid
- Company name
- Location
- Source
- External apply link
- Backend filtering via query parameters

### 3. Automated Data Ingestion
- Cron-based scheduler
- Simulates external hiring data sources
- Inserts and updates company & job data
- Avoids duplicate companies
- Easily extendable to real APIs or scrapers

---

## 🗄 Database Schema

PostgreSQL is used as the database.

Tables:
- `companies`
- `job_openings`

Schema file:  
```sql
schema.sql
