import React from 'react'
import Expenses from './DayExpenses'
import MonthlyExpenses from './MonthlyExpenses'
import YearlyExpenses from './YearlyExpenses';

const AllExpenses = ({ monthlyExpenseAMount,yearlyExpenseAMount}) => {
  return (
    <div
      style={{
        marginBottom: "100px",
        height: "100%",
        margin: 0,
        color: "black",
      }}
    >
      {/* <div>
        <Expenses />
      </div> */}

      <div>
        <MonthlyExpenses
          monthlyExpenseAMount={monthlyExpenseAMount}
          label={"Yearly Expenses"}
        />
      </div>

      <div>
        <YearlyExpenses
          yearlyExpenseAMount={yearlyExpenseAMount}
          label={"Monthly Expenses"}
        />
      </div>
    </div>
  );
}

export default AllExpenses