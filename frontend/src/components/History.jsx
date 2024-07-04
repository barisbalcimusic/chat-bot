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
    <div className="flex flex-col gap-5 p-10">
      {chat.map(({ message }) => (
        <p key={message} className="bg-[#D7FFE0] p-3">
          {message}
        </p>
      ))}
    </div>
  );
};

export default History;
