import { useEffect, useRef } from "react";
import { useChatContext } from "../contexts/ChatContext";
import { getConversation } from "../utils/getConversation";
import { createConversation } from "../utils/createConversation";
import { useLoginContext } from "../contexts/LoginContext";

const History = () => {
  const { user } = useLoginContext();
  const { messages, setMessages } = useChatContext();
  const historyRef = useRef();

  useEffect(() => {
    //GET ALL MESSAGES & SET AS STATE
    const fetchMessages = async () => {
      try {
        const conversation = await getConversation(user.userId);
        //IF THERE IS A CONVERSATION
        if (conversation) {
          //SET MESSAGES INTO STATE VARIABLE
          setMessages(conversation.messages);
          //IF THERE IS NO CONVERSATION
        } else {
          //CREATE A NEW CONVERSATION
          await createConversation(user.userId);
        }
      } catch (e) {
        console.error(e);
      }
    };

    if (user) {
      fetchMessages();
    }
  }, [user]);

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
      className="flex flex-col items-center gap-5 p-5 overflow-y-auto"
    >
      {messages.map((message, index) => (
        <p
          key={index}
          className={
            (message.type === "answer" &&
              "answer w-full max-w-[800px] p-5 rounded-[10px]") ||
            (message.type === "question" &&
              "question p-5 w-full max-w-[800px] rounded-[10px]")
          }
        >
          {message.message}
        </p>
      ))}
    </div>
  );
};

export default History;
