import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { saveMessage } from "../utils/saveMessage";
import { useSubmitContext } from "../contexts/SubmitContext";
import { useChatContext } from "../contexts/ChatContext";
import { useLoginContext } from "../contexts/LoginContext";
import { askChatGPT } from "../utils/askChatGPT";

const MessageInput = () => {
  const [inputValue, setInputValue] = useState("");
  const { setSubmitted } = useSubmitContext();
  const { messages, setMessages } = useChatContext();
  const { user, setLoggedIn } = useLoginContext();
  const [typing, setTyping] = useState(false);
  const [limitReached, setLimitReached] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    //INPUT CHECK: IGNORE EMPTY MESSAGES
    if (inputValue.trim().length === 0) return;

    try {
      const post = {
        userId: user.userId,
        message: inputValue,
        type: "question",
      };

      //SAVE QUESTION INTO DB
      const data = await saveMessage(post);
      //CHECK FOR AUTHENTICATION ERROR
      if (data.error) {
        if (data.error === "MessageLimit") {
          setInputValue("");
          setLimitReached(true);
        } else {
          //!LOGOUT USER
          // setLoggedIn(false);
          throw new Error(data.error);
        }
      }
      //CLEAR THE INPUT
      setInputValue("");
      //ADD QUESTION INTO MESSAGES STATE
      setMessages([...messages, data]);
      //ACTIVATE TYPING ANIMATION
      setTyping(true);

      //SEND CHATGPT THE QUESTION AND GET THE ANSWER
      const gptAnswer = await askChatGPT(inputValue);

      const answer = {
        userId: user.userId,
        message: gptAnswer,
        type: "answer",
      };
      //SAVE ANSWER INTO DB
      await saveMessage(answer);

      //ADD ANSWER INTO MESSAGES STATE
      setMessages((prevMessages) => [...prevMessages, answer]);

      //DEACTIVATE TYPING ANIMATION
      setTyping(false);

      //TRIGGER RE-RENDERING FOR HISTORY
      setSubmitted((value) => !value);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div
      id="message-bar"
      className="message-bar w-full h-[100px] flex flex-col justify-center items-center absolute bottom-0 left-0"
    >
      {typing && <p className="absolute text-xl text-white">typing...</p>}
      <form className="w-full flex justify-center mt-4" onSubmit={handleSubmit}>
        <input
          maxLength={40}
          value={inputValue}
          type="text"
          disabled={typing || limitReached ? true : false}
          placeholder={typing || limitReached ? "" : "your message"}
          className="message-input w-[80%] max-w-[500px] h-[60px] placeholder:italic placeholder:indent-4 indent-4 focus:outline-none"
          onChange={(e) => setInputValue(e.target.value)}
        />
        <button
          type="submit"
          className="send-message p-2"
          disabled={typing || limitReached ? true : false}
        >
          <FontAwesomeIcon icon={faPaperPlane} />
        </button>
      </form>
      <small className="text-white">
        {limitReached
          ? "You have reached your message limit"
          : `${40 - inputValue.length} characters remaining`}
      </small>
    </div>
  );
};

export default MessageInput;
