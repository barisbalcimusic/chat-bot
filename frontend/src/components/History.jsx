import { useEffect } from "react";
import { useChatContext } from "../contexts/ChatContext";
import { getAllMessages } from "../utils/getAllMessages";

const History = () => {
  const { chat, setChat } = useChatContext();

  //GET ALL MESSAGES FROM DB AND SET AS STATE
  useEffect(() => {
    getAllMessages()
      .then((messages) => setChat(messages))
      .catch((e) => {
        console.log(e);
      });
  }, [chat]);

  return (
    <div className="flex flex-col items-center gap-8 p-10 overflow-x-auto">
      {chat.map((message, index) => (
        <p
          key={index}
          className={
            (message.type === "answer" &&
              "bg-[#D7FFE0] p-4 w-[40%] rounded-[20px] ml-[200px]") ||
            (message.type === "question" &&
              "bg-[#D8E0FF] p-4 w-[40%] rounded-[20px] mr-[200px]")
          }
        >
          {message.message}
        </p>
      ))}
    </div>
  );
};

export default History;
