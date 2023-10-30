const express = require("express");
const { SignUp, Login } = require("../controllers/authController");
const { userVerification } = require("../middleware/AuthMiddleware");

const router = express.Router();

router.post("/", userVerification);
router.post("/signup", SignUp);
router.post("/login", Login);

module.exports = router;
