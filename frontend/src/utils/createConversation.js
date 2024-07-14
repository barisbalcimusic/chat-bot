export const createConversation = async (userId) => {
  try {
    const res = await fetch(`http://localhost:3000/api/conversations/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      //SEND USER ID TO FIND THE RIGHT CONVERSION
      body: JSON.stringify({ userId }),
      credentials: "include",
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
