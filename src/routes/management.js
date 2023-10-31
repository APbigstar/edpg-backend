const express = require("express");

const {
  getAdmins,
  getUserPerformance,
  deleteUser,
  updateUser,
} = require("../controllers/admin/management.js");

const router = express.Router();

// Routes
router.get("/admins", getAdmins);
router.get("/performance/:id", getUserPerformance);
router.delete("/user/:id", deleteUser);
router.put("/user/:id", updateUser);

module.exports = router;
