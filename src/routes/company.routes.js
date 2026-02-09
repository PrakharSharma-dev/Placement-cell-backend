/**
 * Company-related API routes
 */

const express = require("express");
const router = express.Router();
const controller = require("../controllers/company.controller");

router.get("/", controller.getCompanies);
router.get("/stats", controller.getCompanyStats);

module.exports = router;