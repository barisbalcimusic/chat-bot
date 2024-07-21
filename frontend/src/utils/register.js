export const register = async (post) => {
  try {
    const res = await fetch(
      "https://backendfinalproject.onrender.com/api/users/register",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(post),
      }
    );
    const data = await res.json();
    return data;
  } catch (e) {
    console.error(e);
  }
};
