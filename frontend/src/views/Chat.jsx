import MessageInput from "../components/MessageInput";
import Profile from "../components/Profile";
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
    <div
      id="container"
      className="w-screen h-screen flex flex-col relative bg-[#9FC1BF]"
    >
      <Profile />
      <History />
      <MessageInput />
    </div>
  );
};

export default Chat;
