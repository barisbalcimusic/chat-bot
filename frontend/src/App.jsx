import MessageInput from "./components/MessageInput";
import Ham from "./components/Ham";
import Aside from "./components/Aside";
import History from "./components/History";
import SidebarContextProvider from "./contexts/SidebarContext";
import ChatContextProvider from "./contexts/ChatContext";
import LoginContextProvider from "./contexts/LoginContext";
import SubmitContextProvider from "./contexts/SubmitContext";

const App = () => {
  return (
    <LoginContextProvider>
      <ChatContextProvider>
        <SubmitContextProvider>
          <SidebarContextProvider>
            <div id="container" className="w-screen h-screen flex bg-[#9FC1BF]">
              <Ham />
              <Aside />
              <main className="w-full flex flex-col bg-[#9FC1BF] relative">
                <History />
                <MessageInput />
              </main>
            </div>
          </SidebarContextProvider>
        </SubmitContextProvider>
      </ChatContextProvider>
    </LoginContextProvider>
  );
};

export default App;
