export const register = async (post) => {
  try {
    // if (!post.captchaValue) {
    //   return alert("Please verify the reCAPTCHA!");
    // }
    const res = await fetch("http://localhost:3000/api/users/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(post),
    });
    const data = await res.json();
    return data;
  } catch (e) {
    console.error(e);
  }
};
