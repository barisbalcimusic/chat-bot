export const getAllMessages = async () => {
  try {
    const res = await fetch("http://localhost:3000/api/messages");

    if (!res.ok) {
      throw new Error("Failed to get messages");
    }
    const data = await res.json();
    return data;
  } catch (error) {
    console.error(`Error: ${error.message}`);
  }
};
