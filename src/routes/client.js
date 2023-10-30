const express = require("express");
const { userVerification } = require("../middleware/AuthMiddleware");

const {
  getProducts,
  getCustomers,
  getTransactions,
  getGeography,
} = require("../controllers/admin/client.js");

const router = express.Router();

// Routes
router.get("/products", getProducts);
router.get("/users", getCustomers);
router.get("/transactions", getTransactions);
router.get("/geography", getGeography);

module.exports = router;
