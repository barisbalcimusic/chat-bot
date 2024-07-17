export const askChatGPT = async (question) => {
  try {
    const res = await fetch(
      `https://backendfinalproject.onrender.com/api/gpt/`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        //SEND USER ID TO FIND THE RIGHT CONVERSION
        body: JSON.stringify({ question }),
        credentials: "include",
      }
    );
    const data = await res.json();
    return data.answer;
  } catch (e) {
    console.error(e);
  }
};
