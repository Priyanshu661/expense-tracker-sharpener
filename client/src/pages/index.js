import styles from "@/styles/Home.module.css";
import { useEffect, useState } from "react";
import Style from "./index.module.css";
import {
  addExpense,
  deleteExpense,
  downloadExpenses,
  fetchExpenses,
} from "@/controllers/expense";
import { useRouter } from "next/router";
import { purchase_premium, update_order } from "@/controllers/purchase";
import { NextResponse } from "next/server";
import useRazorpay from "react-razorpay";
import { fecth_leaderboard } from "@/controllers/premium";
import Leaderboard from "@/components/Leaderboard";
import Expenses from "@/components/Expenses/DayExpenses";
import AllExpenses from "@/components/Expenses/AllExpenses";

export default function Home() {
  const [details, setDetails] = useState({
    amount: null,
    description: "",
    category: "",
  });

  const [expenseData, setExpenseData] = useState([]);

  const [run, setRun] = useState(false);

  const router = useRouter();

  const [Razorpay] = useRazorpay();

  const [leaderboardData, setLeaderboardData] = useState([]);


  const [itemsPerPage,setItemsPerPage]=useState(5)
  useEffect(()=>{
    setItemsPerPage(localStorage.getItem("limit"))
  },[])

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      router.replace("/login");
    }

    if (localStorage.getItem("isPremium")) {
      setIsPremium(true);
    }
  }, []);



  const handleChange = (e) => {
    const { name, value } = e.target;

    setDetails((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const [isPremium, setIsPremium] = useState(false);
  const [expenseForm, setExpenseForm] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);

  const [previousPage, setPreviousPage] = useState(currentPage - 1);

  const [nextPage, setNextPage] = useState(currentPage + 1);

  const [expenseCount, setExpenseCount] = useState(0);

  const [monthlyExpenseAMount,setMonthlyExpenseAmount]=useState([])
  const [yearlyExpenseAMount, setYearlyExpenseAmount] = useState([]);


  const handleAddExpense = () => {
    addExpense(details).then((res) => {
      setRun(!run);
      setExpenseForm(false);
      setDetails({
        amount: null,
        description: "",
        category: "",
      });
    });
  };

  useEffect(() => {
    fetchExpenses(currentPage,itemsPerPage)
      .then((res) => {
        if (res?.data) {
          setExpenseData(res.data);
          setMonthlyExpenseAmount(res?.monthlyExpenseAmount)
          setYearlyExpenseAmount(res?.yearlyExpenseAmount);

          setExpenseCount(res?.expensesCount);
        } else {
          console.log(res);
        }
      })
      .catch((e) => console.log(e));
  }, [run,currentPage,itemsPerPage]);

  const handleDeleteExpense = (id) => {
    deleteExpense(id).then((res) => {
      setRun(!run);
    });
  };

  const handlePayment = () => {
    purchase_premium()
      .then((res) => {
        const options = {
          key: res.key_id,
          order_id: res.order.id,
          handler: async function (response) {
            update_order(response)
              .then((res) => {
                setIsPremium(true);
                localStorage.setItem("isPremium", true);
                console.log(res);
              })
              .catch((e) => {
                console.log(e);
              });
          },
        };

        const rzp = new Razorpay(options);

        rzp.open();
      })
      .catch((e) => {
        console.error("Error initiating payment:", e);
      });
  };

  const fetchLeaderboard = async () => {
    fecth_leaderboard()
      .then((res) => {
        setLeaderboardData(res.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const download = async () => {
    downloadExpenses().then((res) => {
      if (res?.data?.Location) {
        window.open(res?.data?.Location);
      } else {
        console.log(res);
      }
    });
  };



  return (
    <div>
      <div className={Style.container}>
        <div style={{ display: "flex", gap: "20px" }}>
          {" "}
          {isPremium && (
            <button className={Style.btn} onClick={download}>
              Download Expenses
            </button>
          )}
          {isPremium ? (
            "You are premium User"
          ) : (
            <button className={Style.btn} onClick={handlePayment}>
              Buy Premium
            </button>
          )}
          <button className={Style.btn} onClick={fetchLeaderboard}>
            Fetch Leaderboard
          </button>
          {!expenseForm && (
            <button className={Style.btn} onClick={() => setExpenseForm(true)}>
              Add Expense
            </button>
          )}
        </div>

        <div
          style={{
            margin: 0,
            display: "flex",
            flexDirection: "column",
            gap: "50px",
            maxWidth: "500px",

            textAlign: "center",
            padding: "30px",
            color: "white",
          }}
        >
          <Leaderboard leaderboardData={leaderboardData} />
        </div>
        <h3>Daily Expense</h3>
        {expenseForm && (
          <>
            <label className={Style.label}>
              Amount:
              <input
                type="number"
                name="amount"
                value={details.amount}
                onChange={handleChange}
                className={Style.input}
              ></input>
            </label>

            <label className={Style.label}>
              Description
              <input
                type="text"
                name="description"
                value={details.description}
                onChange={handleChange}
                className={Style.input}
              ></input>
            </label>

            <label className={Style.label}>
              Category:
              <select
                name="category"
                value={details.category}
                onChange={handleChange}
                className={Style.input}
              >
                <option value="">Select Category</option>
                {["Food", "Petrol", "Crcicket"].map((item, index) => (
                  <option value={item}>{item}</option>
                ))}
              </select>
            </label>

            <button className={Style.btn} onClick={handleAddExpense}>
              Add Expense
            </button>
          </>
        )}

        {expenseData && expenseData?.length > 0 && (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "30px",
              backgroundColor: "brown",
              padding: "20px",
            }}
          >
            <div>
            <label>Items Per Page</label>
              <select 
              value={itemsPerPage}
              onChange={(e)=>{
                
                setItemsPerPage(e.target.value)
                localStorage.setItem("limit", e.target.value);
                
                }}
              >
                {[5, 8, 10].map((item, index) =>(
                  <option key={index} value={item}>
                    {" "}
                    {item}
                  </option>
               ))}
              </select>
            </div>
            <h3 style={{ textAlign: "center" }}>Expenses</h3>
            <>
              <div
                style={{
                  display: "grid",

                  gridTemplateColumns: "1fr 1fr 1fr 1fr",
                  gap: "10px",

                  textAlign: "center",
                }}
              >
                <span>Amount</span>
                <span>Description</span>
                <span>Category</span>
                <span>Action</span>
              </div>
              {expenseData?.map((item, index) => (
                <div
                  key={item.id}
                  style={{
                    display: "grid",

                    gridTemplateColumns: "1fr 1fr 1fr 1fr",
                    gap: "10px",
                    textAlign: "center",
                  }}
                >
                  <span>{item.amount}</span>
                  <span>{item.description}</span>
                  <span>{item.category}</span>
                  <span>
                    <button
                      onClick={() => handleDeleteExpense(item.id)}
                      style={{ backgroundColor: "", cursor: "pointer" }}
                    >
                      X
                    </button>
                  </span>
                </div>
              ))}

              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                  gap: "3px",
                }}
              >
                {currentPage !== 1 && (
                  <button
                    style={{ height: "30px" }}
                    onClick={() => {
                      setCurrentPage(previousPage);
                      setNextPage(nextPage - 1);

                      setPreviousPage(previousPage - 1);
                    }}
                  >
                    {previousPage}
                  </button>
                )}
                <button
                  style={{
                    height: "40px",
                    width: "50px",
                    backgroundColor: "blue",
                    color: "white",
                  }}
                >
                  {currentPage}
                </button>
                {currentPage < Math.ceil(expenseCount / itemsPerPage) && (
                  <button
                    style={{ height: "30px" }}
                    onClick={() => {
                      setPreviousPage(currentPage);
                      setCurrentPage(nextPage);
                      setNextPage(nextPage + 1);
                    }}
                  >
                    {nextPage}
                  </button>
                )}
              </div>
            </>
          </div>
        )}

        <AllExpenses monthlyExpenseAMount={monthlyExpenseAMount} yearlyExpenseAMount={yearlyExpenseAMount} />
      </div>
    </div>
  );
}
// expenseCount / 5;
