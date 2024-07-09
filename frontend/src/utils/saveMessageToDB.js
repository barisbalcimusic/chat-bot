export const saveMessageToDB = async (post) => {
  try {
    const res = await fetch("http://localhost:3000/api/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(post),
    });
    console.log(res);
    if (!res.ok) {
      throw new Error("Failed to send message");
    }
    // const data = await res.json();
    // return data;
  } catch (error) {
    console.error(`Error: ${error.message}`);
  }
};
