import { useState } from "react";
import { useLoginContext } from "../contexts/LoginContext";
import { deleteAccount } from "../utils/deleteAccount";
import Settings from "./Settings";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX } from "@fortawesome/free-solid-svg-icons";

const Modal = ({ setModal }) => {
  const { setLoggedIn } = useLoginContext();
  const { user } = useLoginContext();
  const [settingsOpened, setSettingsOpened] = useState();

  const handleDelete = () => {
    setLoggedIn(false);
    deleteAccount(user).then((data) => console.log(data));
  };

  const handleSettings = () => {
    setSettingsOpened((value) => !value);
  };

  return (
    <div className="modal w-screen h-screen flex flex-col justify-center items-center absolute left-0 top-0">
      <div className="settings-div w-[300px] flex flex-col gap-3 justify-center items-center p-10 relative">
        <FontAwesomeIcon
          onClick={() => setModal(false)}
          icon={faX}
          className="absolute top-2 right-2 text-2xl hover:text-red-500 hover:cursor-pointer"
        />
        <p className="p-">Hello, {user}</p>
        <ul className="w-full bg-gray-400">
          <li
            onClick={handleSettings}
            className="setting text-center hover:cursor-pointer font-bold p-3"
          >
            Edit Profile
          </li>
          {settingsOpened && (
            <li>
              <Settings />
            </li>
          )}
          <li
            onClick={handleDelete}
            className="setting text-center hover:cursor-pointer font-bold p-3"
          >
            Delete Account
          </li>
          <li className="setting text-center hover:cursor-pointer font-bold p-3">
            Logout
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Modal;
