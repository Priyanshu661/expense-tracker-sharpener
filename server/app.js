require("dotenv").config();

const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const sequilize = require("./database/db");
const app = express();

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

const authRoutes = require("./routes/auth");
const expenseRoutes = require("./routes/expense");
const purchaseRoutes = require("./routes/purchase");
const premiumRoutes = require("./routes/premium");


app.use("/auth", authRoutes);
app.use("/expense", expenseRoutes);
app.use("/order", purchaseRoutes);
app.use("/premium", premiumRoutes);


const Expense = require("./models/Expense");
const User = require("./models/User");
const Order = require("./models/Order");

User.hasMany(Expense);
Expense.belongsTo(User);

User.hasMany(Order);
Order.belongsTo(User);

sequilize
  .sync()
  .then((res) => {
    app.listen(5000, () => {
      console.log("port is running on 5000");
    });
    console.log("db connected");
  })
  .catch((e) => {
    console.log(e);
  });
