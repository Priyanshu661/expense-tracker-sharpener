const Expense = require("../models/Expense");

const addExpense = async (req, res) => {
  try {
    const { amount, description, category } = req.body;

    const expense = new Expense({
      amount,
      description,
      category,
      UserId: req.user.id,
    });

    await expense.save();

    return res.status(200).json({ message: "Expense Added" });
  } catch (e) {
    console.log(e);
    return res.status(400).json({ message: "Server Error" });
  }
};

const fecth_expenses = async (req, res) => {
  try {
    const expenses = await Expense.findAll({
      where:{
        UserId:req.user.id
      }
    });

    return res.status(200).json({ data: expenses });
  } catch (e) {
    console.log(e);
    return res.status(400).json({ message: "Server Error" });
  }
};

const delete_expense = async (req, res) => {
  try {
    const id = req.params.id;

    const result = await Expense.destroy({
      where: {
        UserId: req.user.id,
        id: id,
      },
    });

    if (!result) {
      return res
        .status(400)
        .json({ message: "You are not allowed to delete this expense" });
    }

    return res.status(200).json({ message: "Expense Deleted" });
  } catch (e) {
    console.log(e);
    return res.status(400).json({ message: "Server Error" });
  }
};

module.exports = {
  addExpense,
  fecth_expenses,
  delete_expense,
};
