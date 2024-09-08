const apiURL = import.meta.env.VITE_BASE_API_URL;

export const logout = async () => {
  try {
    const res = await fetch(`${apiURL}/api/users/logout`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });
    const data = await res.json();
    return data;
  } catch (e) {
    console.error(e);
  }
};
