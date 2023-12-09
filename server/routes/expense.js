const express = require("express");
const { addExpense, fecth_expenses, delete_expense } = require("../controllers/expense");
const { authenticate } = require("../middlewares/auth");

const router = express.Router();

router.post("/add-expense", authenticate, addExpense);
router.get("/fetch-expenses",authenticate,fecth_expenses)
router.delete("/delete-expense/:id", authenticate, delete_expense);


module.exports = router;
