import MessageInput from "./components/MessageInput";
import Ham from "./components/Ham";
import Aside from "./components/Aside";
import History from "./components/History";
import SidebarContextProvider from "./contexts/SidebarContext";
import ChatContextProvider from "./contexts/ChatContext";
import LoginContextProvider from "./contexts/LoginContext";

const App = () => {
  return (
    <LoginContextProvider>
      <ChatContextProvider>
        <SidebarContextProvider>
          <div id="container" className="w-screen h-screen flex bg-[#9FC1BF]">
            <Ham />
            <Aside />
            <main className="h-full w-full flex flex-col relative">
              <History />
              <MessageInput />
            </main>
          </div>
        </SidebarContextProvider>
      </ChatContextProvider>
    </LoginContextProvider>
  );
};

export default App;
