const { Sequelize } = require("sequelize");
const sequilize = require("../database/db");
const Expense = require("../models/Expense");
const User = require("../models/User");

const addExpense = async (req, res) => {
  const t = await sequilize.transaction();
  try {
    const { amount, description, category } = req.body;

    await Expense.create(
      {
        amount,
        description,
        category,
        UserId: req.user.id,
      },
      {
        transaction: t,
      }
    );

    let total_amount = 0;
    if (req.user.totalExpenseAmount) {
      total_amount = Number(req.user.totalExpenseAmount) + Number(amount);
    } else {
      total_amount = Number(amount);
    }

    await User.update(
      {
        totalExpenseAmount: total_amount,
      },
      {
        where: {
          id: req.user.id,
        },
        transaction: t,
      }
    );

    await t.commit();
    return res.status(200).json({ message: "Expense Added" });
  } catch (e) {
    console.log(e);
    await t.rollback();
    return res.status(400).json({ message: "Server Error" });
  }
};

const fecth_expenses = async (req, res) => {
  try {
    const expenses = await Expense.findAll({
      where: {
        UserId: req.user.id,
      },
    });

    return res.status(200).json({ data: expenses });
  } catch (e) {
    console.log(e);
    return res.status(400).json({ message: "Server Error" });
  }
};

const delete_expense = async (req, res) => {
  const t = await sequilize.transaction();
  try {
    const id = req.params.id;

    const expense = await Expense.findOne({
      where: {
        id: id,
      },
    });

    const result = await Expense.destroy({
      where: {
        UserId: req.user.id,
        id: id,
      },
      transaction: t,
    });

    if (!result) {
      return res
        .status(400)
        .json({ message: "You are not allowed to delete this expense" });
    }

    let total_amount = 0;

    total_amount = Number(req.user.totalExpenseAmount) - Number(expense.amount);

    await User.update(
      {
        totalExpenseAmount: total_amount,
      },
      {
        where: {
          id: req.user.id,
        },
        transaction: t,
      }
    );

    await t.commit();

    return res.status(200).json({ message: "Expense Deleted" });
  } catch (e) {
    console.log(e);
    await t.rollback();

    return res.status(400).json({ message: "Server Error" });
  }
};

module.exports = {
  addExpense,
  fecth_expenses,
  delete_expense,
};
