import React from 'react'
import Expenses from './DayExpenses'
import MonthlyExpenses from './MonthlyExpenses'

const AllExpenses = () => {
  return (
    <div style={{marginBottom: "100px",height: "100%",margin:0}}>
      <div >
        <Expenses />
      </div>

      <div>
        <MonthlyExpenses label={"Yearly Expenses"} />
      </div>

      <div>
        <MonthlyExpenses label={"Monthly Expenses"} />
      </div>
    </div>
  );
}

export default AllExpenses