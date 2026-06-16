// This file creates and EXPORTS the Express application

const express = require("express");
const cors = require("cors");

const companyRoutes = require("./routes/company.routes");
const jobRoutes = require("./routes/job.routes");

const app = express();

// Dynamic CORS - handles changing Vercel preview URLs
const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:3000",
];

app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (mobile apps, curl, Postman)
    if (!origin) return callback(null, true);

    // Allow localhost
    if (allowedOrigins.includes(origin)) return callback(null, true);

    // Allow ANY Vercel deployment of your frontend project
    if (origin.match(/https:\/\/placement-cell-frontend.*\.vercel\.app$/)) {
      return callback(null, true);
    }

    // Allow custom domain if set in env
    if (process.env.FRONTEND_URL && origin === process.env.FRONTEND_URL) {
      return callback(null, true);
    }

    callback(new Error("Not allowed by CORS"));
  },
  credentials: true,
}));

app.use(express.json());

app.use("/api/companies", companyRoutes);
app.use("/api/jobs", jobRoutes);

app.get("/", (req, res) => {
  res.json({ status: "Placement Cell Backend Running" });
});
// Manual scrape trigger
app.get("/api/trigger-scrape", async (req, res) => {
  try {
    const { fetchAll } = require("./ingestion/fetcher");
    const { processAndSave } = require("./ingestion/processor");

    console.log("Starting manual scrape...");
    const listings = await fetchAll();
    console.log(`Fetched ${listings.length} listings`);
    await processAndSave(listings);

    res.json({
      status: "success",
      message: `Scraped and saved ${listings.length} listings`
    });
  } catch (err) {
    console.error("Scrape failed:", err.message);
    res.status(500).json({ error: err.message });
  }
});
// Scheduler is handled in server.js only - NOT here
module.exports = app;
