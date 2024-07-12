import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { saveMessage } from "../utils/saveMessage";
import { getAnswer } from "../utils/getAnswer";
import { useSubmitContext } from "../contexts/SubmitContext";

const MessageInput = () => {
  const [inputValue, setInputValue] = useState("");
  const { setSubmitted } = useSubmitContext();

  const handleSubmit = async (e) => {
    e.preventDefault();
    //!ONLY FOR TESTING
    const userId = "test";

    //PREVENT EMPTY MESSAGES
    if (inputValue.trim().length === 0) return;

    const post = { userId, message: inputValue, type: "question" };

    try {
      //POST QUESTION INTO CONVERSATION
      await saveMessage(post);
      //GET THE ANSWER FROM API
      const { content } = await getAnswer();
      // POST ANSWER INTO CONVERSATION
      await saveMessage({ userId, message: content, type: "answer" });
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
