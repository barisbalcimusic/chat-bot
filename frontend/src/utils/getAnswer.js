//!ONLY FOR TESTING
export const getAnswer = async () => {
  try {
    const res = await fetch("https://api.quotable.io/random");

    if (!res.ok) {
      throw new Error("Failed to get messages");
    }
    const data = await res.json();
    return data;
  } catch (e) {
    console.error(e);
  }
};