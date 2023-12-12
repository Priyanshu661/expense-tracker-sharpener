import styles from "@/styles/Home.module.css";
import { useEffect, useState } from "react";
import Style from "./index.module.css";
import {
  addExpense,
  deleteExpense,
  fetchExpenses,
} from "@/controllers/expense";
import { useRouter } from "next/router";
import { purchase_premium, update_order } from "@/controllers/purchase";
import { NextResponse } from "next/server";
import useRazorpay from "react-razorpay";
import { fecth_leaderboard } from "@/controllers/premium";
import Leaderboard from "@/components/Leaderboard";

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

  const [leaderboardData,setLeaderboardData]=useState([])

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      router.replace("/login");
    }

    setIsPremium(localStorage.getItem("isPremium"));
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

  const [isPremium, setIsPremium] = useState();


  const handleAddExpense = () => {
    addExpense(details).then((res) => {
      setRun(!run);
    });
  };

  useEffect(() => {
    fetchExpenses().then((res) => {
      if (res?.data) {
        setExpenseData(res.data);
      }
    });
  }, [run]);

  const handleDeleteExpense = (id) => {
    deleteExpense(id).then((res) => {
      setRun(!run);
    });
  };

  const handlePayment = () => {
    purchase_premium()
      .then((res) => {
        const options = {
          key: "rzp_test_ZJUohOTiT3FjhE",
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

  const fetchLeaderboard=async()=>{
    fecth_leaderboard().then((res)=>{
      setLeaderboardData(res.data)
    }).catch((e)=>{
      console.log(e)
    })
  }

  console.log(isPremium)

  return (
    <div style={{ display: "flex", flexWrap: "wrap" }}>
      <div className={Style.container}>
        <button className={Style.btn} onClick={fetchLeaderboard}>
          Fetch Leaderboard
        </button>
        <h3>Daily Expense</h3>
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

        {isPremium ? (
          "You are premium User"
        ) : (
          <button className={Style.btn} onClick={handlePayment}>
            Buy Premium
          </button>
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
                  key={index}
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
            </>
          </div>
        )}
      </div>

      <div
        style={{
          margin: 0,
          display: "flex",
          flexDirection: "column",
          gap: "50px",
          width: "500px",

          textAlign: "center",
          padding: "30px",
          color: "white",
        }}
      >
        <Leaderboard leaderboardData={leaderboardData} />
      </div>
    </div>
  );
}
