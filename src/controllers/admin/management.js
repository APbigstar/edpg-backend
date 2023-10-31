const mongoose = require("mongoose");

// Models import
const User = require("../../models/User");
const Transaction = require("../../models/Transaction");

module.exports.getAdmins = async (_, res) => {
  try {
    const admins = await User.find({ role: "admin" }).select("-password");

    res.status(200).json(admins);
  } catch (error) {
    res.status(200).json({ message: error.message });
  }
};

// Get User Performance
module.exports.getUserPerformance = async (req, res) => {
  try {
    const { id } = req.params;

    const userWithStats = await User.aggregate([
      { $match: { _id: new mongoose.Types.ObjectId(id) } }, // Match user id
      {
        // Compare user id with affiliate stats table
        $lookup: {
          from: "affiliatestats",
          localField: "_id",
          foreignField: "userId",
          as: "affiliateStats",
        },
      },
      { $unwind: "$affiliateStats" }, // Flatten Array/Object
    ]);

    // sale transactions
    const saleTransactions = await Promise.all(
      userWithStats[0].affiliateStats.affiliateSales.map((id) => {
        return Transaction.findById(id);
      })
    );

    // filtered sale transactions
    const filteredSaleTransactions = saleTransactions.filter(
      (transaction) => transaction !== null
    );

    res
      .status(200)
      .json({ user: userWithStats[0], sales: filteredSaleTransactions });
  } catch (error) {
    res.status(200).json({ message: error.message });
  }
};

module.exports.updateUser = async (req, res) => {
  try {
    console.log(req.body);
    const user = await User.findByIdAndUpdate(req.params.id, req.body);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(user);
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
