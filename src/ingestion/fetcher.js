/**
 * Simulates fetching external hiring data
 */

const sources = require("./sources");

exports.fetchHiringData = async () => {
  console.log("Fetching hiring data from external sources...");
  return sources;
};