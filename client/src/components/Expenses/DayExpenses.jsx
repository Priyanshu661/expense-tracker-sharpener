import React from 'react'

import Style from "./Expenses.module.css"

const Expenses = () => {
  return (
    <div className={Style.container}>
      <h3 style={{ textAlign: "Center" }}>Day to Day Expenses</h3>
      <div className={Style.tableHeaders}>
        <span className={Style.headerStyle}>Date</span>
        <span className={Style.headerStyle}>Description</span>
        <span className={Style.headerStyle}>Category</span>
        <span className={Style.headerStyle}>Income</span>
        <span className={Style.headerStyle}>Expense</span>
      </div>

      <div className={Style.tableDataEven}>
        <span className={Style.headerStyle}>Date</span>
        <span className={Style.headerStyle}>Description</span>
        <span className={Style.headerStyle}>Category</span>
        <span className={Style.headerStyle}>Income</span>
        <span className={Style.headerStyle}>Expense</span>
      </div>

      <div className={Style.tableDataOdd}>
        <span className={Style.headerStyle}>Date</span>
        <span className={Style.headerStyle}>
          Descggdfgjigigdijgdifgiodjfgodijgdgogdogdigfiption
        </span>
        <span className={Style.headerStyle}>Category</span>
        <span className={Style.headerStyle}>Income</span>
        <span className={Style.headerStyle}>Expense</span>
      </div>
      <span
        style={{ display: "flex", justifyContent: "flex-end" }}
        className={Style.tableDataOdd}
      >
        Expense
      </span>
    </div>
  );
}

export default Expenses



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