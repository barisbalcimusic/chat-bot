export const createConversation = async (userId) => {
  try {
    const res = await fetch(`http://localhost:3000/api/conversations`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId }),
    });
    if (!res.ok) {
      throw new Error("Failed to create conversation");
    }
    const data = await res.json();
    return data;
  } catch (e) {
    console.error(e);
  }
};
