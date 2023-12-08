export const signup = async (data) => {
  try {
    const response = await fetch(`${process.env.SERVER_URL}/auth/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const result = await response.json();

    return result;
  } catch (e) {}
};
