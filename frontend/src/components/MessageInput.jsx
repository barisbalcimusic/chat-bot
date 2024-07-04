import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { saveMessage } from "../utils/saveMessage";
import { sendMessage } from "../utils/sendMessage";

const MessageInput = () => {
  const [message, setMessage] = useState("");

  //SEND MESSAGE TO FETCH
  const handleSubmit = (e) => {
    e.preventDefault();
    const post = { message: message, type: "question" };
    saveMessage(post)
      .then(() => {
        fetchData();
        setMessage("");
        console.log("Message sent");
      })
      .catch((e) => console.log(e));
  };

  //GET THE ANSWER AND SAVE INTO DB
  const fetchData = async () => {
    try {
      const { content } = await sendMessage();
      saveMessage({ message: content, type: "answer" });
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div
      id="message-bar"
      className="w-full min-h-[120px] flex justify-center items-center absolute bottom-0 bg-[#D9D9D9]"
    >
      <form className="w-full flex justify-center" onSubmit={handleSubmit}>
        <input
          value={message}
          type="text"
          placeholder="your message"
          className="h-[70px] w-[40%] rounded-[5px] placeholder:italic placeholder:indent-2 indent-2 focus:outline-none"
          onChange={(e) => setMessage(e.target.value)}
        />
        <button type="submit" className="hover:bg-[#C5E7E5] bg-[#9FC1BF] p-2 ">
          <FontAwesomeIcon icon={faPaperPlane} />
        </button>
      </form>
    </div>
  );
};

export default MessageInput;
