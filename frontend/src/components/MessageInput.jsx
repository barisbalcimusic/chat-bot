import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { sendMessage } from "../utils/sendMessage";
import { getAllMessages } from "../utils/getAllMessages";

const MessageInput = () => {
  const [message, setMessage] = useState("");

  //SEND MESSAGE TO FETCH
  const handleSubmit = (e) => {
    e.preventDefault();
    sendMessage(message)
      .then(() => console.log("Message sent"))
      .catch((e) => console.log(e));
  };

  return (
    <div className="w-full flex p-10 justify-center bg-[#D9D9D9] fixed bottom-0 left-0">
      <form className="flex justify-center w-full" onSubmit={handleSubmit}>
        <input
          value={message}
          type="text"
          placeholder="your message"
          className="h-[70px] rounded-[5px] placeholder:italic placeholder:indent-2 indent-2 focus:outline-none"
          onChange={(e) => setMessage(e.target.value)}
        />
        <button type="submit" className="bg-[#C5E7E5] p-2 ">
          <FontAwesomeIcon icon={faPaperPlane} />
        </button>
      </form>
    </div>
  );
};

export default MessageInput;
