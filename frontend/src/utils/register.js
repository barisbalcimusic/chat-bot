const apiURL = import.meta.env.VITE_BASE_API_URL;

export const register = async (post) => {
  try {
    const res = await fetch(`${apiURL}/api/users/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(post),
    });
    const data = await res.json();
    return data;
  } catch (e) {
    console.error(e);
  }
};
