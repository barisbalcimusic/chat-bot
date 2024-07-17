export const askChatGPT = async (question) => {
  try {
    const res = await fetch(`http://localhost:3000/api/gpt/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      //SEND USER ID TO FIND THE RIGHT CONVERSION
      body: JSON.stringify({ question }),
      credentials: "include",
    });
    const data = await res.json();
    console.log(data);
    return data.answer;
  } catch (e) {
    console.error(e);
  }
};
