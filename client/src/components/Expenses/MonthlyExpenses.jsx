import React from "react";

import Style from "./Expenses.module.css";

const MonthlyExpenses = ({
  label,

  monthlyExpenseAMount,
}) => {

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  return (
    <div className={Style.container} >
      <h3 style={{ textAlign: "Center" }}>{label}</h3>
      <div className={Style.monthlytableHeaders}>
        <span className={Style.headerStyle}>Month</span>
        <span className={Style.headerStyle}>Expense</span>
        {/* <span className={Style.headerStyle}>Savings</span> */}
      </div>

      <div className={Style.monthlytableDataOdd}>
        <span className={Style.headerStyle}>{monthNames[new Date().getMonth()]}</span>
        <span className={Style.headerStyle}>
          {monthlyExpenseAMount?.length > 0 &&
            monthlyExpenseAMount[0]?.total_expense}
        </span>
        {/* <span className={Style.headerStyle}>Category</span> */}
      </div>

      {/* <div className={Style.monthlytableDataOdd}>
        <span className={Style.headerStyle}>Date</span>
        <span className={Style.headerStyle}>
          Descggdfgjiwsasasasdssdsdsasasasasasagigdijgdifgiodjfgodijgdgogdogdigfiption
        </span>
        <span className={Style.headerStyle}>Category</span>
      </div>

      <div className={Style.monthlytableDataOdd}>
        <span className={Style.headerStyle}> Category</span>
        <span className={Style.headerStyle}>
          Descggdfgjigigdijgdifgiodjfgodijgdgogdogdigfiption
        </span>
        <span className={Style.headerStyle}>Category</span>
      </div> */}
    </div>
  );
};

export default MonthlyExpenses;

//  <table style={{ width: "100%", borderCollapse: "collapse" }}>
//         <thead
//           style={{ width: "100%", backgroundColor: "GrayText", color: "white" }}
//         >
//           <tr className={Style.tableRow}>
//             <th className={Style.headerStyle}>Date</th>
//             <th className={Style.headerStyle}>Description</th>
//             <th className={Style.headerStyle}>Category</th>
//             <th className={Style.headerStyle}>Income</th>
//             <th className={Style.headerStyle}>Expense</th>
//           </tr>
//         </thead>
//         <tbody>
//           <tr className={Style.oddRowStyle}>
//             <th className={Style.headerStyle}>Date</th>
//             <th className={Style.headerStyle}>Descripgsdydgasydgauysdgadgagduyadgauadaddadadadygdauydguation</th>
//             <th className={Style.headerStyle}>Category</th>
//             <th className={Style.headerStyle}>Income</th>
//             <th className={Style.headerStyle}>Expense</th>
//           </tr>

//           <tr className={Style.evenRowStyle}>
//             <th className={Style.headerStyle}>Date</th>
//             <th className={Style.headerStyle}>Description</th>
//             <th className={Style.headerStyle}>Category</th>
//             <th className={Style.headerStyle}>Income</th>
//             <th className={Style.headerStyle}>Expense</th>
//           </tr>
//         </tbody>

//       </table>
