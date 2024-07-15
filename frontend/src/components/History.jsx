import { useEffect, useRef } from "react";
import { useChatContext } from "../contexts/ChatContext";
import { getConversation } from "../utils/getConversation";
import { createConversation } from "../utils/createConversation";

const History = () => {
  const { messages, setMessages } = useChatContext();
  const historyRef = useRef();

  useEffect(() => {
    //!ONLY FOR TESTING
    const userId = "test";

    //GET ALL MESSAGES & SET AS STATE
    const fetchMessages = async () => {
      try {
        const conversation = await getConversation(userId);
        //IF THERE IS A CONVERSATION
        if (conversation) {
          //SET MESSAGES INTO STATE VARIABLE
          console.log(conversation.messages);
          setMessages(conversation.messages);
          //IF THERE IS NO CONVERSATION
        } else {
          //CREATE A NEW CONVERSATION
          await createConversation(userId);
        }
      } catch (e) {
        console.error(e);
      }
    };

    fetchMessages();
  }, []);

  useEffect(() => {
    //IN ORDER TO BRING MESSAGEINPUT TO BOTTOM BECAUSE POSITION FIXED DOESN'T WORK PROPERLY
    historyRef.current.style.minHeight = `${innerHeight - 120}px`;
  }, []);

  useEffect(() => {
    //AUTO SCROLL TO BOTTOM
    const historyDiv = historyRef.current;
    historyDiv.scrollTop = historyDiv.scrollHeight;
  }, [messages]);

  return (
    <div
      ref={historyRef}
      id="history-div"
      className="flex flex-col items-center gap-4 p-5 overflow-y-auto"
    >
      {messages.map((message, index) => (
        <p
          key={index}
          className={
            (message.type === "answer" &&
              "bg-[#D7FFE0] p-4 w-[40%] rounded-[20px]") ||
            (message.type === "question" &&
              "bg-[#D8E0FF] p-4 w-[40%] rounded-[20px]")
          }
        >
          {message.message}
        </p>
      ))}
    </div>
  );
};

export default History;
