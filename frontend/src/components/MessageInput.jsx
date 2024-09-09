import { useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { saveMessage } from "../utils/saveMessage";
import { useSubmitContext } from "../contexts/SubmitContext";
import { useChatContext } from "../contexts/ChatContext";
import { useLoginContext } from "../contexts/LoginContext";
import { askChatGPT } from "../utils/askChatGPT";
import { logout } from "../utils/logout";
import { TypeAnimation } from "react-type-animation";

const MessageInput = () => {
  const [inputValue, setInputValue] = useState("");
  const { setSubmitted } = useSubmitContext();
  const { messages, setMessages, counter, setCounter, setTypeAnimation } =
    useChatContext();
  const { user, setUser } = useLoginContext();
  const [typing, setTyping] = useState(false);
  const [limitReached, setLimitReached] = useState(false);
  const inputRef = useRef();

  // CHECK THE MESSAGE COUNT
  useEffect(() => {
    if (counter >= 10) {
      setLimitReached(true);
      return;
    }
    // SET AUTO FOCUS ON INPUT
    inputRef.current.focus();
  }, [counter]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    //INPUT CHECK: IGNORE EMPTY MESSAGES
    if (inputValue.trim().length === 0) return;

    // ACTIVATE TYPE ANIMATION
    setTypeAnimation(true);

    try {
      // PREPARE QUESTION
      const post = {
        userId: user.userId,
        message: inputValue,
        type: "question",
      };

      // SAVE QUESTION INTO DB
      const data = await saveMessage(post);

      // CHECK FOR AUTHENTICATION ERROR
      if (data.error) {
        if (data.error === "MessageLimit") {
          setInputValue("");
          setLimitReached(true);
          return;
        } else {
          // LOGOUT USER
          logout().then(() => {
            setUser(null);
            setMessages([]);
          });
          throw new Error(data.error);
        }
      }
      // INCREATE COUNTER (MESSAGE COUNT)
      setCounter((counter) => counter + 1);
      // CLEAR THE INPUT
      setInputValue("");
      // ADD QUESTION INTO MESSAGES STATE
      setMessages([...messages, data]);
      // ACTIVATE TYPING ANIMATION
      setTyping(true);

      // SEND CHATGPT THE QUESTION AND GET THE ANSWER
      const gptAnswer = await askChatGPT(inputValue);

      // PREPARE ANSWER
      const answer = {
        userId: user.userId,
        message: gptAnswer,
        type: "answer",
      };

      // SAVE ANSWER INTO DB
      await saveMessage(answer);

      // INCREATE COUNTER (MESSAGE COUNT)
      setCounter((counter) => counter + 1);
      // ADD ANSWER INTO MESSAGES STATE
      setMessages((prevMessages) => [...prevMessages, answer]);
      // DEACTIVATE TYPING ANIMATION
      setTyping(false);
      // TRIGGER RE-RENDERING FOR HISTORY
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
      {typing && (
        <p className="absolute z-10">
          <TypeAnimation
            sequence={["typing...", 800]}
            speed={50}
            repeat={Infinity}
            className="text-lg text-white italic"
          />
        </p>
      )}
      <form className="w-full flex mt-4 justify-center" onSubmit={handleSubmit}>
        <div className="w-[80%] max-w-[500px] h-[55px] flex justify-end items-center relative">
          <input
            ref={inputRef}
            maxLength={40}
            value={inputValue}
            type="text"
            disabled={typing || limitReached ? true : false}
            placeholder={typing || limitReached ? "" : "your message"}
            className="message-input w-full h-full placeholder:italic placeholder:indent-6 indent-6 disabled:bg-red-700 rounded-full"
            onChange={(e) => setInputValue(e.target.value)}
          />
          <button
            type="submit"
            className="w-[40px] h-[40px] send-message p-2 absolute mr-[8px] rounded-full disabled:bg-gray-300"
            disabled={typing || limitReached ? true : false}
          >
            <FontAwesomeIcon icon={faPaperPlane} />
          </button>
        </div>
      </form>
      {limitReached ? (
        <small className="text-white space-wider tracking-wider">
          You have reached your message limit
        </small>
      ) : (
        <small className="text-white space-wider tracking-wider">
          <span className="text-yellow-200 font-bold">
            {40 - inputValue.length}
          </span>{" "}
          characters remaining
        </small>
      )}
    </div>
  );
};

export default MessageInput;
