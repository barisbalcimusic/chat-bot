import MessageInput from "./components/MessageInput";
import Ham from "./components/Ham";
import Aside from "./components/Aside";
import History from "./components/History";

const App = () => {
  return (
    <div id="container" className="w-screen h-screen flex bg-[#9FC1BF]">
      <Ham />
      <Aside />
      <main className="w-full flex flex-col bg-[#9FC1BF] relative">
        <History />
        <MessageInput />
      </main>
    </div>
  );
};

export default App;
