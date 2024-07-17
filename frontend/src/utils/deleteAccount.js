export const deleteAccount = async (email) => {
  try {
    const res = await fetch(
      `https://backendfinalproject.onrender.com/api/users/delete`,
      {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        //SEND USER EMAIL TO FIND USER
        body: JSON.stringify({ email }),
        credentials: "include",
      }
    );
    const data = await res.json();
    return data;
  } catch (e) {
    console.error(e);
  }
};
