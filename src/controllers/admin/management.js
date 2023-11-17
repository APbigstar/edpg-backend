const mongoose = require("mongoose");

// Models import
const User = require("../../models/User");
const Question = require("../../models/Question");
const Score = require("../../models/Score");

module.exports.getAdmins = async (_, res) => {
  try {
    const admins = await User.find({ role: "admin" }).select("-password");

    res.status(200).json(admins);
  } catch (error) {
    res.status(200).json({ message: error.message });
  }
};
module.exports.updateUser = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json({ data: user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
// Delete a user by ID
module.exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndRemove(req.params.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({ message: "User deleted" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
module.exports.saveUser = async (req, res) => {
  try {
    const newUserId = new mongoose.Types.ObjectId();
    const { email, name, role } = req.body;

    role === "user" ? (password = "user") : (password = "admin");

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.json({ message: "User already exists" });
    }

    const user = await User.create({
      _id: newUserId,
      email,
      name,
      role,
      password,
    });

    res.status(201).json({
      message: "User created successfully",
      success: true,
      data: user,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports.getQuestions = async (req, res) => {
  try {
    const { category, type } = req.query;

    console.log(req.query);
    const questions = await Question.find({ category, type });

    console.log(questions);
    res.status(200).json(questions);
  } catch (error) {
    res.status(200).json({ message: error.message });
  }
};
module.exports.updateQuestion = async (req, res) => {
  try {
    const { question, answers, cases, type, category } = req.body;
    const updateData = {
      question,
      answers,
      cases: type === "empty" ? [] : cases,
      type,
      category,
    };
    const inputdata = await Question.findByIdAndUpdate(
      req.params.id,
      updateData
    );
    if (!question) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json({ data: inputdata });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Delete a user by ID
module.exports.deleteQuestion = async (req, res) => {
  try {
    const question = await Question.findByIdAndRemove(req.params.id);

    if (!question) {
      return res.status(404).json({ message: "Question not found" });
    }

    res.json({ message: "Question deleted" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports.saveQuestion = async (req, res) => {
  try {
    const newUserId = new mongoose.Types.ObjectId();
    const { question, answers, cases, type, category } = req.body;

    const existingUser = await User.findOne({ question, type, category });
    if (existingUser) {
      return res.json({ message: "Question already exists" });
    }

    const inputdata = await Question.create({
      _id: newUserId,
      question,
      answers: answers.replace(/\s/g, "").split(","),
      cases: type === "empty" ? [] : cases.replace(/\s/g, "").split(","),
      type,
      category,
    });

    res.status(201).json({
      message: "User created successfully",
      success: true,
      data: inputdata,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports.saveScore = async (req, res) => {
  const { user_id, score, category, type } = req.body;

  console.log(user_id, score, category, type);

  try {
    const existingScore = await Score.findOne({ user_id, category, type });

    if (existingScore) {
      existingScore.score = score;
      await existingScore.save();

      return res
        .status(200)
        .json({ success: true, message: "Score updated successfully." });
    }

    const newScore = new Score({ user_id, score, category, type });
    await newScore.save();

    res
      .status(200)
      .json({ success: true, message: "Score saved successfully." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error." });
  }
};
