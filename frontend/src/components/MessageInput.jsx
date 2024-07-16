import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { saveMessage } from "../utils/saveMessage";
import { getAnswer } from "../utils/getAnswer";
import { useSubmitContext } from "../contexts/SubmitContext";
import { useChatContext } from "../contexts/ChatContext";
import { useLoginContext } from "../contexts/LoginContext";

const MessageInput = () => {
  const [inputValue, setInputValue] = useState("");
  const { setSubmitted } = useSubmitContext();
  const { messages, setMessages } = useChatContext();
  const { user, setLoggedIn } = useLoginContext();

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

      //POST QUESTION INTO CONVERSATION
      const data = await saveMessage(post);

      //CHECK FOR AUTHENTICATION ERROR
      if (data.error) {
        //LOGOUT USER
        setLoggedIn(false);
        throw new Error(data.error);
      }

      //ADD QUESTION INTO MESSAGES STATE
      setMessages([...messages, data]);

      //GET THE ANSWER FROM API
      const { content } = await getAnswer();
      const answer = { userId: user.userId, message: content, type: "answer" };
      // POST ANSWER INTO CONVERSATION
      await saveMessage(answer);
      //ADD ANSWER INTO MESSAGES STATE //! should be in same logic as the question --> replace with gpt api
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
      className="message-bar w-full h-[100px] flex justify-center items-center p-6 absolute bottom-0 left-0"
    >
      <form className="w-full flex justify-center" onSubmit={handleSubmit}>
        <input
          value={inputValue}
          type="text"
          placeholder="your message"
          className="message-input w-full max-w-[500px] h-[60px] placeholder:italic placeholder:indent-2 indent-2 focus:outline-none"
          onChange={(e) => setInputValue(e.target.value)}
        />
        <button type="submit" className="send-message p-2">
          <FontAwesomeIcon icon={faPaperPlane} />
        </button>
      </form>
    </div>
  );
};

export default MessageInput;
