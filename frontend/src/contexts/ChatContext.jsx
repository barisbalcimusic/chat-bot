import { createContext, useContext, useState } from "react";

export const ChatContext = createContext();

const ChatContextProvider = ({ children }) => {
  const [messages, setMessages] = useState([]);
  const [counter, setCounter] = useState(0);

  return (
    <ChatContext.Provider
      value={{ messages, setMessages, counter, setCounter }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export default ChatContextProvider;

export const useChatContext = () => {
  return useContext(ChatContext);
};
