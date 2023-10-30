const express = require("express");
const { userVerification } = require("../middleware/AuthMiddleware");

const {
  getAdmins,
  getUserPerformance,
} = require("../controllers/admin/management.js");

const router = express.Router();

// Routes
router.get("/admins", getAdmins);
router.get("/performance/:id", getUserPerformance);

module.exports = router;
