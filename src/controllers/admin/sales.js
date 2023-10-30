// Model import
const OverallStat = require("../../models/OverallStat.js");

// Get Sales
module.exports.getSales = async (_, res) => {
  try {
    const overallStats = await OverallStat.find();

    res.status(200).json(overallStats[0]);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
