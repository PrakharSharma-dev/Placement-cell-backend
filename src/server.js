console.log("Starting Placement Cell Backend...");

const app = require("./app");

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);

  // Only start cron scheduler in local development
  if (process.env.NODE_ENV !== 'production') {
    const startScheduler = require("./ingestion/scheduler");
    startScheduler(); // 🕐 starts cron ingestion
  }
});
