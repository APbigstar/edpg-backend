const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const questionSchema = new mongoose.Schema(
  {
    question: {
      type: String,
      required: true,
    },
    answers: {
      type: Array,
      required: true,
    },
    cases: {
      type: Array,
    },
    category: {
      type: String,
      require: true,
    },
    type: {
      type: String,
      require: true,
    },
  },
  { timestamps: true }
);

const Question = mongoose.model("Question", questionSchema);

module.exports = Question;
