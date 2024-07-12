export const getConversation = async (userId) => {
  try {
    const res = await fetch(
      `http://localhost:3000/api/conversations/${userId}`
    );
    if (!res.ok) {
      throw new Error("Failed to create conversation");
    }
    const data = await res.json();
    return data;
  } catch (e) {
    console.error(e);
  }
};
