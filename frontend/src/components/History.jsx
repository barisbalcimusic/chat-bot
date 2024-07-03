import { useChatContext } from "../contexts/ChatContext";

const History = () => {
  const { chat } = useChatContext();

  return (
    <div className="flex flex-col gap-5 p-10">
      {chat.map((message) => (
        <p key={message} className="bg-[#D7FFE0] p-3">
          {message}
        </p>
      ))}
    </div>
  );
};

export default History;
