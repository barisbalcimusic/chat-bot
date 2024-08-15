import { logout } from "../utils/logout";
import { useChatContext } from "../contexts/ChatContext";
import { useLoginContext } from "../contexts/LoginContext";
import { useState } from "react";
import Modal from "./Modal";

const Profile = () => {
  const { user, setUser } = useLoginContext();
  const { setMessages } = useChatContext();
  const [dropDown, setDropDown] = useState(false);
  const [modal, setModal] = useState(false);

  const handleLogout = () => {
    //LOGOUT USER
    logout().then(() => {
      setUser(null);
      setMessages([]);
    });
  };

  return (
    <div className="w-full h-full">
      {modal && <Modal setModal={setModal} />}
      <div
        onMouseEnter={() => setDropDown(true)}
        onMouseLeave={() => setDropDown(false)}
        className="profile-div w-full lg:w-auto flex flex-col justify-center items-center gap-2 absolute top-0 lg:top-[5px] right-0 lg:right-[20px] hover:cursor-pointer"
      >
        <p className="font-bold p-2 tracking-wider text-gray-700">
          {user && user.email.split("@")[0]}
        </p>
        {dropDown && (
          <ul
            id="drowDown"
            className="dropdown w-full flex flex-col justify-center items-center"
          >
            <li
              onClick={() => setModal(true)}
              className="menu w-full text-center p-3 border-b-[1px] border-gray-700 hover:text-black"
            >
              Settings
            </li>
            <li
              onClick={handleLogout}
              className="menu w-full text-center p-3 hover:text-black"
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
