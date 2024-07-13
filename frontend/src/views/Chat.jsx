import MessageInput from "../components/MessageInput";
import Ham from "../components/Ham";
import Aside from "../components/Aside";
import History from "../components/History";
import { useLoginContext } from "../contexts/LoginContext";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const Chat = () => {
  const { loggedIn } = useLoginContext();
  const navigate = useNavigate();

  //REDIRECT IF USER TRIES A DIRECTLY ACCESS TO THE PATH OR LOGS OUT
  useEffect(() => {
    if (!loggedIn) navigate("/login");
  }, [loggedIn]);

  return (
    <div id="container" className="w-screen h-screen flex bg-[#9FC1BF]">
      <Ham />
      <Aside />
      <div className="w-full flex flex-col bg-[#9FC1BF] relative">
        <History />
        <MessageInput />
      </div>
    </div>
  );
};

export default Chat;
