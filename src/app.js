// This file creates and EXPORTS the Express application

const express = require("express");
const cors = require("cors");

const companyRoutes = require("./routes/company.routes");
const jobRoutes = require("./routes/job.routes");

const app = express();

app.use(cors({
  origin: [
    "http://localhost:5173",
    "http://localhost:3000",
    "https://placement-cell-frontend-lx17rqfd4-prakhar-s-projects14.vercel.app",
    process.env.FRONTEND_URL,
  ].filter(Boolean),
  credentials: true,
}));

app.use(express.json());

app.use("/api/companies", companyRoutes);
app.use("/api/jobs", jobRoutes);

app.get("/", (req, res) => {
  res.json({ status: "Placement Cell Backend Running" });
});

// Scheduler is handled in server.js only - NOT here
module.exports = app;
