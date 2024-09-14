import { selectAPI } from "./selectAPI";

const apiURL = selectAPI();

export const editProfile = async (email, newEmail) => {
  try {
    const res = await fetch(`${apiURL}/api/users/update`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, newEmail }),
      credentials: "include",
    });
    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.error);
    }
    return data;
  } catch (e) {
    console.error(e);
  }
};
