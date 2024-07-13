export const register = async (post) => {
  try {
    const res = await fetch("http://localhost:3000/api/users/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(post),
    });
    console.log(res);

    const data = await res.json();
    return data;
  } catch (e) {
    console.error(e);
  }
};
