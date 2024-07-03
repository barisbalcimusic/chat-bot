import MessageInput from "./components/MessageInput";
import Aside from "./components/Aside";
import History from "./components/History";
import SidebarContextProvider from "./contexts/SidebarContext";
import ChatContextProvider from "./contexts/ChatContext";

const App = () => {
  return (
    <ChatContextProvider>
      <SidebarContextProvider>
        <div className="w-screen h-screen bg-[#9FC1BF]">
          <Aside />
          <History />
          <MessageInput />
        </div>
      </SidebarContextProvider>
    </ChatContextProvider>
  );
};

export default App;
