import axios from "axios";





export const signup = async (data) => {
  try {
    const response = await axios.post(
      `${process.env.SERVER_URL}/auth/signup`,
      JSON.stringify(data),
      {
        headers: {
          "Content-Type": "application/json",
          "Authorization":localStorage.getItem("token")
        },
      }
    );
    // const result = await response.json();

      return response.data;
  } catch (e) {
     return e.response.data;
  }
};

export const login = async (data) => {
  try {
    const response = await axios.post(
      `${process.env.SERVER_URL}/auth/login`,
      JSON.stringify(data),
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("token"),
        },
      }
    );
    // const result = await response.json();

    return response.data;
  } catch (e) {

    return e.response.data
  }
};


export const forgot_password = async (data) => {
  try {
    const response = await axios.post(
      `${process.env.SERVER_URL}/auth/password/forgotpassword`,
      JSON.stringify(data),
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("token"),
        },
      }
    );
    // const result = await response.json();

    return response.data;
  } catch (e) {
    return e.response.data;
  }
};
