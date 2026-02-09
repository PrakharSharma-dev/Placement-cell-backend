/**
 * Job & internship-related API routes
 */

const express = require("express");
const router = express.Router();
const controller = require("../controllers/job.controller");

router.get("/", controller.getJobs);

module.exports = router;