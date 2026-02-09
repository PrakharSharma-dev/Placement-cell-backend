/**
 * Cron-based scheduler
 * Runs ingestion automatically
 */

const cron = require("node-cron");
const { fetchHiringData } = require("./fetcher");
const { processHiringData } = require("./processor");

module.exports = () => {
  cron.schedule("*/1 * * * *", async () => {
    console.log("Running scheduled ingestion job...");
    const data = await fetchHiringData();
    await processHiringData(data);
  });
};