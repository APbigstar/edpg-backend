const express = require("express");

const {
  getAdmins,
  deleteUser,
  updateUser,
  saveUser,
  getQuestions,
  updateQuestion,
  saveQuestion,
  deleteQuestion,
  saveScore,
  getScores,
} = require("../controllers/admin/management.js");

const router = express.Router();

// Routes
router.get("/admins", getAdmins);
router.delete("/user/:id", deleteUser);
router.put("/user/:id", updateUser);
router.post("/user", saveUser);

router.get("/questions", getQuestions);
router.put("/question/:id", updateQuestion);
router.post("/question", saveQuestion);
router.delete("/question/:id", deleteQuestion);

router.get("/scores", getScores);
router.post("/save-score", saveScore);

module.exports = router;
