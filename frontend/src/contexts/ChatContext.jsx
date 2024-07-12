import { createContext, useContext, useState } from "react";

export const ChatContext = createContext();

const ChatContextProvider = ({ children }) => {
  const [messages, setMessages] = useState([]);

  return (
    <ChatContext.Provider value={{ messages, setMessages }}>
      {children}
    </ChatContext.Provider>
  );
};

export default ChatContextProvider;

export const useChatContext = () => {
  return useContext(ChatContext);
};
