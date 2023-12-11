import axios from "axios";

export const fecth_leaderboard = async () => {
  try {
    const response = await axios.get(
      `${process.env.SERVER_URL}/premium/fetch-leaderboard`,
      
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("token"),
        },
      }
    );

    return response.data;
  } catch (e) {
    console.log(e);
    return e;
  }
};
