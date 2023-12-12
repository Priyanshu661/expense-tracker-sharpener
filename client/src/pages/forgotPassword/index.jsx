import React, { useState } from "react";
import Style from "../login/index.module.css";
import { forgot_password } from "@/controllers/auth";

const ForgotPassword = () => {
  const [details, setDetails] = useState({
    email: "",
  });

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
    forgot_password({email:details.email})
      .then((res) => console.log(res))
      .catch((e) => {
        console.log(e);
      });
  };

  return (
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

      <button onClick={handleSubmit} className={Style.btn}>
        Submit
      </button>
    </div>
  );
};

export default ForgotPassword;
