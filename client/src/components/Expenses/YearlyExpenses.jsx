import React from "react";

import Style from "./Expenses.module.css";

const YearlyExpenses = ({
  label,
  yearlyExpenseAMount

}) => {

    console.log(yearlyExpenseAMount)
  return (
    <div className={Style.container}>
      <h3 style={{ textAlign: "Center" }}>{label}</h3>
      <div className={Style.monthlytableHeaders}>
        <span className={Style.headerStyle}>Year</span>
        <span className={Style.headerStyle}>Expense</span>
        {/* <span className={Style.headerStyle}>Savings</span> */}
      </div>

      <div className={Style.monthlytableDataOdd}>
        <span className={Style.headerStyle}>{new Date().getFullYear()}</span>
        <span className={Style.headerStyle}>
          {
            yearlyExpenseAMount?.length>0 && yearlyExpenseAMount[0]?.total_expense
          }
        </span>
        {/* <span className={Style.headerStyle}>Category</span> */}
      </div>
    </div>
  );
};

export default YearlyExpenses;

