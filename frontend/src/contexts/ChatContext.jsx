import { createContext, useContext, useState } from "react";

export const ChatContext = createContext();

const ChatProvider = ({ children }) => {
  const [messages, setMessages] = useState([]);
  const [counter, setCounter] = useState(0);
  const [typeAnimation, setTypeAnimation] = useState(false);

  return (
    <ChatContext.Provider
      value={{
        messages,
        setMessages,
        counter,
        setCounter,
        typeAnimation,
        setTypeAnimation,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export default ChatProvider;

export const useChatContext = () => {
  return useContext(ChatContext);
};
