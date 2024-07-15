import { logout } from "../utils/logout";
import { useChatContext } from "../contexts/ChatContext";
import { useLoginContext } from "../contexts/LoginContext";
import { useState } from "react";
import Modal from "./Modal";

const Profile = () => {
  const { user, setUser, setLoggedIn } = useLoginContext();
  const { setMessages } = useChatContext();
  const [dropDown, setDropDown] = useState(false);
  const [modal, setModal] = useState(false);

  const handleLogout = () => {
    setLoggedIn(false);
    //EMPTY USER DATA
    setUser(null);
    //EMPTY MESSAGES STATE
    setMessages([]);
    //LOGOUT
    logout().then(() => {
      setLoggedIn(false);
      setUser(null);
      setMessages([]);
    });
  };

  return (
    <div>
      {modal && <Modal setModal={setModal} />}
      <div
        onMouseEnter={() => setDropDown(true)}
        onMouseLeave={() => setDropDown(false)}
        className="profile-div w-[200px] flex flex-col justify-center items-center gap-2 absolute top-[5px] right-[20px] hover:cursor-pointer"
      >
        <p className="font-bold p-2">{user && user.email}</p>
        {dropDown && (
          <ul
            id="drowDown"
            className="dropdown w-full flex flex-col justify-center items-center"
          >
            <li
              onClick={() => setModal(true)}
              className="menu w-full font-bold text-center p-3"
            >
              Settings
            </li>
            <li
              onClick={handleLogout}
              className="menu w-full font-bold text-center p-3"
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
