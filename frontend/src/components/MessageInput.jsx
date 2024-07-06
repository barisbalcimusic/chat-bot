import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { saveMessageToDB } from "../utils/saveMessageToDB";
import { saveMessageToSS } from "../utils/saveMessageToSS";
import { sendMessage } from "../utils/sendMessage";
import { useLoginContext } from "../contexts/LoginContext";
import { useSubmitContext } from "../contexts/SubmitContext";

const MessageInput = () => {
  const [message, setMessage] = useState("");
  const { loggedIn } = useLoginContext();
  const { setSubmitted } = useSubmitContext();

  const handleSubmit = (e) => {
    e.preventDefault();

    //PREVENT EMPTY MESSAGES
    if (message.trim().length === 0) return;

    const post = { message: message, type: "question" };
    if (loggedIn) {
      //POST MESSAGE TO DB
      saveMessageToDB(post)
        .then(() => {
          fetchData();
          setMessage("");
          console.log("Message sent");
        })
        .catch((e) => console.log(e));
    } else {
      //POST MESSAGE TO SESSION STORAGE
      saveMessageToSS(post);
      fetchData();
      setMessage("");
    }
    setSubmitted((value) => !value);
  };

  //GET THE ANSWER AND SAVE INTO DB
  const fetchData = async () => {
    try {
      const { content } = await sendMessage();

      loggedIn
        ? saveMessageToDB({ message: content, type: "answer" })
        : saveMessageToSS({ message: content, type: "answer" });
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div
      id="message-bar"
      className="w-full min-h-[120px] flex justify-center items-center bg-[#D9D9D9]"
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
