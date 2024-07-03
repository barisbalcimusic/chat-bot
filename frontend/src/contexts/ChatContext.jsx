import { createContext, useContext, useState } from "react";

export const ChatContext = createContext();

const ChatContextProvider = ({ children }) => {
  const [chat, setChat] = useState([]);

  return (
    <ChatContext.Provider value={{ chat, setChat }}>
      {children}
    </ChatContext.Provider>
  );
};

export default ChatContextProvider;

export const useChatContext = () => {
  return useContext(ChatContext);
};
