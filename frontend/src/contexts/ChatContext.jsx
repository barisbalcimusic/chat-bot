import { createContext, useContext, useState } from "react";

export const ChatContext = createContext();

const ChatContextProvider = ({ children }) => {
  const [chatDB, setChatDB] = useState([]);
  const [chatSS, setChatSS] = useState([]);

  return (
    <ChatContext.Provider value={{ chatDB, setChatDB, chatSS, setChatSS }}>
      {children}
    </ChatContext.Provider>
  );
};

export default ChatContextProvider;

export const useChatContext = () => {
  return useContext(ChatContext);
};
