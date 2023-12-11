import React from 'react'

const Leaderboard = ({leaderboardData}) => {
  return (
    <div>
      {" "}
      {leaderboardData && leaderboardData?.length > 0 && (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "30px",
            backgroundColor: "#800000",
            padding: "30px",
            textAlign: "center",
            margin: 0,
          }}
        >
          <h3 style={{ textAlign: "center", margin: 0 }}>Ranking</h3>
          <>
            <div
              style={{
                display: "grid",

                gridTemplateColumns: "1fr 1fr 1fr",
                gap: "10px",

                textAlign: "center",
              }}
            >
              <span>No.</span>
              <span>Name</span>
              <span>Expense</span>
            </div>
            {leaderboardData
              ?.sort((a, b) => {
                return b.expense - a.expense;
              })
              ?.map((item, index) => (
                <div
                  key={index}
                  style={{
                    display: "grid",

                    gridTemplateColumns: "1fr 1fr 1fr ",
                    gap: "10px",
                    textAlign: "center",
                  }}
                >
                  <span>{index + 1}</span>
                  <span>{item.name}</span>
                  <span>{item.totalExpenseAmount}</span>
                </div>
              ))}
          </>
        </div>
      )}
    </div>
  );
}

export default Leaderboard