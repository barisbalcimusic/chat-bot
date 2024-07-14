import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { saveMessage } from "../utils/saveMessage";
import { getAnswer } from "../utils/getAnswer";
import { useSubmitContext } from "../contexts/SubmitContext";
import { useChatContext } from "../contexts/ChatContext";
import { useLoginContext } from "../contexts/LoginContext";

const MessageInput = () => {
  const [inputValue, setInputValue] = useState("");
  const { setSubmitted } = useSubmitContext();
  const { messages, setMessages } = useChatContext();
  const { setLoggedIn } = useLoginContext();

  const handleSubmit = async (e) => {
    e.preventDefault();
    //!ONLY FOR TESTING
    const userId = "test";

    //IGNORE EMPTY MESSAGES
    if (inputValue.trim().length === 0) return;

    try {
      const post = { userId, message: inputValue, type: "question" };

      //POST QUESTION INTO CONVERSATION
      const data = await saveMessage(post);

      //CHECK FOR AUTHENTICATION ERROR
      if (data.error) {
        //LOGOUT USER
        setLoggedIn(false);
        throw new Error(data.error);
      }

      //ADD QUESTION INTO MESSAGES STATE //* CAN BE IMPROVED
      setMessages([...messages, post]);

      //GET THE ANSWER FROM API
      const { content } = await getAnswer();
      const answer = { userId, message: content, type: "answer" };
      // POST ANSWER INTO CONVERSATION
      await saveMessage(answer);
      //ADD ANSWER INTO MESSAGES STATE
      setMessages((prevMessages) => [...prevMessages, answer]);
      //CLEAR THE INPUT
      setInputValue("");

      //TRIGGER RE-RENDERING FOR HISTORY
      setSubmitted((value) => !value);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div
      id="message-bar"
      className="w-full min-h-[120px] flex justify-center items-center bg-[#D9D9D9]"
    >
      <form className="w-full flex justify-center" onSubmit={handleSubmit}>
        <input
          value={inputValue}
          type="text"
          placeholder="your message"
          className="h-[70px] w-[40%] rounded-[5px] placeholder:italic placeholder:indent-2 indent-2 focus:outline-none"
          onChange={(e) => setInputValue(e.target.value)}
        />
        <button type="submit" className="hover:bg-[#C5E7E5] bg-[#9FC1BF] p-2 ">
          <FontAwesomeIcon icon={faPaperPlane} />
        </button>
      </form>
    </div>
  );
};

export default MessageInput;
