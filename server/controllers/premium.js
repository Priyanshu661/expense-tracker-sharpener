const User = require("../models/User");
const Expense = require("../models/Expense");

const fetch_leaderboard = async (req, res) => {
  try {
    const userData = await User.findAll();

    const userIds = userData.map((item) => {
      return {
        id: item.id,
        name: item.name,
      };
    });

    const expenseData = await Expense.findAll();

    const data = [];

    for (let i = 0; i < userIds.length; i++) {
      let expense = 0;
      for (let j = 0; j < expenseData.length; j++) {
        if (userIds[i].id === expenseData[j].UserId) {
          expense += expenseData[j].amount;
        }
      }

      data.push({
        name: userIds[i].name,
        expense: expense,
      });
    }

    return res.status(200).json({ data });
  } catch (e) {
    console.log(e);
    return res.status(400).json({ success: false, message: "server error" });
  }
};

module.exports = {
  fetch_leaderboard,
};
