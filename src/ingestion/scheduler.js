/**
 * Cron-based scheduler
 * Runs ingestion automatically
 */
// src/ingestion/scheduler.js
const cron = require('node-cron');
const { fetchAll }       = require('./fetcher');
const { processAndSave } = require('./processor');

const runIngestion = async () => {
  console.log('🚀 Ingestion started:', new Date().toLocaleString());
  const listings = await fetchAll();
  await processAndSave(listings);
  console.log('✅ Ingestion complete');
};

// Run once immediately when server starts
runIngestion();

// Then every day at 8 AM
cron.schedule('0 8 * * *', runIngestion);

// ✅ Fix - exports the function directly
module.exports = runIngestion;