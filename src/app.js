/**
 * Express app configuration
 * This file ONLY creates and configures the app
 * It does NOT start the server
 */
// src/app.js
// This file creates and EXPORTS the Express application

const express = require("express");
const cors = require("cors");

const companyRoutes = require("./routes/company.routes");
const jobRoutes = require("./routes/job.routes");

const app = express(); // MUST be express()

app.use(cors());
app.use(express.json());

app.use("/api/companies", companyRoutes);
app.use("/api/jobs", jobRoutes);

app.get("/", (req, res) => {
  res.json({ status: "Placement Cell Backend Running" });
});
// app.js — add this line
require('./ingestion/scheduler');
// THIS LINE IS NON-NEGOTIABLE
module.exports = app;