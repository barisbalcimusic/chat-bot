export const login = async (post) => {
  try {
    const res = await fetch("http://localhost:3000/api/users/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(post),
      //To control whether or not the browser sends credentials, as well as whether the browser respects any Set-Cookie response headers, set the credentials option
      credentials: "include",
    });
    const data = await res.json();
    return data;
  } catch (e) {
    console.error(e);
  }
};
