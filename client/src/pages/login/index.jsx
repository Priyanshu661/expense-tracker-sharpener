import { useRouter } from 'next/router';
import React, { useState } from 'react'
import Style from "./index.module.css";
import { login } from '@/controllers/auth';


const Login = () => {

      const [details, setDetails] = useState({
       
        email: "",
        password: "",
      
      });

      const router=useRouter()

      const handleChange = (e) => {
        const { name, value } = e.target;

        setDetails((prev) => {
          return {
            ...prev,
            [name]: value,
          };
        });
      };

      const handleSubmit = () => {

        console.log(details)
        login(details).then((res) => {
          if (res?.error) {
            console.log(res)
            // console.log(res?.message);
          } else {
            console.log(res?.message);
          }
        });
      };

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
          Password:
          <input
            onChange={handleChange}
            className={Style.input}
            type="password"
            name="password"
            placeholder="enter your password"
          ></input>
        </label>

        <div style={{display:"flex",gap:"20px"}}>
          <button onClick={handleSubmit} className={Style.btn}>
            Login
          </button>

          <button onClick={() => router.push("/signup")} className={Style.btn}>
            Don't Have Account?
          </button>
        </div>
      </div>
    </div>
  );
}

export default Login