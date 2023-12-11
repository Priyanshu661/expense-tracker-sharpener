import axios from "axios";

export const purchase_premium=async()=>{
     try {
       const response = await axios.get(
         `${process.env.SERVER_URL}/order/purchase-premium`,
         {
           headers: {
             "Content-Type": "application/json",
             Authorization: localStorage.getItem("token"),
           },
         }
       );

       return response.data;
     } catch (e) {
        console.log(e)
       return e;
       
     }
}


export const update_order = async (data) => {
  try {
    const response = await axios.put(
      `${process.env.SERVER_URL}/order/update-order`,
      JSON.stringify(data),
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