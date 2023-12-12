import { is_link_active, reset_password } from "@/controllers/auth";
import { useParams } from "next/navigation";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Style from "../login/index.module.css";
const index = () => {
  const router = useRouter();
  const { id } = router.query;


  const [details, setDetails] = useState({
    confirmPassword: "",
    password: "",
  });

  const [isActive, setIsActive] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setDetails((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

useEffect(() => {
  is_link_active(id)
    .then((res) => {
      console.log(res);
      if (res?.message === "Valid") {
        setIsActive(true);
      } else {
        setIsActive(false);
      }
    })
    .catch((e) => {
      setIsActive(false);
    });
}, [id]);

 

  const handleSubmit = () => {
    if (details.password !== details.confirmPassword) {
      console.log("password and confirm password does not match !");
      return;
    }

    reset_password({ id, password: details.password })
      .then((res) => {
        console.log(res);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <div>
      {isActive ? (
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
            Password:
            <input
              onChange={handleChange}
              className={Style.input}
              type="password"
              name="password"
              placeholder="enter your password"
            ></input>
          </label>
          <label className={Style.label}>
            Confirm Password:
            <input
              className={Style.input}
              onChange={handleChange}
              type="password"
              name="confirmPassword"
              placeholder="enter your confirm password"
            ></input>
          </label>
          <button onClick={handleSubmit} className={Style.btn}>
            Submit
          </button>
        </div>
      ) : (
        <div>Hello</div>
      )}
    </div>
  );
};

export default index;
