import { useChatContext } from "../contexts/ChatContext";
import { useLoginContext } from "../contexts/LoginContext";

const Aside = () => {
  const { loggedIn, setLoggedIn } = useLoginContext();
  const { chatDB, setchatDB, chatSS, setChatSS } = useChatContext();

  //! QUICK LOGIN / LOGOUT ONLY FOR TESTING
  const handleClick = () => {
    setLoggedIn((value) => !value);
  };

  const startNewChat = () => {};

  return (
    <div className="w-[300px] h-full hidden lg:flex lg:flex-col bg-[#D9D9D9]">
      <div
        id="history-preview"
        className="w-full h-full flex flex-col gap-3 p-3 overflow-x-auto"
      >
        <div className="w-full flex justify-center">
          <button
            onClick={startNewChat}
            className="w-[150px] p-3 rounded-[5px] hover:bg-[#C5E7E5] bg-[#9FC1BF]"
          >
            Start a new chat
          </button>
        </div>
      </div>
      <div className="min-h-[120px] min flex justify-center items-center bg-slate-500">
        {!loggedIn ? (
          <button
            onClick={handleClick}
            className="w-[150px] p-3 rounded-[5px] hover:bg-[#C5E7E5] bg-[#9FC1BF]"
          >
            Login
          </button>
        ) : (
          <button
            onClick={handleClick}
            className="w-[150px] p-3 rounded-[5px] hover:bg-[#C5E7E5] bg-[#9FC1BF]"
          >
            Logout
          </button>
        )}
      </div>
    </div>
  );
};

export default Aside;
