import { logout } from "../utils/logout";
import { useChatContext } from "../contexts/ChatContext";
import { useLoginContext } from "../contexts/LoginContext";
import { useState } from "react";
import Modal from "./Modal";

const Profile = () => {
  const { user, setLoggedIn } = useLoginContext();
  const { setMessages } = useChatContext();
  const [dropDown, setDropDown] = useState(false);
  const [modal, setModal] = useState(false);

  const handleLogout = () => {
    setLoggedIn(false);
    //EMPTY MESSAGES STATE
    setMessages([]);
    logout().then((data) => console.log(data));
  };

  return (
    <div>
      {modal && <Modal />}
      <div
        onMouseEnter={() => setDropDown(true)}
        onMouseLeave={() => setDropDown(false)}
        className="w-[200px] flex flex-col justify-center items-center gap-2 absolute top-[5px] right-[20px] bg-slate-500 hover:bg-slate-400 hover:cursor-pointer"
      >
        <p className="text-white font-bold p-2">{user}</p>
        {dropDown && (
          <ul
            id="drowDown"
            className="w-full flex flex-col justify-center items-center bg-red-100"
          >
            <li
              onClick={() => setModal(true)}
              className="w-full font-bold text-center hover:bg-green-200 p-3"
            >
              Settings
            </li>
            <li
              onClick={handleLogout}
              className="w-full font-bold text-center hover:bg-green-200 p-3"
            >
              Logout
            </li>
          </ul>
        )}
      </div>
    </div>
  );
};

export default Profile;
