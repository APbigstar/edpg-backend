const express = require("express");

const {
  getUser,
  getDashboardStats,
} = require("../controllers/admin/general.js");

const router = express.Router();

// Routes
router.get("/user/:id", getUser);
router.get("/dashboard", getDashboardStats);

module.exports = router;
