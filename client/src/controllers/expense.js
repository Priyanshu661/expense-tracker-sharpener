import axios from "axios";

export const addExpense = async (data) => {
  try {
    const response = await axios.post(
      `${process.env.SERVER_URL}/expense/add-expense`,
      JSON.stringify(data),
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return response.data;
  } catch (e) {
    return e.response.data;
  }
};

export const fetchExpenses = async () => {
  try {
    const response = await axios.get(
      `${process.env.SERVER_URL}/expense/fetch-expenses`
    );

    return response.data;
  } catch (e) {
    return e.response.data;
  }
};

export const deleteExpense = async (id) => {
  try {
    const response = await axios.delete(
      `${process.env.SERVER_URL}/expense/delete-expense/${id}`
    );

    return response.data;
  } catch (e) {
    return e.response.data;
  }
};
