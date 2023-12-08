const Sequelize=require("sequelize");


const sequilize = new Sequelize("expense-tracker", "root", "@Pr9617901092", {
  dialect: "mysql",
  host: "localhost",
});


module.exports=sequilize