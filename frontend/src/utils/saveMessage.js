export const saveMessage = async (post) => {
  try {
    const res = await fetch(
      `http://localhost:3000/api/conversations/messages`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(post),
        credentials: "include",
      }
    );
    const data = await res.json();
    return data;
  } catch (e) {
    console.error(e);
  }
};
