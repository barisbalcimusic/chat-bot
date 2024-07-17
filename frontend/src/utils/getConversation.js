export const getConversation = async (userId) => {
  try {
    const res = await fetch(
      `https://backendfinalproject.onrender.com/api/conversations/get`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        //SEND USER ID TO FIND THE RIGHT CONVERSION
        body: JSON.stringify({ userId }),
        credentials: "include",
      }
    );
    if (!res.ok) {
      //IF NO CONVERSATION FOUND RETURN FALSE
      return false;
    }
    const data = await res.json();
    return data;
  } catch (e) {
    console.error(e);
  }
};
