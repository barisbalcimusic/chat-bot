import { selectAPI } from "./selectAPI";

const apiURL = selectAPI();

export const deleteAccount = async (userData) => {
  try {
    const res = await fetch(`${apiURL}/api/users/delete`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      //SEND USER ID TO FIND USER
      body: JSON.stringify(userData),
      credentials: "include",
    });
    const data = await res.json();
    return data;
  } catch (e) {
    console.error(e);
  }
};
