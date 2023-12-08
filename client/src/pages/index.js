import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import { useEffect, useState } from 'react'
import Style from "./index.module.css"
import { addExpense, deleteExpense, fetchExpenses } from '@/controllers/expense'
import { useRouter } from 'next/router'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {

  const [details,setDetails]=useState({
    amount:null,
    description:"",
    category:""
  })

  const [expenseData,setExpenseData]=useState([])

  const [run,setRun]=useState(false)

  const router=useRouter()

useEffect(()=>{
  if(!localStorage.getItem("token")){
      router.replace("/login")
  }
},[])

  const handleChange=(e)=>{
    const {name,value}=e.target

    setDetails((prev)=>{
      return {
        ...prev,
        [name]:value
      }
    })
  }

  const handleAddExpense=()=>{
addExpense(details).then((res)=>{
  setRun(!run)
})

  }


  useEffect(()=>{
    fetchExpenses().then((res)=>{

      if(res?.data){
        setExpenseData(res.data)
      }
      console.log(res)
    })
  },[run])


  const handleDeleteExpense=(id)=>{
    deleteExpense(id).then((res)=>{
      console.log(res)
      setRun(!run)
    })
  }



  return (
    <>
      <div className={Style.container}>
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
    </>
  );
}
