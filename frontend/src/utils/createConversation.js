export const createConversation = async (userId) => {
  try {
    const res = await fetch(
      `https://backendfinalproject.onrender.com/api/conversations/create`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        //SEND USER ID TO FIND THE RIGHT CONVERSION
        body: JSON.stringify({ userId }),
        credentials: "include",
      }
    );
    const data = await res.json();
    return data;
  } catch (e) {
    console.error(e);
  }
};
