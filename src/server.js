console.log("Starting Placement Cell Backend...");

const app = require("./app");
const startScheduler = require("./ingestion/scheduler");

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  startScheduler(); // ⏱️ starts cron ingestion
});