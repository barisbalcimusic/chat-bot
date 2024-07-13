export const login = async (post) => {
  try {
    const res = await fetch("http://localhost:3000/api/users/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(post),
    });
    //IF LOGIN INVALID RETURN UNDEFINED
    if (!res.ok) {
      return undefined;
    }
    const data = await res.json();
    return data;
  } catch (e) {
    console.error(e);
  }
};
