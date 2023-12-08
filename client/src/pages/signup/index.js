import React, { useState } from 'react'

import Style from "./index.module.css"
import { signup } from '@/controllers/auth';
import { useRouter } from 'next/router';

const Signup = () => {

    const [details, setDetails] = useState({
      name: "",
      email: "",
      password: "",
      phone: "",
    });

    const router=useRouter()
  

const handleChange=(e)=>{
    const {name,value}=e.target;

    setDetails((prev)=>{
        return {
            ...prev,
            [name]:value
        }
    })


}


const handleSubmit=()=>{
  signup(details).then((res)=>{
    if(res?.error){
      console.log(res?.error)
    }else{
      console.log(res?.message)
    }
  })
}


  return (
    <div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "30px",
          maxWidth: "500px",
          margin: "auto",
          padding: "20px",
          alignItems: "center",
          border: "2px solid black",
          marginTop: "30px",
          backgroundColor: "aqua",
        }}
      >
        <label className={Style.label}>
          <span>Name:</span>
          <input
            className={Style.input}
            type="text"
            name="name"
            placeholder="enter your full name"
            onChange={handleChange}
          ></input>
        </label>

        <label className={Style.label}>
          Email:
          <input
            className={Style.input}
            onChange={handleChange}
            type="email"
            name="email"
            placeholder="enter your email address"
          ></input>
        </label>

        <label className={Style.label}>
          Phone Number:
          <input
            onChange={handleChange}
            className={Style.input}
            type="phone"
            name="phone"
            placeholder="enter your phone number"
          ></input>
        </label>

        <label className={Style.label}>
          Password:
          <input
            onChange={handleChange}
            className={Style.input}
            type="password"
            name="password"
            placeholder="enter your password"
          ></input>
        </label>
        <div style={{ display: "flex", gap: "20px" }}>
          <button onClick={handleSubmit} className={Style.btn}>
            Sign Up
          </button>
          <button onClick={() => router.push("/login")} className={Style.btn}>
            Already Have Account?
          </button>
        </div>
      </div>
    </div>
  );
}

export default Signup