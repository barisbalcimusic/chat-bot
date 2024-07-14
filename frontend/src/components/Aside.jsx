import { logout } from "../../../backend/controllers/user/logout";
import { useChatContext } from "../contexts/ChatContext";
import { useLoginContext } from "../contexts/LoginContext";

const Aside = () => {
  const { user, setLoggedIn } = useLoginContext();
  const { setMessages } = useChatContext();

  //! QUICK LOGIN / LOGOUT ONLY FOR TESTING
  const handleLogout = () => {
    setLoggedIn(false);
    //EMPTY MESSAGES STATE
    setMessages([]);
    logout().then((data) => console.log(data));
  };

  return (
    <div className="w-[300px] h-full hidden lg:flex lg:flex-col bg-[#D9D9D9]">
      <div className="flex flex-col gap-2 min-h-[120px] min flex justify-center items-center bg-slate-500">
        <p className="text-white font-bold">{user}</p>
        <button
          onClick={handleLogout}
          className="w-[150px] p-3 rounded-[5px] hover:bg-[#C5E7E5] bg-[#9FC1BF]"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Aside;
