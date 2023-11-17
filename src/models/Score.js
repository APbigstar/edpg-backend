const mongoose = require("mongoose");

const scoreSchema = new mongoose.Schema(
  {
    user_id: {
      type: String,
      required: true,
    },
    score: {
      type: Number,
      required: true,
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

const Score = mongoose.model("Score", scoreSchema);

module.exports = Score;
