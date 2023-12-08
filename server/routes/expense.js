const express = require("express");
const { addExpense, fecth_expenses, delete_expense } = require("../controllers/expense");

const router = express.Router();

router.post("/add-expense",addExpense)
router.get("/fetch-expenses",fecth_expenses)
router.delete("/delete-expense/:id", delete_expense);


module.exports = router;
