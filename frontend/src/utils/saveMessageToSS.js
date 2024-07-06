export const saveMessageToSS = (post) => {
  //GET MESSAGES FROM SESSION STORAGE
  const messagesFromSS = JSON.parse(sessionStorage.getItem("messageHistory"));

  sessionStorage.setItem(
    "messageHistory",
    //CHECK IF THE SESSION STORAGE IS EMPTY AND ADD
    JSON.stringify(messagesFromSS ? [...messagesFromSS, post] : [post])
  );
};
