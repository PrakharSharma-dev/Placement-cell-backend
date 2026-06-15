/*
 * Express app configuration
 * This file ONLY creates and configures the app
 * It does NOT start the server
 
// src/app.js
// This file creates and EXPORTS the Express application
// This file creates and EXPORTS the Express application

const express = require("express");
const cors = require("cors");

const companyRoutes = require("./routes/company.routes");
const jobRoutes = require("./routes/job.routes");

const app = express(); // MUST be express()

// CORS - allow frontend origins
app.use(cors({
  origin: [
    "http://localhost:5173",          // local Vite dev
    "http://localhost:3000",          // alternate local
    process.env.FRONTEND_URL,         // production frontend (set in Vercel env vars)
  ].filter(Boolean),                  // removes undefined if FRONTEND_URL not set
  credentials: true,
}));

app.use(express.json());

app.use("/api/companies", companyRoutes);
app.use("/api/jobs", jobRoutes);

app.get("/", (req, res) => {
  res.json({ status: "Placement Cell Backend Running" });
});

// Scheduler is handled in server.js only - NOT here
module.exports = app;*/
app.use(cors({
  origin: [
    "http://localhost:5173",
    "http://localhost:3000",
    "https://placement-cell-frontend-lx17rqfd4-prakhar-s-projects14.vercel.app/", // ← your exact frontend URL
  ],
  credentials: true,
}));
