export const getConversation = async (userId) => {
  try {
    const res = await fetch(
      //* CAN BE IMPROVED
      `http://localhost:3000/api/conversations/${userId}`
    );
    if (!res.ok) {
      //IF NO CONVERSATION FOUND RETURN UNDEFINED
      return undefined;
    }
    const data = await res.json();
    return data;
  } catch (e) {
    console.error(e);
  }
};
